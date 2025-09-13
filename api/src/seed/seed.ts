import { loadEnv } from "../lib/env";
loadEnv();
import { connectDb } from "../lib/db";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import { hashPassword } from "../lib/auth";
import { handleWithdraw } from "../services/withdraw";

async function main() {
  await connectDb();

  await User.deleteMany({});
  await Transaction.deleteMany({});
  await Due.deleteMany({});

  const passwordHash = await hashPassword("ChangeMe123!");
  const u1 = await User.create({ name: "Alice", email: "alice@example.com", role: "user", passwordHash });
  const u2 = await User.create({ name: "Bob", email: "bob@example.com", role: "user", passwordHash });
  const u3 = await User.create({ name: "Carol", email: "carol@example.com", role: "user", passwordHash });
  const u4 = await User.create({ name: "Dave", email: "dave@example.com", role: "user", passwordHash });

  const users = [u1, u2, u3, u4];
  const today = new Date();
  // deposits across recent months
  for (let m = 1; m <= 3; m++) {
    for (const u of users) {
      const d = new Date(today.getFullYear(), today.getMonth() - m, 5 + m);
      await Transaction.create({ userId: u._id, type: "deposit", amountPoisha: 50000 + m * 1000, occurredAt: d, note: "Seed deposit" });
    }
  }

  // one withdraw for demo with 3-month dues
  await handleWithdraw({
    takerId: String(u1._id),
    reason: "Medical",
    date: new Date().toISOString().slice(0, 10),
    amountPoisha: 200000,
    due: { useDefaultDate: true, defaultDate: new Date(today.getFullYear(), today.getMonth() + 1, 10).toISOString(), startDate: null, endDate: null, months: 3, monthlyRatePct: 2.0 },
    penalty: { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 },
    excludeMemberIds: [],
  });

  // some recent deposits after withdraw
  await Transaction.create({ userId: u1._id, type: "deposit", amountPoisha: 60000, occurredAt: new Date(), note: "Weekly saving" });
  await Transaction.create({ userId: u2._id, type: "deposit", amountPoisha: 45000, occurredAt: new Date(), note: "Weekly saving" });

  // eslint-disable-next-line no-console
  console.log("Seed complete", { users: [u1.email, u2.email, u3.email, u4.email], defaultPassword: "ChangeMe123!" });
  process.exit(0);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
