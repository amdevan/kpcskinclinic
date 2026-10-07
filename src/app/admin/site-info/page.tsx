import { db } from "@/lib/db";
import { SiteInfoForm } from "./site-info-form";
import { DEFAULT_SITE_INFO } from "./constants";

export const dynamic = "force-dynamic";

export default async function AdminSiteInfoPage() {
  let dbValues: Record<string, string> = {};

  try {
    const rows = await db.siteSetting.findMany();
    for (const r of rows) {
      dbValues[r.key] = r.value;
    }
  } catch {
    // DB not available — show defaults
  }

  // Merge DB values on top of defaults (DB wins when both set)
  const merged: Record<string, string> = { ...DEFAULT_SITE_INFO };
  for (const [k, v] of Object.entries(dbValues)) {
    merged[k] = v;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Site info</h1>
        <p className="text-sm text-muted-foreground">
          Brand identity, contact details, social links and email / SMTP configuration.
          Saved values are immediately read by every public page.
        </p>
      </div>

      <SiteInfoForm initialValues={merged} />
    </div>
  );
}
