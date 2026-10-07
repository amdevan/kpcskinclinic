import { STD_STI_PACKAGES, STD_STI_INDIVIDUAL_TESTS } from "@/lib/site-data";
import { AdminSimpleList, type AdminField } from "@/components/admin/admin-simple-list";
import { dbStdTestAction } from "@/app/admin/std-tests/actions";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { key: "name", label: "Name", required: true },
  { key: "price", label: "Price", placeholder: "NPR 3,500" },
  { key: "isPackage", label: "Is package (true/false)" },
  { key: "tests", label: "Number of tests", placeholder: "4" },
  { key: "recommended", label: "Recommended (true/false)" },
  { key: "composition", label: "Composition", type: "textarea", full: true },
];

export default async function AdminStdTestsPage() {
  let items: any[] = [];

  try {
    const { db } = await import("@/lib/db");
    const tests = await db.stdTest.findMany({
      orderBy: [{ isPackage: "desc" }, { name: "asc" }],
    });

    items = tests.map((t) => ({
      id: t.id, name: t.name, price: t.price, composition: t.composition,
      isPackage: t.isPackage ? "true" : "false",
      tests: String(t.tests ?? 0),
      recommended: t.recommended ? "true" : "false",
      published: t.published,
    }));

    // Auto-seed if empty
    if (items.length === 0) {
      for (const p of STD_STI_PACKAGES) {
        await db.stdTest.upsert({
          where: { name: p.name },
          create: { name: p.name, price: p.price, isPackage: true, composition: p.composition, tests: p.tests, recommended: p.recommended, published: true },
          update: {},
        }).catch(() => {});
      }
      for (const t of STD_STI_INDIVIDUAL_TESTS) {
        await db.stdTest.upsert({
          where: { name: t.name },
          create: { name: t.name, price: t.price, isPackage: false, published: true },
          update: {},
        }).catch(() => {});
      }
      const seeded = await db.stdTest.findMany({ orderBy: [{ isPackage: "desc" }, { name: "asc" }] });
      items = seeded.map((t) => ({
        id: t.id, name: t.name, price: t.price, composition: t.composition,
        isPackage: t.isPackage ? "true" : "false",
        tests: String(t.tests ?? 0),
        recommended: t.recommended ? "true" : "false",
        published: t.published,
      }));
    }
  } catch {
    // DB not available — use static
    items = [
      ...STD_STI_PACKAGES.map(p => ({ id: p.name, name: p.name, price: p.price, composition: p.composition, isPackage: "true", tests: String(p.tests), recommended: p.recommended ? "true" : "false", published: true })),
      ...STD_STI_INDIVIDUAL_TESTS.map(t => ({ id: t.name, name: t.name, price: t.price, composition: "", isPackage: "false", tests: "0", recommended: "false", published: true })),
    ];
  }

  return (
    <AdminSimpleList
      title="STD/STI Tests"
      subtitle="Manage STI packages and individual tests on /std-sti"
      items={items}
      fields={fields}
      action={dbStdTestAction}
    />
  );
}
