import { Schema, model, Types } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    userName: { type: String, required: true }, // Store username for display when user is deleted
    type: { type: String, enum: ["deposit", "withdraw"], required: true },
    amount: { type: Number, required: true }, // signed amount
    occurredAt: { type: Date, required: true },
    note: String,
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
    deletedAt: Date,
  },
  { timestamps: true }
);

export default model("Transaction", TransactionSchema);

