import { db } from "@/lib/db";
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
  const tests = await db.stdTest.findMany({
    orderBy: [{ isPackage: "desc" }, { name: "asc" }],
  });

  const items = tests.map((t) => ({
    id: t.id,
    name: t.name,
    price: t.price,
    composition: t.composition,
    isPackage: t.isPackage ? "true" : "false",
    tests: String(t.tests ?? 0),
    recommended: t.recommended ? "true" : "false",
    published: t.published,
  }));

  return (
    <AdminSimpleList
      title="STD/STI Tests"
      subtitle="Manage STI packages and individual tests on /std-sti"
      items={items as any}
      fields={fields}
      action={dbStdTestAction}
    />
  );
}
