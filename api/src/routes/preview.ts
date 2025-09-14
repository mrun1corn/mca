import { Router } from "express";
import { requireAuth, requireRole } from "../lib/auth";
import User from "../models/User";

const router = Router();

// GET /api/preview/withdraw-split?amountPoisha=&excludeIds=
router.get("/preview/withdraw-split", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const amountParam = req.query.amountPoisha ?? req.query.amount;
    const amountPoisha = amountParam ? (req.query.amount ? Math.round(Number(amountParam) * 100) : Number(amountParam)) : 0;
    const excludeIds = String(req.query.excludeIds || "").split(",").filter(Boolean);
    const allActive = await User.find({ status: "active" });
    const eligible = allActive.filter((u) => !excludeIds.includes(String(u._id)));
    const base = Math.floor(amountPoisha / eligible.length || 1);
    const remainder = amountPoisha - base * (eligible.length || 1);
    const rows = eligible.map((u, i) => ({ userId: u._id, name: u.name, share: base + (i === eligible.length - 1 ? remainder : 0) }));
    res.json({ eligibleCount: eligible.length, rows });
  } catch (e) {
    next(e);
  }
});

// GET /api/preview/dues?amountPoisha=&months=&monthlyRatePct=&defaultDate=&startDate=&endDate=
router.get("/preview/dues", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const amountParam = req.query.amountPoisha ?? req.query.amount;
    const amountPoisha = amountParam ? (req.query.amount ? Math.round(Number(amountParam) * 100) : Number(amountParam)) : 0;
    const months = Number(req.query.months || 1);
    const monthlyRatePct = Number(req.query.monthlyRatePct || 0);
    const useDefaultDate = !!req.query.defaultDate;
    const defaultDate = req.query.defaultDate ? new Date(String(req.query.defaultDate)) : null;
    const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : null;
    const addMonths = (d: Date, m: number) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };
    const perPrincipal = Math.floor(amountPoisha / months);
    let rem = amountPoisha - perPrincipal * months;
    let remaining = amountPoisha;
    const dates: Date[] = [];
    const first = useDefaultDate && defaultDate ? defaultDate : startDate || new Date();
    for (let i = 0; i < months; i++) dates.push(addMonths(first, i));
    const schedule = [] as any[];
    for (let i = 0; i < months; i++) {
      const p = perPrincipal + (i === months - 1 ? rem : 0);
      const interest = Math.floor((remaining * monthlyRatePct) / 100);
      schedule.push({ dueDate: dates[i], principalPartPoisha: p, interestPoisha: interest, totalDuePoisha: p + interest });
      remaining -= p;
    }
    res.json({ schedule });
  } catch (e) {
    next(e);
  }
});

export default router;
