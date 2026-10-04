import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  appointments: {
    id: string;
    name: string;
    phone: string;
    service: string;
    status: string;
    preferredDate: Date;
  }[];
};

const statusColor: Record<string, string> = {
  pending: "bg-gold/15 text-gold border-gold/30",
  confirmed: "bg-brand/15 text-brand border-brand/30",
  completed: "bg-green/15 text-green border-green/30",
  cancelled: "bg-rust/15 text-rust border-rust/30",
};

export function AdminRecentAppointments({ appointments }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Recent Appointments
          </h3>
          <p className="text-xs text-muted-foreground">
            Latest 5 bookings through the website
          </p>
        </div>
        <Link
          href="/admin/appointments"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <ul className="-mx-2 divide-y divide-border">
        {appointments.length === 0 ? (
          <li className="px-2 py-8 text-center text-sm text-muted-foreground">
            No appointments yet.
          </li>
        ) : (
          appointments.map((a) => (
            <li key={a.id} className="flex items-center gap-3 px-2 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                {(a.name || "?").charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {a.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {a.service} · {a.phone}
                </p>
              </div>
              <div className="hidden flex-col items-end sm:flex">
                <Badge
                  variant="outline"
                  className={`mb-1 ${statusColor[a.status] || statusColor.pending}`}
                >
                  {a.status}
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  {format(new Date(a.preferredDate), "dd MMM yyyy")}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
