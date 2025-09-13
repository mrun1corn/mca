# Community Savings App

Local dev setup for API (Node/Express/Mongo/Mongoose) and Web (React/Vite/TS).

## Prereqs
- Node.js 20+
- MongoDB Atlas connection string

## Setup
1. Copy envs:
   - `cp api/.env.example api/.env`
   - `cp web/.env.example web/.env`
   - Edit `api/.env` and set `MONGODB_URI`.
2. Install deps:
   - API: `cd api && npm i`
   - Web: `cd ../web && npm i`
3. Seed sample users (optional):
   - `cd ../api && npm run seed`
4. Create admin (first time):
   - Set env: `ADMIN_EMAIL`, `ADMIN_PASSWORD` (optional `ADMIN_NAME`)
   - Run: `npm run create-admin` (in `api/`)
4. One-command dev run (from repo root):
   - Install tooling + sub-deps: `npm i && npm run install:all`
   - Start both servers: `npm run dev`
     - API: http://localhost:4000
     - Web: http://localhost:5173

## Accounts
- Seed creates sample users (Alice, Bob, Carol, Dave) with password `ChangeMe123!`.
- Create your own admin using `npm run create-admin` (see above).

## Password Change
- From the Login page, click "Change password" to update a user's password using email + current password.
