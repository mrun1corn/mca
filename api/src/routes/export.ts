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
    const q: any = { deletedAt: { $exists: false } };
    if (from || to) q.occurredAt = {};
    if (from) q.occurredAt.$gte = from;
    if (to) q.occurredAt.$lte = to;
    const users = await User.find({});
    const rows: any[] = [];
    for (const u of users) {
      const txs = await Transaction.find({ ...q, userId: u._id });
      const depositsPoisha = txs.filter((t) => t.type === "deposit").reduce((a, t) => a + t.amountPoisha, 0);
      const withdrawsPoisha = txs.filter((t) => t.type === "withdraw").reduce((a, t) => a + t.amountPoisha, 0);
      const balancePoisha = txs.reduce((a, t) => a + t.amountPoisha, 0);
      const deposits = (depositsPoisha / 100).toFixed(2);
      const withdraws = (withdrawsPoisha / 100).toFixed(2);
      const balance = (balancePoisha / 100).toFixed(2);
      rows.push({ name: u.name, email: u.email || "", deposits, withdraws, balance });
    }
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
        amount: (t.amountPoisha / 100).toFixed(2),
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
