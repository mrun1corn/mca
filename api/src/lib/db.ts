import mongoose from "mongoose";

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
