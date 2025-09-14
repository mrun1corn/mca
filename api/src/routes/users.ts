import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole, hashPassword } from "../lib/auth";
import { parseBody } from "../lib/validation";
import User from "../models/User";
import Transaction from "../models/Transaction";

const router = Router();

// GET /api/users?q=
router.get("/users", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const q = String(req.query.q || "").trim();
    const filter: any = q ? { name: { $regex: q, $options: "i" } } : {};
    const users = await User.find(filter).sort({ name: 1 });
    const now = new Date();
    const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstOfThisMonthMs = firstOfThisMonth.getTime();
    const lastMonthStart = firstOfLastMonth;
    const lastMonthEnd = firstOfThisMonth;

    const result = [] as any[];
    for (const u of users) {
      const txs = await Transaction.find({ userId: u._id, deletedAt: { $exists: false } }).sort({ occurredAt: -1 }).limit(20);
      const balanceAgg = await Transaction.aggregate([
        { $match: { userId: u._id, deletedAt: { $exists: false } } },
        { $group: { _id: null, s: { $sum: "$amountPoisha" } } },
      ]);
      const balance = balanceAgg.at(0)?.s || 0;

      const lastMonth = await Transaction.aggregate([
        { $match: { userId: u._id, type: "deposit", deletedAt: { $exists: false }, occurredAt: { $gte: lastMonthStart, $lt: lastMonthEnd } } },
        { $group: { _id: null, s: { $sum: "$amountPoisha" } } },
      ]);

      result.push({
        id: u._id,
        name: u.name,
        phone: u.phone,
        email: u.email,
        role: u.role,
        balance: balance,
        lastMonth: lastMonth.at(0)?.s || 0,
        recent: txs.slice(0, 3).map((t) => ({ date: t.occurredAt, type: t.type, amount: t.amountPoisha, note: t.note })),
      });
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
});

// CRUD
const UpsertUserSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "accountant", "user"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

router.post("/users", requireAuth as any, requireRole(["admin"]) as any, async (req, res, next) => {
  try {
    const body = parseBody(UpsertUserSchema, req.body);
    const passwordHash = await hashPassword(body.password || "ChangeMe123!");
    const user = await User.create({
      name: body.name,
      phone: body.phone,
      email: body.email || undefined,
      passwordHash,
      role: body.role || "user",
      status: body.status || "active",
    });
    res.status(201).json({ id: user._id });
  } catch (e) {
    next(e);
  }
});

router.get("/users/:id", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/me", requireAuth as any, async (req: any, res, next) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    next(e);
  }
});

router.patch("/users/:id", requireAuth as any, requireRole(["admin"]) as any, async (req, res, next) => {
  try {
    const body = parseBody(UpsertUserSchema, req.body);
    const update: any = { ...body };
    delete update.password;
    if (body.password) update.passwordHash = await hashPassword(body.password);
    await User.findByIdAndUpdate(req.params.id, update);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

router.delete("/users/:id", requireAuth as any, requireRole(["admin"]) as any, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;
