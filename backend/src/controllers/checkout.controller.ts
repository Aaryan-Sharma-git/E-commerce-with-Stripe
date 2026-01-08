import type { Request, Response } from "express";
import { createStripeCheckoutSession } from "../services/stripe.service.js";
import type { IOrderItem } from "../interfaces/order.interface.js";

export const createCheckoutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, items } = req.body as {
      email: string;
      items: IOrderItem[];
    };

    const session = await createStripeCheckoutSession(email, items);

    res.status(200).json({
      checkoutUrl: session.url,
      sessionId: session.id
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create checkout session"
    });
  }
};
