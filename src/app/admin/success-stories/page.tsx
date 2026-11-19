import { db } from "@/lib/db";
import { AdminPageContentList } from "@/components/admin/admin-page-content-list";
import { PAGE_SECTIONS } from "@/app/admin/pages/sections";

export const dynamic = "force-dynamic";

type PageContentRow = {
  id: string;
  page: string;
  section: string;
  title: string;
  body: string;
  image: string;
  video: string;
  order: number;
};

export default async function AdminSuccessStoriesPage() {
  let rows: PageContentRow[] = [];

  try {
    rows = await db.pageContent.findMany({
      where: { page: "success-stories" },
      orderBy: { order: "asc" },
    });
  } catch {
    // DB not available
  }

  const grouped: Record<string, PageContentRow[]> = {};
  for (const r of rows) {
    if (!grouped[r.page]) grouped[r.page] = [];
    grouped[r.page].push(r);
  }

  const pages = PAGE_SECTIONS.filter((p) => p.page === "success-stories").map((p) => ({
    page: p.page,
    label: p.label,
    href: p.href,
    groups: p.groups.map((g) => ({
      id: g.id,
      label: g.label,
      fields: g.fields,
      rows: (grouped[p.page] || [])
        .filter((r) => r.section === g.id)
        .map((r) => ({ ...r })),
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Success Stories page
        </h1>
        <p className="text-sm text-muted-foreground">
          Edit the banner and intro video on the Success Stories page.
        </p>
      </div>

      <AdminPageContentList pages={pages} />
    </div>
  );
}