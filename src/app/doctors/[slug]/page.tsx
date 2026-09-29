import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { DOCTORS } from "@/lib/site-data";
import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { ArrowRight, GraduationCap, Stethoscope, Quote } from "lucide-react";

export function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const d = DOCTORS.find((doc) => doc.slug === slug);
    if (d) {
      return {
        title: `${d.name} — ${d.role} | KPC Skin Clinic Thapathali`,
        description: `${d.bio} Book a consultation with ${d.name} at KPC Skin Clinic, Thapathali.`,
        alternates: { canonical: `/doctors/${d.slug}` },
      };
    }
    return { title: "Doctor | KPC Skin Clinic" };
  });
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);
  if (!doctor) notFound();

  const styles = [
    { text: "text-brand", bg: "bg-brand", soft: "bg-brand/10" },
    { text: "text-cyan", bg: "bg-cyan", soft: "bg-cyan/10" },
    { text: "text-green", bg: "bg-green", soft: "bg-green/10" },
    { text: "text-gold", bg: "bg-gold", soft: "bg-gold/10" },
    { text: "text-rust", bg: "bg-rust", soft: "bg-rust/10" },
    { text: "text-brand", bg: "bg-brand", soft: "bg-brand/10" },
  ];
  const idx = DOCTORS.findIndex((d) => d.slug === slug);
  const s = styles[idx % styles.length];

  return (
    <>
      <PageBanner
        eyebrow={doctor.role}
        title={doctor.name}
        description={doctor.credentials}
        image={doctor.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/doctors" },
          { label: doctor.name },
        ]}
      />

      {/* Profile */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left — photo */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-secondary sticky top-28">
                { }
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover"
                />
                <div className={`absolute top-0 left-0 right-0 h-2 ${s.bg}`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/80 to-transparent">
                  <p className={`font-display text-xl font-bold text-cream`}>{doctor.name}</p>
                  <p className="text-sm text-cream/80">{doctor.role}</p>
                  <p className="text-[11px] text-gold mt-1">{doctor.experience}</p>
                </div>
              </div>
            </div>

            {/* Right — content */}
            <div className="lg:col-span-7">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 ${s.text}`}>
                About {doctor.name}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-6 leading-tight">
                {doctor.role}
              </h2>

              {/* Full bio */}
              <div className="text-base leading-relaxed text-muted-foreground space-y-4 mb-8">
                <p>{doctor.fullBio}</p>
              </div>

              {/* Approach quote */}
              <div className={`rounded-2xl ${s.soft} border-l-4 ${s.bg.replace("bg-", "border-")} p-6 mb-8`}>
                <Quote className={`h-6 w-6 ${s.text} mb-2`} />
                <p className={`font-display text-lg text-ink leading-snug`}>
                  {doctor.approach}
                </p>
                <p className="text-[11px] text-muted-foreground mt-2">— {doctor.name}</p>
              </div>

              {/* Education */}
              <div className="mb-8">
                <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${s.text} mb-4`}>
                  <GraduationCap className="h-4 w-4" /> Education & Training
                </p>
                <ul className="space-y-2.5">
                  {doctor.education.map((ed, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
                      <span className={`section-index mt-0.5 shrink-0 text-[11px] ${s.text}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{ed}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${s.text} mb-4`}>
                  <Stethoscope className="h-4 w-4" /> Specialties
                </p>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((sp) => (
                    <span
                      key={sp}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full ${s.soft} ${s.text}`}
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Treatments */}
              <div className="mb-8">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${s.text} mb-4`}>
                  Treatments performed
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.treatments.map((t) => (
                    <Link
                      key={t}
                      href="/services"
                      className="text-sm text-ink/70 hover:text-brand transition-colors flex items-center gap-1.5 py-1"
                    >
                      <span className={`h-1 w-1 rounded-full ${s.bg}`} />
                      {t}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className={`inline-flex items-center gap-1.5 rounded-full ${s.bg} hover:opacity-90 text-cream px-6 py-3 text-sm font-semibold transition-opacity`}
                >
                  Book a consultation with {doctor.name.split(" ")[0]}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/doctors"
                  className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors link-underline"
                >
                  View all doctors →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix={`Want to meet ${doctor.name.split(" ").slice(0, 2).join(" ")}?`}
        highlight="Book a consultation."
        description={`A 30–45 minute consultation with ${doctor.name}. We'll assess your concerns and give you a written treatment plan.`}
        primaryCta="Request an Appointment"
        secondaryCta="View All Doctors"
        secondaryHref="/doctors"
      />
    </>
  );
}
