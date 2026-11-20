import { Router } from "express";
import { z } from "zod";
import {
  authenticateByIdentifierPassword,
  clearAuthCookies,
  createSession,
  getRefreshTokenFromReq,
  hashPassword,
  requireAuth,
  revokeAllSessions,
  revokeSession,
  rotateSession,
  setAuthCookies,
  usedBearerAuth,
  verifyPassword,
} from "../lib/auth";
import { loginGuard } from "../lib/loginGuard";
import { parseBody } from "../lib/validation";
import { AppError } from "../lib/errors";
import User from "../models/User";

const router = Router();

const LoginSchema = z.object({ identifier: z.string().min(1).max(128), password: z.string().min(6).max(200) });

router.post("/login", loginGuard, async (req, res, next) => {
  try {
    const body = parseBody(LoginSchema, req.body);
    const { user } = await authenticateByIdentifierPassword(body.identifier, body.password);
    const tokens = await createSession(user, req);
    setAuthCookies(res, tokens.access, tokens.refresh);

    // Tokens in the body are only for the native client, which cannot use
    // httpOnly cookies. Browser clients authenticate through the cookies.
    const isMobile = req.headers["x-client"] === "mobile";
    res.json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        mustChangePassword: Boolean(user.mustChangePassword),
      },
      ...(isMobile ? { tokens } : {}),
    });
  } catch (e) {
    next(e);
  }
});

router.post("/refresh", async (req, res, next) => {
  try {
    const refresh = getRefreshTokenFromReq(req);
    if (!refresh) throw new AppError("Unauthorized", 401);

    const tokens = await rotateSession(refresh, req);
    setAuthCookies(res, tokens.access, tokens.refresh);

    // Only a client that proved possession via Authorization gets the new
    // refresh token back; a cookie-authenticated (browser) request never does,
    // so script running in the page cannot extract a long-lived credential.
    if (usedBearerAuth(req)) {
      return res.json({ ok: true, tokens });
    }
    return res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

router.post("/logout", async (req, res) => {
  try {
    await revokeSession(getRefreshTokenFromReq(req));
  } catch {
    // Logout is best-effort: always clear the cookies.
  }
  clearAuthCookies(res);
  res.json({ ok: true });
});

const AuthedChangePasswordSchema = z.object({
  currentPassword: z.string().min(6).max(200),
  newPassword: z.string().min(8).max(200),
});

router.post("/me/change-password", requireAuth as RequestHandler, async (req: AuthedRequest, res, next) => {
  try {
    const body = parseBody(AuthedChangePasswordSchema, req.body);
    const userId = req.user!.sub;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Not found" });

    const ok = await verifyPassword(body.currentPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid current password" });

    user.passwordHash = await hashPassword(body.newPassword);
    user.mustChangePassword = false;
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();

    // Every other device (and this one) must sign in again with the new password.
    await revokeAllSessions(String(user._id));
    clearAuthCookies(res);

    res.json({ ok: true, reauth: true });
  } catch (e) {
    next(e);
  }
});

router.get("/auth-check", requireAuth as RequestHandler, async (req: AuthedRequest, res) => {
  res.json({
    ok: true,
    user: {
      id: req.user!.sub,
      name: req.user!.name,
      role: req.user!.role,
    },
  });
});

export default router;
