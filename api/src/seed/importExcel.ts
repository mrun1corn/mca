import { loadEnv } from "../lib/env";
loadEnv();
import path from "node:path";
import fs from "node:fs";
import { connectDb } from "../lib/db";
import User from "../models/User";
import Transaction from "../models/Transaction";
import { hashPassword } from "../lib/auth";
import * as XLSX from "xlsx";

type Row = Record<string, any>;

function normKey(k: string) {
  return k.trim().toLowerCase().replace(/\s+/g, "_");
}

function toAmount(val: any): number {
  if (val == null) return 0;
  const raw = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  if (isNaN(raw)) return 0;
  return raw;
}

function parseDate(val: any): Date {
  if (val instanceof Date) return val;
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d;
  return new Date();
}

async function upsertUser({ name, email, phone }: { name: string; email?: string; phone?: string }) {
  const existing = email
    ? await User.findOne({ email })
    : phone
      ? await User.findOne({ phone })
      : null;
  if (existing) return existing;
  const passwordHash = await hashPassword(process.env.DEFAULT_USER_PASSWORD || "ChangeMe123!");
  return User.create({ name, email, phone, role: "user", passwordHash, status: "active" });
}

export async function importExcel() {
  const excelPath = process.env.EXCEL_PATH;
  if (!excelPath) {
    console.error("EXCEL_PATH not set");
    return;
  }
  if (!fs.existsSync(excelPath)) {
    console.error("Excel file not found:", excelPath);
    return;
  }

  await connectDb();

  const wb = XLSX.readFile(excelPath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Row>(ws);

  let admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!admin) {
    const adminName = process.env.ADMIN_NAME || "Admin";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "StrongPassword123!";
    const adminHash = await hashPassword(adminPassword);
    admin = await User.create({ name: adminName, email: adminEmail, role: "admin", passwordHash: adminHash, status: "active" });
    console.log("Created admin:", adminEmail);
  }

  const usersTouched = new Set<string>();

  for (const row of rows) {
    const obj: Record<string, any> = {};
    for (const [key, val] of Object.entries(row)) {
      obj[normKey(key)] = val;
    }

    const name = obj.name || obj.member || obj.user || "";
    const email = obj.email || undefined;
    const phone = obj.phone || obj.mobile || undefined;
    const typeRaw = (obj.type || obj.tx_type || obj.category || "deposit").toString().toLowerCase();
    const type = typeRaw.includes("with") || typeRaw.includes("cash") ? "withdraw" : "deposit";
    const amount = toAmount(obj.amount || obj.amount_poisha || obj.value || 0);
    const date = parseDate(obj.date || obj.occurred_at || obj.when || new Date());
    const note = obj.note || obj.description || "Imported";
    if (!name || !amount) continue;

    const user = await upsertUser({ name, email, phone });
    usersTouched.add(String(user._id));
    const amt = type === "withdraw" ? -Math.abs(amount) : Math.abs(amount);
    await Transaction.create({
      userId: user._id,
      type,
      amount: amt,
      occurredAt: date,
      note,
      createdBy: admin._id,
    });
  }

  console.log(`Imported ${usersTouched.size} users and their transactions.`);
}

importExcel()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
