import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const now = new Date();
    const popups = await db.popup.findMany({
      where: {
        isActive: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: null, endDate: { gte: now } },
          { startDate: { lte: now }, endDate: null },
          { startDate: { lte: now }, endDate: { gte: now } },
        ],
      },
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
        order: true,
      },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(popups);
  } catch {
    return NextResponse.json([]);
  }
}
