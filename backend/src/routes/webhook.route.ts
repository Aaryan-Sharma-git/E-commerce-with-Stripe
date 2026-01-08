import { Router } from "express";
import { handleStripeWebhook } from "../webhooks/stripe.webhook.js";

const router = Router();

// POST /api/webhooks/stripe
router.post("/stripe", handleStripeWebhook);

export default router;
