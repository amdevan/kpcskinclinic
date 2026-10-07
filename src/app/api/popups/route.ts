import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const popups = await db.popup.findMany({
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        buttonText: true,
        buttonLink: true,
        isActive: true,
        dismissible: true,
        showOnAll: true,
        pagePath: true,
      },
    });
    return NextResponse.json(popups);
  } catch {
    return NextResponse.json([]);
  }
}
