import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 uses proxy.ts (middleware.ts is deprecated)
// Simple, resilient auth check that doesn't crash if NEXTAUTH_SECRET is missing

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only intercept /admin routes (except login)
  if (!path.startsWith("/admin") || path === "/admin/login") {
    return NextResponse.next();
  }

  // Check for NextAuth session cookie (works with or without NEXTAUTH_SECRET)
  const sessionCookie =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!sessionCookie) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
