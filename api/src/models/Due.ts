import { Schema, model, Types } from "mongoose";

const DueItem = new Schema(
  {
    dueDate: { type: Date, required: true },
    principalPartPoisha: { type: Number, required: true },
    interestPoisha: { type: Number, required: true },
    totalDuePoisha: { type: Number, required: true },
    paidPoisha: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "partial", "paid"], default: "pending" },
  },
  { _id: false }
);

const DueSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true }, // taker
    cashOutTxId: { type: Types.ObjectId, ref: "Transaction", required: true },
    principalPoisha: { type: Number, required: true },
    months: { type: Number, required: true },
    monthlyRatePct: { type: Number, required: true },
    schedule: { type: [DueItem], default: [] },
    penaltyRule: {
      enabled: { type: Boolean, default: true },
      monthlyPenaltyPct: { type: Number, default: 1.0 },
      graceDays: { type: Number, default: 3 },
    },
  },
  { timestamps: true }
);

export default model("Due", DueSchema);

