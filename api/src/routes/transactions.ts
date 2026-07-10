import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { requireAuth, requireRole } from "../lib/auth";
import { parseBody } from "../lib/validation";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import { handleDeposit } from "../services/deposit";
import { handleWithdraw } from "../services/withdraw";
import { AppError } from "../lib/errors";
import { runInTransaction } from "../lib/db";

const router = Router();

// Shared refinement: reject amounts with more than 2 decimal places
// Use epsilon tolerance to avoid IEEE 754 false rejections (e.g. 1000.10 * 100 = 100009.999...)
const amount2dp = z.number().positive().refine(
  (v) => Math.abs(Math.round(v * 100) - v * 100) < 0.01,
  { message: "Amount must have at most 2 decimal places" }
);

// GET /api/transactions — cursor-based pagination
router.get("/transactions", requireAuth as any, async (req: any, res, next) => {
  try {
    const { userId, type, from, to, limit: limitStr = "100", cursor } = req.query;
    const limit = Math.min(Number(limitStr) || 100, 500);
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
    // Cursor-based pagination: fetch items older than the cursor
    if (cursor) {
      q._id = { ...(q._id || {}), $lt: new mongoose.Types.ObjectId(String(cursor)) };
    }
    const items = await Transaction.find(q).sort({ occurredAt: -1, _id: -1 }).limit(limit + 1);
    const hasMore = items.length > limit;
    const page = hasMore ? items.slice(0, limit) : items;
    // Map to a stable API shape
    const rows = page.map((t) => ({
      _id: t._id,
      userId: t.userId,
      type: t.type,
      amount: t.amount,
      occurredAt: t.occurredAt,
      note: t.note,
    }));
    res.json({
      rows,
      nextCursor: hasMore ? String(page[page.length - 1]._id) : null,
    });
  } catch (e) {
    next(e);
  }
});

const DepositSchema = z.object({
  userId: z.string(),
  mode: z.enum(["simple", "pay_due"]),
  dueId: z.string().optional().nullable(),
  amount: amount2dp,
  date: z.string(),
  note: z.string().optional(),
  includePenalty: z.boolean().optional(),
  penaltyPctPerMonth: z.number().optional(),
  graceDays: z.number().optional(),
});

router.post("/deposit", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(DepositSchema, req.body);
    const amount = body.amount;
    if (!amount || !Number.isFinite(amount) || amount <= 0) throw new AppError("Invalid amount", 400);
    const result = await handleDeposit({ ...body, amount, actorUserId: req.user.sub });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

const WithdrawSchema = z.object({
  takerId: z.string(),
  reason: z.string().optional(),
  date: z.string(),
  amount: amount2dp,
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
    const amount = typeof body.amount === 'number' ? body.amount : 0;
    if (!amount || !Number.isFinite(amount) || amount <= 0) throw new AppError("Invalid amount", 400);
    const result = await handleWithdraw({ ...body, amount, actorUserId: req.user.sub });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

const UpdateTransactionSchema = z.object({
  amount: amount2dp.optional(),
  date: z.string().optional(),
  note: z.string().optional(),
});

// Update a transaction (admin/accountant). Rules:
// - Allow updating note and date for any transaction
// - Allow updating amount only for deposits
// - Disallow modifying or deleting withdraws to avoid breaking dues/splits
router.patch("/transactions/:id", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    
    const body = parseBody(UpdateTransactionSchema, req.body);
    const { amount, date, note } = body;
    
    if (tx.type === "withdraw" && amount !== undefined) {
      return res.status(400).json({ error: "Cannot edit withdrawal amount. Use the revert endpoint instead." });
    }
    const update: any = {};
    if (note !== undefined) update.note = note;
    if (date !== undefined) update.occurredAt = new Date(String(date));
    if (amount !== undefined && tx.type === "deposit") {
      update.amount = amount;
    }
    await Transaction.findByIdAndUpdate(tx._id, update);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// Soft-delete a transaction (admin/accountant). Disallow withdraw deletions (use revert instead).
router.delete("/transactions/:id", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Not found" });
    if (tx.type === "withdraw") {
      return res.status(400).json({ error: "Cannot delete withdrawal transaction. Use POST /api/transactions/:id/revert instead." });
    }
    await Transaction.findByIdAndUpdate(tx._id, { deletedAt: new Date() });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

// POST /api/transactions/:id/revert — safely reverse a withdrawal and its related records
router.post("/transactions/:id/revert", requireAuth as any, requireRole(["admin"]) as any, async (req: any, res, next) => {
  try {
    const revertResult = await runInTransaction(async (session) => {
      const tx = await Transaction.findById(req.params.id).session(session);
      if (!tx) throw new AppError("Transaction not found", 404);
      if (tx.type !== "withdraw") throw new AppError("Only withdrawal transactions can be reverted", 400);
      if (tx.deletedAt) throw new AppError("Transaction already reverted/deleted", 400);

      // Find the taker's name from the note (format: "Share for cash out of <name>")
      const noteMatch = tx.note?.match(/^Share for cash out of (.+)$/);
      const takerName = noteMatch?.[1];
      if (!takerName) {
        throw new AppError("Cannot identify related transactions. This may not be a split transaction.", 400);
      }

      // Find all related split transactions:
      // Same occurredAt, same note pattern, type "withdraw", not already deleted
      const relatedTxs = await Transaction.find({
        occurredAt: tx.occurredAt,
        note: tx.note,
        type: "withdraw",
        deletedAt: { $exists: false },
      }).session(session);

      const now = new Date();
      const txIds = relatedTxs.map((t) => t._id);

      // Soft-delete all related split transactions
      await Transaction.updateMany(
        { _id: { $in: txIds } },
        { $set: { deletedAt: now } },
        { session }
      );

      // Find and cancel the associated Due document
      // The Due's userId should be the taker. We match by the reason field and principal amount.
      // Sum up the absolute amounts of the split transactions to get the original principal.
      const principal = relatedTxs.reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const cancelledDues: string[] = [];

      // Find dues for the taker that match this withdrawal
      const possibleDues = await Due.find({
        principal: { $gte: principal - 0.02, $lte: principal + 0.02 }, // floating point tolerance
        status: "active",
      }).session(session);

      for (const due of possibleDues) {
        // Cancel all schedule items
        for (const item of due.schedule) {
          if (item.status !== "paid") {
            (item as any).status = "cancelled";
          }
        }
        (due as any).status = "cancelled";
        await due.save({ session });
        cancelledDues.push(String(due._id));
      }

      return {
        revertedTransactions: txIds.length,
        cancelledDues,
      };
    });

    res.json({ ok: true, ...revertResult });
  } catch (e) {
    next(e);
  }
});

export default router;

