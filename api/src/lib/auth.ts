import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import { AppError } from "./errors";
import type { Role } from "../models/User";

// Require a JWT secret; fail hard in production, warn in dev
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production");
  } else {
    // eslint-disable-next-line no-console
    console.warn("[auth] Warning: JWT_SECRET not set. Using insecure default for development only.");
  }
}
const JWT_SECRET_VALUE = JWT_SECRET || "insecure_dev_secret_change_me";
const ACCESS_TTL_MIN = Number(process.env.JWT_ACCESS_TTL_MIN || 30);
const REFRESH_TTL_DAYS = Number(process.env.JWT_REFRESH_TTL_DAYS || 7);

export type JwtPayload = { sub: string; role: string; name: string };

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET_VALUE, { expiresIn: `${ACCESS_TTL_MIN}m` });
}
export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET_VALUE, { expiresIn: `${REFRESH_TTL_DAYS}d` });
}

export function setAuthCookies(res: Response, access: string, refresh: string) {
  const isProd = process.env.NODE_ENV === "production";
  const domain = process.env.COOKIE_DOMAIN || undefined;
  const cookieBase = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    domain,
    path: "/",
  };
  res.cookie("access", access, {
    ...cookieBase,
    maxAge: ACCESS_TTL_MIN * 60 * 1000,
  });
  res.cookie("refresh", refresh, {
    ...cookieBase,
    maxAge: REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response) {
  const isProd = process.env.NODE_ENV === "production";
  const domain = process.env.COOKIE_DOMAIN || undefined;
  const opts = { httpOnly: true, sameSite: "lax" as const, secure: isProd, domain, path: "/" };
  res.clearCookie("access", opts);
  res.clearCookie("refresh", opts);
}

function getBearerToken(req: Request): string | undefined {
  const auth = req.headers["authorization"];
  if (typeof auth === "string" && auth.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }
  return undefined;
}

export function getAccessTokenFromReq(req: Request): string | undefined {
  // Prefer cookie for web, else Authorization header for mobile
  const cookie = (req as any).cookies?.["access"] as string | undefined;
  return cookie ?? getBearerToken(req);
}

export function getRefreshTokenFromReq(req: Request): string | undefined {
  const cookie = (req as any).cookies?.["refresh"] as string | undefined;
  return cookie ?? getBearerToken(req);
}

export function requireAuth(req: Request & { user?: JwtPayload }, _res: Response, next: NextFunction) {
  const token = getAccessTokenFromReq(req);
  if (!token) return next(new AppError("Unauthorized", 401));
  try {
    const payload = jwt.verify(token, JWT_SECRET_VALUE) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new AppError("Unauthorized", 401));
  }
}

export function requireRole(roles: Role[]) {
  return (req: Request & { user?: JwtPayload }, _res: Response, next: NextFunction) => {
    const role = req.user?.role as Role | undefined;
    if (!role || !roles.includes(role)) return next(new AppError("Forbidden", 403));
    next();
  };
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function authenticateByEmailPassword(email: string, password: string) {
  const user = await UserModel.findOne({ email, status: "active" });
  if (!user) throw new AppError("Invalid credentials", 401);
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw new AppError("Invalid credentials", 401);
  const payload: JwtPayload = { sub: String(user._id), role: user.role, name: user.name };
  return {
    user,
    access: signAccessToken(payload),
    refresh: signRefreshToken(payload),
  };
}

export async function authenticateByIdentifierPassword(identifier: string, password: string) {
  const normalized = identifier.trim();
  const user = await UserModel.findOne({
    $or: [matchInsensitive("email", normalized), matchInsensitive("name", normalized), matchInsensitive("phone", normalized)],
    status: "active",
  } as any);
  if (!user) throw new AppError("Invalid credentials", 401);
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw new AppError("Invalid credentials", 401);
  const payload: JwtPayload = { sub: String(user._id), role: user.role, name: user.name };
  return {
    user,
    access: signAccessToken(payload),
    refresh: signRefreshToken(payload),
  };
}

export function tryDecode(token?: string): JwtPayload | null {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET_VALUE) as JwtPayload;
  } catch {
    return null;
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchInsensitive(field: string, value: string) {
  return { [field]: { $regex: `^${escapeRegExp(value)}$`, $options: "i" } };
}
