import Transaction from "../models/Transaction";
import DueModel from "../models/Due";
import { Types } from "mongoose";

export type DepositInput = {
  userId: string;
  mode: "simple" | "pay_due";
  dueId?: string | null;
  amountPoisha: number;
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
  const { userId, mode, amountPoisha, date, note, actorUserId } = input;
  const occurredAt = new Date(date);

  if (mode === "simple") {
    const tx = await Transaction.create({
      userId: new Types.ObjectId(userId),
      type: "deposit",
      amountPoisha,
      occurredAt,
      note: note || "Deposit",
      createdBy: actorUserId ? new Types.ObjectId(actorUserId) : undefined,
    });
    return { tx, duesAffected: [] as string[] };
  }

  // pay_due mode: allocate FIFO across open dues
  const openDues = await DueModel.find({ userId, "schedule.status": { $in: ["pending", "partial"] } }).sort({ createdAt: 1 });
  let duesQueue = openDues;
  if (input.dueId) {
    const idx = openDues.findIndex((d) => String(d._id) === input.dueId);
    if (idx >= 0) {
      const [target] = openDues.splice(idx, 1);
      duesQueue = [target, ...openDues];
    }
  }
  if (openDues.length === 0) {
    // no dues; treat as simple deposit
    const tx = await Transaction.create({
      userId: new Types.ObjectId(userId),
      type: "deposit",
      amountPoisha,
      occurredAt,
      note: note || "Deposit",
      createdBy: actorUserId ? new Types.ObjectId(actorUserId) : undefined,
    });
    return { tx, duesAffected: [] as string[] };
  }

  let remaining = amountPoisha;
  const duesAffected: string[] = [];

  // Create a single deposit transaction record
  const depositTx = await Transaction.create({
    userId: new Types.ObjectId(userId),
    type: "deposit",
    amountPoisha,
    occurredAt,
    note: note || "Deposit (pay due)",
    createdBy: actorUserId ? new Types.ObjectId(actorUserId) : undefined,
  });

  for (const due of duesQueue) {
    let changed = false;
    for (const item of due.schedule) {
      if (remaining <= 0) break;
      if (item.status === "paid") continue;

      const rule: any = (due as any).penaltyRule || { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 };
      const grace = input.graceDays ?? rule.graceDays;
      const penaltyPct = input.penaltyPctPerMonth ?? rule.monthlyPenaltyPct;
      let totalDue = item.totalDuePoisha;
      // Penalty applies only if overdue and includePenalty true
      if (input.includePenalty) {
        if (isOverdue(new Date(item.dueDate), occurredAt, grace) && rule.enabled) {
          // Simple monthly penalty on totalDue
          const penalty = Math.floor((totalDue * penaltyPct) / 100);
          totalDue += penalty;
        }
      }

      const remainingForItem = totalDue - (item.paidPoisha || 0);
      if (remainingForItem <= 0) continue;

      const pay = Math.min(remaining, remainingForItem);
      item.paidPoisha = (item.paidPoisha || 0) + pay;
      if (item.paidPoisha >= totalDue) item.status = "paid";
      else item.status = "partial";
      remaining -= pay;
      changed = true;
    }

    if (changed) {
      duesAffected.push(String(due._id));
      await due.save();
    }
    if (remaining <= 0) break;
  }

  return { tx: depositTx, duesAffected };
}
