import { loadEnv } from "./lib/env";
loadEnv();
import express from "express";
import path from "node:path";
import fs from "node:fs";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./lib/errors";
import { connectDb } from "./lib/db";
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
const isProd = process.env.NODE_ENV === "production";
const webDist = path.resolve(__dirname, "../../web/dist");

if (isProd && fs.existsSync(webDist)) {
  app.use(express.static(webDist));
  // SPA fallback for non-API routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(webDist, "index.html"));
  });
}

app.use(errorHandler);

async function start() {
  await connectDb();
  app.listen(PORT, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on :${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

function buildAllowedOrigins(envValue: string | undefined, port: number) {
  const defaults = [`http://localhost:${port}`, `http://127.0.0.1:${port}`];
  const list = (envValue || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set([...list, ...defaults]));
}

function isOriginAllowed(origin: string, allowed: string[]) {
  if (allowed.includes("*")) return true;
  try {
    const url = new URL(origin);
    return allowed.some((entry) => {
      try {
        const allowedUrl = new URL(entry);
        if (allowedUrl.hostname !== url.hostname) return false;
        if (allowedUrl.protocol && allowedUrl.protocol !== url.protocol) return false;
        if (!allowedUrl.port) return true;
        return allowedUrl.port === url.port;
      } catch {
        // allow host-only or host:port entries
        if (entry === url.hostname) return true;
        if (entry === `${url.hostname}:${url.port || (url.protocol === "https:" ? "443" : "80")}`) return true;
        if (entry === `${url.protocol}//${url.hostname}`) return true;
        return false;
      }
    });
  } catch {
    return false;
  }
}
