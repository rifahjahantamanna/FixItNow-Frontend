"use client";

import { useAllUsers, useUpdateUserStatus } from "@/lib/hooks/use-admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { data: users, isLoading } = useAllUsers();
  const { mutate, isPending } = useUpdateUserStatus();

  const handleToggleBan = (userId: string, currentlyBanned: boolean) => {
    mutate(
      { userId, isBanned: !currentlyBanned },
      {
        onSuccess: () => toast.success(currentlyBanned ? "User unbanned" : "User banned"),
        onError: (err: any) => toast.error(err.response?.data?.message || "Action failed"),
      }
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Users</h1>

      {isLoading && <Skeleton className="h-96 w-full rounded-lg" />}

      {users && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{u.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={u.isBanned ? "destructive" : "outline"}>
                    {u.isBanned ? "Banned" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {u.role !== "ADMIN" && (
                    <Button
                      size="sm"
                      variant={u.isBanned ? "outline" : "destructive"}
                      disabled={isPending}
                      onClick={() => handleToggleBan(u.id, !!u.isBanned)}
                    >
                      {u.isBanned ? "Unban" : "Ban"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}