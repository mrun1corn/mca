import { Router, Request, Response, NextFunction } from "express";
import { requireAuth, JwtPayload } from "../lib/auth";
import UserModel from "../models/User";
import { AppError } from "../lib/errors";
import PaymentSession from "../models/PaymentSession";
import { handleDeposit } from "../services/deposit";
import { getUserDues } from "../services/dues";
import * as math from "../lib/math";

const router = Router();

type AuthenticatedRequest = Request & { user?: JwtPayload };

function getGatewayConfig() {
  const baseUrl = process.env.UDDOKTAPAY_BASE_URL;
  const apiKey = process.env.UDDOKTAPAY_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new AppError(
      "Payment gateway is not configured. Please set UDDOKTAPAY_BASE_URL and UDDOKTAPAY_API_KEY in environment variables.",
      500
    );
  }

  return {
    baseUrl: baseUrl.replace(/\/+$/, ""),
    apiKey,
    webBase: (process.env.WEB_BASE_URL || "http://localhost:5173").replace(/\/+$/, ""),
    apiBase: (process.env.API_BASE_URL || "http://localhost:4000/api").replace(/\/+$/, ""),
  };
}

/**
 * GET /api/payments/public-members
 * Public search endpoint allowing members to find their profile by name/phone without logging in.
 */
router.get("/public-members", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = String(req.query.q || "").trim();
    const filter: Record<string, unknown> = { status: "active" };
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ];
    }
    const users = await UserModel.find(filter).select("name phone email").sort({ name: 1 }).limit(50);
    res.json(users.map((u) => ({ id: u._id, name: u.name, phone: u.phone, email: u.email })));
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/payments/public-dues/:userId
 * Public endpoint to fetch active dues and suggested installment for a member.
 */
router.get("/public-dues/:userId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user || user.status !== "active") {
      throw new AppError("Member not found or inactive", 404);
    }
    const dues = await getUserDues(userId, "open");
    res.json({
      user: { id: user._id, name: user.name, phone: user.phone },
      dues,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/payments/public-initiate
 * Public checkout initiation for non-logged-in members (e.g. from WhatsApp/SMS direct link).
 */
router.post("/public-initiate", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, amount: rawAmount, mode = "simple", dueId, note } = req.body;
    const amount = math.round(Number(rawAmount));

    if (!userId) {
      throw new AppError("Please select a member", 400);
    }
    if (!amount || amount <= 0 || !isFinite(amount)) {
      throw new AppError("Invalid payment amount", 400);
    }

    const targetUser = await UserModel.findById(userId);
    if (!targetUser || targetUser.status !== "active") {
      throw new AppError("Member not found or inactive", 404);
    }

    const { baseUrl, apiKey, webBase, apiBase } = getGatewayConfig();

    const payload = {
      full_name: targetUser.name,
      email: targetUser.email || `${targetUser._id}@mca.app`,
      amount,
      metadata: {
        userId: String(targetUser._id),
        mode,
        dueId: dueId || null,
        note: note || (mode === "pay_due" ? "Online Dues Payment" : "Online Deposit"),
      },
      redirect_url: `${webBase}/balances?payment=success`,
      cancel_url: `${webBase}/balances?payment=cancelled`,
      webhook_url: `${apiBase}/payments/webhook`,
    };

    const response = await fetch(`${baseUrl}/checkout-v2`, {
      method: "POST",
      headers: {
        "RT-UDDOKTAPAY-API-KEY": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      status?: boolean;
      message?: string;
      payment_url?: string;
      invoice_id?: string;
    };

    if (!data?.status || !data?.payment_url) {
      throw new AppError(data?.message || "Failed to initiate payment session with gateway", 502);
    }

    let invoiceId = data.invoice_id;
    if (!invoiceId && typeof data.payment_url === "string") {
      const urlParts = data.payment_url.split("/");
      invoiceId = urlParts[urlParts.length - 1];
    }

    if (!invoiceId) {
      invoiceId = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }

    await PaymentSession.create({
      userId: targetUser._id,
      invoiceId,
      amount,
      mode,
      dueId: dueId || undefined,
      status: "pending",
      metadata: payload.metadata,
    });

    return res.json({
      status: true,
      paymentUrl: data.payment_url,
      invoiceId,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/payments/initiate
 * Initiates an UddoktaPay / Paymently checkout session for a deposit or due payment (Authenticated).
 */
router.post("/initiate", requireAuth as any, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { userId: explicitUserId, amount: rawAmount, mode = "simple", dueId, note } = req.body;
    const amount = math.round(Number(rawAmount));

    if (!amount || amount <= 0 || !isFinite(amount)) {
      throw new AppError("Invalid payment amount", 400);
    }

    const targetUserId = explicitUserId || user.sub;
    const targetUser = await UserModel.findById(targetUserId);
    const customerName = targetUser?.name || user.name || "Community Member";
    const customerEmail = targetUser?.email || `${targetUserId}@mca.app`;

    const { baseUrl, apiKey, webBase, apiBase } = getGatewayConfig();

    const payload = {
      full_name: customerName,
      email: customerEmail,
      amount,
      metadata: {
        userId: String(targetUserId),
        mode,
        dueId: dueId || null,
        note: note || (mode === "pay_due" ? "Online Dues Payment" : "Online Deposit"),
      },
      redirect_url: `${webBase}/balances?payment=success`,
      cancel_url: `${webBase}/balances?payment=cancelled`,
      webhook_url: `${apiBase}/payments/webhook`,
    };

    const response = await fetch(`${baseUrl}/checkout-v2`, {
      method: "POST",
      headers: {
        "RT-UDDOKTAPAY-API-KEY": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      status?: boolean;
      message?: string;
      payment_url?: string;
      invoice_id?: string;
    };

    if (!data?.status || !data?.payment_url) {
      throw new AppError(data?.message || "Failed to initiate payment session with gateway", 502);
    }

    let invoiceId = data.invoice_id;
    if (!invoiceId && typeof data.payment_url === "string") {
      const urlParts = data.payment_url.split("/");
      invoiceId = urlParts[urlParts.length - 1];
    }

    if (!invoiceId) {
      invoiceId = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }

    // Persist local payment session
    await PaymentSession.create({
      userId: (targetUser ? targetUser._id : user.sub) as any,
      invoiceId,
      amount,
      mode,
      dueId: dueId || undefined,
      status: "pending",
      metadata: payload.metadata,
    });

    return res.json({
      status: true,
      paymentUrl: data.payment_url,
      invoiceId,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/payments/webhook
 * Instant Payment Notification (IPN) webhook listener called by Paymently / UddoktaPay on payment settlement.
 */
router.post("/webhook", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { apiKey } = getGatewayConfig();
    const incomingKey = req.headers["rt-uddoktapay-api-key"] || req.headers["x-api-key"];

    // 1. Verify Gateway Secret
    if (incomingKey && incomingKey !== apiKey) {
      return res.status(401).json({ status: false, message: "Unauthorized API key" });
    }

    const {
      invoice_id,
      status,
      payment_method,
      sender_number,
      transaction_id,
      metadata,
    } = req.body;

    const normalizedStatus = String(status || "").toUpperCase();
    if (normalizedStatus !== "COMPLETED" && normalizedStatus !== "SUCCESS") {
      return res.status(200).json({ status: true, message: `Ignored status: ${status}` });
    }

    // 2. Fetch local session
    let session = await PaymentSession.findOne({ invoiceId: invoice_id });

    if (!session && metadata?.userId && metadata?.mode) {
      session = await PaymentSession.create({
        userId: metadata.userId,
        invoiceId: invoice_id || `INV-${Date.now()}`,
        amount: Number(req.body.amount || 0),
        mode: metadata.mode,
        dueId: metadata.dueId || undefined,
        status: "pending",
      });
    }

    if (!session) {
      return res.status(200).json({ status: true, message: "No matching payment session found" });
    }

    if (session.status === "completed") {
      return res.status(200).json({ status: true, message: "Payment already processed" });
    }

    // 3. Execute deposit settlement in MongoDB
    const depositResult = await handleDeposit({
      userId: String(session.userId),
      mode: session.mode,
      dueId: session.dueId ? String(session.dueId) : undefined,
      amount: session.amount,
      date: new Date().toISOString(),
      note: `Online payment via ${payment_method || "MFS"} (TrxID: ${transaction_id || "N/A"})`,
      includePenalty: true,
    });

    // 4. Update session status
    session.status = "completed";
    session.paymentMethod = payment_method;
    session.senderNumber = sender_number;
    session.transactionId = transaction_id;
    session.depositTxId = depositResult.tx._id;
    session.duesAffected = depositResult.duesAffected;
    await session.save();

    return res.status(200).json({ status: true, message: "Payment processed and ledger updated" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/payments/verify/:invoiceId
 * Fallback endpoint to check payment status directly against Paymently / UddoktaPay.
 */
router.get("/verify/:invoiceId", requireAuth as any, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { invoiceId } = req.params;
    const user = req.user!;
    const session = await PaymentSession.findOne({ invoiceId, userId: user.sub as any });

    if (!session) {
      throw new AppError("Payment session not found", 404);
    }

    if (session.status === "completed") {
      return res.json({ status: true, completed: true, session });
    }

    const { baseUrl, apiKey } = getGatewayConfig();
    try {
      const response = await fetch(`${baseUrl}/verify-payment`, {
        method: "POST",
        headers: {
          "RT-UDDOKTAPAY-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoice_id: invoiceId }),
      });

      const data = (await response.json()) as {
        status?: boolean | string;
        payment_method?: string;
        sender_number?: string;
        transaction_id?: string;
      };

      if (data?.status && (String(data.status).toUpperCase() === "COMPLETED" || data.status === true)) {
        if ((session.status as string) !== "completed") {
          const depositResult = await handleDeposit({
            userId: String(session.userId),
            mode: session.mode,
            dueId: session.dueId ? String(session.dueId) : undefined,
            amount: session.amount,
            date: new Date().toISOString(),
            note: `Online payment via ${data.payment_method || "MFS"} (TrxID: ${data.transaction_id || "N/A"})`,
            includePenalty: true,
          });

          session.status = "completed";
          session.paymentMethod = data.payment_method;
          session.senderNumber = data.sender_number;
          session.transactionId = data.transaction_id;
          session.depositTxId = depositResult.tx._id;
          session.duesAffected = depositResult.duesAffected;
          await session.save();
        }

        return res.json({ status: true, completed: true, session });
      }
    } catch {
      // Gateway verification failed or pending
    }

    return res.json({ status: true, completed: (session.status as string) === "completed", session });
  } catch (err) {
    next(err);
  }
});

export default router;
