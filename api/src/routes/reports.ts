import { Router } from "express";
import { requireAuth } from "../lib/auth";
import Transaction from "../models/Transaction";
import User from "../models/User";

const router = Router();

router.get("/yearly-collection", requireAuth as any, async (req: any, res, next) => {
  try {
    const role = req.user?.role;
    if (role !== "admin" && role !== "accountant") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const currentYear = new Date().getFullYear();
    const queryYear = Number(req.query.year);
    const year = Number.isFinite(queryYear) ? queryYear : currentYear;
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year + 1, 0, 1);

    const users = await User.find({ status: "active" }).sort({ name: 1 });
    if (!users.length) {
      return res.json({ year, total: 0, monthlyTotals: Array(12).fill(0), users: [] });
    }

    const userIds = users.map((u) => u._id);
    const monthlyTotals = Array(12).fill(0);
    const userMonthlyMap = new Map<string, number[]>();
    for (const u of users) {
      userMonthlyMap.set(u._id.toString(), Array(12).fill(0));
    }

    const rows = await Transaction.aggregate([
      {
        $match: {
          userId: { $in: userIds },
          type: "deposit",
          deletedAt: { $exists: false },
          occurredAt: { $gte: yearStart, $lt: yearEnd },
        },
      },
      {
        $group: {
          _id: { userId: "$userId", month: { $month: "$occurredAt" } },
          amount: { $sum: "$amountPoisha" },
        },
      },
    ]);

    for (const row of rows) {
      const userId = row._id.userId?.toString();
      const monthIdx = Math.min(11, Math.max(0, (row._id.month || 1) - 1));
      const amount = row.amount || 0;
      const userMonths = userMonthlyMap.get(userId || "");
      if (!userMonths) continue;
      userMonths[monthIdx] += amount;
      monthlyTotals[monthIdx] += amount;
    }

    const usersPayload = users.map((u) => {
      const months = userMonthlyMap.get(u._id.toString()) || Array(12).fill(0);
      const total = months.reduce((sum, value) => sum + value, 0);
      return {
        userId: u._id.toString(),
        name: u.name,
        monthly: months,
        total,
      };
    });

    const total = monthlyTotals.reduce((sum, value) => sum + value, 0);

    res.json({
      year,
      total,
      monthlyTotals,
      users: usersPayload,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
