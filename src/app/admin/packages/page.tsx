import { db } from "@/lib/db";
import { AdminSimpleList, type AdminField } from "@/components/admin/admin-simple-list";
import { dbPackageAction } from "@/app/admin/packages/actions";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { key: "name", label: "Name", required: true },
  { key: "price", label: "Price", placeholder: "NPR 4,500+" },
  { key: "unit", label: "Unit", placeholder: "per session" },
  { key: "category", label: "Category" },
  { key: "color", label: "Color theme", placeholder: "brand | cyan | green | gold | rust" },
  { key: "popular", label: "Popular (true/false)" },
  { key: "image", label: "Image URL", full: true },
  { key: "note", label: "Note", full: true },
  {
    key: "features",
    label: "Features (one per line)",
    type: "textarea",
    full: true,
  },
];

export default async function AdminPackagesPage() {
  const packages = await db.package.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const items = packages.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    unit: p.unit,
    note: p.note,
    features: prettyList(p.features),
    image: p.image,
    category: p.category,
    color: p.color,
    popular: p.popular ? "true" : "false",
    published: p.published,
  }));

  return (
    <AdminSimpleList
      title="Packages"
      subtitle="Manage pricing packages shown on /packages"
      items={items as any}
      fields={fields}
      action={dbPackageAction}
    />
  );
}

function prettyList(s: string | null): string {
  if (!s || s === "[]") return "";
  try {
    const arr = JSON.parse(s);
    if (Array.isArray(arr)) return arr.join("\n");
    return s;
  } catch {
    return s || "";
  }
}
