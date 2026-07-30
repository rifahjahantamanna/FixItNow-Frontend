"use client";

import { useParams } from "next/navigation";
import { useTechnicianById } from "@/lib/hooks/use-services";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ServiceCard } from "@/components/service-card";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TechnicianProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { data: technician, isLoading, isError } = useTechnicianById(id);
  const { user } = useAuth();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="h-32 w-full rounded-lg" />
      </main>
    );
  }

  if (isError || !technician) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 text-center">
        <p className="text-destructive">Technician not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{technician.user?.name}</CardTitle>
              <p className="mt-1 text-muted-foreground">{technician.bio}</p>
            </div>
            {technician.avgRating !== null && (
              <Badge className="text-base">⭐ {technician.avgRating.toFixed(1)}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technician.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {technician.experience} years of experience · ৳{Number(technician.hourlyRate).toFixed(0)}/hr
          </p>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Services</h2>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {technician.services?.map((service) => (
          <div key={service.id}>
            <ServiceCard service={{ ...service, technicianProfile: technician }} />
            {user?.role === "CUSTOMER" && (
              <Link href={`/dashboard/customer/book/${service.id}`}>
                <Button className="mt-2 w-full">Book Now</Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
      {technician.reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {technician.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.customer.name}</p>
                  <Badge variant="secondary">⭐ {review.rating}</Badge>
                </div>
                {review.comment && (
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}