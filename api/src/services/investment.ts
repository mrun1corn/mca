import { Types } from "mongoose";
import { AppError } from "../lib/errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Investment from "../models/Investment";

type InvestmentInput = {
  name: string;
  amountPoisha: number;
  startDate: string;
  months?: number | null;
  monthlyRatePct?: number;
  excludeMemberIds?: string[];
  actorUserId?: string;
};

type InvestmentReturnInput = {
  investmentId: string;
  amountPoisha: number;
  date: string;
  note?: string;
  markCompleted?: boolean;
  actorUserId?: string;
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function handleInvestment(input: InvestmentInput) {
  const { name, amountPoisha, startDate, months, monthlyRatePct = 0, excludeMemberIds = [], actorUserId } = input;
  const commencedAt = new Date(startDate);
  if (!Number.isFinite(commencedAt.getTime())) {
    throw new AppError("Invalid start date", 400);
  }
  const boundedMonths = typeof months === "number" && months > 0 ? months : null;

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

  const schedule: any[] = [];
  let expectedInterestPoisha = 0;
  if (boundedMonths) {
    for (let i = 0; i < boundedMonths; i++) {
      const interest = Math.floor((amountPoisha * monthlyRatePct) / 100);
      expectedInterestPoisha += interest;
      schedule.push({
        monthIndex: i,
        dueDate: addMonths(commencedAt, i + 1),
        interestPoisha: interest,
        status: "pending" as const,
      });
    }
  }

  const investment = await Investment.create({
    name,
    amountPoisha,
    startDate: commencedAt,
    months: boundedMonths,
    monthlyRatePct: boundedMonths ? monthlyRatePct : 0,
    expectedInterestPoisha,
    contributors,
    schedule,
    createdBy: actorId,
  });

  return { investment };
}

export async function handleInvestmentReturn(input: InvestmentReturnInput) {
  const { investmentId, amountPoisha, date, note, markCompleted, actorUserId } = input;
  const occurredAt = new Date(date);
  if (!Number.isFinite(occurredAt.getTime())) throw new AppError("Invalid date", 400);

  const investment = await Investment.findById(investmentId);
  if (!investment) throw new AppError("Investment not found", 404);
  if (!investment.contributors?.length) throw new AppError("Investment has no contributors", 400);

  const totalShare = investment.contributors.reduce((sum, c) => sum + (c.sharePoisha || 0), 0);
  if (!totalShare) throw new AppError("Invalid contributor shares", 400);

  const allocations = investment.contributors.map((contrib) => ({
    userId: contrib.userId,
    amountPoisha: Math.floor((amountPoisha * (contrib.sharePoisha || 0)) / totalShare),
  }));
  let allocated = allocations.reduce((sum, a) => sum + a.amountPoisha, 0);
  let remainder = amountPoisha - allocated;
  let idx = 0;
  while (remainder > 0 && allocations.length > 0) {
    allocations[idx % allocations.length].amountPoisha += 1;
    remainder -= 1;
    idx += 1;
  }

  const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;
  const txs = await Transaction.insertMany(
    allocations.map((alloc) => ({
      userId: alloc.userId,
      type: "deposit",
      amountPoisha: alloc.amountPoisha,
      occurredAt,
      note: note || `Investment return: ${investment.name}`,
      createdBy: actorId,
    }))
  );

  investment.returnedPoisha = (investment.returnedPoisha || 0) + amountPoisha;
  if (markCompleted) {
    investment.status = "completed";
  } else {
    const expectedTotal = investment.amountPoisha + (investment.expectedInterestPoisha || 0);
    if ((investment.returnedPoisha || 0) >= expectedTotal) {
      investment.status = "completed";
    }
  }
  await investment.save();

  return {
    investmentId: investment._id,
    status: investment.status,
    deposits: txs.map((tx) => ({ userId: tx.userId, amountPoisha: tx.amountPoisha, transactionId: tx._id })),
  };
}
