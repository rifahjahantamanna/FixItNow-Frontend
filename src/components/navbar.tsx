"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();

  const dashboardPath =
    user?.role === "ADMIN"
      ? "/dashboard/admin"
      : user?.role === "TECHNICIAN"
      ? "/dashboard/technician"
      : "/dashboard/customer";

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Services
          </Link>

          {isLoading ? null : user ? (
            <>
              <Link href={dashboardPath}>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}