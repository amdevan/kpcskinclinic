import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Rate limiting (in-memory, per process)
const RATE: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW: Record<string, number> = {
  default: 30,
  "POST": 10,
  "DELETE": 5,
};

function getIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

function rateLimited(ip: string, method: string) {
  const now = Date.now();
  const limit = MAX_PER_WINDOW[method] || MAX_PER_WINDOW.default;
  const key = `${ip}-${method}`;
  const entry = RATE[key];
  if (!entry || entry.reset < now) {
    RATE[key] = { count: 1, reset: now + WINDOW_MS };
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export function withAuth(handler: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    // Rate limiting
    const ip = getIp(req);
    if (rateLimited(ip, req.method)) {
      return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
    }

    // Auth check
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "auth_failed" }, { status: 401 });
    }

    // Security headers
    const res = await handler(req);
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Frame-Options", "DENY");
    return res;
  };
}

// Input sanitization helper
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input) return "";
  return input
    .toString()
    .trim()
    .slice(0, maxLength)
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "");
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  return /^\d{7,15}$/.test(cleaned);
}
