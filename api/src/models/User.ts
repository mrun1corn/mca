import { Schema, model, Document } from "mongoose";

export type Role = "admin" | "accountant" | "user";

export interface IUser extends Document {
  name: string;
  username: string; // e.g. "robin", "jihad", unique handle
  memberCode?: string; // e.g. "MCA-001", unique member number
  phone?: string;
  email?: string;
  passwordHash: string;
  role: Role;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true, index: true, lowercase: true, trim: true },
    memberCode: { type: String, unique: true, sparse: true, index: true, uppercase: true, trim: true },
    phone: String,
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "accountant", "user"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

export default model<IUser>("User", UserSchema);
