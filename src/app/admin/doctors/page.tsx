import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminDoctorList } from "@/components/admin/admin-doctor-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default async function DoctorsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const rows = await db.doctor.findMany({
    orderBy: { order: "asc" },
  });

  // AdminDoctorList expects JSON list fields (specialties, education,
  // treatments) as parsed arrays — the DB stores them as JSON strings.
  const doctors = rows.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    role: d.role,
    credentials: d.credentials,
    specialties: parseList(d.specialties),
    bio: d.bio,
    fullBio: d.fullBio,
    education: parseList(d.education),
    treatments: parseList(d.treatments),
    approach: d.approach,
    image: d.image,
    experience: d.experience,
    published: d.published,
    order: d.order,
  }));

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Doctors</h1>
          <p className="text-sm text-gray-500">{doctors.length} total</p>
        </div>
        <Link href="/admin/doctors/new">
          <Button>+ New Doctor</Button>
        </Link>
      </div>
      <AdminDoctorList doctors={doctors} />
    </div>
  );
}