import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "node:path";
import User from "../src/models/User";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "mca";

async function main() {
  console.log(`Connecting to MongoDB Atlas Database: ${DB_NAME}...`);
  await mongoose.connect(MONGODB_URI!, { dbName: DB_NAME });
  console.log("Connected successfully!");

  const users = await User.find({}).sort({ createdAt: 1, name: 1 });
  console.log(`Found ${users.length} users to migrate.\n`);

  const priorityOrder = ["robin", "shanto", "faysal", "rafi_shofik", "tushar", "jihad", "asif_nazmul"];

  // Sort users according to predefined order or fallback to createdAt
  users.sort((a, b) => {
    const aIdx = priorityOrder.indexOf(a.name.toLowerCase());
    const bIdx = priorityOrder.indexOf(b.name.toLowerCase());
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0);
  });

  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const cleanUsername = u.name.toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
    const codeNumber = String(i + 1).padStart(3, "0");
    const code = `MCA-${codeNumber}`;

    u.username = cleanUsername;
    u.memberCode = code;

    await u.save();
    console.log(`  ✓ Member: ${u.name.padEnd(15)} -> Username: @${u.username.padEnd(15)} | Member Code: ${u.memberCode}`);
  }

  console.log("\n✅ All users successfully assigned clean usernames and member codes!");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
