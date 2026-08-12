"use client";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { LayoutDashboard, CreditCard, User, Settings } from "lucide-react";

const customerItems = [
  { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "Payments", href: "/dashboard/customer/payments", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/dashboard/customer/settings", icon: Settings },
];

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar items={customerItems} title="Customer" />
      <div className="flex-1">{children}</div>
    </div>
  );
}