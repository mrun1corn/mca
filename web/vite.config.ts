import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  const rootEnv = path.resolve(__dirname, "..", ".env");
  if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "import.meta.env.VITE_API_BASE": JSON.stringify(env.VITE_API_BASE || "http://localhost:4000/api"),
      "import.meta.env.VITE_APP_NAME": JSON.stringify(env.VITE_APP_NAME || "Community Savings"),
      "import.meta.env.VITE_APP_LOGO": JSON.stringify(env.VITE_APP_LOGO || ""),
    },
  };
});

