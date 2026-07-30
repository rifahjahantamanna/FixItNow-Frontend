"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ApiResponse, Service, TechnicianProfile, Category, Review } from "@/types";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ServicesResponse {
  services: Service[];
  pagination: Pagination;
}

interface TechniciansResponse {
  technicians: TechnicianProfile[];
  pagination: Pagination;
}

interface ServiceFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
}

export function useServices(filters?: ServiceFilters) {
  return useQuery({
    queryKey: ["services", filters],
    queryFn: async () => {
      const res = await api.get<ApiResponse<ServicesResponse>>("/api/services", {
        params: filters,
      });
      return res.data.data;
    },
  });
}

export function useTechnicians(filters?: { skill?: string; page?: number }) {
  return useQuery({
    queryKey: ["technicians", filters],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TechniciansResponse>>("/api/technicians", {
        params: filters,
      });
      return res.data.data;
    },
  });
}

export function useTechnicianById(id: string) {
  return useQuery({
    queryKey: ["technician", id],
    queryFn: async () => {
      const res = await api.get<
        ApiResponse<TechnicianProfile & { reviews: (Review & { customer: { name: string } })[]; avgRating: number | null }>
      >(`/api/technicians/${id}`);
      return res.data.data;
    },
    enabled: !!id, // don't fire the query until we actually have an id
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Category[]>>("/api/categories");
      return res.data.data;
    },
  });
}