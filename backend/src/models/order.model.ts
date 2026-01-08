import { Schema, model } from "mongoose";
import type { IOrder } from "../interfaces/order.interface.js";
import { OrderStatus } from "../utils/enum.util.js";

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "usd"
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING
    },
    stripeSessionId: {
      type: String
    },
    paymentIntentId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Order = model<IOrder>("Order", orderSchema);
