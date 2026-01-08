import { OrderStatus } from "../utils/enum.util.js";

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}


export interface IOrder {
  _id?: string;
  email: string;
  items: IOrderItem[];
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  stripeSessionId?: string;
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


