"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/security";

/**
 * Normalize a JSON-list field. Accepts either an array (from the card
 * editor) or a JSON-array string (from the standalone form). Returns a
 * clean array of strings, or `[]` when the input is empty/invalid.
 */
function normalizeList(v: any): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string") {
    const t = v.trim();
    if (!t) return [];
    try {
      const parsed = JSON.parse(t);
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
    } catch {
      /* not JSON — treat as a single newline-separated list */
      return t.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

export async function dbDoctorAction(
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    if (action === "create") {
      const slug = (data?.slug || data?.name || "").trim();
      if (!slug) return { ok: false, error: "Slug is required" };
      await db.doctor.create({
        data: {
          slug,
          name: String(data?.name ?? ""),
          role: String(data?.role ?? ""),
          credentials: String(data?.credentials ?? ""),
          specialties: JSON.stringify(normalizeList(data?.specialties)),
          bio: String(data?.bio ?? ""),
          fullBio: String(data?.fullBio ?? ""),
          education: JSON.stringify(normalizeList(data?.education)),
          treatments: JSON.stringify(normalizeList(data?.treatments)),
          approach: String(data?.approach ?? ""),
          image: String(data?.image ?? ""),
          experience: String(data?.experience ?? ""),
          published: data?.published !== "false" && data?.published !== false,
          order: parseIntSafe(data?.order),
        },
      });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
      return { ok: true };
    }

    if (action === "update") {
      const existing = await db.doctor.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.doctor.update({
        where: { id },
        data: {
          ...(data?.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data?.name !== undefined ? { name: String(data.name) } : {}),
          ...(data?.role !== undefined ? { role: String(data.role) } : {}),
          ...(data?.credentials !== undefined ? { credentials: String(data.credentials) } : {}),
          ...(data?.specialties !== undefined
            ? { specialties: JSON.stringify(normalizeList(data.specialties)) }
            : {}),
          ...(data?.bio !== undefined ? { bio: String(data.bio) } : {}),
          ...(data?.fullBio !== undefined ? { fullBio: String(data.fullBio) } : {}),
          ...(data?.education !== undefined
            ? { education: JSON.stringify(normalizeList(data.education)) }
            : {}),
          ...(data?.treatments !== undefined
            ? { treatments: JSON.stringify(normalizeList(data.treatments)) }
            : {}),
          ...(data?.approach !== undefined ? { approach: String(data.approach) } : {}),
          ...(data?.image !== undefined ? { image: String(data.image) } : {}),
          ...(data?.experience !== undefined ? { experience: String(data.experience) } : {}),
          ...(data?.published !== undefined
            ? {
                published:
                  data.published === "true" || data.published === true,
              }
            : {}),
          ...(data?.order !== undefined ? { order: parseIntSafe(data.order) } : {}),
        },
      });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
      revalidatePath(`/doctors/${existing.slug}`);
      const newSlug = String(data?.slug ?? existing.slug);
      if (newSlug !== existing.slug) revalidatePath(`/doctors/${newSlug}`);
      return { ok: true };
    }

    if (action === "toggle-publish") {
      const existing = await db.doctor.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.doctor.update({
        where: { id },
        data: { published: !existing.published },
      });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
      revalidatePath(`/doctors/${existing.slug}`);
      return { ok: true };
    }

    if (action === "delete") {
      const existing = await db.doctor.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.doctor.delete({ where: { id } });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
      revalidatePath(`/doctors/${existing.slug}`);
      return { ok: true };
    }

    return { ok: false, error: "Unknown action" };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Action failed" };
  }
}

// Standalone wrappers used by the new list components.
export async function deleteDoctor(id: string) {
  return dbDoctorAction(id, "delete");
}

export async function bulkDeleteDoctors(ids: string[]) {
  if (!(await requireSession())) return { ok: false, error: "unauthorized" };
  try {
    const result = await db.doctor.deleteMany({ where: { id: { in: ids } } });
    revalidatePath("/admin/doctors");
    revalidatePath("/doctors");
    return { ok: true, count: result.count };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Bulk delete failed" };
  }
}

function parseIntSafe(v: any, fallback = 0): number {
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
}