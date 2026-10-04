import Link from "next/link";
import {
  CalendarClock,
  CalendarCheck,
  CalendarPlus,
  Stethoscope,
  Package,
  Mail,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/db";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminRecentAppointments } from "@/components/admin/admin-recent-appointments";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    doctorCount,
    packageCount,
    subscriberCount,
    recent,
  ] = await Promise.all([
    db.appointment.count(),
    db.appointment.count({ where: { status: "pending" } }),
    db.appointment.count({ where: { status: "confirmed" } }),
    db.doctor.count(),
    db.package.count(),
    db.newsletterSubscriber.count(),
    db.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const completed = await db.appointment.count({
    where: { status: "completed" },
  });

  const stats: { label: string; value: number; color: any; icon: any; hint?: string }[] = [
    { label: "Total Appointments", value: totalAppointments, color: "brand", icon: CalendarClock },
    { label: "Pending", value: pendingAppointments, color: "gold", icon: Clock, hint: "Awaiting confirmation" },
    { label: "Confirmed", value: confirmedAppointments, color: "cyan", icon: CalendarCheck },
    { label: "Doctors", value: doctorCount, color: "green", icon: Stethoscope },
    { label: "Packages", value: packageCount, color: "rust", icon: Package },
    { label: "Subscribers", value: subscriberCount, color: "ink", icon: Mail },
  ];

  const total = totalAppointments || 1;
  const breakdown = [
    {
      label: "Pending",
      count: pendingAppointments,
      pct: Math.round((pendingAppointments / total) * 100),
      color: "bg-gold",
    },
    {
      label: "Confirmed",
      count: confirmedAppointments,
      pct: Math.round((confirmedAppointments / total) * 100),
      color: "bg-brand",
    },
    {
      label: "Completed",
      count: completed,
      pct: Math.round((completed / total) * 100),
      color: "bg-green",
    },
  ];

  const quickActions = [
    { label: "Appointments", href: "/admin/appointments", icon: CalendarClock },
    { label: "Add a doctor", href: "/admin/doctors", icon: Stethoscope },
    { label: "Add a package", href: "/admin/packages", icon: Package },
    { label: "Write a blog post", href: "/admin/blog", icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of bookings, content, and subscribers
          </p>
        </div>
        <Link
          href="/admin/appointments"
          className="inline-flex w-fit items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-brand-foreground transition hover:bg-brand/90"
        >
          <CalendarPlus className="size-4" />
          Manage appointments
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <AdminStatCard
            key={s.label}
            label={s.label}
            value={s.value}
            color={s.color}
            icon={s.icon}
            hint={s.hint}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminRecentAppointments appointments={recent} />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Appointment Status
            </h3>
            <p className="text-xs text-muted-foreground">
              Breakdown by current status
            </p>
            <ul className="mt-4 space-y-3">
              {breakdown.map((b) => (
                <li key={b.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{b.label}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {b.count} · {b.pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${b.color}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Quick Actions
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="group flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground transition hover:border-brand/40 hover:bg-brand/5"
                    >
                      <Icon className="size-4 text-brand" />
                      <span className="flex-1 truncate">{a.label}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-brand" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
