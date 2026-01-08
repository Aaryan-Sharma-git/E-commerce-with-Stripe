import { Schema, model } from "mongoose";
import type { IProduct } from "../interfaces/order.interface.js";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "usd"
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Product = model<IProduct>("Product", productSchema);
