import { loadEnv } from "../lib/env";
loadEnv();
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";
import { connectDb } from "../lib/db";
import User from "../models/User";
import Transaction from "../models/Transaction";
import { hashPassword } from "../lib/auth";

function toPoishaFromTakaString(s: string): number {
  const cleaned = s.replace(/[^0-9.\-]/g, "");
  const n = parseFloat(cleaned);
  if (isNaN(n)) return 0;
  return Math.round(n * 100);
}

function extractAmountAndDate(cell: any): { amountPoisha: number; dateISO: string | null } | null {
  if (cell == null || cell === "") return null;
  const str = String(cell);
  // formats like: "5000.00 (2025-05-01T00:00:00.000Z)" or "2000.00 (2025-08-15)"
  const m = str.match(/([^()]+)\(([^)]+)\)/);
  if (!m) return null;
  const amountPart = m[1].trim();
  const datePartRaw = m[2].trim();
  const amountPoisha = toPoishaFromTakaString(amountPart);
  // remove time component like T00:00:00.000Z, keep just YYYY-MM-DD
  const dateOnly = datePartRaw.split("T")[0];
  // normalize to YYYY-MM-DD
  const iso = /\d{4}-\d{2}-\d{2}/.test(dateOnly) ? dateOnly : null;
  return { amountPoisha, dateISO: iso };
}

async function ensureAdmin() {
  const name = process.env.ADMIN_NAME || "Robin";
  const email = process.env.ADMIN_EMAIL || "robin@example.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await hashPassword(password);
  let admin = await User.findOne({ email });
  if (!admin) admin = await User.create({ name, email, role: "admin", passwordHash, status: "active" });
  else {
    if (admin.role !== "admin") admin.role = "admin" as any;
    await admin.save();
  }
  return admin;
}

async function upsertUserByUsername(username: string) {
  const name = username;
  let user = await User.findOne({ name });
  if (!user) {
    const passwordHash = await hashPassword(process.env.DEFAULT_USER_PASSWORD || "ChangeMe123!");
    user = await User.create({ name, role: "user", passwordHash, status: "active" });
  }
  return user;
}

async function main() {
  await connectDb();
  const admin = await ensureAdmin();

  const excelPath = process.env.EXCEL_PATH || path.resolve(process.cwd(), "all_payments_summary_admin.xlsx");
  if (!fs.existsSync(excelPath)) {
    console.error("Excel file not found:", excelPath);
    process.exit(1);
  }

  const wb = XLSX.read(fs.readFileSync(excelPath));
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });
  if (rows.length === 0) {
    console.log("No rows to import");
    process.exit(0);
  }

  // Detect month columns by header keys resembling YYYY-MM
  const headers = Object.keys(rows[0]);
  const monthCols = headers.filter((h) => /\d{4}-\d{2}/.test(String(h)));

  let created = 0;
  for (const r of rows) {
    const username = r["Username"] || r["username"] || r["Name"] || r["name"];
    if (!username || String(username).toLowerCase().includes("grand total")) continue;
    const user = await upsertUserByUsername(String(username).trim());

    for (const col of monthCols) {
      const cell = r[col];
      const parsed = extractAmountAndDate(cell);
      if (!parsed) continue;
      const { amountPoisha, dateISO } = parsed;
      if (!amountPoisha || !dateISO) continue;
      const occurredAt = new Date(dateISO); // date-only, no time zone shift
      await Transaction.create({
        userId: user._id,
        type: "deposit",
        amountPoisha,
        occurredAt,
        note: `Imported ${col}`,
        createdBy: admin._id,
      });
      created++;
    }
  }

  console.log("Summary import complete", { transactions: created, months: monthCols });
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
