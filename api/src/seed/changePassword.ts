import { loadEnv } from "../lib/env";
loadEnv();
import { connectDb } from "../lib/db";
import User from "../models/User";
import { hashPassword } from "../lib/auth";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function main() {
  await connectDb();
  const users = await User.find({ status: "active" }).sort({ name: 1, createdAt: 1 });
  if (!users.length) {
    console.error("No active users found.");
    process.exit(1);
  }

  console.log("Select a user to update:\n");
  users.forEach((user, idx) => {
    const identifier = [user.email, user.phone].filter(Boolean).join(" | ") || "no email/phone";
    console.log(`[${idx + 1}] ${user.name} (${identifier}) - ${user.role}`);
  });
  console.log("");

  const rl = readline.createInterface({ input, output });
  try {
    const selection = await rl.question("Enter the user number: ");
    const index = Number(selection) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= users.length) {
      console.error("Invalid selection.");
      process.exit(1);
    }

    const password = await rl.question("Enter the new password (min 6 chars): ");
    if (!password || password.length < 6) {
      console.error("Password must be at least 6 characters.");
      process.exit(1);
    }

    const user = users[index];
    user.passwordHash = await hashPassword(password);
    await user.save();
    console.log(`Password updated for ${user.name} (${user.email || user.phone || user.id})`);
    process.exit(0);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
