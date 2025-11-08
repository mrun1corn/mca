import { Types } from "mongoose";
import { AppError } from "../lib/errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Investment from "../models/Investment";

type InvestmentInput = {
  name: string;
  amountPoisha: number;
  startDate: string;
  months: number;
  monthlyRatePct: number;
  excludeMemberIds?: string[];
  actorUserId?: string;
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function handleInvestment(input: InvestmentInput) {
  const { name, amountPoisha, startDate, months, monthlyRatePct, excludeMemberIds = [], actorUserId } = input;
  const commencedAt = new Date(startDate);
  if (!Number.isFinite(commencedAt.getTime())) {
    throw new AppError("Invalid start date", 400);
  }

  const allActive = await User.find({ status: "active" });
  const excludedSet = new Set(excludeMemberIds.map(String));
  const eligible = allActive.filter((u) => !excludedSet.has(String(u._id)));
  if (!eligible.length) throw new AppError("No eligible contributors for this investment", 400);

  const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;
  const base = Math.floor(amountPoisha / eligible.length);
  const remainder = amountPoisha - base * eligible.length;

  const contributors = eligible.map((u, idx) => ({
    userId: u._id,
    sharePoisha: base + (idx === eligible.length - 1 ? remainder : 0),
  }));

  const txs = contributors.map((contrib) => ({
    userId: contrib.userId,
    type: "withdraw",
    amountPoisha: -contrib.sharePoisha,
    occurredAt: commencedAt,
    note: `Investment: ${name}`,
    createdBy: actorId,
  }));
  await Transaction.insertMany(txs);

  const schedule = [];
  let expectedInterestPoisha = 0;
  for (let i = 0; i < months; i++) {
    const interest = Math.floor((amountPoisha * monthlyRatePct) / 100);
    expectedInterestPoisha += interest;
    schedule.push({
      monthIndex: i,
      dueDate: addMonths(commencedAt, i + 1),
      interestPoisha: interest,
      status: "pending" as const,
    });
  }

  const investment = await Investment.create({
    name,
    amountPoisha,
    startDate: commencedAt,
    months,
    monthlyRatePct,
    expectedInterestPoisha,
    contributors,
    schedule,
    createdBy: actorId,
  });

  return { investment };
}
