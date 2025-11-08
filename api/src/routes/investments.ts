import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../lib/auth";
import { parseBody } from "../lib/validation";
import { handleInvestment } from "../services/investment";
import Investment from "../models/Investment";

const router = Router();

const CreateInvestmentSchema = z.object({
  name: z.string().min(2),
  amount: z.number().positive().optional(),
  amountPoisha: z.number().int().positive().optional(),
  startDate: z.string(),
  months: z.number().int().min(1),
  monthlyRatePct: z.number().min(0),
  excludeMemberIds: z.array(z.string()).optional(),
});

router.post("/", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req: any, res, next) => {
  try {
    const body = parseBody(CreateInvestmentSchema, req.body);
    const amountPoisha = typeof body.amountPoisha === "number" ? body.amountPoisha : Math.round(((body.amount as number) || 0) * 100);
    if (!amountPoisha || !Number.isFinite(amountPoisha) || amountPoisha <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const result = await handleInvestment({
      name: body.name,
      amountPoisha,
      startDate: body.startDate,
      months: body.months,
      monthlyRatePct: body.monthlyRatePct,
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
        amountPoisha: inv.amountPoisha,
        expectedInterestPoisha: inv.expectedInterestPoisha,
        months: inv.months,
        monthlyRatePct: inv.monthlyRatePct,
        startDate: inv.startDate,
        status: inv.status,
        createdAt: inv.createdAt,
      }))
    );
  } catch (e) {
    next(e);
  }
});

export default router;
