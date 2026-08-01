"use client";

import { useAllUsers } from "@/lib/hooks/use-admin";
import { useAllBookings } from "@/lib/hooks/use-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { data: users, isLoading: usersLoading } = useAllUsers();
  const { data: bookings, isLoading: bookingsLoading } = useAllBookings();

  const totalRevenue = bookings
    ?.filter((b) => b.payment?.status === "COMPLETED")
    .reduce((sum, b) => sum + Number(b.payment?.amount || 0), 0);

  const activeBookings = bookings?.filter((b) =>
    ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)
  ).length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Platform overview and management.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
          <Link href="/dashboard/admin/categories">
            <Button variant="outline">Manage Categories</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {usersLoading ? <Skeleton className="h-8 w-16" /> : <p className="text-3xl font-bold">{users?.length ?? 0}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? <Skeleton className="h-8 w-16" /> : <p className="text-3xl font-bold">{activeBookings ?? 0}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-3xl font-bold">৳{totalRevenue?.toFixed(0) ?? 0}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}