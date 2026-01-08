import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  price: z
    .number()
    .int()
    .positive("Price must be a positive integer (in cents)"),
  quantity: z
    .number()
    .int()
    .positive("Quantity must be at least 1")
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
