import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { connectDb } from "../src/lib/db";
import Transaction from "../src/models/Transaction";
import User from "../src/models/User";
import Due from "../src/models/Due";

async function verify() {
  await connectDb();
  const users = await User.find().sort({ name: 1 });

  console.log("=== COMPREHENSIVE FINANCIAL AUDIT OF ALL USERS ===\n");

  for (const u of users) {
    const deposits = await Transaction.find({
      userId: u._id,
      type: "deposit",
      deletedAt: { $exists: false }
    }).sort({ occurredAt: 1 });

    const deletedDeposits = await Transaction.find({
      userId: u._id,
      type: "deposit",
      deletedAt: { $exists: true }
    });

    const totalDeposit = deposits.reduce((sum, t) => sum + t.amount, 0);

    const dep2025 = deposits.filter(t => t.occurredAt.getFullYear() === 2025);
    const dep2026 = deposits.filter(t => t.occurredAt.getFullYear() === 2026);

    const sum2025 = dep2025.reduce((sum, t) => sum + t.amount, 0);
    const sum2026 = dep2026.reduce((sum, t) => sum + t.amount, 0);

    console.log(`User: ${u.name} (Role: ${u.role}, Status: ${u.status})`);
    console.log(`  2025 Deposits (${dep2025.length} txs): ${sum2025} BDT`);
    console.log(`  2026 Deposits (${dep2026.length} txs): ${sum2026} BDT`);
    console.log(`  All-Time Total: ${totalDeposit} BDT`);
    if (deletedDeposits.length > 0) {
      console.log(`  Deleted Deposits: ${deletedDeposits.map(d => `${d.amount} BDT on ${d.occurredAt.toISOString().slice(0, 10)}`).join(", ")}`);
    }

    const dues = await Due.find({ userId: u._id });
    if (dues.length > 0) {
      console.log(`  Dues (${dues.length}): ${dues.map(d => `Principal: ${d.principal}, Status: ${d.status}, Paid: ${d.paidAmount || 0}`).join(" | ")}`);
    }

    console.log("--------------------------------------------------");
  }

  process.exit(0);
}

verify();
