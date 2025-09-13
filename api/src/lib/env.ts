import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

export function loadEnv() {
  // Load root .env first (if present), then api/.env to allow per-service overrides
  const rootEnv = path.resolve(__dirname, "../../.env");
  if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });
  const apiEnv = path.resolve(__dirname, "../..", "api", ".env");
  if (fs.existsSync(apiEnv)) dotenv.config({ path: apiEnv });
}

