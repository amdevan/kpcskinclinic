import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { Testimonials } from "@/components/site/testimonials";
import { BeforeAfterGallery } from "@/components/site/before-after-gallery";
import { TESTIMONIALS } from "@/lib/site-data";
import { PlayCircle, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Success Stories | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Real patient transformations — before & after gallery, video stories, and Google reviews from patients treated at KPC Skin Clinic, Kathmandu.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Success Stories"
        title="Hear From Our"
        highlight="Satisfied Clients."
        description="Discover why so many people trust our clinic to boost their confidence and well-being — real patients, real results, no filters."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
      />

      {/* Before / After gallery */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              Watch Stories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              Before &amp;{" "}
              <span className="font-italic-accent text-brand font-medium">
                After
              </span>{" "}
              transformations
            </h2>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              Click any card to watch the full patient story. All photos are
              of real KPC patients, taken with consent, untouched.
            </p>
          </div>

          <BeforeAfterGallery />

          {/* Watch all stories CTA */}
          <div className="mt-10 text-center">
            <a
              href="#reviews"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-ink transition-colors link-underline"
            >
              Watch all 50+ patient stories
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials — reuse component */}
      <div id="reviews">
        <Testimonials />
      </div>

      {/* Video stories strip */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="relative overflow-hidden rounded-2xl aspect-video bg-ink group cursor-pointer"
              >
                { }
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-cream/20 backdrop-blur flex items-center justify-center group-hover:bg-brand transition-colors">
                  <PlayCircle className="h-7 w-7 text-cream" />
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                  <p className="font-display text-lg font-semibold">
                    {t.name}&apos;s story
                  </p>
                  <p className="text-xs text-cream/75">{t.service}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            Patient consent obtained for all stories. Some identifying details
            have been changed at the patient&apos;s request.
          </p>
        </div>
      </section>

      <CtaSection
        titlePrefix="Ready to write your own"
        highlight="success story?"
        description="It starts with one conversation. Book a consultation with the doctor who'll perform your treatment — and leave with a plan."
        primaryCta="Request an Appointment"
        secondaryCta="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
