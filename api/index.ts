import { app } from "./src/app";
import { connectDb } from "./src/lib/db";

let dbReady = false;

async function ensureDb() {
  if (dbReady) return;
  await connectDb();
  dbReady = true;
}

export default async function handler(req: any, res: any) {
  await ensureDb();
  return app(req, res);
}
