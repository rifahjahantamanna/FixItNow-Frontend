"use client";

import { useParams } from "next/navigation";
import { useCreatePaymentSession } from "@/lib/hooks/use-payments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";

export default function PayBookingPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const { mutate, isPending } = useCreatePaymentSession();
  const [redirecting, setRedirecting] = useState(false);

  const handlePay = () => {
    mutate(bookingId, {
      onSuccess: (data) => {
        setRedirecting(true);
        // Send the browser to SSLCommerz's hosted checkout page
        window.location.href = data.gatewayUrl;
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to start payment");
      },
    });
  };

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted-foreground">
            You&apos;ll be redirected to our secure payment provider, SSLCommerz, to complete
            this transaction.
          </p>
          <Button onClick={handlePay} className="w-full" disabled={isPending || redirecting}>
            {isPending || redirecting ? "Redirecting..." : "Proceed to Payment"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}