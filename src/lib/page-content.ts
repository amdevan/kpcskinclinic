import { db } from "@/lib/db";

export type PageSectionContent = {
  title: string;
  body: string;
  image: string;
  video: string;
  /** Extra named fields (eyebrow, highlight, …) stored as a JSON object inside `body`. */
  extra: Record<string, string>;
};

/**
 * Read the first PageContent row for a page+section, tolerating a missing DB.
 * Returns null when the DB is unavailable or no row exists — callers fall
 * back to their static content.
 *
 * Convention: when the `body` column holds a JSON object, it stores named
 * alias fields (eyebrow, highlight, …) and the displayable text lives in
 * `extra.body`. A plain-text body is returned as-is with an empty `extra`.
 */
export async function getPageSection(
  page: string,
  section: string,
): Promise<PageSectionContent | null> {
  try {
    const rows = await db.pageContent.findMany({
      where: { page, section },
      orderBy: { order: "asc" },
    });
    const r = rows?.[0];
    if (!r) return null;
    let extra: Record<string, string> = {};
    let text = r.body || "";
    try {
      const o = JSON.parse(r.body || "null");
      if (o && typeof o === "object" && !Array.isArray(o)) {
        extra = Object.fromEntries(
          Object.entries(o).map(([k, v]) => [k, String(v ?? "")]),
        );
        text = typeof extra.body === "string" ? extra.body : "";
      }
    } catch {
      // body is plain text — no extra fields
    }
    return {
      title: r.title || "",
      body: text,
      image: r.image || "",
      video: (r as any).video || "",
      extra,
    };
  } catch {
    return null;
  }
}
