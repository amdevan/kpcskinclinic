"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/security";

export async function saveSeoMeta(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const url = String(data?.url ?? "").trim();
    if (!url) return { ok: false, error: "URL is required" };

    const old = await db.seoMeta.findUnique({ where: { id } });
    await db.seoMeta.update({
      where: { id },
      data: {
        url,
        title: String(data?.title ?? ""),
        description: String(data?.description ?? ""),
        keywords: String(data?.keywords ?? ""),
        ogImage: String(data?.ogImage ?? ""),
        canonical: String(data?.canonical ?? ""),
      },
    });
    revalidatePath("/admin/seo");
    if (old && old.url && old.url !== url) revalidatePath(old.url);
    revalidatePath(url);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function createSeoMeta(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const url = String(data?.url ?? "").trim();
    if (!url) return { ok: false, error: "URL is required" };

    await db.seoMeta.create({
      data: {
        url,
        title: String(data?.title ?? ""),
        description: String(data?.description ?? ""),
        keywords: String(data?.keywords ?? ""),
        ogImage: String(data?.ogImage ?? ""),
        canonical: String(data?.canonical ?? ""),
      },
    });
    revalidatePath("/admin/seo");
    revalidatePath(url);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

export async function deleteSeoMeta(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const row = await db.seoMeta.findUnique({ where: { id } });
    await db.seoMeta.delete({ where: { id } });
    revalidatePath("/admin/seo");
    if (row?.url) revalidatePath(row.url);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}
