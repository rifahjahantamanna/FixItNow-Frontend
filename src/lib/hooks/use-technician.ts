"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse, Booking, TechnicianProfile } from "@/types";

interface AvailabilitySlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export function useMyTechnicianProfile() {
  return useQuery({
    queryKey: ["technician-profile"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TechnicianProfile>>("/api/technician/profile");
      return res.data.data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { bio?: string; skills?: string[]; experience?: number; hourlyRate?: number }) => {
      const res = await api.put<ApiResponse<TechnicianProfile>>("/api/technician/profile", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technician-profile"] });
    },
  });
}

export function useMyAvailability() {
  return useQuery({
    queryKey: ["availability"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<AvailabilitySlot[]>>("/api/technician/availability");
      return res.data.data;
    },
  });
}

export function useAddAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { startTime: string; endTime: string }) => {
      const res = await api.post<ApiResponse<AvailabilitySlot>>("/api/technician/availability", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: string }) => {
      const res = await api.patch<ApiResponse<Booking>>(`/api/technician/bookings/${bookingId}`, { status });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description?: string; price: number; categoryId: string }) => {
      const res = await api.post("/api/technician/services", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technician-profile"] });
    },
  });
}