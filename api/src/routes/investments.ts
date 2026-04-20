import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../lib/auth";
import { parseBody } from "../lib/validation";
import { handleInvestment, handleInvestmentReturn } from "../services/investment";
import Investment from "../models/Investment";

// Shared refinement: reject amounts with more than 2 decimal places
// Use epsilon tolerance to avoid IEEE 754 false rejections (e.g. 1000.10 * 100 = 100009.999...)
const amount2dp = z.number().positive().refine(
  (v) => Math.abs(Math.round(v * 100) - v * 100) < 0.01,
  { message: "Amount must have at most 2 decimal places" }
);

const router = Router();

const CreateInvestmentSchema = z.object({
  name: z.string().min(2),
  amount: amount2dp,
  startDate: z.string(),
  months: z.number().int().min(1).optional(),
  monthlyRatePct: z.number().min(0).optional(),
  openEnded: z.boolean().optional(),
  excludeMemberIds: z.array(z.string()).optional(),
});

router.post("/", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(CreateInvestmentSchema, req.body);
    const amount = typeof body.amount === 'number' ? body.amount : 0;
    if (!amount || !Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const openEnded = body.openEnded ?? false;
    if (!openEnded && !body.months) {
      return res.status(400).json({ error: "Months required unless open-ended" });
    }
    const result = await handleInvestment({
      name: body.name,
      amount: amount,
      startDate: body.startDate,
      months: openEnded ? undefined : body.months,
      monthlyRatePct: openEnded ? 0 : body.monthlyRatePct,
      excludeMemberIds: body.excludeMemberIds,
      actorUserId: req.user.sub,
    });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (_req, res, next) => {
  try {
    const investments = await Investment.find({}).sort({ createdAt: -1 }).lean();
    res.json(
      investments.map((inv) => ({
        id: inv._id,
        name: inv.name,
        amount: inv.amount,
        expectedInterest: inv.expectedInterest,
        months: inv.months,
        monthlyRatePct: inv.monthlyRatePct,
        startDate: inv.startDate,
        status: inv.status,
        returnedAmount: inv.returnedAmount || 0,
        createdAt: inv.createdAt,
      }))
    );
  } catch (e) {
    next(e);
  }
});

const ReturnInvestmentSchema = z.object({
  amount: amount2dp,
  date: z.string(),
  note: z.string().optional(),
  markCompleted: z.boolean().optional(),
});

router.post("/:id/return", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(ReturnInvestmentSchema, req.body);
    const amount = typeof body.amount === 'number' ? body.amount : 0;
    if (!amount || !Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const result = await handleInvestmentReturn({
      investmentId: req.params.id,
      amount: amount,
      date: body.date,
      note: body.note,
      markCompleted: body.markCompleted,
      actorUserId: req.user.sub,
    });
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

export default router;
