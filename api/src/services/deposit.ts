import mongoose, { Types } from "mongoose";
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

function isOverdue(dueDate: Date, depositDate: Date, graceDays: number) {
  const duePlusGrace = new Date(dueDate);
  duePlusGrace.setDate(duePlusGrace.getDate() + graceDays);
  return depositDate > duePlusGrace;
}

export async function handleDeposit(input: DepositInput) {
  return runInTransaction(async (session) => {
    const { userId, mode, amount: rawAmount, date, note, actorUserId } = input;
    const amount = math.round(Number(rawAmount));
    const occurredAt = parseISO(date);

    // Fetch user to get name for transaction record
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");
    const userName = user.name;

    if (mode === "simple") {
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
      return { tx, duesAffected: [] };
    }

    // pay_due mode: allocate FIFO across open dues (only active dues)
    const openDues = await DueModel.find({
      userId,
      status: { $ne: "cancelled" },
      "schedule.status": { $in: ["pending", "partial"] },
    })
      .sort({ createdAt: 1 })
      .session(session);

    let duesQueue = openDues;
    if (input.dueId) {
      const idx = openDues.findIndex((d) => String(d._id) === input.dueId);
      if (idx >= 0) {
        const [target] = openDues.splice(idx, 1);
        duesQueue = [target, ...openDues];
      }
    }

    if (duesQueue.length === 0) {
      // no dues; treat as simple deposit
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
      return { tx, duesAffected: [] };
    }

    let remaining = amount;
    const duesAffected: string[] = [];

    // Create a single deposit transaction record
    const [depositTx] = await Transaction.create(
      [
        {
          userId: new Types.ObjectId(userId),
          userName,
          type: "deposit",
          amount,
          occurredAt,
          note: note || "Deposit (pay due)",
          createdBy: actorUserId ? new Types.ObjectId(actorUserId) : undefined,
        },
      ],
      { session }
    );

    for (const due of duesQueue) {
      let changed = false;
      for (const item of due.schedule) {
        if (remaining <= 0) break;
        if (item.status === "paid" || item.status === "cancelled") continue;

        const rule: any = (due as any).penaltyRule || { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 };
        const grace = input.graceDays ?? rule.graceDays;
        const penaltyPct = input.penaltyPctPerMonth ?? rule.monthlyPenaltyPct;
        let effectiveTotalDue = item.totalDue;

        // Penalty: calculate based on remaining balance if overdue
        if (input.includePenalty && rule.enabled) {
          if (isOverdue(new Date(item.dueDate), occurredAt, grace)) {
            const currentBalance = math.round(item.totalDue - (item.paid || 0));
            const penalty = math.round(currentBalance * penaltyPct) / 100;
            if (penalty > 0 && (item as any).penaltyApplied === 0) {
              // Persist penalty to the schedule item
              (item as any).penaltyApplied = penalty;
              item.totalDue = math.round(item.totalDue + penalty);
            }
            effectiveTotalDue = item.totalDue;
          }
        }

        const remainingForItem = math.round(effectiveTotalDue - (item.paid || 0));
        if (remainingForItem <= 0) continue;

        const pay = Math.min(remaining, remainingForItem);
        item.paid = math.round((item.paid || 0) + pay);
        if (item.paid >= effectiveTotalDue) item.status = "paid";
        else item.status = "partial";
        remaining = math.round(remaining - pay);
        changed = true;
      }

      if (changed) {
        duesAffected.push(String(due._id));
        try {
          await due.save({ session });
        } catch (err: any) {
          // Optimistic concurrency: Mongoose VersionError means a concurrent
          // modification changed the Due document between our read and write.
          if (err.name === "VersionError") {
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


