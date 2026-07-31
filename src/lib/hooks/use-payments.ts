"use client";

import { useQuery,useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse, Payment } from "@/types";

export function useMyPayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Payment[]>>("/api/payments");
      return res.data.data;
    },
  });
}
export function useCreatePaymentSession() {
  return useMutation({
    mutationFn: async (bookingId: string) => {
      const res = await api.post<ApiResponse<{ paymentId: string; gatewayUrl: string }>>(
        "/api/payments/create",
        { bookingId }
      );
      return res.data.data;
    },
  });
}