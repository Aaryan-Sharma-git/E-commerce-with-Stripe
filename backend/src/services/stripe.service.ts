import { stripe } from "../config/stripe.js";
import { Order } from "../models/order.model.js";
import type { IOrderItem } from "../interfaces/order.interface.js";
import { OrderStatus } from "../utils/enum.util.js";
import { FRONTEND_URL } from "../constants/env.js";

export const createStripeCheckoutSession = async (
  email: string,
  items: IOrderItem[]
) => {
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name
      },
      unit_amount: item.price
    },
    quantity: item.quantity
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: lineItems,
    success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/cancel`
  });

  await Order.create({
    email,
    items,
    totalAmount,
    currency: "usd",
    status: OrderStatus.PENDING,
    stripeSessionId: session.id
  });

  return session;
};
