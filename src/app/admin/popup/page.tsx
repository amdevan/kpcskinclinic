import { format } from "date-fns";
import { db } from "@/lib/db";
import { AdminPopupEditor } from "@/components/admin/admin-popup-editor";

export const dynamic = "force-dynamic";

type PopupRow = {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  dismissible: boolean;
  showOnAll: boolean;
  pagePath: string;
  startDate: Date | null;
  endDate: Date | null;
  order: number;
};

export default async function AdminPopupPage() {
  let rows: any[] = [];

  try {
    rows = await db.popup.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB not available — show empty state
  }

  const popups: PopupRow[] = rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    description: r.description ?? "",
    image: r.image ?? "",
    buttonText: r.buttonText ?? "",
    buttonLink: r.buttonLink ?? "",
    isActive: !!r.isActive,
    dismissible: r.dismissible ?? true,
    showOnAll: r.showOnAll ?? true,
    pagePath: r.pagePath ?? "",
    startDate: r.startDate ?? null,
    endDate: r.endDate ?? null,
    order: r.order ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Popups</h1>
        <p className="text-sm text-muted-foreground">
          Promotional modals shown to website visitors. Active popups appear
          after a 2-second delay and can be dismissed for 24 hours via
          localStorage. Schedule with start / end dates for limited-time
          offers.
        </p>
      </div>

      <AdminPopupEditor popups={popups} />
    </div>
  );
}

// Helper used by the editor to format dates — exported here so it can be
// imported without circular dependencies if needed.
export function formatPopupDate(d: Date | null): string {
  if (!d) return "";
  try {
    return format(new Date(d), "yyyy-MM-dd");
  } catch {
    return "";
  }
}
