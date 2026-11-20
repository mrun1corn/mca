import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

let loaded = false;

/**
 * Values that must never be accepted as a signing secret. These are the
 * placeholders shipped in .env.example and the historical dev fallback.
 */
const PLACEHOLDER_SECRETS: Record<string, true> = {
  change_me: true,
  changeme: true,
  secret: true,
  your_secret_here: true,
  insecure_dev_secret_change_me: true,
  "your-super-secret-key": true,
};

const MIN_SECRET_LENGTH = 32;

export function isTestRuntime(): boolean {
  return process.env.NODE_ENV === "test";
}

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

/**
 * Fails closed. There is no insecure fallback secret in any environment:
 * a missing or placeholder signing key is a configuration error, not a warning.
 */
export function validateEnv() {
  const required = ["MONGODB_URI", "JWT_SECRET", "DB_NAME"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `[env] Missing required environment variables: ${missing.join(", ")}.\n` +
        "Copy .env.example to .env and fill in the values before starting the API."
    );
  }

  const secret = String(process.env.JWT_SECRET).trim();
  if (secret.length < MIN_SECRET_LENGTH || PLACEHOLDER_SECRETS[secret.toLowerCase()]) {
    throw new Error(
      `[env] JWT_SECRET is too weak: it must be at least ${MIN_SECRET_LENGTH} characters and not a placeholder.\n` +
        'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    );
  }
}

if (!process.env.__APP_ENV_LOADED) {
  loadEnv();
  if (!isTestRuntime()) {
    validateEnv();
  }
  process.env.__APP_ENV_LOADED = "1";
}
