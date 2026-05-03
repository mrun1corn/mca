import mongoose, { Types } from "mongoose";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import { AppError } from "../lib/errors";
import { addMonths, parseISO } from "../lib/date";
import * as math from "../lib/math";

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
  let result: { splitTxIds: string[]; due: any } | undefined;

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

      const amount = math.round(Number(rawAmount));
      const occurredAt = parseISO(date);

      // Fetch taker to validate existence and get name
      const taker = await User.findById(takerId).session(session);
      if (!taker) throw new Error("Taker not found");
      const takerName = taker.name;

      const takerObjectId = new Types.ObjectId(takerId);
      const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;

      // Determine eligible members for split (all active except taker and excluded)
      const allActive = await User.find({ status: "active" }).session(session);
      const excludedSet = new Set([takerId, ...excludeMemberIds.map(String)]);
      const eligible = allActive.filter((u) => !excludedSet.has(String(u._id)));
      const eligibleCount = eligible.length;
      if (!eligibleCount) {
        throw new AppError("No eligible members available for split", 400);
      }

      // Split the amount across eligible members (they fund the cash-out)
      const splitAmounts = math.distribute(amount, eligibleCount);
      const txs = eligible.map((u, i) => {
        return {
          userId: u._id,
          userName: u.name,
          type: "withdraw",
          amount: -splitAmounts[i],
          occurredAt,
          note: `Share for cash out of ${takerName}`,
          createdBy: actorId,
        };
      });
      const splitTxDocs = await Transaction.insertMany(txs, { session });

      // Create Due schedule for taker (their obligation to repay)
      const principal = amount;
      const principalParts = math.distribute(principal, months);
      let remainingPrincipal = principal;
      const schedule: any[] = [];

      // Determine schedule dates
      let dates: Date[] = [];
      if (useDefaultDate && defaultDate) {
        const first = parseISO(defaultDate);
        for (let m = 0; m < months; m++) dates.push(addMonths(first, m, first));
      } else if (!useDefaultDate && startDate && endDate) {
        const start = parseISO(startDate);
        for (let m = 0; m < months; m++) dates.push(addMonths(start, m, start));
      } else {
        const fallback = addMonths(occurredAt, 1);
        for (let m = 0; m < months; m++) dates.push(addMonths(fallback, m, fallback));
      }

      for (let m = 0; m < months; m++) {
        const principalPart = principalParts[m];
        const interest = math.round(remainingPrincipal * monthlyRatePct) / 100;
        const total = math.round(principalPart + interest);
        schedule.push({
          dueDate: dates[m],
          principalPart: principalPart,
          interest: interest,
          totalDue: total,
          penaltyApplied: 0,
          paid: 0,
          status: "pending",
        });
        remainingPrincipal = math.round(remainingPrincipal - principalPart);
        if (remainingPrincipal < 0) remainingPrincipal = 0;
      }

      const [dueDoc] = await Due.create(
        [
          {
            userId: takerObjectId,
            principal: principal,
            months,
            monthlyRatePct,
            schedule,
            status: "active",
            reason: reason || `Cash out by ${takerName}`,
            penaltyRule: penalty,
          },
        ],
        { session }
      );

      result = { splitTxIds: splitTxDocs.map((t) => String(t._id)), due: dueDoc };
    });
    return result!;
  } finally {
    await session.endSession();
  }
}

