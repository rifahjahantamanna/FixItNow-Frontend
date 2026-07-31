import { z } from "zod";

export const createBookingSchema = z.object({
  scheduledAt: z.coerce.date().refine((date) => date > new Date(), {
    message: "Please select a future date and time",
  }),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;