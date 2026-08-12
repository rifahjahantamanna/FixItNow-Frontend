"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export function DashboardSidebar({
  items,
  title,
}: {
  items: SidebarItem[];
  title: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b bg-card sm:w-56 sm:border-b-0 sm:border-r">
      <div className="p-4">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <nav className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-visible">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}