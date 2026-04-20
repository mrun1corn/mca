import { Schema, model, Types } from "mongoose";

const DueItem = new Schema(
  {
    dueDate: { type: Date, required: true },
    principalPart: { type: Number, required: true },
    interest: { type: Number, required: true },
    totalDue: { type: Number, required: true },
    penaltyApplied: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "partial", "paid", "cancelled"], default: "pending" },
  },
  { _id: false }
);

const DueSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true }, // taker
    cashOutTxId: { type: Types.ObjectId, ref: "Transaction" },
    principal: { type: Number, required: true },
    months: { type: Number, required: true },
    monthlyRatePct: { type: Number, required: true },
    schedule: { type: [DueItem], default: [] },
    status: { type: String, enum: ["active", "cancelled"], default: "active" },
    reason: String,
    penaltyRule: {
      enabled: { type: Boolean, default: true },
      monthlyPenaltyPct: { type: Number, default: 1.0 },
      graceDays: { type: Number, default: 3 },
    },
  },
  { timestamps: true }
);

export default model("Due", DueSchema);

