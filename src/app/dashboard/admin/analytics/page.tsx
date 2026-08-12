"use client";

import { useAllBookings } from "@/lib/hooks/use-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useMemo } from "react";

const STATUS_COLORS: Record<string, string> = {
  REQUESTED: "#eab308",
  ACCEPTED: "#3b82f6",
  DECLINED: "#ef4444",
  PAID: "#a855f7",
  IN_PROGRESS: "#22c55e",
  COMPLETED: "#6b7280",
  CANCELLED: "#dc2626",
};

export default function AdminAnalyticsPage() {
  const { data: bookings, isLoading } = useAllBookings();

  const statusData = useMemo(() => {
    if (!bookings) return [];
    const counts: Record<string, number> = {};
    bookings.forEach((b) => {
      counts[b.status] = (counts[b.status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [bookings]);

  const revenueByMonth = useMemo(() => {
    if (!bookings) return [];
    const months: Record<string, number> = {};
    bookings.forEach((b) => {
      if (b.payment?.status === "COMPLETED" && b.payment.paidAt) {
        const month = new Date(b.payment.paidAt).toLocaleString("default", {
          month: "short",
          year: "2-digit",
        });
        months[month] = (months[month] || 0) + Number(b.payment.amount);
      }
    });
    return Object.entries(months).map(([month, revenue]) => ({ month, revenue }));
  }, [bookings]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold">
        Analytics
      </h1>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      )}

      {bookings && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bookings by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {statusData.map((entry) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue by Month</CardTitle>
            </CardHeader>
            <CardContent>
              {revenueByMonth.length === 0 ? (
                <p className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
                  No completed payments yet.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value: any) => `৳${Number(value ?? 0).toFixed(0)}`} />
                    <Bar dataKey="revenue" fill="var(--color-primary, #28425f)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}