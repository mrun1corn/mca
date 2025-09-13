import { Schema, model } from "mongoose";

export type Role = "admin" | "accountant" | "user";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: String,
    email: { type: String, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "accountant", "user"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default model("User", UserSchema);

