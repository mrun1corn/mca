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

  const apiBase = env.VITE_API_BASE || "http://localhost:4000/api";

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

  // When running the web app separately from the API (e.g., Vite on 5173, API on 4000)
  // we still use a relative VITE_API_BASE (/api) across environments but proxy it locally.
  if (apiBase.startsWith("/")) {
    const devApiTarget = env.VITE_DEV_API_TARGET || "http://localhost:4000";
    server.proxy = {
      ...(server.proxy || {}),
      [apiBase]: {
        target: devApiTarget,
        changeOrigin: true,
        secure: false,
      },
    };
  }

  return {
    define: {
      "import.meta.env.VITE_API_BASE": JSON.stringify(apiBase),
      "import.meta.env.VITE_APP_NAME": JSON.stringify(env.VITE_APP_NAME || "Community Savings"),
      "import.meta.env.VITE_APP_LOGO": JSON.stringify(env.VITE_APP_LOGO || ""),
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@tanstack/react-query",
        "axios"
      ]
    },
    esbuild: {
      target: "es2018"
    },
    server,
  };
});
