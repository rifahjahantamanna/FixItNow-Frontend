"use client";

import Link from "next/link";
import { useMyBookings } from "@/lib/hooks/use-bookings";
import { useMyPayments } from "@/lib/hooks/use-payments";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReviewDialog } from "@/components/review-dialog";
import { useAuth } from "@/context/auth-context";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useMyBookings();
  const { data: payments, isLoading: paymentsLoading } = useMyPayments();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-3xl font-bold">
        Welcome, {user?.name}
      </h1>
      <p className="mb-8 text-muted-foreground">Manage your bookings and payments.</p>

      <Tabs defaultValue="bookings">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="mt-6">
          {bookingsLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          )}

          {bookings && bookings.length === 0 && (
            <p className="text-muted-foreground">
              No bookings yet.{" "}
              <Link href="/services" className="underline">
                Browse services
              </Link>{" "}
              to get started.
            </p>
          )}

          {bookings && bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
                    <div>
                      <p className="font-medium">{booking.service?.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.scheduledAt).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Technician: {booking.technician?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookingStatusBadge status={booking.status} />

                      {booking.status === "ACCEPTED" && (
                        <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>
                          <Button size="sm">Pay Now</Button>
                        </Link>
                      )}

                      {booking.status === "COMPLETED" && !booking.review && (
                        <ReviewDialog bookingId={booking.id} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          {paymentsLoading && <Skeleton className="h-48 w-full rounded-lg" />}

          {payments && payments.length === 0 && (
            <p className="text-muted-foreground">No payments yet.</p>
          )}

          {payments && payments.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>৳{Number(payment.amount).toFixed(0)}</TableCell>
                      <TableCell>{payment.method || "—"}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                      <TableCell>
                        {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}