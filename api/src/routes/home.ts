import { Router } from "express";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const recentCount = Number(req.query.recent || 3);
    const lastMonthMode = String(req.query.lastMonthMode || "deposit");

    const users = await User.find({ status: "active" }).sort({ name: 1 });

    // Group metrics
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
    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const arrearsCount = await Due.countDocuments({ "schedule.status": { $in: ["pending", "partial"] } });

    for (const u of users) {
      const txs = await Transaction.find({ userId: u._id, deletedAt: { $exists: false } }).sort({ occurredAt: -1 });
      const balance = txs.reduce((acc, t) => acc + t.amountPoisha, 0);
      groupBalance += balance;

      let lastMonthPoisha = 0;
      if (lastMonthMode === "deposit") {
        lastMonthPoisha = txs
          .filter((t) => t.type === "deposit" && t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amountPoisha, 0);
      } else {
        lastMonthPoisha = txs
          .filter((t) => t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amountPoisha, 0);
      }

      cards.push({
        userId: u._id,
        name: u.name,
        lastMonthPoisha,
        balancePoisha: balance,
        recent: txs.slice(0, recentCount).map((t) => ({
          date: t.occurredAt,
          type: t.type,
          amountPoisha: t.amountPoisha,
          note: t.note,
        })),
      });
    }

    res.json({
      membersCount: users.length,
      groupBalancePoisha: groupBalance,
      totalDepositsPoisha: totals.deposits,
      totalWithdrawsPoisha: totals.withdraws,
      remainingBalancePoisha: totals.balance,
      arrearsCount,
      cards,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
