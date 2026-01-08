import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.js";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
