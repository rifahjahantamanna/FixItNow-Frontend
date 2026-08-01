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
      <section className="relative mb-12 overflow-hidden rounded-2xl border bg-primary px-6 py-20 text-center">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
            Trusted Home Services,{" "}
            <span className="text-accent">One Click Away</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Book vetted technicians for plumbing, electrical, cleaning, and more.
          </p>
          <Link href="/services">
            <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              Browse Services
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Featured Services
        </h2>

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