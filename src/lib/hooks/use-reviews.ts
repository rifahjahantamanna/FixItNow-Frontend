"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse, Review } from "@/types";
import { CreateReviewInput } from "@/lib/validators/review.validator";

export function useCreateReview(bookingId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateReviewInput) => {
      const res = await api.post<ApiResponse<Review>>("/api/reviews", {
        bookingId,
        ...input,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}