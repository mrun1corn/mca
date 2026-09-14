import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "node:path";
import User from "../src/models/User";
import Transaction from "../src/models/Transaction";
import { handleDeposit } from "../src/services/deposit";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "mca";

async function main() {
  console.log(`Connecting to MongoDB Atlas Database: ${DB_NAME}...`);
  await mongoose.connect(MONGODB_URI!, { dbName: DB_NAME });
  console.log("Connected successfully!");

  const rafi = await User.findOne({ name: "rafi_shofik" });
  if (!rafi) throw new Error("rafi_shofik user not found");

  const admin = await User.findOne({ role: "admin" });

  const existing = await Transaction.findOne({
    userId: rafi._id,
    type: "deposit",
    cycleMonth: "2026-09",
    deletedAt: { $exists: false },
  });

  if (existing) {
    console.log("Transaction already exists for rafi_shofik in 2026-09:", existing._id);
    await mongoose.disconnect();
    return;
  }

  const result = await handleDeposit({
    userId: String(rafi._id),
    mode: "simple",
    amount: 2000,
    date: "2026-09-13T00:00:00.000Z",
    cycleMonth: "2026-09",
    note: "Deposit",
    actorUserId: admin ? String(admin._id) : undefined,
  });

  console.log("✅ Successfully created transaction for rafi_shofik!");
  console.log("Transaction details:", {
    id: result.tx._id,
    userName: result.tx.userName,
    amount: result.tx.amount,
    occurredAt: result.tx.occurredAt,
    cycleMonth: result.tx.cycleMonth,
    note: result.tx.note,
  });

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error adding payment:", err);
  process.exit(1);
});
