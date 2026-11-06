import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: global security headers (CSP, HSTS, ...) live in next.config.ts
// headers() so they apply to every route, not just ones matched here.

// ---------- API request guards ----------

const API_BODY_LIMIT = 64 * 1024; // 64 KB for JSON APIs (upload exempt)

// Returns a 4xx response when the request is suspicious, otherwise null.
function guardApiRequest(req: NextRequest): NextResponse | null {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/api/")) return null;

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      const originHost = new URL(origin).host;
      const host = req.headers.get("host");
      if (host && originHost !== host) {
        return NextResponse.json(
          { error: "cross_origin_rejected" },
          { status: 403 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "cross_origin_rejected" },
        { status: 403 },
      );
    }
  }

  if (path === "/api/upload") return null; // multipart — governed by auth + 4MB cap in the route

  const len = req.headers.get("content-length");
  if (len && Number(len) > API_BODY_LIMIT) {
    return NextResponse.json(
      { error: "payload_too_large" },
      { status: 413 },
    );
  }
  return null;
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Reject cross-origin / oversized API calls before anything else.
  const guard = guardApiRequest(req);
  if (guard) return guard;

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

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Protect /admin itself (exact match) AND every sub-path under /admin/.
  // The bare "/admin" entry closes a security hole where /admin (without a
  // trailing slash) was previously not matched by "/admin/:path*" and could
  // bypass the auth check.
  // /api is guarded for oversized / cross-origin requests.
  matcher: ["/admin", "/admin/:path*", "/api/:path*"],
};
