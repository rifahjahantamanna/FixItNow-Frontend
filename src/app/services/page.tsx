"use client";

import { useState } from "react";
import { useServices, useCategories } from "@/lib/hooks/use-services";
import { ServiceCard } from "@/components/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRICE_RANGES = [
  { label: "Any Price", min: undefined, max: undefined },
  { label: "Under ৳500", min: undefined, max: 500 },
  { label: "৳500 – ৳1000", min: 500, max: 1000 },
  { label: "৳1000 – ৳2000", min: 1000, max: 2000 },
  { label: "Over ৳2000", min: 2000, max: undefined },
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [priceRangeIndex, setPriceRangeIndex] = useState("0");
  const [page, setPage] = useState(1);

  const { data: categories } = useCategories();
  const selectedRange = PRICE_RANGES[Number(priceRangeIndex)];

  const { data, isLoading, isError } = useServices({
    search: search || undefined,
    categoryId,
    minPrice: selectedRange.min,
    maxPrice: selectedRange.max,
    page,
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold">
        Browse Services
      </h1>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search services..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="sm:max-w-xs"
        />

        <Select
          value={categoryId ?? "all"}
          onValueChange={(value) => {
            setCategoryId(value === "all" ? undefined : value);
            setPage(1);
          }}
        >
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRangeIndex}
          onValueChange={(value) => {
            setPriceRangeIndex(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((range, i) => (
              <SelectItem key={range.label} value={i.toString()}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-destructive">Failed to load services.</p>
      )}

      {data && data.services.length === 0 && (
        <p className="text-center text-muted-foreground">No services found.</p>
      )}

      {data && data.services.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page >= data.pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </main>
  );
}