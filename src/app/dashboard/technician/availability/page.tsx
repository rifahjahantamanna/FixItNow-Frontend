"use client";

import { useState } from "react";
import { useMyAvailability, useAddAvailability } from "@/lib/hooks/use-technician";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AvailabilityPage() {
  const { data: slots, isLoading } = useMyAvailability();
  const { mutate, isPending } = useAddAvailability();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAdd = () => {
    if (!startTime || !endTime) {
      toast.error("Please select both start and end time");
      return;
    }
    mutate(
      { startTime, endTime },
      {
        onSuccess: () => {
          toast.success("Availability added!");
          setStartTime("");
          setEndTime("");
        },
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed to add slot"),
      }
    );
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Availability Slot</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Start</label>
            <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">End</label>
            <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <Button onClick={handleAdd} disabled={isPending}>
            {isPending ? "Adding..." : "Add Slot"}
          </Button>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Your Slots</h2>
      {isLoading && <Skeleton className="h-32 w-full rounded-lg" />}
      {slots && slots.length === 0 && <p className="text-muted-foreground">No availability set yet.</p>}
      {slots && slots.length > 0 && (
        <div className="space-y-2">
          {slots.map((slot) => (
            <Card key={slot.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <p className="text-sm">
                  {new Date(slot.startTime).toLocaleString()} — {new Date(slot.endTime).toLocaleString()}
                </p>
                <Badge variant={slot.isBooked ? "secondary" : "outline"}>
                  {slot.isBooked ? "Booked" : "Available"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}