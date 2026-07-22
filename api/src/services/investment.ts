import mongoose, { Types } from "mongoose";
import { AppError } from "../lib/errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Investment from "../models/Investment";
import { addMonths, parseISO } from "../lib/date";
import * as math from "../lib/math";
import { runInTransaction } from "../lib/db";

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
  return runInTransaction(async (session) => {
    const { name, amount: rawAmount, startDate, months, monthlyRatePct = 0, excludeMemberIds = [], actorUserId } = input;
    const amount = Number(rawAmount);
    const commencedAt = parseISO(startDate);
    const boundedMonths = typeof months === "number" && months > 0 ? months : null;

    const allActive = await User.find({ status: "active" }).session(session);
    const excludedSet = new Set(excludeMemberIds.map(String));
    const eligible = allActive.filter((u) => !excludedSet.has(String(u._id)));
    if (!eligible.length) throw new AppError("No eligible contributors for this investment", 400);

    const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;
    const splitAmounts = math.distribute(amount, eligible.length);

    const userMap = new Map(eligible.map((u) => [String(u._id), u.name]));

    const contributors = eligible.map((u, idx) => ({
      userId: u._id,
      share: splitAmounts[idx],
    }));

    const txs = contributors.map((contrib) => ({
      userId: contrib.userId,
      userName: userMap.get(String(contrib.userId)) || "",
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
        const interest = math.round((amount * monthlyRatePct) / 100);
        expectedInterest += interest;
        schedule.push({
          monthIndex: i,
          dueDate: addMonths(commencedAt, i + 1, commencedAt),
          interest: interest,
          status: "pending" as const,
        });
      }
    }
    expectedInterest = math.round(expectedInterest);

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

    return { investment };
  });
}

export async function handleInvestmentReturn(input: InvestmentReturnInput) {
  return runInTransaction(async (session) => {
    const { investmentId, amount: rawAmount, date, note, markCompleted, actorUserId } = input;
    const amount = math.round(Number(rawAmount));
    const occurredAt = parseISO(date);

    const investment = await Investment.findById(investmentId).session(session);
    if (!investment) throw new AppError("Investment not found", 404);
    if (!investment.contributors?.length) throw new AppError("Investment has no contributors", 400);

    const totalShare = investment.contributors.reduce((sum, c) => sum + (c.share || 0), 0);
    if (!totalShare) throw new AppError("Invalid contributor shares", 400);

    const allocations = math.allocate(amount, investment.contributors.map(c => ({
      id: String(c.userId),
      weight: c.share || 0
    })));

    // Build a user map for userName lookup
    const contribUserIds = allocations.map((a) => a.id);
    const contribUsers = await User.find({ _id: { $in: contribUserIds } }).session(session);
    const userNameMap = new Map(contribUsers.map((u) => [String(u._id), u.name]));

    const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;
    const txs = await Transaction.insertMany(
      allocations.map((alloc) => ({
        userId: new Types.ObjectId(alloc.id),
        userName: userNameMap.get(alloc.id) || "",
        type: "deposit",
        amount: alloc.amount,
        occurredAt,
        note: note || `Investment return: ${investment.name}`,
        createdBy: actorId,
      })),
      { session }
    );

    investment.returnedAmount = math.round((investment.returnedAmount || 0) + amount);
    if (markCompleted) {
      investment.status = "completed";
    } else {
      const expectedTotal = investment.amount + (investment.expectedInterest || 0);
      if ((investment.returnedAmount || 0) >= expectedTotal) {
        investment.status = "completed";
      }
    }
    await investment.save({ session });

    return {
      investmentId: investment._id,
      status: investment.status,
      deposits: txs.map((tx) => ({ userId: tx.userId, amount: tx.amount, transactionId: tx._id })),
    };
  });
}
