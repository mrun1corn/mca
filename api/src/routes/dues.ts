import { Router } from "express";
import { requireAuth } from "../lib/auth";
import { getUserDues } from "../services/dues";

const router = Router();

router.get("/users/:id/dues", requireAuth as any, async (req: any, res, next) => {
  try {
    const status = (req.query.status as string) || "open";
    // users can only view their own
    if (req.user.role === "user" && req.user.sub !== req.params.id) return res.status(403).json({ error: "Forbidden" });
    const dues = await getUserDues(req.params.id, status === "all" ? "all" : "open");
    // Map to API shape without 'Poisha' fields
    const rows = dues.map((d: any) => ({
      _id: d._id,
      userId: d.userId,
      months: d.months,
      monthlyRatePct: d.monthlyRatePct,
      penaltyRule: d.penaltyRule,
      principal: d.principalPoisha,
      schedule: d.schedule.map((it: any) => ({
        dueDate: it.dueDate,
        status: it.status,
        principalPart: it.principalPartPoisha,
        interest: it.interestPoisha,
        totalDue: it.totalDuePoisha,
        paid: it.paidPoisha || 0,
      })),
      createdAt: d.createdAt,
    }));
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

export default router;
