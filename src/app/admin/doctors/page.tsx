import { db } from "@/lib/db";
import { AdminDoctorList } from "@/components/admin/admin-doctor-list";
import { DOCTORS } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function AdminDoctorsPage() {
  let doctors: any[] = [];
  try {
    doctors = await db.doctor.findMany({ orderBy: { order: "asc" } });
    
    // Auto-seed from static data if DB is empty
    if (doctors.length === 0) {
      for (const d of DOCTORS) {
        await db.doctor.upsert({
          where: { slug: d.slug },
          create: {
            slug: d.slug,
            name: d.name,
            role: d.role,
            credentials: d.credentials,
            specialties: JSON.stringify(d.specialties),
            bio: d.bio,
            fullBio: d.fullBio || "",
            education: JSON.stringify(d.education || []),
            treatments: JSON.stringify(d.treatments || []),
            approach: d.approach || "",
            image: d.image,
            experience: d.experience,
            order: 0,
            published: true,
          },
          update: {},
        }).catch(() => {});
      }
      doctors = await db.doctor.findMany({ orderBy: { order: "asc" } });
    }
  } catch {
    // DB not available — use static data
    doctors = DOCTORS.map(d => ({ ...d, specialties: d.specialties, education: d.education || [], treatments: d.treatments || [] }));
  }

  // Deserialize JSON fields for client
  const data = doctors.map((d: any) => ({
    ...d,
    specialties: safeParse(d.specialties, Array.isArray(d.specialties) ? d.specialties : []),
    education: safeParse(d.education, Array.isArray(d.education) ? d.education : []),
    treatments: safeParse(d.treatments, Array.isArray(d.treatments) ? d.treatments : []),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Doctors</h1>
        <p className="text-sm text-muted-foreground">Manage doctors shown on the website</p>
      </div>
      <AdminDoctorList doctors={data as any} />
    </div>
  );
}

function safeParse<T>(s: string | null | undefined, fallback: T): T {
  if (!s) return fallback;
  if (Array.isArray(s)) return s as unknown as T;
  try { return JSON.parse(s) as T; } catch { return fallback; }
}
