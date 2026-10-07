import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Mail, UserCheck, UserX } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  let total = 0, active = 0, unsubscribed = 0;
  let subscribers: any[] = [];

  try {
    const { db } = await import("@/lib/db");
    [total, active, unsubscribed, subscribers] = await Promise.all([
      db.newsletterSubscriber.count().catch(() => 0),
      db.newsletterSubscriber.count({ where: { active: true } }).catch(() => 0),
      db.newsletterSubscriber.count({ where: { active: false } }).catch(() => 0),
      db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    ]);
  } catch {
    // DB not available — show zeros
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Subscribers</h1>
        <p className="text-sm text-muted-foreground">Newsletter sign-ups collected from the website footer</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total Subscribers" value={total} icon={Mail} color="brand" />
        <AdminStatCard label="Active" value={active} icon={UserCheck} color="green" />
        <AdminStatCard label="Unsubscribed" value={unsubscribed} icon={UserX} color="rust" />
      </div>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {subscribers.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40">
                <tr className="text-left">
                  <th className="px-3 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="px-3 py-3 font-medium text-muted-foreground hidden sm:table-cell">Source</th>
                  <th className="px-3 py-3 font-medium text-muted-foreground hidden md:table-cell">Subscribed</th>
                  <th className="px-3 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s: any) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-3 py-3 font-medium text-foreground">{s.email}</td>
                    <td className="px-3 py-3 text-muted-foreground hidden sm:table-cell">{s.source}</td>
                    <td className="px-3 py-3 text-muted-foreground hidden md:table-cell">{format(new Date(s.createdAt), "dd MMM yyyy")}</td>
                    <td className="px-3 py-3">
                      <Badge variant="outline" className={s.active ? "border-green/30 bg-green/15 text-green" : "border-rust/30 bg-rust/15 text-rust"}>
                        {s.active ? "Active" : "Unsubscribed"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
