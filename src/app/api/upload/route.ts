import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const RATE: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 60_000;
const MAX = 20;

export async function POST(req: NextRequest) {
  // Auth check
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = RATE[ip];
  if (!entry || entry.reset < now) {
    RATE[ip] = { count: 1, reset: now + WINDOW_MS };
  } else {
    entry.count += 1;
    if (entry.count > MAX) {
      return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
    }
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "no_file" }, { status: 400 });
    }

    // File type validation (whitelist)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "invalid_file_type" }, { status: 400 });
    }

    // File size validation (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "file_too_large" }, { status: 400 });
    }

    // Filename sanitization (prevent path traversal)
    const safeExt = (file.name.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 5);
    if (!["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(safeExt)) {
      return NextResponse.json({ error: "invalid_extension" }, { status: 400 });
    }

    const filename = `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    try {
      mkdirSync(uploadDir, { recursive: true });
    } catch {}

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = join(uploadDir, filename);
    writeFileSync(filepath, buffer);

    const url = `/uploads/${filename}`;

    // Security headers on response
    const res = NextResponse.json({ ok: true, url, filename, size: file.size, type: file.type });
    res.headers.set("X-Content-Type-Options", "nosniff");
    return res;
  } catch (err) {
    console.error("[upload] failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
