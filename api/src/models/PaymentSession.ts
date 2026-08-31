import { Schema, model, Types } from "mongoose";

export interface IPaymentSession {
  userId: Types.ObjectId;
  invoiceId: string;
  amount: number;
  mode: "simple" | "pay_due";
  dueId?: Types.ObjectId | null;
  status: "pending" | "completed" | "failed" | "cancelled";
  paymentMethod?: string;
  senderNumber?: string;
  transactionId?: string;
  depositTxId?: Types.ObjectId;
  duesAffected?: string[];
  metadata?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentSessionSchema = new Schema<IPaymentSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    invoiceId: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true },
    mode: { type: String, enum: ["simple", "pay_due"], default: "simple" },
    dueId: { type: Schema.Types.ObjectId, ref: "Due" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
      index: true,
    },
    paymentMethod: { type: String },
    senderNumber: { type: String },
    transactionId: { type: String },
    depositTxId: { type: Schema.Types.ObjectId, ref: "Transaction" },
    duesAffected: [{ type: String }],
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default model<IPaymentSession>("PaymentSession", PaymentSessionSchema);
