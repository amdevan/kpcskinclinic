import { NextResponse } from "next/server";

// The app runs on Vercel (serverless), where the function filesystem is
// read-only — we cannot write to public/ at runtime. Instead we return the
// uploaded file as a base64 data URL. The client (admin image upload) stores
// that data URL into the SiteSetting table (logo_url / favicon_url / …),
// which is persisted in the database. No filesystem writes, no external
// storage dependency, works in dev and prod.

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

function extFor(type: string): string {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/svg+xml") return "svg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  return type.split("/")[1] || "bin";
}

export async function POST(req: Request) {
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
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 },
    );
  }
}