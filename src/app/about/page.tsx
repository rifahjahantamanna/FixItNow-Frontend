import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Wrench, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-semibold">
        About FixItNow
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
        FixItNow connects homeowners with vetted, trusted technicians for plumbing, electrical,
        cleaning, painting, and more — making it simple to book reliable help for the jobs
        around your home.
      </p>

      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-start gap-4 pt-6">
            <ShieldCheck className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <h3 className="mb-1 font-semibold">Verified Technicians</h3>
              <p className="text-sm text-muted-foreground">
                Every technician on our platform builds a profile with their skills, experience,
                and customer reviews, so you know who you&apos;re booking.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-start gap-4 pt-6">
            <Clock className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <h3 className="mb-1 font-semibold">Real-Time Booking</h3>
              <p className="text-sm text-muted-foreground">
                Track your booking from request to completion, with clear status updates at every
                step.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-start gap-4 pt-6">
            <Wrench className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <h3 className="mb-1 font-semibold">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Payments are processed securely once your technician accepts the job — no upfront
                risk.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-start gap-4 pt-6">
            <Users className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <h3 className="mb-1 font-semibold">For Technicians Too</h3>
              <p className="text-sm text-muted-foreground">
                Technicians can build a profile, manage availability, and grow their business
                through the platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}