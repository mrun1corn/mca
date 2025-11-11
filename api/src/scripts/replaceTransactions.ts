import { loadEnv } from "../lib/env";
loadEnv();
import mongoose, { Types } from "mongoose";
import { connectDb } from "../lib/db";
import Transaction from "../models/Transaction";

type DepositRow = {
  date: string;
  userId: string;
  name: string;
  amount: number;
  note: string;
};

const dataset: DepositRow[] = [
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 5000, note: "Deposit" },
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 5000, note: "Deposit" },
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 5000, note: "Deposit" },
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 5000, note: "Deposit" },
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 5000, note: "Deposit" },
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 5000, note: "Deposit" },
  { date: "2025-05-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 5000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000, note: "Deposit" },
  { date: "2025-06-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000, note: "Deposit" },
  { date: "2025-07-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000, note: "Deposit" },
  { date: "2025-08-07T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000, note: "Deposit" },
  { date: "2025-08-15T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000, note: "Deposit" },
  { date: "2025-08-15T00:00:00Z", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000, note: "Deposit" },
  { date: "2025-08-15T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000, note: "Deposit" },
  { date: "2025-08-15T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000, note: "Deposit" },
  { date: "2025-08-15T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000, note: "Deposit" },
  { date: "2025-08-15T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000, note: "Deposit" },
  { date: "2025-09-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000, note: "Deposit" },
  { date: "2025-09-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad23d", name: "asif", amount: 2000, note: "Deposit" },
  { date: "2025-09-01T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000, note: "Deposit" },
  { date: "2025-09-01T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000, note: "Deposit" },
  { date: "2025-09-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000, note: "Deposit" },
  { date: "2025-09-09T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000, note: "Deposit" },
  { date: "2025-09-14T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000, note: "Deposit" },
  { date: "2025-10-01T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000, note: "Deposit" },
  { date: "2025-10-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000, note: "Deposit" },
  { date: "2025-10-01T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000, note: "Deposit" },
  { date: "2025-10-01T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000, note: "Deposit" },
  { date: "2025-10-09T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000, note: "Deposit" },
  { date: "2025-10-18T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000, note: "Deposit" },
  { date: "2025-11-09T00:00:00Z", userId: "68c5b61eb04c932bc41ad25e", name: "robin", amount: 2000, note: "Deposit" },
  { date: "2025-11-09T00:00:00Z", userId: "68c5b61fb04c932bc41ad27f", name: "rafi_shofik", amount: 2000, note: "Deposit" },
  { date: "2025-11-09T00:00:00Z", userId: "68c5b61cb04c932bc41ad248", name: "shanto", amount: 2000, note: "Deposit" },
  { date: "2025-11-09T00:00:00Z", userId: "68c5b61fb04c932bc41ad274", name: "tushar", amount: 2000, note: "Deposit" },
  { date: "2025-11-09T00:00:00Z", userId: "68c5b61eb04c932bc41ad269", name: "nasim", amount: 2000, note: "Deposit" },
  { date: "2025-11-09T00:00:00Z", userId: "68c5b61db04c932bc41ad253", name: "faysal", amount: 2000, note: "Deposit" },
];

async function main() {
  await connectDb();
  console.log("Connected to MongoDB");

  console.log("Deleting existing transactions…");
  const deleteResult = await Transaction.deleteMany({});
  console.log(`Deleted ${deleteResult.deletedCount ?? 0} transaction(s).`);

  const docs = dataset.map((row) => ({
    userId: new Types.ObjectId(row.userId),
    type: "deposit" as const,
    amountPoisha: Math.round(row.amount * 100),
    occurredAt: new Date(row.date),
    note: row.note || "Deposit",
  }));

  await Transaction.insertMany(docs);
  console.log(`Inserted ${docs.length} deposit transactions.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.connection.close());
