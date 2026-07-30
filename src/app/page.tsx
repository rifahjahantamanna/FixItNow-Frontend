"use client";

import Link from "next/link";
import { useServices } from "@/lib/hooks/use-services";
import { ServiceCard } from "@/components/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data, isLoading, isError } = useServices({ limit: 6 } as any);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Trusted Home Services, One Click Away
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Book vetted technicians for plumbing, electrical, cleaning, and more.
        </p>
        <Link href="/services">
          <Button size="lg" className="mt-6">
            Browse Services
          </Button>
        </Link>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Featured Services</h2>

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-destructive">
            Failed to load services. Please try again later.
          </p>
        )}

        {data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}