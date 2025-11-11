import { Schema, model, Types } from "mongoose";

const ContributorSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    sharePoisha: { type: Number, required: true },
  },
  { _id: false }
);

const InterestScheduleSchema = new Schema(
  {
    monthIndex: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    interestPoisha: { type: Number, required: true },
    status: { type: String, enum: ["pending", "realized"], default: "pending" },
    realizedAt: { type: Date },
  },
  { _id: false }
);

const InvestmentSchema = new Schema(
  {
    name: { type: String, required: true },
    amountPoisha: { type: Number, required: true },
    startDate: { type: Date, required: true },
    months: { type: Number, default: null },
    monthlyRatePct: { type: Number, default: 0 },
    expectedInterestPoisha: { type: Number, required: true },
    contributors: { type: [ContributorSchema], default: [] },
    schedule: { type: [InterestScheduleSchema], default: [] },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    returnedPoisha: { type: Number, default: 0 },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Investment", InvestmentSchema);
