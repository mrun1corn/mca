import mongoose from "mongoose";

const DB_NAME = "mca"; // Explicit database name

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set");
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, { dbName: DB_NAME });
}
