import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/types";

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  REQUESTED: { label: "Requested", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  ACCEPTED: { label: "Accepted", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  DECLINED: { label: "Declined", className: "bg-red-100 text-red-800 hover:bg-red-100" },
  PAID: { label: "Paid", className: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
  IN_PROGRESS: { label: "In Progress", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  COMPLETED: { label: "Completed", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
  CANCELLED: { label: "Cancelled", className: "bg-red-200 text-red-900 hover:bg-red-200" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const config = statusConfig[status];
  return <Badge className={config.className}>{config.label}</Badge>;
}