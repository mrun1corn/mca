import { Types } from "mongoose";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Due from "../models/Due";
import { AppError } from "../lib/errors";
import { addMonths, parseISO } from "../lib/date";
import * as math from "../lib/math";
import { runInTransaction } from "../lib/db";
import { DueScheduleItem } from "./deposit";

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

export interface ActiveMember {
  _id: Types.ObjectId;
  name: string;
  status: string;
}

/**
 * Filters active members by excluding the taker and any specifically excluded members.
 */
export function filterEligibleMembers<T extends { _id: unknown }>(
  allActive: T[],
  takerId: string,
  excludeMemberIds: string[] = []
): T[] {
  const excludedSet = new Set([takerId, ...excludeMemberIds.map(String)]);
  return allActive.filter((u) => !excludedSet.has(String(u._id)));
}

/**
 * Creates transaction payload objects for all members participating in funding the split withdrawal.
 */
export function createSplitTransactionPayloads(
  eligible: { _id: Types.ObjectId; name: string }[],
  splitAmounts: number[],
  takerName: string,
  occurredAt: Date,
  actorId?: Types.ObjectId
) {
  return eligible.map((u, i) => ({
    userId: u._id,
    userName: u.name,
    type: "withdraw" as const,
    amount: -splitAmounts[i],
    occurredAt,
    note: `Share for cash out of ${takerName}`,
    createdBy: actorId,
  }));
}

/**
 * Calculates due dates for all installment months.
 */
export function calculateScheduleDates(
  months: number,
  occurredAt: Date,
  dueConfig: {
    useDefaultDate: boolean;
    defaultDate: string | null;
    startDate: string | null;
    endDate: string | null;
  }
): Date[] {
  const { useDefaultDate, defaultDate, startDate } = dueConfig;
  const dates: Date[] = [];

  let baseDate: Date;
  if (useDefaultDate && defaultDate) {
    baseDate = parseISO(defaultDate);
  } else if (!useDefaultDate && startDate) {
    baseDate = parseISO(startDate);
  } else {
    baseDate = addMonths(occurredAt, 1);
  }

  for (let m = 0; m < months; m++) {
    dates.push(addMonths(baseDate, m, baseDate));
  }

  return dates;
}

/**
 * Builds the amortization/installment schedule for repayment.
 */
export function generateRepaymentSchedule(
  months: number,
  principal: number,
  monthlyRatePct: number,
  dates: Date[]
): DueScheduleItem[] {
  const principalParts = math.distribute(principal, months);
  let remainingPrincipal = principal;
  const schedule: DueScheduleItem[] = [];

  for (let m = 0; m < months; m++) {
    const principalPart = principalParts[m];
    const interest = math.round((remainingPrincipal * monthlyRatePct) / 100);
    const total = math.round(principalPart + interest);

    schedule.push({
      dueDate: dates[m],
      principalPart,
      interest,
      totalDue: total,
      penaltyApplied: 0,
      paid: 0,
      status: "pending",
    });

    remainingPrincipal = math.round(remainingPrincipal - principalPart);
    if (remainingPrincipal < 0) remainingPrincipal = 0;
  }

  return schedule;
}

export async function handleWithdraw(input: WithdrawInput) {
  return runInTransaction(async (session) => {
    const {
      takerId,
      amount: rawAmount,
      reason,
      date,
      due: dueConfig,
      penalty,
      excludeMemberIds = [],
      actorUserId,
    } = input;

    const amount = math.round(Number(rawAmount));
    const occurredAt = parseISO(date);

    const taker = await User.findById(takerId).session(session);
    if (!taker) throw new Error("Taker not found");
    const takerName = taker.name;

    const takerObjectId = new Types.ObjectId(takerId);
    const actorId = actorUserId ? new Types.ObjectId(actorUserId) : undefined;

    // Determine eligible members for split funding
    const allActive = (await User.find({ status: "active" }).session(session)) as unknown as ActiveMember[];
    const eligible = filterEligibleMembers(allActive, takerId, excludeMemberIds);
    if (eligible.length === 0) {
      throw new AppError("No eligible members available for split", 400);
    }

    // Split amount and record funding transactions
    const splitAmounts = math.distribute(amount, eligible.length);
    const txPayloads = createSplitTransactionPayloads(eligible, splitAmounts, takerName, occurredAt, actorId);
    const splitTxDocs = await Transaction.insertMany(txPayloads, { session });

    // Generate repayment schedule and create Due document
    const dates = calculateScheduleDates(dueConfig.months, occurredAt, dueConfig);
    const schedule = generateRepaymentSchedule(dueConfig.months, amount, dueConfig.monthlyRatePct, dates);

    const [dueDoc] = await Due.create(
      [
        {
          userId: takerObjectId,
          principal: amount,
          months: dueConfig.months,
          monthlyRatePct: dueConfig.monthlyRatePct,
          schedule,
          status: "active",
          reason: reason || `Cash out by ${takerName}`,
          penaltyRule: penalty,
        },
      ],
      { session }
    );

    return { splitTxIds: splitTxDocs.map((t) => String(t._id)), due: dueDoc };
  });
}
