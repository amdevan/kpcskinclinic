"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function dbPackageAction(
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) {
  try {
    if (action === "create") {
      const name = String(data?.name || "").trim();
      if (!name) return { ok: false, error: "Name is required" };
      await db.package.create({
        data: {
          name,
          price: String(data?.price ?? ""),
          unit: String(data?.unit ?? ""),
          note: String(data?.note ?? ""),
          features: parseListField(data?.features),
          image: String(data?.image ?? ""),
          category: String(data?.category ?? ""),
          color: String(data?.color ?? ""),
          popular: parseBool(data?.popular, false),
          published: parseBool(data?.published, true),
        },
      });
      revalidatePath("/admin/packages");
      revalidatePath("/packages");
      return { ok: true };
    }

    if (action === "update") {
      await db.package.update({
        where: { id },
        data: {
          ...(data?.name !== undefined ? { name: String(data.name) } : {}),
          ...(data?.price !== undefined ? { price: String(data.price) } : {}),
          ...(data?.unit !== undefined ? { unit: String(data.unit) } : {}),
          ...(data?.note !== undefined ? { note: String(data.note) } : {}),
          ...(data?.features !== undefined ? { features: parseListField(data.features) } : {}),
          ...(data?.image !== undefined ? { image: String(data.image) } : {}),
          ...(data?.category !== undefined ? { category: String(data.category) } : {}),
          ...(data?.color !== undefined ? { color: String(data.color) } : {}),
          ...(data?.popular !== undefined ? { popular: parseBool(data.popular, false) } : {}),
          ...(data?.published !== undefined ? { published: parseBool(data.published, true) } : {}),
        },
      });
      revalidatePath("/admin/packages");
      revalidatePath("/packages");
      return { ok: true };
    }

    if (action === "toggle-publish") {
      const existing = await db.package.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.package.update({
        where: { id },
        data: { published: !existing.published },
      });
      revalidatePath("/admin/packages");
      revalidatePath("/packages");
      return { ok: true };
    }

    if (action === "delete") {
      await db.package.delete({ where: { id } });
      revalidatePath("/admin/packages");
      revalidatePath("/packages");
      return { ok: true };
    }

    return { ok: false, error: "Unknown action" };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Action failed" };
  }
}

function parseListField(v: any): string {
  if (v == null || v === "") return "[]";
  if (Array.isArray(v)) return JSON.stringify(v);
  const items = String(v)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

function parseBool(v: any, fallback: boolean): boolean {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return fallback;
}
