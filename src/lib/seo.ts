import { db } from "@/lib/db";

export type SeoMetaContent = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
};

/**
 * Read SeoMeta for a URL path (e.g. "/packages"), tolerating a missing DB.
 * Returns null when nothing is stored — callers fall back to their static metadata.
 */
export async function getSeoMeta(url: string): Promise<SeoMetaContent | null> {
  try {
    const row = await db.seoMeta.findUnique({ where: { url } });
    if (!row) return null;
    return {
      title: row.title,
      description: row.description,
      keywords: row.keywords,
      ogImage: row.ogImage,
      canonical: row.canonical || row.url,
    };
  } catch {
    return null;
  }
}

/**
 * Merge stored SeoMeta for a URL with a page's static fallbacks.
 * Usage in a page: export async function generateMetadata() {
 *   return buildMetadata("/packages", { title: "...", description: "..." });
 * }
 */
export async function buildMetadata(
  url: string,
  fallback: { title: string; description: string; canonical?: string },
) {
  const seo = await getSeoMeta(url);
  return {
    title: seo?.title || fallback.title,
    description: seo?.description || fallback.description,
    keywords: seo?.keywords || undefined,
    alternates: { canonical: seo?.canonical || fallback.canonical || url },
    openGraph: seo?.ogImage ? { images: [{ url: seo.ogImage }] } : undefined,
  };
}
