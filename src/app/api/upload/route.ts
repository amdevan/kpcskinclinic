import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// The app runs on Vercel (serverless), where the function filesystem is
// read-only — we cannot write to public/ at runtime. Instead we return the
// uploaded file as a base64 data URL. The client (admin image upload) stores
// that data URL into the SiteSetting table (logo_url / favicon_url / …),
// which is persisted in the database. No filesystem writes, no external
// storage dependency, works in dev and prod.
//
// Admin-only: require an authenticated session. This endpoint stores user
// content into the DB, so it must never be reachable anonymously.
//
// SVG is intentionally NOT allowed: SVG can embed <script> and becomes
// stored XSS when served back. Static SVGs already in public/ are unaffected.

// Raster formats only — no SVG (script-capable), no XML-capable types.
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

// In-memory rate limit: 20 uploads/min per IP.
const RATE: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE[ip];
  if (!entry || entry.reset < now) {
    RATE[ip] = { count: 1, reset: now + WINDOW_MS };
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function extFor(type: string): string {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  return "bin";
}

export async function POST(req: Request) {
  // 1) Auth gate — 401 for anonymous callers.
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 2) Rate limit.
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429 },
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Expected multipart/form-data" },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const type = file.type.toLowerCase();
    if (!ALLOWED.has(type)) {
      return NextResponse.json(
        { error: `Unsupported type: ${file.type}` },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large (max 4 MB)" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${type};base64,${buffer.toString("base64")}`;

    return NextResponse.json({
      url: dataUrl,
      filename: `upload_${Date.now()}.${extFor(type)}`,
      size: buffer.length,
      inline: true,
    });
  } catch (e: any) {
    // Never let an unhandled exception produce an empty response body —
    // the client expects JSON and crashes with "Unexpected end of JSON input"
    // when the body is empty.
    console.error("[upload] route error:", e);
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 },
    );
  }
}
