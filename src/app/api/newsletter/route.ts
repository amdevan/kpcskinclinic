import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// In-memory rate limit (per-process) to prevent simple abuse
const RATE: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = RATE[ip];
  if (!entry || entry.reset < now) {
    RATE[ip] = { count: 1, reset: now + WINDOW_MS };
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function getIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (body?.email ?? "").toString().trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      // Idempotent — if they previously unsubscribed, re-subscribe them
      if (!existing.active) {
        await db.newsletterSubscriber.update({
          where: { email },
          data: { active: true },
        });
      }
      return NextResponse.json(
        { ok: true, status: "already_subscribed" },
        { status: 200 }
      );
    }

    await db.newsletterSubscriber.create({
      data: { email, active: true, source: "website_footer" },
    });

    return NextResponse.json({ ok: true, status: "subscribed" }, { status: 201 });
  } catch (err) {
    console.error("[newsletter] subscribe failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
