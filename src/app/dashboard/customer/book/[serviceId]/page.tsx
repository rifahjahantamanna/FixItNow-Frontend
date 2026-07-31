"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookingSchema, CreateBookingInput } from "@/lib/validators/booking.validator";
import { useCreateBooking } from "@/lib/hooks/use-bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function BookServicePage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;

  const { mutate, isPending } = useCreateBooking(serviceId);

  const form = useForm<CreateBookingInput>({
    resolver: zodResolver(createBookingSchema),
  });

  const onSubmit = (data: CreateBookingInput) => {
    mutate(data, {
      onSuccess: (booking) => {
        toast.success("Booking created! Waiting for technician to accept.");
        router.push("/dashboard/customer");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to create booking");
      },
    });
  };

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Your Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date & Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}