import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../lib/auth";
import { parseBody } from "../lib/validation";
import Transaction from "../models/Transaction";
import { handleDeposit } from "../services/deposit";
import { handleWithdraw } from "../services/withdraw";
import Due from "../models/Due";
import { AppError } from "../lib/errors";

const router = Router();

// GET /api/transactions
router.get("/transactions", requireAuth as any, async (req: any, res, next) => {
  try {
    const { userId, type, from, to, limit = "100" } = req.query;
    const q: any = { deletedAt: { $exists: false } };
    if (userId) q.userId = userId;
    if (type) q.type = type;
    if (from || to) q.occurredAt = {};
    if (from) q.occurredAt.$gte = new Date(String(from));
    if (to) q.occurredAt.$lte = new Date(String(to));
    // Users can only see their own unless admin/accountant
    if (!(["admin", "accountant"].includes(req.user.role))) {
      q.userId = req.user.sub;
    }
    const items = await Transaction.find(q).sort({ occurredAt: -1 }).limit(Number(limit));
    // Map to a stable API shape without 'Poisha'
    const rows = items.map((t) => ({
      _id: t._id,
      userId: t.userId,
      type: t.type,
      amount: t.amountPoisha,
      occurredAt: t.occurredAt,
      note: t.note,
    }));
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

const DepositSchema = z.object({
  userId: z.string(),
  mode: z.enum(["simple", "pay_due"]),
  dueId: z.string().optional().nullable(),
  // Accept either amountPoisha (integer) or amount (BDT)
  amountPoisha: z.number().int().optional(),
  amount: z.number().positive().optional(),
  date: z.string(),
  note: z.string().optional(),
  includePenalty: z.boolean().optional(),
  penaltyPctPerMonth: z.number().optional(),
  graceDays: z.number().optional(),
});

router.post("/deposit", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(DepositSchema, req.body);
    const amountPoisha = typeof body.amountPoisha === 'number'
      ? body.amountPoisha
      : Math.round(((body.amount as number) || 0) * 100);
    if (!amountPoisha || !Number.isFinite(amountPoisha)) throw new Error('Invalid amount');
    const { amount, ...rest } = body as any;
    const result = await handleDeposit({ ...rest, amountPoisha, actorUserId: req.user.sub });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

const WithdrawSchema = z.object({
  takerId: z.string(),
  reason: z.string().optional(),
  date: z.string(),
  // Accept either amountPoisha (integer) or amount (BDT)
  amountPoisha: z.number().int().positive().optional(),
  amount: z.number().positive().optional(),
  due: z.object({
    useDefaultDate: z.boolean(),
    defaultDate: z.string().nullable(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    months: z.number().int().min(1),
    monthlyRatePct: z.number().min(0),
  }),
  penalty: z.object({ enabled: z.boolean(), monthlyPenaltyPct: z.number(), graceDays: z.number() }),
  excludeMemberIds: z.array(z.string()).optional(),
});

router.post("/withdraw", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(WithdrawSchema, req.body);
    const amountPoisha = typeof body.amountPoisha === 'number'
      ? body.amountPoisha
      : Math.round(((body.amount as number) || 0) * 100);
    if (!amountPoisha || !Number.isFinite(amountPoisha)) throw new Error('Invalid amount');
    const { amount, ...rest } = body as any;
    const result = await handleWithdraw({ ...rest, amountPoisha, actorUserId: req.user.sub });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

export default router;

// Update a transaction (admin/accountant). Rules:
// - Allow updating note and date for any transaction
// - Allow updating amount only for deposits
// - Disallow modifying or deleting withdraws to avoid breaking dues/splits
router.patch("/transactions/:id", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const tx = await (await import("../models/Transaction")).default.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    const { amount, date, note } = req.body as { amount?: number; date?: string; note?: string };
    if (tx.type === "withdraw" && amount !== undefined) {
      return res.status(400).json({ error: "Cannot edit withdrawal amount" });
    }
    const update: any = {};
    if (note !== undefined) update.note = note;
    if (date !== undefined) update.occurredAt = new Date(String(date));
    if (amount !== undefined && tx.type === "deposit") {
      const poisha = Math.round(Number(amount) * 100);
      if (!Number.isFinite(poisha)) throw new AppError("Invalid amount", 400);
      update.amountPoisha = poisha;
    }
    await (await import("../models/Transaction")).default.findByIdAndUpdate(tx._id, update);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// Soft-delete a transaction (admin/accountant). Disallow withdraw deletions.
router.delete("/transactions/:id", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const Transaction = (await import("../models/Transaction")).default;
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    if (tx.type === "withdraw") {
      return res.status(400).json({ error: "Cannot delete withdrawal transaction" });
    }
    await Transaction.findByIdAndUpdate(tx._id, { deletedAt: new Date() });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
