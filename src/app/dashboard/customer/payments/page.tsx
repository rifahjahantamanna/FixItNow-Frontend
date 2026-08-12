"use client";

import { useMyPayments } from "@/lib/hooks/use-payments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function CustomerPaymentsPage() {
  const { data: payments, isLoading } = useMyPayments();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold">
        Payment History
      </h1>

      {isLoading && <Skeleton className="h-64 w-full rounded-lg" />}

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
                  <TableCell className="font-[family-name:var(--font-mono)]">
                    ৳{Number(payment.amount).toFixed(0)}
                  </TableCell>
                  <TableCell>{payment.method || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "COMPLETED" ? "default" : "secondary"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}