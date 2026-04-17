import mongoose, { Types } from "mongoose";
import Transaction from "../models/Transaction";
import DueModel from "../models/Due";
import User from "../models/User";
import { parseISO } from "../lib/date";

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
  const session = await mongoose.startSession();
  let result: { tx: any; duesAffected: string[] } | undefined;

  try {
    await session.withTransaction(async () => {
      const { userId, mode, amount: rawAmount, date, note, actorUserId } = input;
      const amount = Math.round(rawAmount);
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
        result = { tx, duesAffected: [] };
        return;
      }

      // pay_due mode: allocate FIFO across open dues
      const openDues = await DueModel.find({
        userId,
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
        result = { tx, duesAffected: [] };
        return;
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
          if (item.status === "paid") continue;

          const rule: any = (due as any).penaltyRule || { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 };
          const grace = input.graceDays ?? rule.graceDays;
          const penaltyPct = input.penaltyPctPerMonth ?? rule.monthlyPenaltyPct;
          let totalDue = item.totalDue;
          // Penalty applies only if overdue and includePenalty true
          if (input.includePenalty) {
            if (isOverdue(new Date(item.dueDate), occurredAt, grace) && rule.enabled) {
              // Simple monthly penalty on totalDue
              const penalty = Math.floor((totalDue * penaltyPct) / 100);
              totalDue += penalty;
            }
          }

          const remainingForItem = totalDue - (item.paid || 0);
          if (remainingForItem <= 0) continue;

          const pay = Math.min(remaining, remainingForItem);
          item.paid = (item.paid || 0) + pay;
          if (item.paid >= totalDue) item.status = "paid";
          else item.status = "partial";
          remaining -= pay;
          changed = true;
        }

        if (changed) {
          duesAffected.push(String(due._id));
          await due.save({ session });
        }
        if (remaining <= 0) break;
      }

      result = { tx: depositTx, duesAffected };
    });
    return result!;
  } finally {
    await session.endSession();
  }
}
