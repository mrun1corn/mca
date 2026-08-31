import { Router } from "express";
import { requireAuth } from "../lib/auth";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import Investment from "../models/Investment";

const router = Router();

router.get("/", requireAuth as any, async (req: any, res, next) => {
  try {
    const recentCount = Number(req.query.recent || 3);
    const lastMonthMode = String(req.query.lastMonthMode || "deposit");

    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const investmentAgg = await Investment.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: null,
          principal: { $sum: "$amount" },
          expectedInterest: { $sum: "$expectedInterest" },
          count: { $sum: 1 },
        },
      },
    ]);
    const investmentSummary = investmentAgg[0] || { principal: 0, expectedInterest: 0, count: 0 };

    // If regular user, scope metrics to self only
    if (req.user?.role === "user") {
      const meId = req.user.sub;
      const me = await User.findById(meId);
      if (!me) return res.status(404).json({ error: "Not found" });

      const txs = await Transaction.find({ userId: me._id, deletedAt: { $exists: false } })
        .sort({ occurredAt: -1 })
        .limit(50);

      const totalsAgg = await Transaction.aggregate([
        { $match: { userId: me._id, deletedAt: { $exists: false } } },
        {
          $group: {
            _id: null,
            deposits: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] } },
            withdraws: { $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, { $abs: "$amount" }, 0] } },
            balance: { $sum: "$amount" },
          },
        },
      ]);
      const totals = totalsAgg[0] || { deposits: 0, withdraws: 0, balance: 0 };

      const lastMonthAgg = await Transaction.aggregate([
        {
          $match: {
            userId: me._id,
            deletedAt: { $exists: false },
            occurredAt: { $gte: lastMonthStart, $lt: thisMonthStart },
            ...(lastMonthMode === "deposit" ? { type: "deposit" } : {}),
          },
        },
        { $group: { _id: null, lastMonth: { $sum: "$amount" } } },
      ]);
      const lastMonth = lastMonthAgg[0]?.lastMonth || 0;

      const arrearsCount = await Due.countDocuments({
        userId: me._id,
        "schedule.status": { $in: ["pending", "partial"] },
      });

      return res.json({
        membersCount: 1,
        groupBalance: totals.balance,
        totalDeposits: totals.deposits,
        totalWithdraws: totals.withdraws,
        remainingBalance: totals.balance,
        arrearsCount,
        investments: {
          activeCount: investmentSummary.count,
          principal: investmentSummary.principal,
          expectedInterest: investmentSummary.expectedInterest,
        },
        cards: [
          {
            userId: me._id,
            name: me.name,
            lastMonth,
            balance: totals.balance,
            totalDeposits: totals.deposits,
            totalWithdraws: totals.withdraws,
            recent: txs.slice(0, recentCount).map((t) => ({
              date: t.occurredAt,
              type: t.type,
              amount: t.amount,
              note: t.note,
            })),
          },
        ],
      });
    }

    // Admin/Accountant: full overview with optimized batch aggregations
    const activeUsers = await User.find({ status: "active" }).sort({ name: 1 });
    const userIds = activeUsers.map((u) => u._id);

    const [totalsAgg, lastMonthAgg, arrearsCount] = await Promise.all([
      Transaction.aggregate([
        { $match: { userId: { $in: userIds }, deletedAt: { $exists: false } } },
        {
          $group: {
            _id: "$userId",
            balance: { $sum: "$amount" },
            deposits: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] } },
            withdraws: { $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, { $abs: "$amount" }, 0] } },
          },
        },
      ]),
      Transaction.aggregate([
        {
          $match: {
            userId: { $in: userIds },
            deletedAt: { $exists: false },
            occurredAt: { $gte: lastMonthStart, $lt: thisMonthStart },
            ...(lastMonthMode === "deposit" ? { type: "deposit" } : {}),
          },
        },
        { $group: { _id: "$userId", lastMonth: { $sum: "$amount" } } },
      ]),
      Due.countDocuments({ "schedule.status": { $in: ["pending", "partial"] } }),
    ]);

    const totalsMap = new Map(totalsAgg.map((t) => [String(t._id), t]));
    const lastMonthMap = new Map(lastMonthAgg.map((m) => [String(m._id), m.lastMonth || 0]));

    let groupTotalDeposits = 0;
    let groupTotalWithdraws = 0;
    let groupBalance = 0;

    const cards = activeUsers.map((u) => {
      const t = totalsMap.get(String(u._id)) || { balance: 0, deposits: 0, withdraws: 0 };
      const lm = lastMonthMap.get(String(u._id)) || 0;

      groupTotalDeposits += t.deposits;
      groupTotalWithdraws += t.withdraws;
      groupBalance += t.balance;

      return {
        userId: u._id,
        name: u.name,
        lastMonth: lm,
        balance: t.balance,
        totalDeposits: t.deposits,
        totalWithdraws: t.withdraws,
        recent: [],
      };
    });

    res.json({
      membersCount: activeUsers.length,
      groupBalance,
      totalDeposits: groupTotalDeposits,
      totalWithdraws: groupTotalWithdraws,
      remainingBalance: groupBalance,
      arrearsCount,
      investments: {
        activeCount: investmentSummary.count,
        principal: investmentSummary.principal,
        expectedInterest: investmentSummary.expectedInterest,
      },
      cards,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
