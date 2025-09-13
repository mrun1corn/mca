import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import { AppError } from "./errors";

const JWT_SECRET = process.env.JWT_SECRET || "change_me";
const ACCESS_TTL_MIN = Number(process.env.JWT_ACCESS_TTL_MIN || 30);
const REFRESH_TTL_DAYS = Number(process.env.JWT_REFRESH_TTL_DAYS || 7);

export type JwtPayload = { sub: string; role: string; name: string };

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${ACCESS_TTL_MIN}m` });
}
export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${REFRESH_TTL_DAYS}d` });
}

export function setAuthCookies(res: Response, access: string, refresh: string) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("access", access, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: ACCESS_TTL_MIN * 60 * 1000,
  });
  res.cookie("refresh", refresh, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie("access");
  res.clearCookie("refresh");
}

export function requireAuth(req: Request & { user?: JwtPayload }, _res: Response, next: NextFunction) {
  const token = (req.cookies && req.cookies["access"]) || null;
  if (!token) return next(new AppError("Unauthorized", 401));
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new AppError("Unauthorized", 401));
  }
}

export function requireRole(roles: ("admin" | "accountant" | "user")[]) {
  return (req: Request & { user?: JwtPayload }, _res: Response, next: NextFunction) => {
    const role = req.user?.role as any;
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
  const user = await UserModel.findOne({
    $or: [{ email: identifier }, { name: identifier }],
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
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
