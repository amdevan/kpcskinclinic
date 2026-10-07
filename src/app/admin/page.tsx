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
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminRecentAppointments } from "@/components/admin/admin-recent-appointments";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let totalAppointments = 0, pendingAppointments = 0, confirmedAppointments = 0;
  let doctorCount = 0, packageCount = 0, subscriberCount = 0, completed = 0;
  let recent: any[] = [];

  try {
    const { db } = await import("@/lib/db");
    const [
      total, pending, confirmed, doctors, packages, subs, recentAppts,
    ] = await Promise.all([
      db.appointment.count().catch(() => 0),
      db.appointment.count({ where: { status: "pending" } }).catch(() => 0),
      db.appointment.count({ where: { status: "confirmed" } }).catch(() => 0),
      db.doctor.count().catch(() => 0),
      db.package.count().catch(() => 0),
      db.newsletterSubscriber.count().catch(() => 0),
      db.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []),
    ]);
    totalAppointments = total; pendingAppointments = pending; confirmedAppointments = confirmed;
    doctorCount = doctors; packageCount = packages; subscriberCount = subs; recent = recentAppts;
    completed = await db.appointment.count({ where: { status: "completed" } }).catch(() => 0);
  } catch {
    // DB not available — show zeros
  }

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
      color: "bg-green",
    },
    {
      label: "Completed",
      count: completed,
      pct: Math.round((completed / total) * 100),
      color: "bg-brand",
    },
    {
      label: "Cancelled",
      count: totalAppointments - pendingAppointments - confirmedAppointments - completed,
      pct: Math.round(((totalAppointments - pendingAppointments - confirmedAppointments - completed) / total) * 100),
      color: "bg-rust",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your clinic&apos;s bookings, content, and subscribers.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <AdminStatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminRecentAppointments appointments={recent} />
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-display text-base font-bold text-ink mb-4">
              Quick actions
            </h3>
            <div className="space-y-2">
              <Link href="/admin/appointments" className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-cream hover:bg-brand/10 transition-colors text-sm font-medium text-ink">
                <CalendarClock className="h-4 w-4 text-brand" /> View all appointments
              </Link>
              <Link href="/admin/doctors" className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-cream hover:bg-brand/10 transition-colors text-sm font-medium text-ink">
                <Stethoscope className="h-4 w-4 text-cyan" /> Manage doctors
              </Link>
              <Link href="/admin/blog" className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-cream hover:bg-brand/10 transition-colors text-sm font-medium text-ink">
                <ArrowRight className="h-4 w-4 text-green" /> Write a blog post
              </Link>
              <Link href="/admin/packages" className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-cream hover:bg-brand/10 transition-colors text-sm font-medium text-ink">
                <Package className="h-4 w-4 text-rust" /> Edit packages
              </Link>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-display text-base font-bold text-ink mb-3">
              Appointment status
            </h3>
            <div className="space-y-2">
              {breakdown.map((b) => (
                <div key={b.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ink/70">
                    <span className={`h-2.5 w-2.5 rounded-full ${b.color}`} />
                    {b.label}
                  </span>
                  <span className="font-bold text-ink">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
