"use client";

import { useTechnicians, useTechnicianById } from "@/lib/hooks/use-services";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { data: techData, isLoading: techLoading } = useTechnicians({ page: 1 });
  const firstTechId = techData?.technicians?.[0]?.id;
  const { data: technician, isLoading: reviewsLoading } = useTechnicianById(firstTechId ?? "");

  const isLoading = techLoading || reviewsLoading;
  const reviews = technician?.reviews ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Be the first to leave a review after your booking is completed.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {reviews.slice(0, 3).map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;{review.comment || "Great service!"}&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium">{review.customer.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}