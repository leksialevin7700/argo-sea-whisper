import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return mongoose.connection;

  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/argo_sea_whisper";

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || undefined,
  });

  isConnected = true;
  return mongoose.connection;
}



