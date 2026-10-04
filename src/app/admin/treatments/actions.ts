"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function dbTreatmentAction(
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) {
  try {
    if (action === "create") {
      const slug = String(data?.slug || "").trim();
      const title = String(data?.title || "").trim();
      if (!slug || !title) return { ok: false, error: "Slug and title are required" };
      await db.treatment.create({
        data: {
          slug,
          title,
          category: String(data?.category ?? ""),
          heroImage: String(data?.heroImage ?? ""),
          tagline: String(data?.tagline ?? ""),
          intro: String(data?.intro ?? ""),
          metaDescription: String(data?.metaDescription ?? ""),
          startingPrice: String(data?.startingPrice ?? ""),
          sessions: String(data?.sessions ?? ""),
          note: String(data?.note ?? ""),
          subsections: parseJsonField(data?.subsections, []),
          resultsReality: String(data?.resultsReality ?? ""),
          suitabilityIdeal: parseListField(data?.suitabilityIdeal),
          suitabilityNotIdeal: parseListField(data?.suitabilityNotIdeal),
          faq: parseJsonField(data?.faq, []),
          comparisonTable: String(data?.comparisonTable ?? ""),
          published: parseBool(data?.published, true),
        },
      });
      revalidatePath("/admin/treatments");
      revalidatePath("/services");
      revalidatePath(`/services/${slug}`);
      return { ok: true };
    }

    if (action === "update") {
      await db.treatment.update({
        where: { id },
        data: {
          ...(data?.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data?.title !== undefined ? { title: String(data.title) } : {}),
          ...(data?.category !== undefined ? { category: String(data.category) } : {}),
          ...(data?.heroImage !== undefined ? { heroImage: String(data.heroImage) } : {}),
          ...(data?.tagline !== undefined ? { tagline: String(data.tagline) } : {}),
          ...(data?.intro !== undefined ? { intro: String(data.intro) } : {}),
          ...(data?.metaDescription !== undefined ? { metaDescription: String(data.metaDescription) } : {}),
          ...(data?.startingPrice !== undefined ? { startingPrice: String(data.startingPrice) } : {}),
          ...(data?.sessions !== undefined ? { sessions: String(data.sessions) } : {}),
          ...(data?.note !== undefined ? { note: String(data.note) } : {}),
          ...(data?.subsections !== undefined ? { subsections: parseJsonField(data.subsections, []) } : {}),
          ...(data?.resultsReality !== undefined ? { resultsReality: String(data.resultsReality) } : {}),
          ...(data?.suitabilityIdeal !== undefined ? { suitabilityIdeal: parseListField(data.suitabilityIdeal) } : {}),
          ...(data?.suitabilityNotIdeal !== undefined ? { suitabilityNotIdeal: parseListField(data.suitabilityNotIdeal) } : {}),
          ...(data?.faq !== undefined ? { faq: parseJsonField(data.faq, []) } : {}),
          ...(data?.comparisonTable !== undefined ? { comparisonTable: String(data.comparisonTable) } : {}),
          ...(data?.published !== undefined ? { published: parseBool(data.published, true) } : {}),
        },
      });
      revalidatePath("/admin/treatments");
      revalidatePath("/services");
      return { ok: true };
    }

    if (action === "toggle-publish") {
      const existing = await db.treatment.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.treatment.update({
        where: { id },
        data: { published: !existing.published },
      });
      revalidatePath("/admin/treatments");
      revalidatePath("/services");
      return { ok: true };
    }

    if (action === "delete") {
      await db.treatment.delete({ where: { id } });
      revalidatePath("/admin/treatments");
      revalidatePath("/services");
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
  // Allow newline-separated strings for convenience
  const items = String(v)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

function parseJsonField(v: any, fallback: any): string {
  if (v == null || v === "") return JSON.stringify(fallback);
  if (typeof v === "string") {
    try {
      JSON.parse(v);
      return v;
    } catch {
      // Treat as JSON-array-friendly text? fall back to splitting by newlines
      return parseListField(v);
    }
  }
  return JSON.stringify(v);
}

function parseBool(v: any, fallback: boolean): boolean {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return fallback;
}
