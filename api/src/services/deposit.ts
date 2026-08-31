import { Types, ClientSession, Document } from "mongoose";
import Transaction from "../models/Transaction";
import DueModel from "../models/Due";
import User from "../models/User";
import { AppError } from "../lib/errors";
import { parseISO } from "../lib/date";
import * as math from "../lib/math";
import { runInTransaction } from "../lib/db";

export type DepositInput = {
  userId: string;
  mode: "simple" | "pay_due";
  dueId?: string | null;
  amount: number;
  date: string; // ISO date
  note?: string;
  includePenalty?: boolean;
  penaltyPctPerMonth?: number; // if overriding rule
  graceDays?: number; // if overriding rule
  actorUserId?: string;
};

export interface DueScheduleItem {
  dueDate: Date | string;
  principalPart: number;
  interest: number;
  totalDue: number;
  penaltyApplied?: number;
  paid?: number;
  status: "pending" | "partial" | "paid" | "cancelled";
}

export interface DuePenaltyRule {
  enabled?: boolean;
  monthlyPenaltyPct?: number;
  graceDays?: number;
}

export function isOverdue(dueDate: Date, depositDate: Date, graceDays: number): boolean {
  const duePlusGrace = new Date(dueDate);
  duePlusGrace.setDate(duePlusGrace.getDate() + graceDays);
  return depositDate > duePlusGrace;
}

/**
 * Calculates and applies penalty to a single schedule item if overdue.
 * Returns the effective total due for this item.
 */
export function applyPenaltyToScheduleItem(
  item: DueScheduleItem,
  occurredAt: Date,
  includePenalty: boolean,
  penaltyRule?: DuePenaltyRule,
  overrideGrace?: number,
  overridePenaltyPct?: number
): number {
  const rule = penaltyRule || { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 };
  if (!includePenalty || !rule.enabled) {
    return item.totalDue;
  }

  const grace = overrideGrace ?? (rule.graceDays ?? 3);
  const penaltyPct = overridePenaltyPct ?? (rule.monthlyPenaltyPct ?? 1.0);

  if (isOverdue(new Date(item.dueDate), occurredAt, grace)) {
    const currentBalance = math.round(item.totalDue - (item.paid || 0));
    const penalty = math.round((currentBalance * penaltyPct) / 100);
    if (penalty > 0 && (item.penaltyApplied || 0) === 0) {
      item.penaltyApplied = penalty;
      item.totalDue = math.round(item.totalDue + penalty);
    }
  }

  return item.totalDue;
}

/**
 * Allocates available payment to a single schedule item.
 * Returns the amount deducted from the remaining payment pool.
 */
export function settleScheduleItem(
  item: DueScheduleItem,
  availablePayment: number,
  input: DepositInput,
  occurredAt: Date,
  penaltyRule?: DuePenaltyRule
): { paidAmount: number; changed: boolean } {
  if (availablePayment <= 0 || item.status === "paid" || item.status === "cancelled") {
    return { paidAmount: 0, changed: false };
  }

  const effectiveTotalDue = applyPenaltyToScheduleItem(
    item,
    occurredAt,
    Boolean(input.includePenalty),
    penaltyRule,
    input.graceDays,
    input.penaltyPctPerMonth
  );

  const remainingForItem = math.round(effectiveTotalDue - (item.paid || 0));
  if (remainingForItem <= 0) {
    return { paidAmount: 0, changed: false };
  }

  const pay = Math.min(availablePayment, remainingForItem);
  item.paid = math.round((item.paid || 0) + pay);
  item.status = item.paid >= effectiveTotalDue ? "paid" : "partial";

  return { paidAmount: pay, changed: true };
}

/**
 * Iterates through a Due document's schedule and settles pending/partial items.
 */
export function processDueSettlement(
  due: { schedule: DueScheduleItem[]; penaltyRule?: DuePenaltyRule },
  availablePayment: number,
  input: DepositInput,
  occurredAt: Date
): { remainingPayment: number; changed: boolean } {
  let remaining = availablePayment;
  let changed = false;

  for (const item of due.schedule) {
    if (remaining <= 0) break;
    const { paidAmount, changed: itemChanged } = settleScheduleItem(
      item,
      remaining,
      input,
      occurredAt,
      due.penaltyRule
    );

    if (itemChanged) {
      remaining = math.round(remaining - paidAmount);
      changed = true;
    }
  }

  return { remainingPayment: remaining, changed };
}

/**
 * Helper to record the primary deposit transaction.
 */
export async function createDepositTxRecord(
  session: ClientSession,
  userId: string,
  userName: string,
  amount: number,
  occurredAt: Date,
  note?: string,
  actorUserId?: string
) {
  const [tx] = await Transaction.create(
    [
      {
        userId: new Types.ObjectId(userId),
        userName,
        type: "deposit",
        amount,
        occurredAt,
        note: note || "Deposit",
        createdBy: actorUserId ? new Types.ObjectId(actorUserId) : undefined,
      },
    ],
    { session }
  );
  return tx;
}

/**
 * Fetches open active dues and prioritizes specific dueId if supplied.
 */
export async function fetchDuesQueue(
  session: ClientSession,
  userId: string,
  priorityDueId?: string | null
) {
  const openDues = await DueModel.find({
    userId,
    status: { $ne: "cancelled" },
    "schedule.status": { $in: ["pending", "partial"] },
  })
    .sort({ createdAt: 1 })
    .session(session);

  if (!priorityDueId) {
    return openDues;
  }

  const idx = openDues.findIndex((d) => String(d._id) === priorityDueId);
  if (idx >= 0) {
    const [target] = openDues.splice(idx, 1);
    return [target, ...openDues];
  }

  return openDues;
}

export async function handleDeposit(input: DepositInput) {
  return runInTransaction(async (session) => {
    const { userId, mode, amount: rawAmount, date, note, actorUserId } = input;
    const amount = math.round(Number(rawAmount));
    const occurredAt = parseISO(date);

    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");
    const userName = user.name;

    // Simple deposit mode
    if (mode === "simple") {
      const tx = await createDepositTxRecord(session, userId, userName, amount, occurredAt, note, actorUserId);
      return { tx, duesAffected: [] };
    }

    // Pay due mode: retrieve dues queue
    const duesQueue = await fetchDuesQueue(session, userId, input.dueId);
    if (duesQueue.length === 0) {
      const tx = await createDepositTxRecord(session, userId, userName, amount, occurredAt, note, actorUserId);
      return { tx, duesAffected: [] };
    }

    // Create deposit transaction record
    const depositTx = await createDepositTxRecord(
      session,
      userId,
      userName,
      amount,
      occurredAt,
      note || "Deposit (pay due)",
      actorUserId
    );

    let remaining = amount;
    const duesAffected: string[] = [];

    for (const due of duesQueue) {
      const { remainingPayment, changed } = processDueSettlement(
        due as unknown as { schedule: DueScheduleItem[]; penaltyRule?: DuePenaltyRule },
        remaining,
        input,
        occurredAt
      );
      remaining = remainingPayment;

      if (changed) {
        duesAffected.push(String(due._id));
        try {
          await due.save({ session });
        } catch (err: unknown) {
          if (err && typeof err === "object" && "name" in err && err.name === "VersionError") {
            throw new AppError("Concurrent modification detected on dues. Please retry.", 409);
          }
          throw err;
        }
      }

      if (remaining <= 0) break;
    }

    return { tx: depositTx, duesAffected };
  });
}
