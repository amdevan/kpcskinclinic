"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function saveSeoMeta(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const url = String(data?.url ?? "").trim();
    if (!url) return { ok: false, error: "URL is required" };

    await db.seoMeta.update({
      where: { id },
      data: {
        url: String(data.url),
        title: String(data?.title ?? ""),
        description: String(data?.description ?? ""),
        keywords: String(data?.keywords ?? ""),
        ogImage: String(data?.ogImage ?? ""),
        canonical: String(data?.canonical ?? ""),
      },
    });
    revalidatePath("/admin/seo");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function createSeoMeta(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
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
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

export async function deleteSeoMeta(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await db.seoMeta.delete({ where: { id } });
    revalidatePath("/admin/seo");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}
