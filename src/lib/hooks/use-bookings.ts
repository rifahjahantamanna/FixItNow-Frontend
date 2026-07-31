"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse, Booking } from "@/types";
import { CreateBookingInput } from "@/lib/validators/booking.validator";

export function useMyBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Booking[]>>("/api/bookings");
      return res.data.data;
    },
  });
}

export function useCreateBooking(serviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      const res = await api.post<ApiResponse<Booking>>("/api/bookings", {
        serviceId,
        ...input,
      });
      return res.data.data;
    },
    onSuccess: () => {
      // Invalidate the bookings list so it refetches with the new booking included
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}