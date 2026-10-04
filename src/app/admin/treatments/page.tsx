import { db } from "@/lib/db";
import { AdminSimpleList, type AdminField } from "@/components/admin/admin-simple-list";
import { dbTreatmentAction } from "@/app/admin/treatments/actions";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug", required: true, placeholder: "acne-scar-treatment" },
  { key: "category", label: "Category" },
  { key: "heroImage", label: "Hero image URL", full: true },
  { key: "tagline", label: "Tagline", full: true },
  { key: "intro", label: "Intro", type: "textarea", full: true },
  { key: "metaDescription", label: "Meta description", type: "textarea", full: true },
  { key: "startingPrice", label: "Starting price", placeholder: "NPR 3,500+" },
  { key: "sessions", label: "Sessions", placeholder: "3–5 sessions typical" },
  { key: "note", label: "Pricing note", full: true },
  {
    key: "subsections",
    label: "Subsections (JSON array)",
    type: "textarea",
    full: true,
    placeholder: '[{"heading":"...","body":"..."}]',
  },
  { key: "resultsReality", label: "Results reality", type: "textarea", full: true },
  {
    key: "suitabilityIdeal",
    label: "Suitability — ideal (one per line)",
    type: "textarea",
    full: true,
  },
  {
    key: "suitabilityNotIdeal",
    label: "Suitability — not ideal (one per line)",
    type: "textarea",
    full: true,
  },
  {
    key: "faq",
    label: "FAQ (JSON array)",
    type: "textarea",
    full: true,
    placeholder: '[{"q":"...","a":"..."}]',
  },
  {
    key: "comparisonTable",
    label: "Comparison table (JSON or empty)",
    type: "textarea",
    full: true,
  },
];

export default async function AdminTreatmentsPage() {
  const treatments = await db.treatment.findMany({
    orderBy: [{ category: "asc" }, { title: "asc" }],
  });

  const items = treatments.map((t) => ({
    id: t.id,
    title: t.title,
    slug: t.slug,
    category: t.category,
    heroImage: t.heroImage,
    tagline: t.tagline,
    intro: t.intro,
    metaDescription: t.metaDescription,
    startingPrice: t.startingPrice,
    sessions: t.sessions,
    note: t.note,
    subsections: prettyJson(t.subsections),
    resultsReality: t.resultsReality,
    suitabilityIdeal: prettyList(t.suitabilityIdeal),
    suitabilityNotIdeal: prettyList(t.suitabilityNotIdeal),
    faq: prettyJson(t.faq),
    comparisonTable: t.comparisonTable,
    published: t.published,
  }));

  return (
    <AdminSimpleList
      title="Treatments"
      subtitle="Manage the dynamic /services/[slug] treatment pages"
      items={items as any}
      fields={fields}
      action={dbTreatmentAction}
    />
  );
}

function prettyList(s: string | null): string {
  if (!s) return "";
  try {
    const arr = JSON.parse(s);
    if (Array.isArray(arr)) return arr.join("\n");
    return s;
  } catch {
    return s;
  }
}

function prettyJson(s: string | null): string {
  if (!s || s === "[]") return "";
  try {
    return JSON.stringify(JSON.parse(s), null, 2);
  } catch {
    return s || "";
  }
}
