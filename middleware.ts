import { NextRequest, NextResponse } from "next/server";

const roleRoutes: Record<string, string> = {
  "/dashboard/customer": "CUSTOMER",
  "/dashboard/technician": "TECHNICIAN",
  "/dashboard/admin": "ADMIN",
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = Object.keys(roleRoutes).some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};