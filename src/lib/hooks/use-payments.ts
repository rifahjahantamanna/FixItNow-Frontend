"use client";

import { useQuery } from "@tanstack/react-query";
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