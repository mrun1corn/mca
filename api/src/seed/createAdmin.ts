import "dotenv/config";
import { connectDb } from "../lib/db";
import User from "../models/User";
import { hashPassword } from "../lib/auth";

async function main() {
  const name = process.env.ADMIN_NAME || "Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in environment.");
    process.exit(1);
  }
  await connectDb();
  const existing = await User.findOne({ email });
  const passwordHash = await hashPassword(password);
  if (existing) {
    existing.name = name;
    existing.role = "admin" as any;
    existing.passwordHash = passwordHash;
    existing.status = "active" as any;
    await existing.save();
    console.log("Updated existing user to admin:", email);
  } else {
    await User.create({ name, email, role: "admin", passwordHash, status: "active" });
    console.log("Created admin:", email);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

