import { db } from "@/lib/db";
import { AdminDoctorList } from "@/components/admin/admin-doctor-list";

export const dynamic = "force-dynamic";

export default async function AdminDoctorsPage() {
  const doctors = await db.doctor.findMany({
    orderBy: { order: "asc" },
  });

  // Deserialize JSON fields for client
  const data = doctors.map((d) => ({
    ...d,
    specialties: safeParse(d.specialties, []),
    education: safeParse(d.education, []),
    treatments: safeParse(d.treatments, []),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Doctors
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage doctors shown on the website
        </p>
      </div>
      <AdminDoctorList doctors={data as any} />
    </div>
  );
}

function safeParse<T>(s: string | null | undefined, fallback: T): T {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}
