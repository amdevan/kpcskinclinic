"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

/**
 * Create a new PageContent row. `data` must include `page` + `section`.
 */
export async function createPageContent(
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const page = String(data?.page || "").trim();
    const section = String(data?.section || "").trim();
    if (!page || !section) {
      return { ok: false, error: "Page and section are required" };
    }
    await db.pageContent.create({
      data: {
        page,
        section,
        title: String(data?.title ?? ""),
        body: String(data?.body ?? ""),
        image: String(data?.image ?? ""),
        order: Number(data?.order ?? 0),
      },
    });
    revalidatePath("/admin/pages");
    revalidatePath(`/${page === "home" ? "" : page}`);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Create failed" };
  }
}

/**
 * Update an existing PageContent row by id.
 */
export async function savePageContent(
  id: string,
  data: Record<string, any>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const existing = await db.pageContent.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Not found" };

    await db.pageContent.update({
      where: { id },
      data: {
        ...(data?.page !== undefined ? { page: String(data.page) } : {}),
        ...(data?.section !== undefined ? { section: String(data.section) } : {}),
        ...(data?.title !== undefined ? { title: String(data.title) } : {}),
        ...(data?.body !== undefined ? { body: String(data.body) } : {}),
        ...(data?.image !== undefined ? { image: String(data.image) } : {}),
        ...(data?.order !== undefined ? { order: Number(data.order) } : {}),
      },
    });
    revalidatePath("/admin/pages");
    const slug = existing.page === "home" ? "" : existing.page;
    revalidatePath(`/${slug}`);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Save failed" };
  }
}

/**
 * Delete a PageContent row.
 */
export async function deletePageContent(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const existing = await db.pageContent.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Not found" };
    await db.pageContent.delete({ where: { id } });
    revalidatePath("/admin/pages");
    const slug = existing.page === "home" ? "" : existing.page;
    revalidatePath(`/${slug}`);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Delete failed" };
  }
}
