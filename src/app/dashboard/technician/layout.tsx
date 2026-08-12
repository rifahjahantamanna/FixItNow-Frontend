"use client";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { LayoutDashboard, Calendar, User } from "lucide-react";

const technicianItems = [
  { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
  { label: "Availability", href: "/dashboard/technician/availability", icon: Calendar },
  { label: "Profile", href: "/dashboard/technician/profile", icon: User },
];

export default function TechnicianDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar items={technicianItems} title="Technician" />
      <div className="flex-1">{children}</div>
    </div>
  );
}