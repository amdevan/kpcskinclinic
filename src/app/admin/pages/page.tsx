import { db } from "@/lib/db";
import { AdminPageContentList } from "@/components/admin/admin-page-content-list";
import { PAGE_SECTIONS } from "./sections";

export const dynamic = "force-dynamic";

type PageContentRow = {
  id: string;
  page: string;
  section: string;
  title: string;
  body: string;
  image: string;
  order: number;
};

export default async function AdminPagesPage() {
  let rows: PageContentRow[] = [];

  try {
    rows = await db.pageContent.findMany({
      orderBy: [{ page: "asc" }, { order: "asc" }, { section: "asc" }],
    });
  } catch {
    // DB not available — show empty state
  }

  // Group rows by page -> section -> row
  const grouped: Record<string, PageContentRow[]> = {};
  for (const r of rows) {
    if (!grouped[r.page]) grouped[r.page] = [];
    grouped[r.page].push(r);
  }

  // Compose a per-page dataset that the client component can render.
  const pages = PAGE_SECTIONS.map((p) => ({
    page: p.page,
    label: p.label,
    href: p.href,
    groups: p.groups.map((g) => ({
      id: g.id,
      label: g.label,
      fields: g.fields,
      // Find any matching row(s) for this group.
      rows: (grouped[p.page] || [])
        .filter((r) => r.section === g.id)
        .map((r) => ({ ...r })),
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Page content
        </h1>
        <p className="text-sm text-muted-foreground">
          Edit titles, intro copy and banner images for every public page.
          Per-entity content (doctors, packages, blog, etc.) is managed in its
          own dedicated admin section.
        </p>
      </div>

      <AdminPageContentList pages={pages} />
    </div>
  );
}
