import { Router } from "express";
import { requireAuth } from "../lib/auth";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";

const router = Router();

router.get("/", requireAuth as any, async (req: any, res, next) => {
  try {
    const recentCount = Number(req.query.recent || 3);
    const lastMonthMode = String(req.query.lastMonthMode || "deposit");

    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // If regular user, scope metrics to self only
    if (req.user?.role === "user") {
      const meId = req.user.sub;
      const me = await User.findById(meId);
      if (!me) return res.status(404).json({ error: "Not found" });
      const txs = await Transaction.find({ userId: me._id, deletedAt: { $exists: false } }).sort({ occurredAt: -1 });
      const balance = txs.reduce((acc, t) => acc + t.amountPoisha, 0);
      let lastMonth = 0;
      if (lastMonthMode === "deposit") {
        lastMonth = txs
          .filter((t) => t.type === "deposit" && t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amountPoisha, 0);
      } else {
        lastMonth = txs
          .filter((t) => t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amountPoisha, 0);
      }
      const totalsAgg = await Transaction.aggregate([
        { $match: { userId: me._id, deletedAt: { $exists: false } } },
        { $group: {
          _id: null,
          deposits: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amountPoisha", 0] } },
          withdraws: { $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, "$amountPoisha", 0] } },
          balance: { $sum: "$amountPoisha" },
        } },
      ]);
      const totals = totalsAgg[0] || { deposits: 0, withdraws: 0, balance: 0 };
      const arrearsCount = await Due.countDocuments({ userId: me._id, "schedule.status": { $in: ["pending", "partial"] } });
      return res.json({
        membersCount: 1,
        groupBalance: balance,
        totalDeposits: totals.deposits,
        totalWithdraws: totals.withdraws,
        remainingBalance: totals.balance,
        arrearsCount,
        cards: [
          {
            userId: me._id,
            name: me.name,
            lastMonth,
            balance,
            recent: txs.slice(0, recentCount).map((t) => ({ date: t.occurredAt, type: t.type, amount: t.amountPoisha, note: t.note })),
          },
        ],
      });
    }

    // Admin/Accountant: full overview
    const users = await User.find({ status: "active" }).sort({ name: 1 });
    let groupBalance = 0;
    const totalsAgg = await Transaction.aggregate([
      { $match: { deletedAt: { $exists: false } } },
      { $group: {
        _id: null,
        deposits: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amountPoisha", 0] } },
        withdraws: { $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, "$amountPoisha", 0] } },
        balance: { $sum: "$amountPoisha" },
      } },
    ]);
    const totals = totalsAgg[0] || { deposits: 0, withdraws: 0, balance: 0 };
    const cards = [] as any[];
    const arrearsCount = await Due.countDocuments({ "schedule.status": { $in: ["pending", "partial"] } });
    for (const u of users) {
      const txs = await Transaction.find({ userId: u._id, deletedAt: { $exists: false } }).sort({ occurredAt: -1 });
      const balance = txs.reduce((acc, t) => acc + t.amountPoisha, 0);
      groupBalance += balance;
      let lastMonth = 0;
      if (lastMonthMode === "deposit") {
        lastMonth = txs
          .filter((t) => t.type === "deposit" && t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amountPoisha, 0);
      } else {
        lastMonth = txs
          .filter((t) => t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amountPoisha, 0);
      }
      cards.push({
        userId: u._id,
        name: u.name,
        lastMonth,
        balance,
        recent: txs.slice(0, recentCount).map((t) => ({ date: t.occurredAt, type: t.type, amount: t.amountPoisha, note: t.note })),
      });
    }

    res.json({
      membersCount: users.length,
      groupBalance,
      totalDeposits: totals.deposits,
      totalWithdraws: totals.withdraws,
      remainingBalance: totals.balance,
      arrearsCount,
      cards,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
