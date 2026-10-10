import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 uses proxy.ts (middleware.ts is deprecated)
// Resilient auth check — protects /admin/* routes

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only intercept /admin routes (except login)
  if (!path.startsWith("/admin") || path === "/admin/login") {
    return NextResponse.next();
  }

  // Check for NextAuth session cookie
  const sessionCookie =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!sessionCookie) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // Security headers for admin responses
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return res;
}

export const config = {
  // Protect /admin itself (exact match) AND every sub-path under /admin/.
  // The bare "/admin" entry closes a security hole where /admin (without a
  // trailing slash) was previously not matched by "/admin/:path*" and could
  // bypass the auth check.
  matcher: ["/admin", "/admin/:path*"],
};
