require("dotenv").config({ path: ".env" });

module.exports = {
  apps: [
    {
      name: "savings-api",
      script: "api/dist/server.js",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production", ...process.env }
    }
  ]
};
