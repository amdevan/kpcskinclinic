"use client";

import { Fragment, useState, useTransition } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  Check,
  CheckCheck,
  X,
  Trash2,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dbAppointmentAction } from "@/app/admin/appointments/actions";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  preferredDate: string;
  message: string | null;
  status: string;
  createdAt: string;
};

const tabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const statusColor: Record<string, string> = {
  pending: "bg-gold/15 text-gold border-gold/30",
  confirmed: "bg-brand/15 text-brand border-brand/30",
  completed: "bg-green/15 text-green border-green/30",
  cancelled: "bg-rust/15 text-rust border-rust/30",
};

export function AdminAppointmentsTable({
  appointments,
  counts,
  activeStatus,
}: {
  appointments: Appointment[];
  counts: Record<string, number>;
  activeStatus: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [local, setLocal] = useState<Appointment[]>(appointments);

  // Re-sync when parent re-renders
  if (appointments !== local && appointments.length !== local.length) {
    setLocal(appointments);
  }

  function sync(next: Appointment[]) {
    setLocal(next);
  }

  async function handle(id: string, status: string) {
    setBusy(id);
    startTransition(async () => {
      const res = await dbAppointmentAction(id, "update", { status });
      setBusy(null);
      if (res?.ok) {
        sync(local.map((a) => (a.id === id ? { ...a, status } : a)));
      }
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this appointment? This cannot be undone.")) return;
    setBusy(id);
    startTransition(async () => {
      const res = await dbAppointmentAction(id, "delete");
      setBusy(null);
      if (res?.ok) {
        sync(local.filter((a) => a.id !== id));
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const href =
            t.key === "all" ? "/admin/appointments" : `/admin/appointments?status=${t.key}`;
          const isActive = activeStatus === t.key;
          return (
            <Link
              key={t.key}
              href={href}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                isActive
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-foreground hover:border-brand/40 hover:bg-brand/5",
              )}
            >
              {t.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs tabular-nums",
                  isActive ? "bg-cream/20" : "bg-muted text-muted-foreground",
                )}
              >
                {counts[t.key] ?? 0}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left">
                <th className="w-8 px-3 py-3"></th>
                <th className="px-3 py-3 font-medium text-muted-foreground">Name</th>
                <th className="px-3 py-3 font-medium text-muted-foreground">Service</th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground md:table-cell">
                  Phone
                </th>
                <th className="hidden px-3 py-3 font-medium text-muted-foreground lg:table-cell">
                  Preferred Date
                </th>
                <th className="px-3 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-3 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {local.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-muted-foreground">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                local.map((a) => {
                  const isOpen = expanded === a.id;
                  return (
                    <Fragment key={a.id}>
                      <tr
                        className="border-b last:border-0 transition-colors hover:bg-muted/30"
                      >
                        <td className="px-3 py-3">
                          <button
                            onClick={() => setExpanded(isOpen ? null : a.id)}
                            className="inline-flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted"
                            aria-label="Toggle details"
                          >
                            {isOpen ? (
                              <ChevronDown className="size-4" />
                            ) : (
                              <ChevronRight className="size-4" />
                            )}
                          </button>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                              {(a.name || "?").charAt(0).toUpperCase()}
                            </span>
                            <span className="font-medium text-foreground">
                              {a.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-foreground">{a.service}</td>
                        <td className="hidden px-3 py-3 text-muted-foreground md:table-cell">
                          {a.phone}
                        </td>
                        <td className="hidden px-3 py-3 text-muted-foreground lg:table-cell">
                          {format(parseISO(a.preferredDate), "dd MMM yyyy")}
                        </td>
                        <td className="px-3 py-3">
                          <Badge
                            variant="outline"
                            className={statusColor[a.status] || statusColor.pending}
                          >
                            {a.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handle(a.id, "confirmed")}
                              disabled={busy === a.id}
                              title="Confirm"
                              className="inline-flex size-8 items-center justify-center rounded-md bg-green/10 text-green hover:bg-green/20 disabled:opacity-50"
                            >
                              <Check className="size-4" />
                            </button>
                            <button
                              onClick={() => handle(a.id, "completed")}
                              disabled={busy === a.id}
                              title="Mark completed"
                              className="inline-flex size-8 items-center justify-center rounded-md bg-brand/10 text-brand hover:bg-brand/20 disabled:opacity-50"
                            >
                              <CheckCheck className="size-4" />
                            </button>
                            <button
                              onClick={() => handle(a.id, "cancelled")}
                              disabled={busy === a.id}
                              title="Cancel"
                              className="inline-flex size-8 items-center justify-center rounded-md bg-rust/10 text-rust hover:bg-rust/20 disabled:opacity-50"
                            >
                              <X className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(a.id)}
                              disabled={busy === a.id}
                              title="Delete"
                              className="inline-flex size-8 items-center justify-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-50"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="border-b bg-muted/20">
                          <td></td>
                          <td colSpan={6} className="px-3 py-4">
                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                              <div className="flex items-start gap-2">
                                <Phone className="size-4 shrink-0 text-brand" />
                                <div>
                                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                                  <a href={`tel:${a.phone}`} className="font-medium text-foreground hover:underline">
                                    {a.phone}
                                  </a>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Mail className="size-4 shrink-0 text-brand" />
                                <div>
                                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                                  <p className="font-medium text-foreground">
                                    {a.email || "—"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Calendar className="size-4 shrink-0 text-brand" />
                                <div>
                                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Preferred Date</p>
                                  <p className="font-medium text-foreground">
                                    {format(parseISO(a.preferredDate), "dd MMM yyyy, HH:mm")}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Calendar className="size-4 shrink-0 text-brand" />
                                <div>
                                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Submitted</p>
                                  <p className="font-medium text-foreground">
                                    {format(parseISO(a.createdAt), "dd MMM yyyy, HH:mm")}
                                  </p>
                                </div>
                              </div>
                              {a.message && (
                                <div className="flex items-start gap-2 sm:col-span-2 lg:col-span-4">
                                  <MessageSquare className="size-4 shrink-0 text-brand" />
                                  <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Message</p>
                                    <p className="whitespace-pre-wrap break-words text-foreground">
                                      {a.message}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
