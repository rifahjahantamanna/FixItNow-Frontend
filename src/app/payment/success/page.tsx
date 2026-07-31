"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");
  const queryClient = useQueryClient();

  useEffect(() => {
    // Booking status changed server-side (now PAID) — invalidate cache so the
    // dashboard shows the fresh status instead of stale ACCEPTED data
    queryClient.invalidateQueries({ queryKey: ["bookings"] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  }, [queryClient]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 pt-8 pb-8">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your booking has been confirmed and paid for. The technician will begin work soon.
          </p>
          <Button onClick={() => router.push("/dashboard/customer")} className="w-full">
            View My Bookings
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}