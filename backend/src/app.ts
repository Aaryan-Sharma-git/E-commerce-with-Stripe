import express from "express";
import connectDB from "./config/database.js";
import cors from "cors"
import { FRONTEND_URL } from "./constants/env.js";

const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect DB once when app is created
connectDB();

export default app;
