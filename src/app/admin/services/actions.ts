"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

type ServiceItem = { title: string; href: string; description: string };

export async function createServiceCategory(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const slug = String(data?.slug || "").trim();
    const title = String(data?.title || "").trim();
    if (!slug || !title) {
      return { ok: false, error: "Slug and title are required" };
    }
    const services = parseServices(data?.services);
    await db.serviceCategory.create({
      data: {
        slug,
        title,
        tagline: String(data?.tagline ?? ""),
        description: String(data?.description ?? ""),
        image: String(data?.image ?? ""),
        services: JSON.stringify(services),
        published: parseBool(data?.published, true),
        order: Number(data?.order ?? 0),
      },
    });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

export async function saveServiceCategory(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const existing = await db.serviceCategory.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Category not found" };

    const patch: Record<string, any> = {};
    if (data?.slug !== undefined) patch.slug = String(data.slug);
    if (data?.title !== undefined) patch.title = String(data.title);
    if (data?.tagline !== undefined) patch.tagline = String(data.tagline);
    if (data?.description !== undefined) patch.description = String(data.description);
    if (data?.image !== undefined) patch.image = String(data.image);
    if (data?.published !== undefined) patch.published = parseBool(data.published, true);
    if (data?.order !== undefined) patch.order = Number(data.order);
    if (data?.services !== undefined) {
      patch.services = JSON.stringify(parseServices(data.services));
    }

    await db.serviceCategory.update({ where: { id }, data: patch });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function deleteServiceCategory(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await db.serviceCategory.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}

function parseServices(v: any): ServiceItem[] {
  if (Array.isArray(v)) return v as ServiceItem[];
  if (typeof v === "string") {
    try {
      const arr = JSON.parse(v);
      if (Array.isArray(arr)) return arr as ServiceItem[];
    } catch {
      /* ignore */
    }
  }
  return [];
}

function parseBool(v: any, fallback: boolean): boolean {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return fallback;
}
