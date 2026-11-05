"use client";

import { useEffect, useState } from "react";
import { StatCard } from "./admin-stat-card";

interface Stats {
  doctors: number;
  treatments: number;
  packages: number;
  appointments: number;
  subscribers: number;
  posts: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  if (!stats) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Doctors" value={stats.doctors} />
        <StatCard label="Treatments" value={stats.treatments} />
        <StatCard label="Packages" value={stats.packages} />
        <StatCard label="Appointments" value={stats.appointments} />
        <StatCard label="Subscribers" value={stats.subscribers} />
        <StatCard label="Posts" value={stats.posts} />
      </div>
    </div>
  );
}