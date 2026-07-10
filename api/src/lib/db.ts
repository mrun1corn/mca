import mongoose, { ClientSession } from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "mca";
  
  if (!uri) throw new Error("MONGODB_URI not set");
  if (!process.env.DB_NAME) {
    // eslint-disable-next-line no-console
    console.warn("[db] Warning: DB_NAME not set. Falling back to 'mca'.");
  }

  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, { dbName });
}

/**
 * Executes a callback within a managed Mongoose transaction.
 * Automatically starts the session, wraps in a transaction, commit/abort, and closes the session.
 */
export async function runInTransaction<T>(
  callback: (session: ClientSession) => Promise<T>
): Promise<T> {
  const session = await mongoose.startSession();
  try {
    let result: T | undefined;
    await session.withTransaction(async () => {
      result = await callback(session);
    });
    return result!;
  } finally {
    await session.endSession();
  }
}

