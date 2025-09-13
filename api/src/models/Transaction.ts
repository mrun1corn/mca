import { Schema, model, Types } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", index: true, required: true },
    type: { type: String, enum: ["deposit", "withdraw"], required: true },
    amountPoisha: { type: Number, required: true }, // signed integer (poisha)
    occurredAt: { type: Date, required: true },
    note: String,
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
    deletedAt: Date,
  },
  { timestamps: true }
);

export default model("Transaction", TransactionSchema);

