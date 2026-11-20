import { Schema, model, Types } from "mongoose";

/**
 * One row per active login session (device). The refresh token carries a random
 * `jti`; only its SHA-256 hash is stored here so a database leak cannot be
 * replayed. Rotating a session deletes the old row and inserts a new one, which
 * makes reuse of a rotated token detectable (and rejected).
 */
export interface ISession {
  userId: Types.ObjectId;
  jtiHash: string;
  expiresAt: Date;
  lastUsedAt?: Date;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    jtiHash: { type: String, required: true, unique: true, index: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    lastUsedAt: Date,
    userAgent: String,
  },
  { timestamps: true }
);

export default model<ISession>("Session", SessionSchema);
