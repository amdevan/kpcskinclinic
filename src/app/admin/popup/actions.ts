"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createPopup(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const title = String(data?.title || "").trim();
    if (!title) return { ok: false, error: "Title is required" };

    await db.popup.create({
      data: {
        title,
        description: String(data?.description ?? ""),
        image: String(data?.image ?? ""),
        buttonText: String(data?.buttonText ?? ""),
        buttonLink: String(data?.buttonLink ?? ""),
        isActive: parseBool(data?.isActive, false),
        dismissible: parseBool(data?.dismissible, true),
        showOnAll: parseBool(data?.showOnAll, true),
        pagePath: String(data?.pagePath ?? ""),
        startDate: parseDate(data?.startDate),
        endDate: parseDate(data?.endDate),
        order: Number(data?.order ?? 0),
      },
    });
    revalidatePath("/admin/popup");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

export async function savePopup(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const patch: Record<string, any> = {};
    if (data?.title !== undefined) patch.title = String(data.title);
    if (data?.description !== undefined) patch.description = String(data.description);
    if (data?.image !== undefined) patch.image = String(data.image);
    if (data?.buttonText !== undefined) patch.buttonText = String(data.buttonText);
    if (data?.buttonLink !== undefined) patch.buttonLink = String(data.buttonLink);
    if (data?.isActive !== undefined) patch.isActive = parseBool(data.isActive, false);
    if (data?.dismissible !== undefined) patch.dismissible = parseBool(data.dismissible, true);
    if (data?.showOnAll !== undefined) patch.showOnAll = parseBool(data.showOnAll, true);
    if (data?.pagePath !== undefined) patch.pagePath = String(data.pagePath);
    if (data?.startDate !== undefined) patch.startDate = parseDate(data.startDate);
    if (data?.endDate !== undefined) patch.endDate = parseDate(data.endDate);
    if (data?.order !== undefined) patch.order = Number(data.order);

    await db.popup.update({ where: { id }, data: patch });
    revalidatePath("/admin/popup");
    revalidatePath("/");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

export async function deletePopup(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await db.popup.delete({ where: { id } });
    revalidatePath("/admin/popup");
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

function parseDate(v: any): Date | null {
  if (!v) return null;
  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return null;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }
  if (v instanceof Date) return v;
  return null;
}
