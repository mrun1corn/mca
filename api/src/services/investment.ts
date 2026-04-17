import mongoose, { Types } from "mongoose";
import { AppError } from "../lib/errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Investment from "../models/Investment";
import { addMonths, parseISO } from "../lib/date";

type InvestmentInput = {
  name: string;
  amount: number;
  startDate: string;
  months?: number | null;
  monthlyRatePct?: number;
  excludeMemberIds?: string[];
  actorUserId?: string;
};

type InvestmentReturnInput = {
  investmentId: string;
  amount: number;
  date: string;
  note?: string;
  markCompleted?: boolean;
  actorUserId?: string;
};

export async function handleInvestment(input: InvestmentInput) {
  const session = await mongoose.startSession();
  let result: { investment: any } | undefined;

  try {
    await session.withTransaction(async () => {
      const { name, amount: rawAmount, startDate, months, monthlyRatePct = 0, excludeMemberIds = [], actorUserId } = input;
      const amount = Math.round(rawAmount);
      const commencedAt = parseISO(startDate);
      const boundedMonths = typeof months === "number" && months > 0 ? months : null;

      const allActive = await User.find({ status: "active" }).session(session);
      const excludedSet = new Set(excludeMemberIds.map(String));
      const eligible = allActive.filter((u) => !excludedSet.has(String(u._id)));
      if (!eligible.length) throw new AppError("No eligible contributors for this investment", 400);

      const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;
      const base = Math.floor(amount / eligible.length);
      const remainder = amount - base * eligible.length;

      const contributors = eligible.map((u, idx) => ({
        userId: u._id,
        share: base + (idx === eligible.length - 1 ? remainder : 0),
      }));

      const txs = contributors.map((contrib) => ({
        userId: contrib.userId,
        type: "withdraw",
        amount: -contrib.share,
        occurredAt: commencedAt,
        note: `Investment: ${name}`,
        createdBy: actorId,
      }));
      await Transaction.insertMany(txs, { session });

      const schedule: any[] = [];
      let expectedInterest = 0;
      if (boundedMonths) {
        for (let i = 0; i < boundedMonths; i++) {
          const interest = Math.floor((amount * monthlyRatePct) / 100);
          expectedInterest += interest;
          schedule.push({
            monthIndex: i,
            dueDate: addMonths(commencedAt, i + 1),
            interest: interest,
            status: "pending" as const,
          });
        }
      }

      const [investment] = await Investment.create(
        [
          {
            name,
            amount,
            startDate: commencedAt,
            months: boundedMonths,
            monthlyRatePct: boundedMonths ? monthlyRatePct : 0,
            expectedInterest,
            contributors,
            schedule,
            createdBy: actorId,
          },
        ],
        { session }
      );

      result = { investment };
    });
    return result!;
  } finally {
    await session.endSession();
  }
}

export async function handleInvestmentReturn(input: InvestmentReturnInput) {
  const session = await mongoose.startSession();
  let result: any;

  try {
    await session.withTransaction(async () => {
      const { investmentId, amount: rawAmount, date, note, markCompleted, actorUserId } = input;
      const amount = Math.round(rawAmount);
      const occurredAt = parseISO(date);

      const investment = await Investment.findById(investmentId).session(session);
      if (!investment) throw new AppError("Investment not found", 404);
      if (!investment.contributors?.length) throw new AppError("Investment has no contributors", 400);

      const totalShare = investment.contributors.reduce((sum, c) => sum + (c.share || 0), 0);
      if (!totalShare) throw new AppError("Invalid contributor shares", 400);

      const allocations = investment.contributors.map((contrib) => ({
        userId: contrib.userId,
        amount: Math.floor((amount * (contrib.share || 0)) / totalShare),
      }));
      let allocated = allocations.reduce((sum, a) => sum + a.amount, 0);
      let remainder = amount - allocated;
      let idx = 0;
      while (remainder > 0 && allocations.length > 0) {
        allocations[idx % allocations.length].amount += 1;
        remainder -= 1;
        idx += 1;
      }

      const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;
      const txs = await Transaction.insertMany(
        allocations.map((alloc) => ({
          userId: alloc.userId,
          type: "deposit",
          amount: alloc.amount,
          occurredAt,
          note: note || `Investment return: ${investment.name}`,
          createdBy: actorId,
        })),
        { session }
      );

      investment.returnedAmount = (investment.returnedAmount || 0) + amount;
      if (markCompleted) {
        investment.status = "completed";
      } else {
        const expectedTotal = investment.amount + (investment.expectedInterest || 0);
        if ((investment.returnedAmount || 0) >= expectedTotal) {
          investment.status = "completed";
        }
      }
      await investment.save({ session });

      result = {
        investmentId: investment._id,
        status: investment.status,
        deposits: txs.map((tx) => ({ userId: tx.userId, amount: tx.amount, transactionId: tx._id })),
      };
    });
    return result!;
  } finally {
    await session.endSession();
  }
}
