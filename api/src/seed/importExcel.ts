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

function toPoisha(val: any): number {
  if (val == null) return 0;
  if (typeof val === "number") return Math.round(val * 100);
  const s = String(val).replace(/[^0-9.\-]/g, "");
  const n = parseFloat(s);
  if (isNaN(n)) return 0;
  return Math.round(n * 100);
}

function parseDate(val: any): Date {
  if (val instanceof Date) return val;
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d;
  return new Date();
}

async function upsertUser({ name, email, phone }: { name: string; email?: string; phone?: string }) {
  const q: any = email ? { email } : { name };
  let user = await User.findOne(q);
  if (!user) {
    const passwordHash = await hashPassword(process.env.DEFAULT_USER_PASSWORD || "ChangeMe123!");
    user = await User.create({ name, email, phone, role: "user", passwordHash, status: "active" });
  } else {
    if (phone && !user.phone) user.phone = phone;
    await user.save();
  }
  return user;
}

async function main() {
  await connectDb();

  // Ensure admin 'robin'
  const adminName = process.env.ADMIN_NAME || "Robin";
  const adminEmail = process.env.ADMIN_EMAIL || "robin@example.com";
  const adminPass = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const adminHash = await hashPassword(adminPass);
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) admin = await User.create({ name: adminName, email: adminEmail, role: "admin", passwordHash: adminHash, status: "active" });
  else {
    admin.name = adminName;
    admin.role = "admin" as any;
    await admin.save();
  }

  const excelPath = process.env.EXCEL_PATH || path.resolve(process.cwd(), "all_payments_summary_admin.xlsx");
  if (!fs.existsSync(excelPath)) {
    console.error("Excel not found:", excelPath);
    process.exit(1);
  }

  const wb = XLSX.read(fs.readFileSync(excelPath));
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows: Row[] = XLSX.utils.sheet_to_json(ws, { defval: "" });
  let createdTx = 0;
  let usersTouched = new Set<string>();

  for (const r of rows) {
    // Normalize keys
    const obj: Record<string, any> = {};
    for (const [k, v] of Object.entries(r)) obj[normKey(k)] = v;

    const name = obj.name || obj.member || obj.user || "";
    const email = obj.email || undefined;
    const phone = obj.phone || obj.mobile || undefined;
    const typeRaw = (obj.type || obj.tx_type || obj.category || "deposit").toString().toLowerCase();
    const type = typeRaw.includes("with") || typeRaw.includes("cash") ? "withdraw" : "deposit";
    const amountPoisha = toPoisha(obj.amount || obj.amount_poisha || obj.value || 0);
    const date = parseDate(obj.date || obj.occurred_at || obj.when || new Date());
    const note = obj.note || obj.description || "Imported";
    if (!name || !amountPoisha) continue;

    const user = await upsertUser({ name, email, phone });
    usersTouched.add(String(user._id));
    const amt = type === "withdraw" ? -Math.abs(amountPoisha) : Math.abs(amountPoisha);
    await Transaction.create({
      userId: user._id,
      type,
      amountPoisha: amt,
      occurredAt: date,
      note,
      createdBy: admin._id,
    });
    createdTx++;
  }

  console.log("Import done", { usersTouched: usersTouched.size, createdTx });
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
