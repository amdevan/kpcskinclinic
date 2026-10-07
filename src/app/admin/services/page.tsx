import { db } from "@/lib/db";
import { SERVICE_CATEGORIES } from "@/lib/site-data";
import { AdminServicesEditor } from "@/components/admin/admin-services-editor";

export const dynamic = "force-dynamic";

type ServiceItem = { title: string; href: string; description: string };
type Category = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  services: ServiceItem[];
  published: boolean;
  order: number;
};

export default async function AdminServicesPage() {
  let rows: any[] = [];

  try {
    rows = await db.serviceCategory.findMany({ orderBy: { order: "asc" } });

    // Auto-seed from static data if DB is empty
    if (rows.length === 0) {
      for (const c of SERVICE_CATEGORIES) {
        await db.serviceCategory
          .create({
            data: {
              slug: c.id, // 'id' on static = slug in DB
              title: c.title,
              tagline: c.tagline,
              description: c.description,
              image: c.image,
              services: JSON.stringify(c.services),
              published: true,
              order: 0,
            },
          })
          .catch(() => {});
      }
      rows = await db.serviceCategory.findMany({ orderBy: { order: "asc" } });
    }
  } catch {
    // DB not available — fall back to static categories
    rows = SERVICE_CATEGORIES.map((c, i) => ({
      id: `static-${c.id}`,
      slug: c.id,
      title: c.title,
      tagline: c.tagline,
      description: c.description,
      image: c.image,
      services: JSON.stringify(c.services),
      published: true,
      order: i,
    }));
  }

  const categories: Category[] = rows.map((r: any) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    tagline: r.tagline ?? "",
    description: r.description ?? "",
    image: r.image ?? "",
    services: safeParseArr<ServiceItem>(r.services, []),
    published: !!r.published,
    order: r.order ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Service categories
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage the six service categories shown on <code>/services</code> and
          the homepage. Each category can hold an arbitrary number of services
          with their own title, link and description.
        </p>
      </div>

      <AdminServicesEditor categories={categories} />
    </div>
  );
}

function safeParseArr<T>(s: string | null | undefined | T[], fallback: T[]): T[] {
  if (Array.isArray(s)) return s as unknown as T[];
  if (!s) return fallback;
  try {
    const arr = JSON.parse(s as string);
    return Array.isArray(arr) ? arr : fallback;
  } catch {
    return fallback;
  }
}
