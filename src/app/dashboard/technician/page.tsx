"use client";

import { useMyBookings } from "@/lib/hooks/use-bookings";
import { useUpdateBookingStatus } from "@/lib/hooks/use-technician";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { AddServiceDialog } from "@/components/add-service-dialog";
import { toast } from "sonner";
import Link from "next/link";

const nextActions: Record<string, { label: string; status: string; variant?: "default" | "destructive" | "outline" }[]> = {
  REQUESTED: [
    { label: "Accept", status: "ACCEPTED" },
    { label: "Decline", status: "DECLINED", variant: "destructive" },
  ],
  PAID: [{ label: "Start Job", status: "IN_PROGRESS" }],
  IN_PROGRESS: [{ label: "Mark Completed", status: "COMPLETED" }],
};

export default function TechnicianDashboardPage() {
  const { user } = useAuth();
  const { data: bookings, isLoading } = useMyBookings();
  const { mutate: updateStatus, isPending } = useUpdateBookingStatus();

  const handleAction = (bookingId: string, status: string) => {
    updateStatus(
      { bookingId, status },
      {
        onSuccess: () => toast.success(`Booking updated to ${status}`),
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update booking"),
      }
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Manage your incoming bookings.</p>
        </div>
        <div className="flex gap-2">
  <AddServiceDialog />
  <Link href="/dashboard/technician/profile">
    <Button variant="outline">Edit Profile</Button>
  </Link>
  <Link href="/dashboard/technician/availability">
    <Button variant="outline">Availability</Button>
  </Link>
</div>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      )}

      {bookings && bookings.length === 0 && (
        <p className="text-muted-foreground">No bookings yet.</p>
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
                    Customer: {booking.customer?.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <BookingStatusBadge status={booking.status} />
                  {nextActions[booking.status]?.map((action) => (
                    <Button
                      key={action.status}
                      size="sm"
                      variant={action.variant ?? "default"}
                      disabled={isPending}
                      onClick={() => handleAction(booking.id, action.status)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}