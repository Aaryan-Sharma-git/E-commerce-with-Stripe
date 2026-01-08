import express from "express";
import connectDB from "./config/database.js";
import cors from "cors"
import { FRONTEND_URL } from "./constants/env.js";
import authRouter from "./routes/auth.route.js"
import productRouter from "./routes/product.route.js"
import checkoutRoutes from "./routes/checkout.route.js"
import orderRoutes from "./routes/order.route.js"
import webhookRoutes from "./routes/webhook.route.js"
import {authenticate} from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";


const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/webhooks/stripe", express.raw({ type: "application/json" }));

// Connect DB once when app is created
connectDB();

app.use("/api/auth", authRouter)
app.use("/api/products", authenticate, productRouter);
app.use("/api/checkout", authenticate, checkoutRoutes);
app.use("/api/orders", authenticate, orderRoutes);
app.use("/api/webhooks", authenticate, webhookRoutes);
app.use("/api/user", authenticate, userRouter);

export default app;
