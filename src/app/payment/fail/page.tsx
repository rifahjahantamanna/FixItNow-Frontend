"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentFailPage() {
  const router = useRouter();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-4 pt-8 pb-8">
          <XCircle className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">
            Something went wrong processing your payment. No charge was made. Please try again.
          </p>
          <Button onClick={() => router.push("/dashboard/customer")} className="w-full">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}