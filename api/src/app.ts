import { loadEnv } from "./lib/env";
loadEnv();
import express from "express";
import path from "node:path";
import fs from "node:fs";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { errorHandler } from "./lib/errors";
import { clientIp } from "./lib/net";
import authRoutes from "./routes/auth";
import homeRoutes from "./routes/home";
import userRoutes from "./routes/users";
import txRoutes from "./routes/transactions";
import duesRoutes from "./routes/dues";
import exportRoutes from "./routes/export";
import previewRoutes from "./routes/preview";
import investmentRoutes from "./routes/investments";
import reportRoutes from "./routes/reports";
import paymentRoutes from "./routes/payments";
import settingsRoutes from "./routes/settings";

const app = express();
const PORT = Number(process.env.PORT || 4000);
const isProd = process.env.NODE_ENV === "production";

// Never trust client-supplied forwarding headers implicitly. The proxy chain is
// resolved explicitly in clientIp() (Cloudflare -> local reverse proxy -> Node).
app.set("trust proxy", false);

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => clientIp(req),
});

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Limit each IP to 20 auth-related requests per 15 minutes
  message: { error: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => clientIp(req),
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["'self'"],
    },
  },
}));

// CORS MUST be mounted before limiters so that 429 throttled responses still
// receive Access-Control-Allow-Origin headers and do not manifest as net::ERR_FAILED.
const allowedOrigins = buildAllowedOrigins(process.env.CORS_ORIGIN, PORT);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // non-browser or same-origin
      if (isOriginAllowed(origin, allowedOrigins)) return callback(null, true);
      console.warn(`[CORS] Rejected request from origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Apply limits
app.use("/api/", globalLimiter);
// authLimiter applies strictly to login attempts; heartbeats like auth-check must not burn the auth budget
app.use("/api/auth/login", authLimiter);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", userRoutes);
app.use("/api", txRoutes);
app.use("/api", duesRoutes);
app.use("/api/export", exportRoutes);
app.use("/api", previewRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/settings", settingsRoutes);

// In production/standalone, serve the built web app (single-port deploy)
const isVercel = !!process.env.VERCEL;
const webDist = getWebDistPath();

if (!isVercel && webDist) {
  app.use(express.static(webDist));
  // SPA fallback for non-API routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(webDist, "index.html"));
  });
}

function getWebDistPath(): string | null {
  const candidates = [
    path.resolve(process.cwd(), "web/dist"),
    path.resolve(process.cwd(), "../web/dist"),
    path.resolve(__dirname, "../../web/dist"),
    path.resolve(__dirname, "../web/dist"),
    path.resolve(__dirname, "../../../web/dist"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, "index.html"))) {
      return candidate;
    }
  }
  return null;
}

app.use(errorHandler);

export { app };

function buildAllowedOrigins(envValue: string | undefined, port: number) {
  const list = (envValue || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const devDefaults =
    process.env.NODE_ENV === "production"
      ? []
      : [
          `http://localhost:${port}`,
          `http://127.0.0.1:${port}`,
          `http://localhost:5173`,
          `http://127.0.0.1:5173`,
        ];

  return Array.from(new Set([...list, ...devDefaults]));
}

/**
 * Absolute origins only. Scheme-less entries and wildcards are matched with the
 * same protocol/port rules as exact entries, so `credentials: true` responses
 * can never be read from a downgraded (http) or off-port origin.
 */
function isOriginAllowed(origin: string, allowed: string[]) {
  if (allowed.includes("*")) return true;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }

  return allowed.some((entry) => {
    if (entry === "*") return true;

    const wildcard = entry.includes("*");
    const parsedEntry = entry.replace("*.", "");
    const withProtocol = /^https?:\/\//i.test(parsedEntry) ? parsedEntry : null;
    if (!withProtocol) return false; // scheme-less entries are a misconfiguration

    let allowedUrl: URL;
    try {
      allowedUrl = new URL(withProtocol);
    } catch {
      return false;
    }

    if (allowedUrl.protocol !== url.protocol) return false;
    const entryPort = allowedUrl.port || (allowedUrl.protocol === "https:" ? "443" : "80");
    const originPort = url.port || (url.protocol === "https:" ? "443" : "80");
    if (entryPort !== originPort) return false;

    if (!wildcard) return allowedUrl.hostname === url.hostname;

    const rootDomain = allowedUrl.hostname;
    return url.hostname === rootDomain || url.hostname.endsWith(`.${rootDomain}`);
  });
}
