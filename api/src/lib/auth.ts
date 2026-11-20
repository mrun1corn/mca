import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import UserModel, { Role } from "../models/User";
import SessionModel from "../models/Session";
import { AppError } from "./errors";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("[auth] JWT_SECRET is not set. Refusing to start with an insecure default.");
}
const JWT_SECRET_VALUE = JWT_SECRET;
const JWT_ALGORITHMS: jwt.Algorithm[] = ["HS256"];

const ACCESS_TTL_MIN = Number(process.env.JWT_ACCESS_TTL_MIN || 30);
const REFRESH_TTL_DAYS = Number(process.env.JWT_REFRESH_TTL_DAYS || 7);

export type JwtPayload = {
  sub: string;
  role: Role;
  name: string;
  typ: "access" | "refresh";
  ver: number;
  jti?: string;
};

type RequestWithCookies = Request & { cookies?: Record<string, string | undefined> };

export type AuthedRequest = RequestWithCookies & {
  user?: JwtPayload;
  userDoc?: { _id: unknown; name: string; role: Role };
};

// Constant-cost comparison target so an unknown identifier costs the same as a
// wrong password (prevents account enumeration by timing).
const DUMMY_HASH = bcrypt.hashSync("timing-equalizer-not-a-real-password", 12);

function hashJti(jti: string) {
  return crypto.createHash("sha256").update(jti).digest("hex");
}

export function signAccessToken(payload: { sub: string; role: Role; name: string; ver: number }) {
  return jwt.sign({ ...payload, typ: "access" }, JWT_SECRET_VALUE, {
    algorithm: "HS256",
    expiresIn: `${ACCESS_TTL_MIN}m`,
  });
}

export function signRefreshToken(
  payload: { sub: string; role: Role; name: string; ver: number },
  jti: string
) {
  return jwt.sign({ ...payload, typ: "refresh", jti }, JWT_SECRET_VALUE, {
    algorithm: "HS256",
    expiresIn: `${REFRESH_TTL_DAYS}d`,
  });
}

function decodeToken(token: string | undefined, expected: "access" | "refresh"): JwtPayload | null {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET_VALUE, { algorithms: JWT_ALGORITHMS }) as JwtPayload;
    if (payload.typ !== expected) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(
  user: { _id: unknown; role: Role; name: string; tokenVersion?: number },
  req: Request
) {
  const jti = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  await SessionModel.create({
    userId: user._id,
    jtiHash: hashJti(jti),
    expiresAt,
    lastUsedAt: new Date(),
    userAgent: String(req.headers["user-agent"] || "").slice(0, 256),
  });

  const base = {
    sub: String(user._id),
    role: user.role,
    name: user.name,
    ver: user.tokenVersion || 0,
  };
  return { access: signAccessToken(base), refresh: signRefreshToken(base, jti) };
}

/**
 * Atomically consumes the presented refresh token and issues a fresh pair.
 * A token whose session row is gone has already been used or revoked, so reuse
 * is rejected instead of silently minting a new 7-day session.
 */
export async function rotateSession(presented: string, req: Request) {
  const payload = decodeToken(presented, "refresh");
  if (!payload?.jti) throw new AppError("Unauthorized", 401);

  const consumed = await SessionModel.findOneAndDelete({ jtiHash: hashJti(payload.jti) });
  if (!consumed) throw new AppError("Unauthorized", 401);

  const user = await UserModel.findById(payload.sub).select("_id name role status tokenVersion");
  if (!user || user.status !== "active") throw new AppError("Unauthorized", 401);
  if ((user.tokenVersion || 0) !== (payload.ver || 0)) throw new AppError("Unauthorized", 401);

  return createSession(user, req);
}

export async function revokeSession(presented: string | undefined) {
  const payload = decodeToken(presented, "refresh");
  if (!payload?.jti) return;
  await SessionModel.deleteOne({ jtiHash: hashJti(payload.jti) });
}

export async function revokeAllSessions(userId: string) {
  await SessionModel.deleteMany({ userId });
}

export function setAuthCookies(res: Response, access: string, refresh: string) {
  const isProd = process.env.NODE_ENV === "production";
  const secure = isProd || process.env.COOKIE_SECURE === "true";
  const domain = process.env.COOKIE_DOMAIN || undefined;
  const cookieBase = {
    httpOnly: true,
    sameSite: "strict" as const,
    secure,
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
  const opts = {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: isProd || process.env.COOKIE_SECURE === "true",
    domain,
    path: "/",
  };
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

/** True when the caller authenticated with a header rather than a cookie. */
export function usedBearerAuth(req: Request): boolean {
  return !(req as RequestWithCookies).cookies?.["refresh"] && !!getBearerToken(req);
}

/**
 * Verifies signature, token type, user status and token version on every
 * request, then takes the role from the database so demotions/deactivations
 * take effect immediately instead of after the access token expires.
 */
export async function requireAuth(req: AuthedRequest, _res: Response, next: NextFunction) {
  try {
    const token = getAccessTokenFromReq(req);
    const payload = decodeToken(token, "access");
    if (!payload) throw new AppError("Unauthorized", 401);

    const user = await UserModel.findById(payload.sub)
      .select("_id name role status tokenVersion mustChangePassword")
      .lean();
    if (!user || user.status !== "active") throw new AppError("Unauthorized", 401);
    if ((user.tokenVersion || 0) !== (payload.ver || 0)) throw new AppError("Unauthorized", 401);

    req.user = {
      sub: String(user._id),
      role: user.role as Role,
      name: user.name,
      typ: "access",
      ver: user.tokenVersion || 0,
    };
    req.userDoc = user as unknown as AuthedRequest["userDoc"];

    const url = req.originalUrl.split("?")[0];
    const canChangeHere = req.method === "GET" || url.startsWith("/api/auth/") || url === "/api/users/me";
    if (user.mustChangePassword && !canChangeHere) {
      throw new AppError("Password change required", 403, { code: "password_change_required" });
    }

    next();
  } catch (e) {
    next(e instanceof AppError ? e : new AppError("Unauthorized", 401));
  }
}

export function requireRole(roles: Role[]) {
  return (req: AuthedRequest, _res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) return next(new AppError("Forbidden", 403));
    next();
  };
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchInsensitive(field: string, value: string) {
  return { [field]: { $regex: `^${escapeRegExp(value)}$`, $options: "i" } };
}

const IDENTIFIER_FIELDS = ["username", "memberCode", "email", "name", "phone"];
const MAX_IDENTIFIER_LENGTH = 128;

/**
 * Looks up an active user by any of the public identifiers. Always runs one
 * bcrypt comparison so unknown identifiers cannot be distinguished by timing.
 */
export async function authenticateByIdentifierPassword(identifier: string, password: string) {
  const normalized = String(identifier || "").trim().slice(0, MAX_IDENTIFIER_LENGTH);
  const value = normalized.replace(/^@/, "");

  const filter: Record<string, unknown> = {
    $or: IDENTIFIER_FIELDS.map((field) => matchInsensitive(field, value)),
    status: "active",
  };
  const user = value.length > 0 ? await UserModel.findOne(filter) : null;

  const ok = await verifyPassword(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !ok) throw new AppError("Invalid credentials", 401);

  return { user };
}

export async function authenticateByEmailPassword(email: string, password: string) {
  const normalized = String(email || "").trim().slice(0, MAX_IDENTIFIER_LENGTH);
  const user = normalized ? await UserModel.findOne({ email: normalized, status: "active" }) : null;
  const ok = await verifyPassword(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !ok) throw new AppError("Invalid credentials", 401);
  return { user };
}
