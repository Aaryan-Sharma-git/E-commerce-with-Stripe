import type { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../config/stripe.js";
import { Order } from "../models/order.model.js";
import { OrderStatus } from "../utils/enum.util.js";
import { STRIPE_WEBHOOK_SECRET } from "../constants/env.js";

export const handleStripeWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const signature = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature as string,
      STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    res.status(400).send("Webhook signature verification failed");
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: OrderStatus.SUCCESS,
          paymentIntentId: session.payment_intent as string
        }
      );
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;

      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: OrderStatus.FAILED
        }
      );
      break;
    }
  }

  res.json({ received: true });
};
