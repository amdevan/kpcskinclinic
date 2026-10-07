"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createHeroSlide(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await db.heroSlide.create({
      data: {
        eyebrow: String(data?.eyebrow ?? ""),
        title: String(data?.title ?? ""),
        highlight: String(data?.highlight ?? ""),
        description: String(data?.description ?? ""),
        image: String(data?.image ?? ""),
        primaryCta: String(data?.primaryCta ?? ""),
        secondaryCta: String(data?.secondaryCta ?? ""),
        isActive: parseBool(data?.isActive, true),
        order: Number(data?.order ?? 0),
      },
    });
    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

export async function saveHeroSlide(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const patch: Record<string, any> = {};
    if (data?.eyebrow !== undefined) patch.eyebrow = String(data.eyebrow);
    if (data?.title !== undefined) patch.title = String(data.title);
    if (data?.highlight !== undefined) patch.highlight = String(data.highlight);
    if (data?.description !== undefined) patch.description = String(data.description);
    if (data?.image !== undefined) patch.image = String(data.image);
    if (data?.primaryCta !== undefined) patch.primaryCta = String(data.primaryCta);
    if (data?.secondaryCta !== undefined) patch.secondaryCta = String(data.secondaryCta);
    if (data?.isActive !== undefined) patch.isActive = parseBool(data.isActive, true);
    if (data?.order !== undefined) patch.order = Number(data.order);

    await db.heroSlide.update({ where: { id }, data: patch });
    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function deleteHeroSlide(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await db.heroSlide.delete({ where: { id } });
    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}

function parseBool(v: any, fallback: boolean): boolean {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return fallback;
}
