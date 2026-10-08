import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFileSync, mkdirSync, existsSync } from "fs";
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

    // File type validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "invalid_file_type" }, { status: 400 });
    }

    // File size validation (max 5MB — smaller for base64 compatibility)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "file_too_large", max: "5MB" }, { status: 400 });
    }

    // Filename sanitization
    const safeExt = (file.name.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 5);
    if (!["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(safeExt)) {
      return NextResponse.json({ error: "invalid_extension" }, { status: 400 });
    }

    const filename = `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try writing to public/uploads/ (works locally, fails on Vercel)
    let url = "";
    let storage = "";

    try {
      const uploadDir = join(process.cwd(), "public", "uploads");
      // Check if the directory is writable
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      const filepath = join(uploadDir, filename);
      writeFileSync(filepath, buffer);
      url = `/uploads/${filename}`;
      storage = "file";
    } catch (writeErr) {
      // Vercel filesystem is read-only — fall back to base64 data URL
      const mimeType = file.type || `image/${safeExt}`;
      const base64 = buffer.toString("base64");
      url = `data:${mimeType};base64,${base64}`;
      storage = "base64";
    }

    const res = NextResponse.json({
      ok: true,
      url,
      filename,
      size: file.size,
      type: file.type,
      storage,
    });
    res.headers.set("X-Content-Type-Options", "nosniff");
    return res;
  } catch (err) {
    console.error("[upload] failed", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
