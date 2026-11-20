import { Router } from "express";
import { requireAuth, requireRole } from "../lib/auth";
import Transaction from "../models/Transaction";
import User from "../models/User";

function csvEscape(val: unknown) {
  if (val == null) return "";
  let s = String(val);
  // Neutralize CSV formula injection. A leading +/- is only dangerous on a
  // non-numeric cell, so real numbers (negative balances, +880 phones) survive.
  const formulaPrefix = /^[=@\t\r]/.test(s) || (/^[+-]/.test(s) && !/^[+-]?\d+(\.\d+)?$/.test(s));
  if (formulaPrefix) {
    s = "'" + s;
  }
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const MAX_EXPORT_ROWS = 20_000;

function toCsv(rows: Array<Record<string, unknown>>, headers: string[]) {
  const head = headers.join(",");
  const lines = rows.map((r) => headers.map((h) => csvEscape(r[h])).join(","));
  return [head, ...lines].join("\n");
}

const router = Router();

// GET /api/export/summary.csv?from=&to=
router.get("/summary.csv", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const from = req.query.from ? new Date(String(req.query.from)) : undefined;
    let to = req.query.to ? new Date(String(req.query.to)) : undefined;
    if (to && !String(req.query.to).includes("T")) {
      to = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999);
    }

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
      deposits: row.deposits.toFixed(2),
      withdraws: row.withdraws.toFixed(2),
      balance: row.balance.toFixed(2),
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
    let to = req.query.to ? new Date(String(req.query.to)) : undefined;
    if (to && !String(req.query.to).includes("T")) {
      to = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59, 999);
    }
    const occurredAtRange: Record<string, Date> = {};
    if (from) occurredAtRange.$gte = from;
    if (to) occurredAtRange.$lte = to;
    const q: Record<string, unknown> = { deletedAt: { $exists: false } };
    if (userId) q.userId = userId;
    if (from || to) q.occurredAt = occurredAtRange;
    const txs = await Transaction.find(q)
      .sort({ occurredAt: 1 })
      .limit(MAX_EXPORT_ROWS + 1)
      .lean();
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
        amount: t.amount.toFixed(2),
        note: t.note || "",
      };
    });

    if (rows.length > MAX_EXPORT_ROWS) {
      return res.status(413).json({ error: `Too many rows (${rows.length}). Narrow the date range or filter by member.` });
    }
    const csv = toCsv(rows, ["date", "userId", "name", "email", "type", "amount", "note"]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=ledger.csv");
    res.send(csv);
  } catch (e) {
    next(e);
  }
});

export default router;
