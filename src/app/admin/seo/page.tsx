import { db } from "@/lib/db";
import { AdminSeoTable } from "@/components/admin/admin-seo-table";

export const dynamic = "force-dynamic";

// Default page list — SeoMeta rows from the DB are merged with these so the
// admin UI always shows every important route, even if never explicitly
// created.
export const DEFAULT_SEO_PAGES = [
  { url: "/", title: "KPC Skin, Hair & Aesthetic Clinic | Kathmandu" },
  { url: "/about", title: "About KPC Skin Clinic" },
  { url: "/services", title: "Services — KPC Skin Clinic" },
  { url: "/doctors", title: "Our doctors — KPC Skin Clinic" },
  { url: "/packages", title: "Treatment packages — KPC Skin Clinic" },
  { url: "/hair-transplant", title: "Hair transplant — KPC Skin Clinic" },
  { url: "/success-stories", title: "Success stories — KPC Skin Clinic" },
  { url: "/std-sti", title: "STD / STI testing — KPC Skin Clinic" },
  { url: "/blog", title: "Blog — KPC Skin Clinic" },
  { url: "/contact", title: "Contact KPC Skin Clinic" },
  { url: "/pricing", title: "Pricing — KPC Skin Clinic" },
  { url: "/privacy", title: "Privacy policy — KPC Skin Clinic" },
  { url: "/terms", title: "Terms of service — KPC Skin Clinic" },
];

type SeoRow = {
  id: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
};

export default async function AdminSeoPage() {
  let dbRows: SeoRow[] = [];

  try {
    const rows = await db.seoMeta.findMany({ orderBy: { url: "asc" } });
    dbRows = rows.map((r: any) => ({
      id: r.id,
      url: r.url,
      title: r.title ?? "",
      description: r.description ?? "",
      keywords: r.keywords ?? "",
      ogImage: r.ogImage ?? "",
      canonical: r.canonical ?? "",
    }));
  } catch {
    // DB not available — fall back to defaults
  }

  // Merge DB rows on top of defaults
  const map: Record<string, SeoRow> = {};
  for (const d of DEFAULT_SEO_PAGES) {
    map[d.url] = {
      id: "",
      url: d.url,
      title: d.title,
      description: "",
      keywords: "",
      ogImage: "",
      canonical: "",
    };
  }
  for (const r of dbRows) {
    map[r.url] = r;
  }
  const merged = Object.values(map).sort((a, b) =>
    a.url.localeCompare(b.url),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          SEO metadata
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage page-level title, description, keywords, canonical URL and
          Open Graph image. Saved entries override the defaults built into the
          public pages.
        </p>
      </div>

      <AdminSeoTable rows={merged} />
    </div>
  );
}
