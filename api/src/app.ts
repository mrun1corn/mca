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
import authRoutes from "./routes/auth";
import homeRoutes from "./routes/home";
import userRoutes from "./routes/users";
import txRoutes from "./routes/transactions";
import duesRoutes from "./routes/dues";
import exportRoutes from "./routes/export";
import previewRoutes from "./routes/preview";
import investmentRoutes from "./routes/investments";
import reportRoutes from "./routes/reports";

const app = express();
const PORT = Number(process.env.PORT || 4000);
const isProd = process.env.NODE_ENV === "production";

// Trust the reverse proxy so rate-limiter gets the correct client IP
app.set("trust proxy", 1);

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Limit each IP to 20 auth-related requests per 15 minutes
  message: { error: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["'self'", "'unsafe-inline'"],
    },
  },
}));

// Apply limits
app.use("/api/", globalLimiter);
app.use("/api/auth/", authLimiter);

app.use(express.json());
app.use(cookieParser());

// CORS: allow one or more origins via CORS_ORIGIN (comma-separated)
const allowedOrigins = buildAllowedOrigins(process.env.CORS_ORIGIN, PORT);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // non-browser or same-origin
      if (isOriginAllowed(origin, allowedOrigins)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

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

// In production, serve the built web app (single-port deploy)
const isVercel = !!process.env.VERCEL;
const webDist = path.resolve(__dirname, "../../web/dist");

if (isProd && !isVercel && fs.existsSync(webDist)) {
  app.use(express.static(webDist));
  // SPA fallback for non-API routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(webDist, "index.html"));
  });
}

app.use(errorHandler);

export { app };

function buildAllowedOrigins(envValue: string | undefined, port: number) {
  const defaults = [`http://localhost:${port}`, `http://127.0.0.1:${port}`];
  const list = (envValue || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set([...list, ...defaults]));
}

function isOriginAllowed(origin: string, allowed: string[]) {
  if (allowed.includes("*") && !isProd) return true;
  try {
    const url = new URL(origin);
    const urlPort = url.port || (url.protocol === "https:" ? "443" : "80");

    return allowed.some((entry) => {
      try {
        const hasProtocol = /^https?:\/\//i.test(entry);
        const entryStr = hasProtocol ? entry : `${url.protocol}//${entry}`;
        const allowedUrl = new URL(entryStr);

        if (allowedUrl.hostname !== url.hostname) return false;
        if (hasProtocol && allowedUrl.protocol !== url.protocol) return false;

        const allowedPort = allowedUrl.port || (allowedUrl.protocol === "https:" ? "443" : "80");
        return allowedPort === urlPort;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}
