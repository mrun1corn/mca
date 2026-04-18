import mongoose, { Types } from "mongoose";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import { AppError } from "../lib/errors";
import { addMonths, parseISO } from "../lib/date";

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

export async function handleWithdraw(input: WithdrawInput) {
  const session = await mongoose.startSession();
  let result: { takerTx: any; due: any } | undefined;

  try {
    await session.withTransaction(async () => {
      const {
        takerId,
        amount: rawAmount,
        reason,
        date,
        due: { months, monthlyRatePct, useDefaultDate, defaultDate, startDate, endDate },
        penalty,
        excludeMemberIds = [],
        actorUserId,
      } = input;

      const amount = Number(rawAmount);
      const occurredAt = parseISO(date);

      // Fetch taker and eligible users to get names for transaction records
      const taker = await User.findById(takerId).session(session);
      if (!taker) throw new Error("Taker not found");
      const takerName = taker.name;

      const takerObjectId = new Types.ObjectId(takerId);
      const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;

      // Taker withdraw transaction (negative amount)
      const [takerTx] = await Transaction.create(
        [
          {
            userId: takerObjectId,
            userName: takerName,
            type: "withdraw",
            amount: -Math.abs(amount),
            occurredAt,
            note: reason ? `Cash out: ${reason}` : "Cash out",
            createdBy: actorId,
          },
        ],
        { session }
      );

      // Determine eligible members for split (all active except taker and excluded)
      const allActive = await User.find({ status: "active" }).session(session);
      const excludedSet = new Set([takerId, ...excludeMemberIds.map(String)]);
      const eligible = allActive.filter((u) => !excludedSet.has(String(u._id)));
      const eligibleCount = eligible.length;
      if (!eligibleCount) {
        throw new AppError("No eligible members available for split", 400);
      }

      const base = Math.floor(amount * 100 / eligibleCount) / 100;
      const remainder = Math.round((amount - base * eligibleCount) * 100) / 100;
      // Create per-eligible-member withdraw tx with -split
      const txs = eligible.map((u, i) => {
        const share = Math.round((base + (i === eligible.length - 1 ? remainder : 0)) * 100) / 100;
        return {
          userId: u._id,
          userName: u.name,
          type: "withdraw",
          amount: -share,
          occurredAt,
          note: `Share for cash out of ${takerName}`,
          createdBy: actorId,
        };
      });
      await Transaction.insertMany(txs, { session });

      // Create Due schedule for taker
      const principal = amount;
      const perMonthPrincipal = Math.floor(principal * 100 / months) / 100;
      let remainderPrincipal = Math.round((principal - perMonthPrincipal * months) * 100) / 100;
      let remainingPrincipal = principal;
      const schedule: any[] = [];

      // Determine schedule dates
      let dates: Date[] = [];
      if (useDefaultDate && defaultDate) {
        const first = parseISO(defaultDate);
        for (let m = 0; m < months; m++) dates.push(addMonths(first, m));
      } else if (!useDefaultDate && startDate && endDate) {
        const start = parseISO(startDate);
        // Spread monthly from start, ignoring end alignment complexities
        for (let m = 0; m < months; m++) dates.push(addMonths(start, m));
      } else {
        const fallback = addMonths(occurredAt, 1);
        for (let m = 0; m < months; m++) dates.push(addMonths(fallback, m));
      }

      for (let m = 0; m < months; m++) {
        const principalPart = Math.round((perMonthPrincipal + (m === months - 1 ? remainderPrincipal : 0)) * 100) / 100;
        // Interest each month = remainingPrincipal * (rate/100)
        const interest = Math.round((remainingPrincipal * monthlyRatePct)) / 100;
        const total = Math.round((principalPart + interest) * 100) / 100;
        schedule.push({
          dueDate: dates[m],
          principalPart: principalPart,
          interest: interest,
          totalDue: total,
          paid: 0,
          status: "pending",
        });
        remainingPrincipal = Math.round((remainingPrincipal - principalPart) * 100) / 100;
        if (remainingPrincipal < 0) remainingPrincipal = 0;
      }

      const [dueDoc] = await Due.create(
        [
          {
            userId: takerObjectId,
            cashOutTxId: takerTx._id,
            principal: principal,
            months,
            monthlyRatePct,
            schedule,
            penaltyRule: penalty,
          },
        ],
        { session }
      );

      result = { takerTx, due: dueDoc };
    });
    return result!;
  } finally {
    await session.endSession();
  }
}
