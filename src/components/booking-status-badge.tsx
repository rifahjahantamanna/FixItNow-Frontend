import { BookingStatus } from "@/types";

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  REQUESTED: { label: "Requested", className: "border-yellow-400 bg-yellow-50 text-yellow-800" },
  ACCEPTED: { label: "Accepted", className: "border-blue-400 bg-blue-50 text-blue-800" },
  DECLINED: { label: "Declined", className: "border-red-400 bg-red-50 text-red-800" },
  PAID: { label: "Paid", className: "border-purple-400 bg-purple-50 text-purple-800" },
  IN_PROGRESS: { label: "In Progress", className: "border-green-400 bg-green-50 text-green-800" },
  COMPLETED: { label: "Completed", className: "border-gray-400 bg-gray-50 text-gray-800" },
  CANCELLED: { label: "Cancelled", className: "border-red-600 bg-red-100 text-red-900" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-dashed px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  );
}