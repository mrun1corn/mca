import { Request, Response, NextFunction } from "express";
import { clientIp } from "./net";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 10;
const MAX_TRACKED = 10_000;

type Attempt = { count: number; resetAt: number };

const attempts = new Map<string, Attempt>();

function prune(now: number) {
  if (attempts.size < MAX_TRACKED) return;
  for (const [key, value] of attempts) {
    if (value.resetAt <= now) attempts.delete(key);
  }
}

/**
 * Per-account throttle applied in addition to the per-IP limiter, so rotating
 * `X-Forwarded-For` (or any other address trick) cannot enable unlimited
 * password guessing against a single identifier.
 */
export function loginGuard(req: Request, res: Response, next: NextFunction) {
  const body = req.body as { identifier?: unknown } | undefined;
  const identifier = String(body?.identifier ?? "").trim().toLowerCase().slice(0, 128);
  const key = identifier ? `${identifier}|${clientIp(req)}` : clientIp(req);
  const now = Date.now();

  const entry = attempts.get(key);
  if (entry && entry.resetAt > now && entry.count >= MAX_FAILURES) {
    res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
    return res.status(429).json({ error: "Too many failed sign-in attempts. Try again later." });
  }

  res.on("finish", () => {
    if (res.statusCode === 401) {
      prune(now);
      const current = attempts.get(key);
      if (!current || current.resetAt <= Date.now()) {
        attempts.set(key, { count: 1, resetAt: Date.now() + WINDOW_MS });
      } else {
        current.count += 1;
      }
    } else if (res.statusCode === 200) {
      attempts.delete(key);
    }
  });

  next();
}
