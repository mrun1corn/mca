import { Router } from "express";
import { requireAuth, requireRole } from "../lib/auth";
import User from "../models/User";
import * as math from "../lib/math";
import { filterEligibleMembers, calculateScheduleDates, generateRepaymentSchedule } from "../services/withdraw";

const router = Router();

// GET /api/preview/withdraw-split?amount=&takerId=&excludeIds=
router.get("/preview/withdraw-split", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const amount = Number(req.query.amount) || 0;
    const takerId = String(req.query.takerId || "").trim();
    const excludeIds = String(req.query.excludeIds || "").split(",").map((s) => s.trim()).filter(Boolean);

    const allActive = await User.find({ status: "active" }).select("_id name status");
    const eligible = filterEligibleMembers(allActive, takerId, excludeIds);
    const eligibleCount = eligible.length;

    if (!eligibleCount || amount <= 0) {
      return res.json({ eligibleCount: 0, rows: [] });
    }

    const splitAmounts = math.distribute(amount, eligibleCount);
    const rows = eligible.map((u, i) => ({
      userId: u._id,
      name: u.name,
      share: splitAmounts[i],
    }));

    res.json({ eligibleCount, rows });
  } catch (e) {
    next(e);
  }
});

// GET /api/preview/dues?amount=&months=&monthlyRatePct=&defaultDate=&startDate=&endDate=
router.get("/preview/dues", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const amount = Number(req.query.amount) || 0;
    const months = Math.max(1, Number(req.query.months || 1));
    const monthlyRatePct = Number(req.query.monthlyRatePct || 0);
    const useDefaultDate = String(req.query.useDefaultDate) === "true" || !!req.query.defaultDate;
    const defaultDate = req.query.defaultDate ? String(req.query.defaultDate) : null;
    const startDate = req.query.startDate ? String(req.query.startDate) : null;
    const endDate = req.query.endDate ? String(req.query.endDate) : null;

    const dates = calculateScheduleDates(months, new Date(), {
      useDefaultDate,
      defaultDate,
      startDate,
      endDate,
    });

    const schedule = generateRepaymentSchedule(months, amount, monthlyRatePct, dates);
    res.json({ schedule });
  } catch (e) {
    next(e);
  }
});

export default router;
