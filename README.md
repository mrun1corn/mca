Community Savings App

Full‑stack app for community savings: deposits, cash‑outs (withdraw), split deductions, dues, and CSV exports.

Prerequisites
- Node.js 20+
- MongoDB Atlas connection string

Monorepo
- api/ — Express + TypeScript + Mongoose
- web/ — React + Vite + TypeScript + Tailwind

Environment (single .env at repo root)

Copy example and edit values:

```
cp .env.example .env
```

Root .env contents:

```env
MONGODB_URI="<your_atlas_connection_string>"
JWT_SECRET="change_me"
JWT_ACCESS_TTL_MIN=30
JWT_REFRESH_TTL_DAYS=7
# CORS can accept multiple origins (comma‑separated). Use your MACHINE_IP for dev access from other devices.
# Example: "http://<MACHINE_IP>:5173,http://localhost:5173"
CORS_ORIGIN="http://localhost:5173"
PORT=4000

# Optional (used by scripts)
ADMIN_NAME="Robin"
ADMIN_EMAIL="robin@example.com"
ADMIN_PASSWORD="StrongPassword123!"
DEFAULT_USER_PASSWORD="ChangeMe123!"
EXCEL_PATH="/absolute/path/to/all_payments_summary_admin.xlsx"

# Frontend branding/API base
VITE_API_BASE="http://localhost:4000/api"  # optional; omit to auto‑fallback to http://<MACHINE_IP>:4000/api in dev
VITE_APP_NAME="Community Savings"
VITE_APP_LOGO=""  # optional URL or /path
```

Install & Run (single command)
- From repo root:
  - `npm i && npm run install:all`
  - `npm run dev`
    - API: http://localhost:4000
    - Web: http://localhost:5173

Allowing access from other devices (same network)
- Set `CORS_ORIGIN` in `.env` to include your machine IP origin, e.g.
  - `CORS_ORIGIN="http://<MACHINE_IP>:5173,http://localhost:5173"`
- Restart API so CORS updates are applied.
- Vite dev already binds to `0.0.0.0:5173`; the web app will default API calls to `http://<MACHINE_IP>:4000/api` if `VITE_API_BASE` is not set or points at localhost.

Cloudflare Zero Trust / Custom Hostnames
- Vite dev blocks unknown hosts by default. Configure allowed hostnames via `.env`:
  - `VITE_ALLOWED_HOSTS="mydomain.com"`
  - For HMR over Cloudflare (HTTPS), add:
    - `VITE_HMR_HOST="mydomain.com"`
    - `VITE_HMR_PROTOCOL="wss"`
    - `VITE_HMR_CLIENT_PORT=443`
- Include your web origin in `CORS_ORIGIN`, e.g. `https://mydomain.com`.

Seeding, Admin, Import
- Seed sample users: `npm run seed` (pwd: `ChangeMe123!`)
- Create admin: set `ADMIN_EMAIL/ADMIN_PASSWORD` then `npm run create-admin`
- Import monthly summary Excel: set `EXCEL_PATH` then `npm run import-summary`
  - Headers like: Username, 2025‑05, 2025‑06, …
  - Cell format: `5000.00 (2025-05-01T00:00:00.000Z)` or `2000.00 (2025-08-15)`

Core Features
- Auth: username or email + password; JWT cookies; refresh/logout; change‑password endpoint
- RBAC: admin/accountant/user
- Home: KPIs (Members, Total Balance, Remaining Balance, Open Dues) + member cards
- People: search; admin can create/edit/delete; responsive form
- Deposit: Simple; Due Payment (only shown if member has open dues), auto‑fills suggested amount (editable)
- Withdraw: taker cash‑out; split across others (exclusions + live preview); creates dues schedule
- Dues: schedules with penalty rules; penalty applied on overdue payments when enabled
- Export: `summary.csv`, `ledger.csv` with optional date/user filters
- Dark mode, mobile‑friendly, subtle animations

API Endpoints (selected)
- POST `/api/auth/login` { identifier, password }
- POST `/api/auth/change-password` { email, currentPassword, newPassword }
- GET `/api/home`
- GET `/api/users?q=`; POST `/api/users`; PATCH/DELETE `/api/users/:id`; GET `/api/me`
- GET `/api/transactions`; POST `/api/deposit`; POST `/api/withdraw`
- GET `/api/users/:id/dues?status=open|all`
- GET `/api/export/summary.csv`; GET `/api/export/ledger.csv`

Branding
- Set `VITE_APP_NAME` and `VITE_APP_LOGO` in the root `.env` to update navbar brand and page title.

Troubleshooting
- CORS/cookies: ensure `CORS_ORIGIN` matches `http://localhost:5173`
- Atlas connectivity: verify URI + IP allowlist; watch API logs for `API listening on :4000`
- Login: change password from the Login page (toggle "Change password")

Raspberry Pi / Low‑Power Device Tips
- Prefer production mode for best performance:
  - Build on a faster machine and copy `api/dist` + `web/dist` to the Pi.
  - Run API with `NODE_ENV=production node api/dist/server.js` and serve `web/dist` via Nginx.
- Faster dev on Pi:
  - API uses `tsx` (esbuild) for quicker startup (`npm run dev`).
  - Vite pre‑bundles deps (optimizeDeps) and binds to 0.0.0.0 by default.
  - Avoid watching large folders; keep the repo on local storage (not network).
- System:
  - Ensure swap is enabled (e.g., 1–2 GB) to prevent OOM during first build.
  - Keep `ca-certificates` and time synced (TLS to Atlas depends on it).
