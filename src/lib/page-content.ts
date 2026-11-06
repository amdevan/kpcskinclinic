import { db } from "@/lib/db";

export type PageSectionContent = {
  title: string;
  body: string;
  image: string;
  video: string;
  /** Extra named fields (eyebrow, highlight, …) stored as a JSON object inside `body`. */
  extra: Record<string, string>;
};

function parseExtra(body: string): Record<string, string> {
  let extra: Record<string, string> = {};
  try {
    const o = JSON.parse(body || "null");
    if (o && typeof o === "object" && !Array.isArray(o)) {
      extra = Object.fromEntries(
        Object.entries(o).map(([k, v]) => [k, String(v ?? "")]),
      );
    }
  } catch {
    // body is plain text — no extra fields
  }
  return extra;
}

function toSectionContent(r: {
  title: string;
  body: string;
  image: string;
  video?: string;
}): PageSectionContent {
  const extra = parseExtra(r.body);
  const text = typeof extra.body === "string" ? extra.body : r.body || "";
   return {
     title: r.title || "",
     body: text,
     image: r.image || "",
     video: r.video || "",
     extra,
   };
 }

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
    return toSectionContent(r);
  } catch {
    return null;
  }
}

/**
 * Read ALL PageContent rows for a page+section (ordered), for sections that
 * render a list of cards (popular-services, success-stories, testimonials,
 * social, media-gallery). The first row is the section header; each
 * subsequent row is one card (title, body, image + alias fields in `extra`).
 * Returns an empty array when the DB is unavailable or no rows exist.
 */
export async function getPageSectionRows(
  page: string,
  section: string,
): Promise<PageSectionContent[]> {
  try {
    const rows = await db.pageContent.findMany({
      where: { page, section },
      orderBy: { order: "asc" },
    });
    return (rows || []).map(toSectionContent);
  } catch {
    return [];
  }
}
