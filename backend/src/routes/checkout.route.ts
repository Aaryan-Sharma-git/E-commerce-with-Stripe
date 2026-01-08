import { Router } from "express";
import { createCheckoutSession } from "../controllers/checkout.controller.js";
import { validateRequest } from "../middlewares/validateSchema.middleware.js";
import { createCheckoutSchema } from "../schemas/checkout.schema.js";

const router = Router();

router.post(
  "/create-session",
  validateRequest(createCheckoutSchema),
  createCheckoutSession
);

export default router;
