import { AdminAppointmentsTable } from "@/components/admin/admin-appointments-table";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const statusParam = Array.isArray(sp.status) ? sp.status[0] : sp.status;
  const status = statusParam || "all";

  const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
  const where =
    status !== "all" && validStatuses.includes(status)
      ? { status }
      : undefined;

  let appointments: any[] = [];
  let countMap: Record<string, number> = { all: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 };

  try {
    const { db } = await import("@/lib/db");
    const [appts, allCount, ...statusCounts] = await Promise.all([
      db.appointment.findMany({ where, orderBy: { createdAt: "desc" } }).catch(() => []),
      db.appointment.count().catch(() => 0),
      ...validStatuses.map((s) => db.appointment.count({ where: { status: s } }).catch(() => 0)),
    ]);
    
    appointments = appts.map((a: any) => ({
      ...a,
      preferredDate: a.preferredDate?.toISOString() || "",
      createdAt: a.createdAt?.toISOString() || "",
      updatedAt: a.updatedAt?.toISOString() || "",
    }));
    
    countMap = {
      all: allCount,
      pending: statusCounts[0] || 0,
      confirmed: statusCounts[1] || 0,
      completed: statusCounts[2] || 0,
      cancelled: statusCounts[3] || 0,
    };
  } catch {
    // DB not available — show empty
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Appointments</h1>
        <p className="text-sm text-muted-foreground">Review and manage incoming booking requests</p>
      </div>
      <AdminAppointmentsTable appointments={appointments} counts={countMap} activeStatus={status} />
    </div>
  );
}
