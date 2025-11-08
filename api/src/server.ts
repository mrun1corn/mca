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

const app = express();

app.use(express.json());
app.use(cookieParser());
// CORS: allow one or more origins via CORS_ORIGIN (comma-separated)
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // non-browser or same-origin
      if (allowedOrigins.includes(origin)) return callback(null, true);
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

const PORT = Number(process.env.PORT || 4000);

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
