import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { OFFERS } from "@/lib/site-data";
import { Tag, Check, Clock } from "lucide-react";

export const metadata = {
  title: "Offers & Packages | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Seasonal packages and member-only offers across KPC's most popular treatments. Honest bundles — not manufactured discounts.",
};

const TERMS = [
  "Offers cannot be combined with any other promotion or EMI plan.",
  "All offers require a consultation before the package is activated — we confirm suitability first.",
  "Package sessions must be completed within 12 months of purchase.",
  "Refunds for unused sessions are pro-rated against the per-session price actually paid, not the package rate.",
  "Offers are subject to doctor assessment and treatment eligibility.",
];

export default function OffersPage() {
  const [featured, ...rest] = OFFERS;
  return (
    <>
      <PageBanner
        eyebrow="This Season"
        title="A few offers worth"
        highlight="knowing about."
        description="We don't run sales. These are seasonal packages and new-patient bundles that genuinely save money if you were going to do the treatment anyway."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />

      {/* Featured offer */}
      <section className="py-20 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <FeaturedOffer offer={featured} />
        </div>
      </section>

      {/* Other offers */}
      <section className="pb-20 sm:pb-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6">
            More this season
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {rest.map((o, i) => (
              <article
                key={o.title}
                className="relative rounded-2xl border border-border bg-card p-6 sm:p-7 card-lift"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
                    <Tag className="h-3 w-3" />
                    {o.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink leading-snug">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {o.description}
                </p>
                <a
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-ink transition-colors link-underline"
                >
                  {o.cta} →
                </a>
                <span className="absolute top-6 right-6 section-index text-[11px] text-clay">
                  0{i + 2}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How to claim */}
      <section className="py-20 sm:py-24 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                How to claim
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-6">
                Three steps.{" "}
                <span className="font-italic-accent text-brand font-medium">
                  No coupons.
                </span>
              </h2>
              <ol className="space-y-5">
                {[
                  {
                    n: "01",
                    t: "Book a consultation",
                    d: "Tell us which offer you're interested in. We'll book you with the right doctor.",
                  },
                  {
                    n: "02",
                    t: "Get assessed",
                    d: "The doctor confirms the treatment is suitable for you. If it isn't, we won't sell you the package — full stop.",
                  },
                  {
                    n: "03",
                    t: "Activate the package",
                    d: "Pay at the front desk. Get your package card with session dates. Done.",
                  },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <span className="section-index text-sm font-semibold text-brand mt-1 shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{s.t}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {s.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                <Clock className="h-3 w-3 inline mr-1" />
                The fine print
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-6">
                Terms &amp;{" "}
                <span className="font-italic-accent text-brand font-medium">
                  conditions
                </span>
              </h2>
              <ul className="space-y-3">
                {TERMS.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <span className="text-sm text-ink/70 leading-relaxed">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Interested in a package?"
        highlight="Book a consultation."
        description="Tell us which offer caught your eye and we'll book you with the right doctor to assess if it's suitable for you."
        primaryCta="Request an Appointment"
        secondaryCta="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}

function FeaturedOffer({ offer }: { offer: any }) {
  if (!offer) return null;
  return (
    <article className="relative overflow-hidden rounded-3xl bg-ink text-cream p-8 sm:p-12 lg:p-16">
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/30 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold mb-5">
            <Tag className="h-3 w-3" />
            {offer.badge} · Featured
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em]">
            {offer.title}
          </h2>
          <p className="mt-5 text-cream/75 text-base sm:text-lg leading-relaxed max-w-lg">
            {offer.description}
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-gold hover:bg-gold/90 px-6 py-3 text-sm font-semibold text-ink transition-colors"
          >
            {offer.cta} →
          </a>
        </div>
        <div className="relative">
          { }
          <img
            src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg"
            alt={offer.title}
            className="rounded-2xl aspect-[4/3] object-cover w-full"
          />
        </div>
      </div>
    </article>
  );
}
