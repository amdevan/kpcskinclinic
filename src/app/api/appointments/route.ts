import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// In-memory rate limit (per-process) to prevent simple abuse
const RATE: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

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

  const name = (body?.name ?? "").toString().trim();
  const phone = (body?.phone ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim() || null;
  const service = (body?.service ?? "").toString().trim();
  const message = (body?.message ?? "").toString().trim() || null;
  const preferredDateRaw = (body?.preferredDate ?? "").toString().trim();

  if (!name || !phone || !service || !preferredDateRaw) {
    return NextResponse.json(
      { error: "missing_required_fields" },
      { status: 400 }
    );
  }

  if (name.length > 120) {
    return NextResponse.json({ error: "name_too_long" }, { status: 400 });
  }
  if (phone.length > 40) {
    return NextResponse.json({ error: "phone_too_long" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const preferredDate = new Date(preferredDateRaw);
  if (isNaN(preferredDate.getTime())) {
    return NextResponse.json(
      { error: "invalid_preferred_date" },
      { status: 400 }
    );
  }

  try {
    const appointment = await db.appointment.create({
      data: {
        name,
        phone,
        email,
        service,
        preferredDate,
        message,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: appointment.id,
        status: appointment.status,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[appointments] create failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Simple list endpoint — for admin/diagnostic only.
  // In a real deployment you'd guard this with auth.
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }
  try {
    const items = await db.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        service: true,
        preferredDate: true,
        status: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error("[appointments] list failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
