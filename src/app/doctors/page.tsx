import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { DOCTORS } from "@/lib/site-data";
import { DoctorCard } from "@/components/site/doctor-card";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Doctors | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Meet the five full-time doctors at KPC Skin Clinic Thapathali. Board-certified, experienced, honest. Hover any doctor to book or view details.",
  alternates: { canonical: "/doctors" },
};

type Doctor = (typeof DOCTORS)[number];

function parseJsonArray<T>(value: string | null | undefined, fallback: T[] = []): T[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function transformDoctor(d: any): Doctor {
  return {
    slug: d.slug,
    name: d.name,
    role: d.role,
    credentials: d.credentials,
    specialties: parseJsonArray<string>(d.specialties),
    bio: d.bio || "",
    fullBio: d.fullBio || d.bio || "",
    education: parseJsonArray<string>(d.education),
    treatments: parseJsonArray<string>(d.treatments),
    approach: d.approach || "",
    image: d.image,
    experience: d.experience || "",
  };
}

export default async function DoctorsPage() {
  let doctors: Doctor[] = DOCTORS;
  try {
    const rows = await db.doctor.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (rows && rows.length > 0) {
      doctors = rows.map(transformDoctor);
    }
  } catch {
    // DB not available — fall back to static DOCTORS
  }

  return (
    <>
      <PageBanner eyebrow="Our Doctors" title="Trusted care." highlight="One philosophy." description="Every consultation and every procedure at KPC is performed by a qualified doctor — not a technician, not a salesperson. Hover over any doctor to book or view details." image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg" crumbs={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {doctors.map((d, i) => <DoctorCard key={d.slug} d={d} index={i} />)}
          </div>
        </div>
      </section>
      <CtaSection titlePrefix="Want to meet a specific doctor?" highlight="Book a consultation." description="Tell us which doctor you'd like to see and we'll book you with the right specialist." primaryCta="Request an Appointment" secondaryCta="View Services" secondaryHref="/services" />
    </>
  );
}
