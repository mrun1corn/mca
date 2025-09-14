require("dotenv").config({ path: ".env" });

module.exports = {
  apps: [
    {
      name: "savings-api",
      script: "api/dist/server.js",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production", ...process.env }
    },
    {
      name: "savings-web",
      cwd: "web",
      script: "node_modules/vite/bin/vite.js",
      args: "preview --host 0.0.0.0 --port 5173",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production", ...process.env }
    }
  ]
};

