import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "node:path";
import Transaction from "../src/models/Transaction";
import User from "../src/models/User";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "mca";

async function migrate() {
  console.log(`Connecting to MongoDB Atlas Database: ${DB_NAME}...`);
  await mongoose.connect(MONGODB_URI!, { dbName: DB_NAME });
  console.log("Connected successfully!");

  const users = await User.find({});
  const userMap = new Map(users.map((u) => [String(u._id), u.name]));

  const coreMembers = ["robin", "faysal", "shanto", "rafi_shofik", "tushar"];
  const cycleOrder2025_2026 = [
    "2025-04",
    "2025-05",
    "2025-06",
    "2025-07",
    "2025-08",
    "2025-09",
    "2025-10",
    "2025-11",
    "2025-12",
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
  ];

  let updatedCount = 0;

  for (const user of users) {
    const uname = user.name;
    const userTxs = await Transaction.find({
      userId: user._id,
      type: "deposit",
      deletedAt: { $exists: false },
    }).sort({ occurredAt: 1, _id: 1 });

    console.log(`\nProcessing ${uname} (${userTxs.length} deposits):`);

    if (coreMembers.includes(uname)) {
      // 16 deposits mapped sequentially to the 16 active cycles
      for (let i = 0; i < userTxs.length; i++) {
        const targetCycle = cycleOrder2025_2026[i] || userTxs[i].occurredAt.toISOString().slice(0, 7);
        userTxs[i].set("cycleMonth", targetCycle);
        await userTxs[i].save();
        updatedCount++;
        console.log(`  Tx #${i + 1} (${userTxs[i].occurredAt.toISOString().slice(0, 10)}) -> Cycle: ${targetCycle}`);
      }
    } else if (uname === "asif_nazmul") {
      // Asif Nazmul had deposits in 2025-04, 05, 06, 07, 08, then paused till 2026-03, 04, 06, 07, 08
      const asifCycles = [
        "2025-04",
        "2025-05",
        "2025-06",
        "2025-07",
        "2025-08",
        "2026-03",
        "2026-04",
        "2026-06",
        "2026-07",
        "2026-08",
      ];
      for (let i = 0; i < userTxs.length; i++) {
        const targetCycle = asifCycles[i] || userTxs[i].occurredAt.toISOString().slice(0, 7);
        userTxs[i].set("cycleMonth", targetCycle);
        await userTxs[i].save();
        updatedCount++;
        console.log(`  Tx #${i + 1} (${userTxs[i].occurredAt.toISOString().slice(0, 10)}) -> Cycle: ${targetCycle}`);
      }
    } else {
      // Jihad and other users
      for (let i = 0; i < userTxs.length; i++) {
        const fallbackCycle = userTxs[i].occurredAt.toISOString().slice(0, 7);
        userTxs[i].set("cycleMonth", fallbackCycle);
        await userTxs[i].save();
        updatedCount++;
        console.log(`  Tx #${i + 1} (${userTxs[i].occurredAt.toISOString().slice(0, 10)}) -> Cycle: ${fallbackCycle}`);
      }
    }
  }

  console.log(`\n✅ Migration complete! Updated ${updatedCount} transactions with accurate cycleMonth.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
