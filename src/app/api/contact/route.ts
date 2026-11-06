import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sanitizeInput } from "@/lib/security";

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

  const name = sanitizeInput(body?.name, 120);
  const phone = sanitizeInput(body?.phone, 40);
  const email = sanitizeInput(body?.email, 254) || null;
  const service = sanitizeInput(body?.service, 200);
  const message = sanitizeInput(body?.message, 4000);

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "missing_required_fields" },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400 });
  }

  try {
    // Reuse the Appointment table as a general contact message store.
    // If no preferredDate, set it to far future to indicate "general enquiry".
    const record = await db.appointment.create({
      data: {
        name,
        phone,
        email,
        service: service || "General Enquiry",
        preferredDate: new Date("2099-12-31"),
        message,
        status: "pending",
      },
    });

    return NextResponse.json(
      { ok: true, id: record.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact] create failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
