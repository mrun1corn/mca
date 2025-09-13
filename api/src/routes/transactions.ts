import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../lib/auth";
import { parseBody } from "../lib/validation";
import Transaction from "../models/Transaction";
import { handleDeposit } from "../services/deposit";
import { handleWithdraw } from "../services/withdraw";

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
    res.json(items);
  } catch (e) {
    next(e);
  }
});

const DepositSchema = z.object({
  userId: z.string(),
  mode: z.enum(["simple", "pay_due"]),
  dueId: z.string().optional().nullable(),
  amountPoisha: z.number().int(),
  date: z.string(),
  note: z.string().optional(),
  includePenalty: z.boolean().optional(),
  penaltyPctPerMonth: z.number().optional(),
  graceDays: z.number().optional(),
});

router.post("/deposit", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(DepositSchema, req.body);
    const result = await handleDeposit({ ...body, actorUserId: req.user.sub });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

const WithdrawSchema = z.object({
  takerId: z.string(),
  reason: z.string().optional(),
  date: z.string(),
  amountPoisha: z.number().int().positive(),
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
    const result = await handleWithdraw({ ...body, actorUserId: req.user.sub });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

export default router;
