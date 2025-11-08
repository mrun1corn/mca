import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

let loaded = false;

export function loadEnv() {
  if (loaded) return;
  loaded = true;
  // Try multiple locations to support root-level .env without requiring api/.env
  const candidates = [
    // When compiled, __dirname is api/dist/lib; go up 3 levels to repo root
    path.resolve(__dirname, "../../../.env"),
    // When running from api/ as CWD, go up one level to repo root
    path.resolve(process.cwd(), "../.env"),
    // Fallback to api/.env (optional override)
    path.resolve(process.cwd(), ".env"),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      dotenv.config({ path: p });
    }
  }
}

if (!process.env.__APP_ENV_LOADED) {
  loadEnv();
  process.env.__APP_ENV_LOADED = "1";
}
