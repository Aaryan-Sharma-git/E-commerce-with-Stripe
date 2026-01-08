import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../constants/env.js";

/**
 * Ensure Stripe secret key is present
 */
if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

/**
 * Stripe instance
 * Initialized once and reused across the application
 */
export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
  typescript: true
});
