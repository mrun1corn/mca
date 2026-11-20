import { Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { requireAuth, requireRole, hashPassword, revokeAllSessions } from "../lib/auth";
import { parseBody } from "../lib/validation";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import Investment from "../models/Investment";

const router = Router();

// GET /api/users?q=
router.get("/users", requireAuth as any, requireRole(["admin", "accountant"]) as any, async (req, res, next) => {
  try {
    const rawQuery = String(req.query.q || "").trim().slice(0, 100);
    const safeQuery = rawQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const filter: Record<string, unknown> = safeQuery
      ? { name: { $regex: safeQuery, $options: "i" } }
      : {};
    const users = await User.find(filter).sort({ name: 1 });
    if (!users.length) return res.json([]);

    const userIds = users.map((u) => u._id);
    const now = new Date();
    const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Parallel batch aggregations for all users at once
    const [balanceAggs, lastMonthAggs] = await Promise.all([
      Transaction.aggregate([
        { $match: { userId: { $in: userIds }, deletedAt: { $exists: false } } },
        { $group: { _id: "$userId", s: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        {
          $match: {
            userId: { $in: userIds },
            type: "deposit",
            deletedAt: { $exists: false },
            occurredAt: { $gte: firstOfLastMonth, $lt: firstOfThisMonth },
          },
        },
        { $group: { _id: "$userId", s: { $sum: "$amount" } } },
      ]),
    ]);

    const balanceMap = new Map(balanceAggs.map((b) => [String(b._id), b.s || 0]));
    const lastMonthMap = new Map(lastMonthAggs.map((m) => [String(m._id), m.s || 0]));

    const result = users.map((u) => ({
      id: u._id,
      name: u.name,
      username: u.username || u.name.toLowerCase().replace(/[^a-z0-9_]/g, ""),
      memberCode: u.memberCode || "",
      phone: u.phone,
      email: u.email,
      role: u.role,
      balance: balanceMap.get(String(u._id)) || 0,
      lastMonth: lastMonthMap.get(String(u._id)) || 0,
      recent: [],
    }));


    res.json(result);
  } catch (e) {
    next(e);
  }
});

// CRUD
const UpsertUserSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1).optional(),
  memberCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  password: z.string().min(8).optional(),
  role: z.enum(["admin", "accountant", "user"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

function generateStarterPassword() {
  // 20 URL-safe characters, ~118 bits: never printed in source, shown once to the admin.
  return crypto.randomBytes(15).toString("base64url");
}

router.post("/users", requireAuth as any, requireRole(["admin"]) as any, async (req, res, next) => {
  try {
    const body = parseBody(UpsertUserSchema, req.body);
    const starterPassword = body.password || generateStarterPassword();
    const passwordHash = await hashPassword(starterPassword);
    const count = await User.countDocuments();
    const defaultCode = `MCA-${String(count + 1).padStart(3, "0")}`;
    const defaultUsername = (body.username || body.name).toLowerCase().trim().replace(/[^a-z0-9_]/g, "");

    const user = await User.create({
      name: body.name,
      username: defaultUsername,
      memberCode: (body.memberCode || defaultCode).toUpperCase().trim(),
      phone: body.phone,
      email: body.email || undefined,
      passwordHash,
      role: body.role || "user",
      status: body.status || "active",
      mustChangePassword: !body.password,
    });
    // The plaintext starter password is returned exactly once so the admin can
    // hand it over; it is never stored or logged.
    res.status(201).json({ id: user._id, starterPassword: body.password ? undefined : starterPassword });

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
    res.json({
      id: user._id,
      name: user.name,
      username: user.username || user.name.toLowerCase().replace(/[^a-z0-9_]/g, ""),
      memberCode: user.memberCode || "",
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    next(e);
  }
});

router.patch("/users/:id", requireAuth as any, requireRole(["admin"]) as any, async (req, res, next) => {
  try {
    const body = parseBody(UpsertUserSchema, req.body);
    const { password, ...rest } = body;
    const update: Record<string, unknown> = { ...rest };
    if (password) update.passwordHash = await hashPassword(password);
    const changesCredentials = Boolean(password);
    const current = await User.findById(req.params.id);
    if (!current) return res.status(404).json({ error: "Not found" });
    const changesAccess =
      changesCredentials ||
      current.role !== (rest.role ?? current.role) ||
      current.status !== (rest.status ?? current.status);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      changesAccess ? { ...update, $inc: { tokenVersion: 1 } } : update,
      { new: true, runValidators: true }
    );
    if (changesAccess && updated) await revokeAllSessions(String(updated._id));
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

router.delete("/users/:id", requireAuth as any, requireRole(["admin"]) as any, async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // Check if user has financial history
    const txCount = await Transaction.countDocuments({ userId });
    const dueCount = await Due.countDocuments({ userId });

    if (txCount > 0 || dueCount > 0) {
      // Soft-deactivate to preserve immutable financial audit trail
      await User.findByIdAndUpdate(userId, { status: "inactive", $inc: { tokenVersion: 1 } });
      await revokeAllSessions(String(userId));
      return res.json({ ok: true, deactivated: true, message: "User deactivated to preserve financial audit trail" });
    }

    // If completely clean (no financial records), pull contributor reference without deleting shared investments
    await Investment.updateMany(
      { "contributors.userId": userId },
      { $pull: { contributors: { userId } as any } }
    );
    
    await User.findByIdAndDelete(userId);
    res.json({ ok: true, deleted: true });
  } catch (e) {
    next(e);
  }
});

export default router;
