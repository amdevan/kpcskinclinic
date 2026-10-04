import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { DOCTORS } from "@/lib/site-data";
import { DoctorCard } from "@/components/site/doctor-card";

export const metadata = {
  title: "Our Doctors | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Meet the five full-time doctors at KPC Skin Clinic Thapathali. Board-certified, experienced, honest. Hover any doctor to book or view details.",
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  return (
    <>
      <PageBanner eyebrow="Our Doctors" title="Trusted care." highlight="One philosophy." description="Every consultation and every procedure at KPC is performed by a qualified doctor — not a technician, not a salesperson. Hover over any doctor to book or view details." image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg" crumbs={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {DOCTORS.map((d, i) => <DoctorCard key={d.slug} d={d} index={i} />)}
          </div>
        </div>
      </section>
      <CtaSection titlePrefix="Want to meet a specific doctor?" highlight="Book a consultation." description="Tell us which doctor you'd like to see and we'll book you with the right specialist." primaryCta="Request an Appointment" secondaryCta="View Services" secondaryHref="/services" />
    </>
  );
}
