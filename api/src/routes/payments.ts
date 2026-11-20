import { Router, Request, Response, NextFunction } from "express";
import crypto from "node:crypto";
import { requireAuth, JwtPayload } from "../lib/auth";
import UserModel from "../models/User";
import { AppError } from "../lib/errors";
import PaymentSession from "../models/PaymentSession";
import { handleDeposit } from "../services/deposit";
import { getUserDues } from "../services/dues";
import DueModel from "../models/Due";
import * as math from "../lib/math";

// Upper bound for a single online payment; also enforced in the deposit service.
const MAX_PAYMENT_AMOUNT = 1_000_000;

async function dueBelongsTo(dueId: unknown, userId: unknown) {
  if (typeof dueId !== "string" || !/^[0-9a-fA-F]{24}$/.test(dueId)) return false;
  const due = await DueModel.findOne({ _id: dueId, userId }).select("_id").lean();
  return Boolean(due);
}

type GatewayPayment = {
  status?: unknown;
  amount?: unknown;
  payment_method?: string;
  sender_number?: string;
  transaction_id?: string;
};

async function fetchGatewayPayment(invoiceId: string): Promise<GatewayPayment | null> {
  const { baseUrl, apiKey } = requireGatewayConfig();
  const response = await fetch(`${baseUrl}/verify-payment`, {
    method: "POST",
    headers: {
      "RT-UDDOKTAPAY-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ invoice_id: invoiceId }),
  });
  if (!response.ok) return null;
  return (await response.json()) as GatewayPayment;
}

function gatewaySaysCompleted(data: GatewayPayment | null) {
  if (!data) return false;
  const status = String(data.status ?? "").toUpperCase();
  return data.status === true || status === "COMPLETED" || status === "SUCCESS";
}

const router = Router();

type AuthenticatedRequest = Request & { user?: JwtPayload };

type GatewayConfig = { baseUrl: string; apiKey: string; webBase: string; apiBase: string };

/**
 * Online payments are optional. When the gateway variables are absent every
 * payment endpoint reports 503 and the clients hide the checkout UI.
 */
function getGatewayConfig(): GatewayConfig | null {
  const baseUrl = process.env.UDDOKTAPAY_BASE_URL;
  const apiKey = process.env.UDDOKTAPAY_API_KEY;
  if (!baseUrl || !apiKey) return null;

  return {
    baseUrl: baseUrl.replace(/\/+$/, ""),
    apiKey,
    webBase: (process.env.WEB_BASE_URL || "http://localhost:5173").replace(/\/+$/, ""),
    apiBase: (process.env.API_BASE_URL || "http://localhost:4000/api").replace(/\/+$/, ""),
  };
}

function requireGatewayConfig(): GatewayConfig {
  const config = getGatewayConfig();
  if (!config) {
    throw new AppError("Online payments are not enabled for this community.", 503);
  }
  return config;
}

async function resolveMember(identifier: string) {
  const clean = String(identifier || "").trim().slice(0, 128);
  if (!clean) return null;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(clean);
  const normalized = clean.toLowerCase().replace(/^@/, "");
  const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return UserModel.findOne({
    $or: [
      ...(isObjectId ? [{ _id: clean }] : []),
      { username: normalized },
      { memberCode: clean.toUpperCase() },
      { phone: clean },
      { name: new RegExp(`^${escaped}$`, "i") },
    ],
    status: "active",
  });
}

/**
 * GET /api/payments/config
 * Public capability flag so clients can hide the checkout UI when the gateway
 * is not configured.
 */
router.get("/config", (_req: Request, res: Response) => {
  res.json({ enabled: getGatewayConfig() !== null });
});

/**
 * GET /api/payments/public-members
 * Public search endpoint allowing members to find their profile by name/username/code/phone without logging in.
 */
router.get("/public-members", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = String(req.query.q || "").trim().slice(0, 64);
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const filter: Record<string, unknown> = { status: "active" };
    if (escaped) {
      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { username: { $regex: escaped, $options: "i" } },
        { memberCode: { $regex: escaped, $options: "i" } },
      ];
    }
    // Display-only fields: contact details and balances are never public.
    const users = await UserModel.find(filter).select("name username memberCode").sort({ name: 1 }).limit(20);
    res.json(
      users.map((u) => ({
        id: u._id,
        name: u.name,
        username: u.username || u.name.toLowerCase().replace(/[^a-z0-9_]/g, ""),
        memberCode: u.memberCode || "",
      }))
    );
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/payments/public-dues/:identifier
 * Public endpoint to fetch active dues and suggested installment for a member (by ID, username, or code).
 */
router.get("/public-dues/:identifier", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = req.params;
    const user = await resolveMember(identifier);
    if (!user) {
      throw new AppError("Member not found or inactive", 404);
    }
    const dues = await getUserDues(String(user._id), "open");

    // Minimum disclosure needed to choose a due and see the next instalment:
    // no schedule internals, principal, penalty rule, phone or email.
    const summary = dues.map((due) => {
      const items = (due.schedule || []) as Array<{
        dueDate?: Date;
        totalDue?: number;
        paid?: number;
        status?: string;
      }>;
      const outstanding = items.reduce(
        (sum, item) => (item.status === "paid" ? sum : sum + Math.max(0, (item.totalDue || 0) - (item.paid || 0))),
        0
      );
      const nextItem = items.find((item) => item.status !== "paid" && item.status !== "cancelled");
      const nextAmount = nextItem ? Math.max(0, (nextItem.totalDue || 0) - (nextItem.paid || 0)) : 0;
      return {
        _id: due._id,
        months: due.months,
        status: due.status || "active",
        outstanding: math.round(outstanding),
        nextDueDate: nextItem?.dueDate ?? null,
        nextAmount: math.round(nextAmount),
      };
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username || user.name.toLowerCase().replace(/[^a-z0-9_]/g, ""),
        memberCode: user.memberCode || "",
      },
      dues: summary,
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
    if (!amount || amount <= 0 || !isFinite(amount) || amount > MAX_PAYMENT_AMOUNT) {
      throw new AppError("Invalid payment amount", 400);
    }
    if (mode !== "simple" && mode !== "pay_due") {
      throw new AppError("Invalid payment mode", 400);
    }

    const targetUser = await resolveMember(String(userId));
    if (!targetUser) {
      throw new AppError("Member not found or inactive", 404);
    }
    if (dueId && !(await dueBelongsTo(dueId, targetUser._id))) {
      throw new AppError("Due not found for this member", 404);
    }

    const { baseUrl, apiKey, webBase, apiBase } = requireGatewayConfig();

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

    if (!amount || amount <= 0 || !isFinite(amount) || amount > MAX_PAYMENT_AMOUNT) {
      throw new AppError("Invalid payment amount", 400);
    }
    if (mode !== "simple" && mode !== "pay_due") {
      throw new AppError("Invalid payment mode", 400);
    }

    const isStaff = user.role === "admin" || user.role === "accountant";
    if (explicitUserId && !isStaff && String(explicitUserId) !== user.sub) {
      throw new AppError("You can only start a payment for your own account", 403);
    }

    const targetUserId = isStaff ? explicitUserId || user.sub : user.sub;
    const targetUser = await resolveMember(String(targetUserId));
    if (dueId && targetUser && !(await dueBelongsTo(dueId, targetUser._id))) {
      throw new AppError("Due not found for this member", 404);
    }
    const customerName = targetUser?.name || user.name || "Community Member";
    const customerEmail = targetUser?.email || `${targetUserId}@mca.app`;

    const { baseUrl, apiKey, webBase, apiBase } = requireGatewayConfig();

    const payload = {
      full_name: customerName,
      email: customerEmail,
      amount,
      metadata: {
        userId: targetUser ? String(targetUser._id) : user.sub,
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
    const body = (req.body && typeof req.body === "object" ? req.body : {}) as Record<string, unknown>;

    // 1. Shared-secret check (constant time)
    const gateway = getGatewayConfig();
    if (!gateway) {
      return res.status(503).json({ status: false, message: "Online payments are not enabled" });
    }
    const { apiKey } = gateway;
    const incoming = req.headers["rt-uddoktapay-api-key"] || req.headers["x-api-key"];
    if (typeof incoming !== "string" || incoming.length === 0) {
      return res.status(401).json({ status: false, message: "Unauthorized API key" });
    }
    const provided = Buffer.from(incoming);
    const expected = Buffer.from(apiKey);
    if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
      return res.status(401).json({ status: false, message: "Unauthorized API key" });
    }

    // 2. The notification must reference an invoice we created.
    const invoiceId = typeof body.invoice_id === "string" ? body.invoice_id.trim() : "";
    if (!invoiceId) {
      return res.status(400).json({ status: false, message: "invoice_id is required" });
    }

    const normalizedStatus = String(body.status ?? "").toUpperCase();
    if (normalizedStatus !== "COMPLETED" && normalizedStatus !== "SUCCESS") {
      return res.status(200).json({ status: true, message: `Ignored status: ${String(body.status ?? "")}` });
    }

    const session = await PaymentSession.findOne({ invoiceId });
    if (!session) {
      return res.status(200).json({ status: true, message: "No matching payment session found" });
    }
    if (session.status === "completed") {
      return res.status(200).json({ status: true, message: "Payment already processed" });
    }

    // 3. Never settle on the notification body alone: re-read the payment from
    // the gateway and require COMPLETED plus a matching amount.
    const verified = await fetchGatewayPayment(invoiceId).catch(() => null);
    if (!gatewaySaysCompleted(verified)) {
      return res.status(409).json({ status: false, message: "Payment could not be verified with the gateway" });
    }
    if (verified && verified.amount !== undefined && verified.amount !== null) {
      const verifiedAmount = Number(verified.amount);
      if (!Number.isFinite(verifiedAmount) || Math.abs(verifiedAmount - session.amount) >= 0.01) {
        return res.status(422).json({ status: false, message: "Verified amount does not match the session" });
      }
    }

    const transactionId = String(verified?.transaction_id ?? body.transaction_id ?? "") || undefined;

    // 4. Atomic claim: exactly one request can move the session to completed.
    const claimed = await PaymentSession.findOneAndUpdate(
      { _id: session._id, status: { $ne: "completed" } },
      { $set: { status: "completed" } },
      { new: false }
    );
    if (!claimed) {
      return res.status(200).json({ status: true, message: "Payment already processed" });
    }

    try {
      const depositResult = await handleDeposit({
        userId: String(session.userId),
        mode: session.mode,
        dueId: session.dueId ? String(session.dueId) : undefined,
        amount: session.amount,
        date: new Date().toISOString(),
        note: `Online payment via ${verified?.payment_method || "MFS"} (TrxID: ${transactionId || "N/A"})`,
        includePenalty: true,
      });

      // Finalisation is best-effort: the ledger write already committed, so a
      // failure here must not roll the session back (that would allow a replay
      // to credit the same payment twice).
      await PaymentSession.updateOne(
        { _id: session._id },
        {
          $set: {
            paymentMethod: verified?.payment_method,
            senderNumber: verified?.sender_number,
            transactionId,
            depositTxId: depositResult.tx._id,
            duesAffected: depositResult.duesAffected,
          },
        }
      ).catch((err) => console.error("[payments] failed to finalise session", session.invoiceId, err));

      return res.status(200).json({ status: true, message: "Payment processed and ledger updated" });
    } catch (depositErr) {
      // handleDeposit is transactional: nothing was written, so the session may
      // safely return to pending for a later retry.
      await PaymentSession.updateOne(
        { _id: session._id, depositTxId: { $exists: false } },
        { $set: { status: "pending" } }
      ).catch(() => undefined);
      throw depositErr;
    }
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

    try {
      const data = await fetchGatewayPayment(invoiceId);

      if (gatewaySaysCompleted(data) && data) {
        const lockedSession = await PaymentSession.findOneAndUpdate(
          { _id: session._id, status: { $ne: "completed" } },
          { $set: { status: "completed" } },
          { new: false }
        );

        if (lockedSession && lockedSession.status !== "completed") {
          try {
            const depositResult = await handleDeposit({
              userId: String(session.userId),
              mode: session.mode,
              dueId: session.dueId ? String(session.dueId) : undefined,
              amount: session.amount,
              date: new Date().toISOString(),
              note: `Online payment via ${data.payment_method || "MFS"} (TrxID: ${data.transaction_id || "N/A"})`,
              includePenalty: true,
            });

            await PaymentSession.updateOne(
              { _id: session._id },
              {
                $set: {
                  paymentMethod: data.payment_method,
                  senderNumber: data.sender_number,
                  transactionId: data.transaction_id,
                  depositTxId: depositResult.tx._id,
                  duesAffected: depositResult.duesAffected,
                },
              }
            );
          } catch (depositErr) {
            await PaymentSession.updateOne({ _id: session._id }, { $set: { status: "pending" } });
            throw depositErr;
          }
        }

        const freshSession = await PaymentSession.findById(session._id);
        return res.json({ status: true, completed: true, session: freshSession });
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
