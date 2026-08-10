"use client";

import Link from "next/link";
import { useServices, useCategories, useTechnicians } from "@/lib/hooks/use-services";
import { ServiceCard } from "@/components/service-card";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Calendar, Wrench, ShieldCheck, Users, Star } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function HomePage() {
  const { data, isLoading, isError } = useServices({ limit: 6 } as any);
  const { data: categories } = useCategories();
  const { data: techData } = useTechnicians({ page: 1 });
  const { user } = useAuth();

  return (
    <main>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b bg-primary px-6 py-20 text-center">
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

      <div className="mx-auto max-w-6xl px-4">
        {/* 2. How It Works */}
        <section className="py-16">
          <h2 className="mb-10 text-center font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">1. Browse Services</h3>
              <p className="text-sm text-muted-foreground">
                Search vetted technicians by category, price, and rating.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">2. Book a Time Slot</h3>
              <p className="text-sm text-muted-foreground">
                Pick a date and time that works, and pay securely once accepted.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">3. Get It Fixed</h3>
              <p className="text-sm text-muted-foreground">
                Track progress in real time and leave a review once complete.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Categories */}
        {categories && categories.length > 0 && (
          <section className="border-t py-16">
            <h2 className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/services?categoryId=${cat.id}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                      <Wrench className="h-6 w-6 text-accent" />
                      <p className="font-medium">{cat.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 4. Featured Services */}
        <section className="border-t py-16">
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

        {/* 5. Stats */}
        <section className="border-t py-16">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-bold text-primary">
                {techData?.pagination.total ?? "—"}
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> Technicians
              </p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-bold text-primary">
                {categories?.length ?? "—"}
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4" /> Categories
              </p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-bold text-primary">
                {data?.pagination.total ?? "—"}
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4" /> Services Listed
              </p>
            </div>
            <div className="text-center">
              <p className="font-[family-name:var(--font-mono)] text-3xl font-bold text-primary">
                100%
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" /> Verified Bookings
              </p>
            </div>
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="border-t py-16">
          <h2 className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
            What Customers Say
          </h2>
          <TestimonialsSection />
        </section>

        {/* 7. FAQ */}
        <section className="border-t py-16">
          <h2 className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I book a technician?</AccordionTrigger>
              <AccordionContent>
                Browse services, choose a technician, pick a date and time, and submit your request.
                Once the technician accepts, you&apos;ll be prompted to pay to confirm the booking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
              <AccordionContent>
                Payments are processed securely through SSLCommerz, supporting cards, mobile
                banking, and net banking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I cancel a booking?</AccordionTrigger>
              <AccordionContent>
                Bookings can be managed from your customer dashboard before work begins. Contact
                support if you need help with an existing booking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I become a technician on FixItNow?</AccordionTrigger>
              <AccordionContent>
                Register with the Technician role, complete your profile with your skills and
                experience, and start adding the services you offer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 8. CTA */}
{user ? (
  <section className="border-t py-16 text-center">
    <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
      Welcome back, {user.name}
    </h2>
    <p className="mx-auto mt-3 max-w-md text-muted-foreground">
      Jump back into your dashboard to manage your bookings.
    </p>
    <Link
      href={
        user.role === "ADMIN"
          ? "/dashboard/admin"
          : user.role === "TECHNICIAN"
          ? "/dashboard/technician"
          : "/dashboard/customer"
      }
    >
      <Button size="lg" className="mt-6">
        Go to Dashboard
      </Button>
    </Link>
  </section>
) : (
  <section className="border-t py-16 text-center">
    <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
      Ready to get started?
    </h2>
    <p className="mx-auto mt-3 max-w-md text-muted-foreground">
      Join FixItNow today as a customer or technician and experience trusted home services.
    </p>
    <Link href="/auth/register">
      <Button size="lg" className="mt-6">
        Create an Account
      </Button>
    </Link>
  </section>
)}
      </div>
    </main>
  );
}