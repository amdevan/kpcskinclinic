"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function dbDoctorAction(
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) {
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
          specialties: JSON.stringify(data?.specialties || []),
          bio: String(data?.bio ?? ""),
          fullBio: String(data?.fullBio ?? ""),
          education: JSON.stringify(data?.education || []),
          treatments: JSON.stringify(data?.treatments || []),
          approach: String(data?.approach ?? ""),
          image: String(data?.image ?? ""),
          experience: String(data?.experience ?? ""),
          published: data?.published !== "false" && data?.published !== false,
          order: Number(data?.order ?? 0),
        },
      });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
      return { ok: true };
    }

    if (action === "update") {
      await db.doctor.update({
        where: { id },
        data: {
          ...(data?.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data?.name !== undefined ? { name: String(data.name) } : {}),
          ...(data?.role !== undefined ? { role: String(data.role) } : {}),
          ...(data?.credentials !== undefined ? { credentials: String(data.credentials) } : {}),
          ...(data?.specialties !== undefined
            ? { specialties: JSON.stringify(data.specialties || []) }
            : {}),
          ...(data?.bio !== undefined ? { bio: String(data.bio) } : {}),
          ...(data?.fullBio !== undefined ? { fullBio: String(data.fullBio) } : {}),
          ...(data?.education !== undefined
            ? { education: JSON.stringify(data.education || []) }
            : {}),
          ...(data?.treatments !== undefined
            ? { treatments: JSON.stringify(data.treatments || []) }
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
          ...(data?.order !== undefined ? { order: Number(data.order) } : {}),
        },
      });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
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
      return { ok: true };
    }

    if (action === "delete") {
      await db.doctor.delete({ where: { id } });
      revalidatePath("/admin/doctors");
      revalidatePath("/doctors");
      return { ok: true };
    }

    return { ok: false, error: "Unknown action" };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Action failed" };
  }
}
