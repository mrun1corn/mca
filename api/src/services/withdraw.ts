import { Types } from "mongoose";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import { AppError } from "../lib/errors";

export type WithdrawInput = {
  takerId: string;
  reason?: string;
  date: string; // ISO date
  amount: number;
  due: {
    useDefaultDate: boolean;
    defaultDate: string | null;
    startDate: string | null;
    endDate: string | null;
    months: number;
    monthlyRatePct: number;
  };
  penalty: { enabled: boolean; monthlyPenaltyPct: number; graceDays: number };
  excludeMemberIds?: string[];
  actorUserId?: string;
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function handleWithdraw(input: WithdrawInput) {
  const {
    takerId,
    amount,
    reason,
    date,
    due: { months, monthlyRatePct, useDefaultDate, defaultDate, startDate, endDate },
    penalty,
    excludeMemberIds = [],
    actorUserId,
  } = input;

  const occurredAt = new Date(date);

  // Fetch taker and eligible users to get names for transaction records
  const taker = await User.findById(takerId);
  if (!taker) throw new Error("Taker not found");
  const takerName = taker.name;

  const takerObjectId = new Types.ObjectId(takerId);
  const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;

  // Taker withdraw transaction (negative amount)
  const takerTx = await Transaction.create({
    userId: takerObjectId,
    userName: takerName,
    type: "withdraw",
    amount: -Math.abs(amount),
    occurredAt,
    note: reason ? `Cash out: ${reason}` : "Cash out",
    createdBy: actorId,
  });

  // Determine eligible members for split (all active except taker and excluded)
  const allActive = await User.find({ status: "active" });
  const excludedSet = new Set([takerId, ...excludeMemberIds.map(String)]);
  const eligible = allActive.filter((u) => !excludedSet.has(String(u._id)));
  const eligibleCount = eligible.length;
  if (!eligibleCount) {
    throw new AppError("No eligible members available for split", 400);
  }

  if (eligibleCount > 0) {
    const base = Math.floor(amount / eligibleCount);
    const remainder = amount - base * eligibleCount;
    // Create per-eligible-member withdraw tx with -split
    const txs = [] as any[];
    for (let i = 0; i < eligible.length; i++) {
      const share = base + (i === eligible.length - 1 ? remainder : 0); // last gets remainder
      txs.push({
        userId: eligible[i]._id,
        userName: eligible[i].name,
        type: "withdraw",
        amount: -share,
        occurredAt,
        note: `Share for cash out of ${takerName}`,
        createdBy: actorId,
      });
    }
    await Transaction.insertMany(txs);
  }

  // Create Due schedule for taker
  const principal = amount;
  const perMonthPrincipal = Math.floor(principal / months);
  let remainderPrincipal = principal - perMonthPrincipal * months;
  let remainingPrincipal = principal;
  const schedule: any[] = [];

  // Determine schedule dates
  let dates: Date[] = [];
  if (useDefaultDate && defaultDate) {
    const first = new Date(defaultDate);
    for (let m = 0; m < months; m++) dates.push(addMonths(first, m));
  } else if (!useDefaultDate && startDate && endDate) {
    const start = new Date(startDate);
    // Spread monthly from start, ignoring end alignment complexities
    for (let m = 0; m < months; m++) dates.push(addMonths(start, m));
  } else {
    const fallback = addMonths(occurredAt, 1);
    for (let m = 0; m < months; m++) dates.push(addMonths(fallback, m));
  }

  for (let m = 0; m < months; m++) {
    const principalPart = perMonthPrincipal + (m === months - 1 ? remainderPrincipal : 0);
    // Interest each month = remainingPrincipal * (rate/100)
    const interest = Math.floor((remainingPrincipal * monthlyRatePct) / 100);
    const total = principalPart + interest;
    schedule.push({
      dueDate: dates[m],
      principalPartPoisha: principalPart,
      interestPoisha: interest,
      totalDuePoisha: total,
      paidPoisha: 0,
      status: "pending",
    });
    remainingPrincipal -= principalPart;
    if (remainingPrincipal < 0) remainingPrincipal = 0;
  }

  const dueDoc = await Due.create({
    userId: takerObjectId,
    cashOutTxId: takerTx._id,
    principal,
    months,
    monthlyRatePct,
    schedule,
    penaltyRule: penalty,
  });

  return { takerTx, due: dueDoc };
}
