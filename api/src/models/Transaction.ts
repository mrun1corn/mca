import { Schema, model, Types } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    userName: { type: String, required: true }, // Store username for display when user is deleted
    type: { type: String, enum: ["deposit", "withdraw"], required: true },
    amount: { type: Number, required: true }, // signed amount
    occurredAt: { type: Date, required: true },
    cycleMonth: { type: String, default: null, index: true }, // e.g. "2025-07"
    note: String,
    splitGroupId: { type: Types.ObjectId, index: true },
    dueId: { type: Types.ObjectId, ref: "Due", index: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
    deletedAt: Date,
  },
  { timestamps: true }
);

// Compound indexes for performant sorting, filtering, and foreign key traversals
TransactionSchema.index({ userId: 1, deletedAt: 1, occurredAt: -1 });
TransactionSchema.index({ type: 1, occurredAt: -1, deletedAt: 1 });
TransactionSchema.index({ splitGroupId: 1, deletedAt: 1 });
TransactionSchema.index({ cycleMonth: 1, deletedAt: 1 });

export default model("Transaction", TransactionSchema);
