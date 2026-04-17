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
      const txs = await Transaction.find({ userId: me._id, deletedAt: { $exists: false } }).sort({ occurredAt: -1 });
      const balance = txs.reduce((acc, t) => acc + t.amount, 0);
      let userDeposits = 0;
      let userWithdraws = 0;
      for (const tx of txs) {
        if (tx.type === "deposit") userDeposits += tx.amount;
        if (tx.type === "withdraw") userWithdraws += Math.abs(tx.amount);
      }
      let lastMonth = 0;
      if (lastMonthMode === "deposit") {
        lastMonth = txs
          .filter((t) => t.type === "deposit" && t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amount, 0);
      } else {
        lastMonth = txs
          .filter((t) => t.occurredAt >= lastMonthStart && t.occurredAt < thisMonthStart)
          .reduce((acc, t) => acc + t.amount, 0);
      }
      const totalsAgg = await Transaction.aggregate([
        { $match: { userId: me._id, deletedAt: { $exists: false } } },
        { $group: {
          _id: null,
          deposits: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] } },
          withdraws: { $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, "$amount", 0] } },
          balance: { $sum: "$amount" },
        } },
      ]);
      const totals = totalsAgg[0] || { deposits: 0, withdraws: 0, balance: 0 };
      const arrearsCount = await Due.countDocuments({ userId: me._id, "schedule.status": { $in: ["pending", "partial"] } });
      return res.json({
        membersCount: 1,
        groupBalance: balance,
        totalDeposits: totals.deposits,
        totalWithdraws: Math.abs(totals.withdraws || 0),
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
            balance,
            totalDeposits: userDeposits,
            totalWithdraws: userWithdraws,
            recent: txs.slice(0, recentCount).map((t) => ({ date: t.occurredAt, type: t.type, amount: t.amount, note: t.note })),
          },
        ],
      });
    }

    // Admin/Accountant: full overview
    const arrearsCount = await Due.countDocuments({ "schedule.status": { $in: ["pending", "partial"] } });
    const cards = await User.aggregate([
      { $match: { status: "active" } },
      { $sort: { name: 1 } },
      {
        $lookup: {
          from: "transactions",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $not: ["$deletedAt"] }
                  ]
                }
              }
            },
            { $sort: { occurredAt: -1 } }
          ],
          as: "txs"
        }
      },
      {
        $addFields: {
          totalDeposits: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$txs",
                    as: "t",
                    cond: { $eq: ["$$t.type", "deposit"] }
                  }
                },
                as: "t",
                in: "$$t.amount"
              }
            }
          },
          totalWithdraws: {
            $abs: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: "$txs",
                      as: "t",
                      cond: { $eq: ["$$t.type", "withdraw"] }
                    }
                  },
                  as: "t",
                  in: "$$t.amount"
                }
              }
            }
          },
          balance: { $sum: "$txs.amount" },
          lastMonth: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$txs",
                    as: "t",
                    cond: {
                      $and: [
                        { $gte: ["$$t.occurredAt", lastMonthStart] },
                        { $lt: ["$$t.occurredAt", thisMonthStart] },
                        ...(lastMonthMode === "deposit" ? [{ $eq: ["$$t.type", "deposit"] }] : [])
                      ]
                    }
                  }
                },
                as: "t",
                in: "$$t.amount"
              }
            }
          },
          recent: {
            $slice: [
              {
                $map: {
                  input: "$txs",
                  as: "t",
                  in: {
                    date: "$$t.occurredAt",
                    type: "$$t.type",
                    amount: "$$t.amount",
                    note: "$$t.note"
                  }
                }
              },
              recentCount
            ]
          }
        }
      },
      {
        $project: {
          userId: "$_id",
          name: 1,
          lastMonth: 1,
          balance: 1,
          totalDeposits: 1,
          totalWithdraws: 1,
          recent: 1
        }
      }
    ]);

    const groupBalance = cards.reduce((acc, c) => acc + c.balance, 0);
    const totalDeposits = cards.reduce((acc, c) => acc + c.totalDeposits, 0);
    const totalWithdraws = cards.reduce((acc, c) => acc + c.totalWithdraws, 0);

    res.json({
      membersCount: cards.length,
      groupBalance,
      totalDeposits,
      totalWithdraws,
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
