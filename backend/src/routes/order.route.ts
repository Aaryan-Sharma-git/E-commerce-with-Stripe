import { Router } from "express";
import { getOrderById } from "../controllers/order.controller.js";

const router = Router();

// GET /api/orders/:orderId
router.get("/:orderId", getOrderById);

export default router;
