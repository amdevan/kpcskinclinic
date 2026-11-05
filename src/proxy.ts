import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Stash the request pathname on a custom REQUEST header so the root
  // layout can detect CMS admin routes and suppress the public
  // Header/Footer/FloatingButtons/Popup.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  // Only intercept /admin routes (except login)
  if (!path.startsWith("/admin") || path === "/admin/login") {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
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
  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
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