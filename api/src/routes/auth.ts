import { Router } from "express";
import { z } from "zod";
import { authenticateByEmailPassword, authenticateByIdentifierPassword, clearAuthCookies, setAuthCookies, signAccessToken, signRefreshToken, tryDecode, verifyPassword, hashPassword, getRefreshTokenFromReq, requireAuth } from "../lib/auth";
import { parseBody } from "../lib/validation";
import User from "../models/User";

const router = Router();

const LoginSchema = z.object({ identifier: z.string().min(1), password: z.string().min(6) });

router.post("/login", async (req, res, next) => {
  try {
    const body = parseBody(LoginSchema, req.body);
    const { user, access, refresh } = await authenticateByIdentifierPassword(body.identifier, body.password);
    setAuthCookies(res, access, refresh);
    // Return tokens in JSON for mobile apps (cookies remain for web)
    res.json({ user: { id: user._id, name: user.name, role: user.role }, tokens: { access, refresh } });
  } catch (e) {
    next(e);
  }
});

router.post("/refresh", async (req, res, next) => {
  try {
    const refresh = getRefreshTokenFromReq(req as any);
    const payload = tryDecode(refresh);
    if (!payload) return res.status(401).json({ error: "Unauthorized" });
    // ensure user still exists and active
    const user = await User.findById(payload.sub);
    if (!user || user.status !== "active") return res.status(401).json({ error: "Unauthorized" });
    const access = signAccessToken({ sub: String(user._id), role: user.role, name: user.name });
    const newRefresh = signRefreshToken({ sub: String(user._id), role: user.role, name: user.name });
    setAuthCookies(res, access, newRefresh);
    res.json({ ok: true, tokens: { access, refresh: newRefresh } });
  } catch (e) {
    next(e);
  }
});

router.post("/logout", async (_req, res) => {
  clearAuthCookies(res);
  res.json({ ok: true });
});

// Change password by email + current password (allows from login page)
const ChangePasswordSchema = z.object({
  email: z.string().email(),
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8),
});

router.post("/change-password", async (req, res, next) => {
  try {
    const body = parseBody(ChangePasswordSchema, req.body);
    const user = await User.findOne({ email: body.email, status: "active" });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });
    const ok = await verifyPassword(body.currentPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid email or password" });
    user.passwordHash = await hashPassword(body.newPassword);
    await user.save();
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

const AuthedChangePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8),
});

router.post("/me/change-password", requireAuth as any, async (req: any, res, next) => {
  try {
    const body = parseBody(AuthedChangePasswordSchema, req.body);
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ error: "Not found" });
    const ok = await verifyPassword(body.currentPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid current password" });
    user.passwordHash = await hashPassword(body.newPassword);
    await user.save();
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

export default router;
