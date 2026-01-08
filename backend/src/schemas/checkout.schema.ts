import { z } from "zod";
import { orderItemSchema } from "./orderItem.schema.js";

export const createCheckoutSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    items: z
      .array(orderItemSchema)
      .min(1, "At least one item is required")
  })
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
