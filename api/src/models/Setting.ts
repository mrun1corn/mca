import { Schema, model } from "mongoose";

export interface ISetting {
  key: string;
  value: unknown;
  updatedAt?: Date;
}

const SettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default model("Setting", SettingSchema);
