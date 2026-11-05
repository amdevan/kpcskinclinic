import { NextResponse } from "next/server";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

export const runtime = "nodejs";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  if (!ALLOWED.has(file.type.toLowerCase())) {
    return NextResponse.json({ error: `Unsupported type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 400 });
  }

  const ext =
    file.type === "image/jpeg"
      ? "jpg"
      : file.type === "image/svg+xml"
        ? "svg"
        : file.type.split("/")[1];
  const name = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = resolve(process.cwd(), "public", "uploads");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const filePath = resolve(dir, name);

  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${name}`, filename: name, size: buffer.length });
}