import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  categoryId: z.string().uuid("Please select a category"),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;