"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 pt-8 pb-8">
          <AlertCircle className="h-16 w-16 text-yellow-600" />
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            You cancelled the payment process. Your booking is still pending payment.
          </p>
          <Button onClick={() => router.push("/dashboard/customer")} className="w-full">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}