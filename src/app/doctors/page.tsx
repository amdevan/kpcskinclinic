import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { DOCTORS } from "@/lib/site-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Doctors | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Meet the four full-time doctors at KPC Skin Clinic Thapathali — dermatologists, a plastic surgeon, an aesthetic specialist, and a hair transplant surgeon. Board-certified, experienced, honest.",
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Doctors"
        title="Four doctors."
        highlight="One philosophy."
        description="Every consultation and every procedure at KPC is performed by a qualified doctor — not a technician, not a salesperson. Meet the team responsible for your care."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
      />

      {/* Doctors grid */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DOCTORS.map((d, i) => {
              const styles = [
                { bar: "bg-brand", role: "text-brand", soft: "bg-brand/10" },
                { bar: "bg-cyan", role: "text-cyan", soft: "bg-cyan/10" },
                { bar: "bg-green", role: "text-green", soft: "bg-green/10" },
                { bar: "bg-gold", role: "text-gold", soft: "bg-gold/10" },
                { bar: "bg-rust", role: "text-rust", soft: "bg-rust/10" },
                { bar: "bg-brand", role: "text-brand", soft: "bg-brand/10" },
              ];
              const s = styles[i % styles.length];
              return (
                <Link
                  key={d.slug}
                  href={`/doctors/${d.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden card-lift block"
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-secondary">
                    { }
                    <img
                      src={d.image}
                      alt={d.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${s.bar}`} />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
                      <p className={`text-[11px] font-semibold uppercase tracking-wider ${i % 2 === 0 ? "text-gold" : "text-cyan"}`}>
                        {d.experience}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className={`text-sm font-medium ${s.role}`}>{d.role}</p>
                    <h3 className="font-display text-xl font-bold text-ink mt-1">{d.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{d.credentials}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {d.specialties.map((sp) => (
                        <span
                          key={sp}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.soft} ${s.role}`}
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Want to meet a specific doctor?"
        highlight="Book a consultation."
        description="Tell us which doctor you'd like to see (or which concern you have) and we'll book you with the right specialist."
        primaryCta="Request an Appointment"
        secondaryCta="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
