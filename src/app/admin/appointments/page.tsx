import { db } from "@/lib/db";
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

  const [appointments, counts] = await Promise.all([
    db.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    Promise.all(
      ["all", ...validStatuses].map(async (s) => ({
        status: s,
        count:
          s === "all"
            ? await db.appointment.count()
            : await db.appointment.count({ where: { status: s } }),
      })),
    ),
  ]);

  const countMap: Record<string, number> = {};
  for (const c of counts) countMap[c.status] = c.count;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Appointments
        </h1>
        <p className="text-sm text-muted-foreground">
          Review and manage incoming booking requests
        </p>
      </div>
      <AdminAppointmentsTable
        appointments={appointments.map((a) => ({
          ...a,
          preferredDate: a.preferredDate.toISOString(),
          createdAt: a.createdAt.toISOString(),
          updatedAt: a.updatedAt.toISOString(),
        }))}
        counts={countMap}
        activeStatus={status}
      />
    </div>
  );
}
