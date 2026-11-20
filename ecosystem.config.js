require("dotenv").config({ path: ".env" });

module.exports = {
  apps: [
    {
      name: "savings-api",
      script: "api/dist/server.js",
      exec_mode: "fork",
      instances: 1,
      // Secrets stay in .env (loaded by the app); PM2 must not snapshot them
      // into ~/.pm2/dump.pm2, and NODE_ENV is pinned after any inherited value.
      env: { NODE_ENV: "production" }
    }
  ]
};
