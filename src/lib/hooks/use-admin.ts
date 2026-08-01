"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse, User, Booking, Category } from "@/types";

export function useAllUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<User[]>>("/api/admin/users");
      return res.data.data;
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, isBanned }: { userId: string; isBanned: boolean }) => {
      const res = await api.patch<ApiResponse<User>>(`/api/admin/users/${userId}`, { isBanned });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}

export function useAllBookings() {
  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Booking[]>>("/api/admin/bookings");
      return res.data.data;
    },
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Category[]>>("/api/admin/categories");
      return res.data.data;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      const res = await api.post<ApiResponse<Category>>("/api/admin/categories", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // public categories list too
    },
  });
}