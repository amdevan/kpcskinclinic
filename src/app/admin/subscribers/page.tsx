import { format } from "date-fns";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Mail, UserCheck, UserX } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const [total, active, unsubscribed, subscribers] = await Promise.all([
    db.newsletterSubscriber.count(),
    db.newsletterSubscriber.count({ where: { active: true } }),
    db.newsletterSubscriber.count({ where: { active: false } }),
    db.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Subscribers
        </h1>
        <p className="text-sm text-muted-foreground">
          Newsletter sign-ups collected from the website footer
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total" value={total} color="brand" icon={Mail} />
        <AdminStatCard label="Active" value={active} color="green" icon={UserCheck} />
        <AdminStatCard label="Unsubscribed" value={unsubscribed} color="rust" icon={UserX} />
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left">
                <th className="px-3 py-3 font-medium text-muted-foreground">Email</th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground md:table-cell">
                  Source
                </th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground lg:table-cell">
                  Signed up
                </th>
                <th className="px-3 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-10 text-center text-muted-foreground">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                    <td className="px-3 py-3 font-medium text-foreground">{s.email}</td>
                    <td className="hidden px-3 py-3 text-muted-foreground md:table-cell">
                      {s.source}
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground lg:table-cell">
                      {format(new Date(s.createdAt), "dd MMM yyyy, HH:mm")}
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={
                          s.active
                            ? "border-green/30 bg-green/15 text-green"
                            : "border-rust/30 bg-rust/15 text-rust"
                        }
                      >
                        {s.active ? "Active" : "Unsubscribed"}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
