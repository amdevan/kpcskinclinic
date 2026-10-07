import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Rate limiter (in-memory): 20 uploads/min per IP
const RATE: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

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

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "svg"]);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  // 1) Auth check — must be a logged-in admin
  let session: any = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    // NextAuth failed — treat as unauthenticated
  }
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 2) Rate limit
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  // 3) Parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form_data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "no_file_provided" }, { status: 400 });
  }

  // 4) Validate file size
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "file_too_large", maxBytes: MAX_BYTES },
      { status: 400 },
    );
  }

  // 5) Validate file type by mime + extension
  const mimeType = file.type.toLowerCase();
  if (!ALLOWED_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: "unsupported_file_type", mimeType },
      { status: 400 },
    );
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: "unsupported_extension", ext },
      { status: 400 },
    );
  }

  // 6) Save to public/uploads/ with a unique filename
  const uniqueName = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, uniqueName);
  const publicUrl = `/uploads/${uniqueName}`;

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buf);
  } catch (err) {
    console.error("[upload] write failed", err);
    return NextResponse.json(
      { error: "server_error_writing_file" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, url: publicUrl });
}
