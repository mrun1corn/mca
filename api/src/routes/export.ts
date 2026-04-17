import { Router } from "express";
import { requireAuth, requireRole } from "../lib/auth";
import Transaction from "../models/Transaction";
import User from "../models/User";

function csvEscape(val: any) {
  if (val == null) return "";
  const s = String(val);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function toCsv(rows: any[], headers: string[]) {
  const head = headers.join(",");
  const lines = rows.map((r) => headers.map((h) => csvEscape(r[h])).join(","));
  return [head, ...lines].join("\n");
}

const router = Router();

// GET /api/export/summary.csv?from=&to=
router.get("/summary.csv", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const from = req.query.from ? new Date(String(req.query.from)) : undefined;
    const to = req.query.to ? new Date(String(req.query.to)) : undefined;

    const match: any = { deletedAt: { $exists: false } };
    if (from || to) {
      match.occurredAt = {};
      if (from) match.occurredAt.$gte = from;
      if (to) match.occurredAt.$lte = to;
    }

    const aggregation = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$userId",
          deposits: {
            $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] },
          },
          withdraws: {
            $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, "$amount", 0] },
          },
          balance: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          deposits: 1,
          withdraws: 1,
          balance: 1,
        },
      },
      { $sort: { name: 1 } },
    ]);

    const rows = aggregation.map((row) => ({
      name: row.name,
      email: row.email || "",
      deposits: (row.deposits / 100).toFixed(2),
      withdraws: (row.withdraws / 100).toFixed(2),
      balance: (row.balance / 100).toFixed(2),
    }));

    const csv = toCsv(rows, ["name", "email", "deposits", "withdraws", "balance"]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=summary.csv");
    res.send(csv);
  } catch (e) {
    next(e);
  }
});

// GET /api/export/ledger.csv?userId=&from=&to=
router.get("/ledger.csv", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const userId = String(req.query.userId || "");
    const from = req.query.from ? new Date(String(req.query.from)) : undefined;
    const to = req.query.to ? new Date(String(req.query.to)) : undefined;
    const q: any = { deletedAt: { $exists: false } };
    if (userId) q.userId = userId;
    if (from || to) q.occurredAt = {};
    if (from) q.occurredAt.$gte = from;
    if (to) q.occurredAt.$lte = to;
    const txs = await Transaction.find(q).sort({ occurredAt: 1 }).lean();
    const userIds = Array.from(new Set(txs.map((t) => String(t.userId)))).filter(Boolean);
    const users = userIds.length ? await User.find({ _id: { $in: userIds } }).lean() : [];
    const userMap = new Map(users.map((u) => [String(u._id), u]));

    const rows = txs.map((t) => {
      const user = userMap.get(String(t.userId));
      const occurredAt = t.occurredAt instanceof Date ? t.occurredAt : new Date(t.occurredAt);
      const date = Number.isFinite(occurredAt.getTime())
        ? occurredAt.toISOString().replace("T", " ").slice(0, 16)
        : "";
      return {
        date,
        userId: String(t.userId),
        name: user?.name || "",
        email: user?.email || "",
        type: t.type,
        amount: (t.amount / 100).toFixed(2),
        note: t.note || "",
      };
    });

    const csv = toCsv(rows, ["date", "userId", "name", "email", "type", "amount", "note"]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=ledger.csv");
    res.send(csv);
  } catch (e) {
    next(e);
  }
});

export default router;
