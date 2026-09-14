import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "node:path";
import Transaction from "../src/models/Transaction";
import User from "../src/models/User";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "mca";

async function main() {
  console.log(`Connecting to MongoDB Atlas Database: ${DB_NAME}...`);
  await mongoose.connect(MONGODB_URI!, { dbName: DB_NAME });
  console.log("Connected successfully!");

  const txs = await Transaction.find({ deletedAt: { $exists: false }, type: "deposit" });
  console.log(`Processing ${txs.length} deposit transactions...`);

  let updated = 0;

  for (const t of txs) {
    const dateStr = t.occurredAt.toISOString().slice(0, 10);
    let targetCycle: string;

    // 2025 Collections (Option A: 8 continuous rounds from May to December):
    if (dateStr === "2025-04-30") {
      targetCycle = "2025-05"; // Round 1: Opening collection (5,000 BDT)
    } else if (dateStr === "2025-05-31") {
      targetCycle = "2025-06"; // Round 2
    } else if (dateStr === "2025-06-30") {
      targetCycle = "2025-07"; // Round 3
    } else if (dateStr === "2025-08-06" || dateStr === "2025-08-14") {
      targetCycle = "2025-08"; // Round 4 (Aug 6 Robin, Aug 14 others)
    } else if (dateStr === "2025-08-31" || dateStr === "2025-09-08" || dateStr === "2025-09-13") {
      targetCycle = "2025-09"; // Round 5 (Aug 31 others, Sep 8 Tushar, Sep 13 Robin)
    } else if (dateStr === "2025-09-30" || dateStr === "2025-10-08") {
      targetCycle = "2025-10"; // Round 6 (Sep 30 others, Oct 8 Robin)
    } else if (dateStr === "2025-11-08") {
      targetCycle = "2025-11"; // Round 7 (All members paid on Nov 8)
    } else if (dateStr.startsWith("2025-12")) {
      targetCycle = "2025-12"; // Round 8 (December payments)
    } else {
      // For all 2026 transactions, cycleMonth matches the exact occurred month!
      targetCycle = t.occurredAt.toISOString().slice(0, 7);
    }

    t.set("cycleMonth", targetCycle);
    await t.save();
    updated++;
  }

  console.log(`\n✅ Updated ${updated} transactions.`);

  // Verify monthly totals for 2025 and 2026
  for (const year of [2025, 2026]) {
    const yearTxs = await Transaction.find({
      type: "deposit",
      deletedAt: { $exists: false },
      cycleMonth: { $regex: `^${year}-` },
    });

    const monthMap: Record<string, number> = {};
    let yearTotal = 0;
    for (const t of yearTxs) {
      const cm = t.get("cycleMonth") as string;
      monthMap[cm] = (monthMap[cm] || 0) + t.amount;
      yearTotal += t.amount;
    }

    console.log(`\n=== Verified ${year} Totals (Year Total: ${yearTotal}) ===`);
    for (const [m, sum] of Object.entries(monthMap).sort()) {
      console.log(`  ${m}: ${sum}`);
    }
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
