"use client";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { LayoutDashboard, Users, Tag, BarChart3, ClipboardList, User } from "lucide-react";

const adminItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Categories", href: "/dashboard/admin/categories", icon: Tag },
  { label: "Bookings", href: "/dashboard/admin/bookings", icon: ClipboardList },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Profile", href: "/profile", icon: User },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar items={adminItems} title="Admin" />
      <div className="flex-1">{children}</div>
    </div>
  );
}