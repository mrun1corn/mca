import { Types } from "mongoose";
import { loadEnv } from "../lib/env";
loadEnv();
import { connectDb } from "../lib/db";
import User from "../models/User";
import Transaction from "../models/Transaction";
import { hashPassword } from "../lib/auth";

type Row = {
  date: string;
  userId: string;
  name: string;
  email?: string;
  amount: number;
  note?: string;
};

const rows: Row[] = [
  { date: "5/1/2025 0:00", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 5000 },
  { date: "5/1/2025 0:00", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 5000 },
  { date: "5/1/2025 0:00", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 5000 },
  { date: "5/1/2025 0:00", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 5000 },
  { date: "5/1/2025 0:00", userId: "68c5b61eb04c932bc41ad25e", name: "robin", email: "robin@example.com", amount: 5000 },
  { date: "5/1/2025 0:00", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 5000 },
  { date: "5/1/2025 0:00", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 5000 },
  { date: "6/1/2025 0:00", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000 },
  { date: "6/1/2025 0:00", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000 },
  { date: "6/1/2025 0:00", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000 },
  { date: "6/1/2025 0:00", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000 },
  { date: "6/1/2025 0:00", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000 },
  { date: "6/1/2025 0:00", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000 },
  { date: "6/1/2025 0:00", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000 },
  { date: "7/1/2025 0:00", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000 },
  { date: "8/7/2025 0:00", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000 },
  { date: "8/15/2025 0:00", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000 },
  { date: "8/15/2025 0:00", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000 },
  { date: "8/15/2025 0:00", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000 },
  { date: "8/15/2025 0:00", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000 },
  { date: "8/15/2025 0:00", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000 },
  { date: "8/15/2025 0:00", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000 },
  { date: "9/1/2025 0:00", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000 },
  { date: "9/1/2025 0:00", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000 },
  { date: "9/1/2025 0:00", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000 },
  { date: "9/1/2025 0:00", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000 },
  { date: "9/1/2025 0:00", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000 },
  { date: "9/9/2025 0:00", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000 },
  { date: "9/14/2025 0:00", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000 },
  { date: "10/1/2025 0:00", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000 },
  { date: "10/1/2025 0:00", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000 },
  { date: "10/1/2025 0:00", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000 },
  { date: "10/1/2025 0:00", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000 },
  { date: "10/9/2025 0:00", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000 },
  { date: "10/18/2025 0:00", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000 },
];

function parseDate(dateStr: string) {
  const [md, timePart = "0:00"] = dateStr.split(" ");
  const [monthStr, dayStr, yearStr] = md.split("/");
  const [hourStr, minuteStr] = timePart.split(":");
  const month = Number(monthStr) - 1;
  const day = Number(dayStr);
  const year = Number(yearStr);
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  return new Date(Date.UTC(year, month, day, hour, minute));
}

async function seed() {
  await connectDb();
  const uniqueUsers = new Map<string, { name: string; email?: string }>();
  for (const row of rows) {
    if (!uniqueUsers.has(row.userId)) {
      uniqueUsers.set(row.userId, { name: row.name, email: row.email });
    }
  }

  const defaultPasswordHash = await hashPassword("ChangeMe123!");
  const robinPasswordHash = await hashPassword("robin01716");

  for (const [userId, meta] of uniqueUsers.entries()) {
    const isRobin = meta.name.toLowerCase() === "robin";
    const existing = await User.findById(userId);
    if (existing) {
      let changed = false;
      if (isRobin) {
        if (existing.role !== "admin") {
          existing.role = "admin";
          changed = true;
        }
        if (existing.passwordHash !== robinPasswordHash) {
          existing.passwordHash = robinPasswordHash;
          changed = true;
        }
      }
      if (changed) await existing.save();
      continue;
    }
    await User.create({
      _id: new Types.ObjectId(userId),
      name: meta.name,
      email: meta.email || `${meta.name}@example.com`,
      passwordHash: isRobin ? robinPasswordHash : defaultPasswordHash,
      role: isRobin ? "admin" : "user",
      status: "active",
    });
  }

  for (const row of rows) {
    const occurredAt = parseDate(row.date);
    const amountPoisha = Math.round(row.amount * 100);
    const userObjectId = new Types.ObjectId(row.userId);
    const existing = await Transaction.findOne({
      userId: userObjectId,
      type: "deposit",
      amountPoisha,
      occurredAt,
    }).lean();
    if (existing) continue;
    await Transaction.create({
      userId: userObjectId,
      type: "deposit",
      amountPoisha,
      occurredAt,
      note: row.note || "Deposit",
    });
  }

  // eslint-disable-next-line no-console
  console.log("Manual deposits imported successfully.");
  process.exit(0);
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
