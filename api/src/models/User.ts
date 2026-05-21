import { Schema, model, Document } from "mongoose";

export type Role = "admin" | "accountant" | "user";

export interface IUser extends Document {
  name: string;
  phone?: string;
  email?: string;
  passwordHash: string;
  role: Role;
  status: "active" | "inactive";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: String,
    email: { type: String, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "accountant", "user"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

export default model<IUser>("User", UserSchema);

