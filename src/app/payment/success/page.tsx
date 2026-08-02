"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["bookings"] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  }, [queryClient]);

  return (
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
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <PaymentSuccessContent />
      </Suspense>
    </main>
  );
}