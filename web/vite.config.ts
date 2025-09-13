import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
  const rootEnv = path.resolve(__dirname, "..", ".env");
  if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });
  const env = loadEnv(mode, process.cwd(), "");

  const allowedHosts = (env.VITE_ALLOWED_HOSTS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const server: any = {
    host: true,
    port: Number(env.VITE_DEV_PORT || 5173),
    allowedHosts: allowedHosts.length ? allowedHosts : true,
  };

  if (env.VITE_HMR_HOST) {
    server.hmr = {
      host: env.VITE_HMR_HOST,
      protocol: env.VITE_HMR_PROTOCOL || "wss",
      clientPort: Number(env.VITE_HMR_CLIENT_PORT || 443),
    };
  }

  return {
    define: {
      "import.meta.env.VITE_API_BASE": JSON.stringify(env.VITE_API_BASE || "http://localhost:4000/api"),
      "import.meta.env.VITE_APP_NAME": JSON.stringify(env.VITE_APP_NAME || "Community Savings"),
      "import.meta.env.VITE_APP_LOGO": JSON.stringify(env.VITE_APP_LOGO || ""),
    },
    server,
  };
});
