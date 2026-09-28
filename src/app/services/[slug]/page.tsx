import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import {
  TREATMENTS,
  REMAINING_TREATMENT_SLUGS,
  getTreatmentBySlug,
  type Treatment,
} from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  X,
  ShieldCheck,
  Clock,
  Stethoscope,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Statically generate all treatment pages
export function generateStaticParams() {
  const fullSlugs = TREATMENTS.map((t) => ({ slug: t.slug }));
  const remainingSlugs = REMAINING_TREATMENT_SLUGS.map((t) => ({
    slug: t.slug,
  }));
  return [...fullSlugs, ...remainingSlugs];
}

// Per-page metadata (SEO)
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const t = getTreatmentBySlug(slug);
    if (t) {
      return {
        title: `${t.title} | KPC Skin Clinic Thapathali`,
        description: t.metaDescription,
        alternates: { canonical: `/services/${t.slug}` },
      };
    }
    const r = REMAINING_TREATMENT_SLUGS.find((s) => s.slug === slug);
    if (r) {
      return {
        title: `${r.title} | KPC Skin Clinic Thapathali`,
        description: `${r.title} at KPC Skin Hair & Aesthetic Clinic, Thapathali Kathmandu. Performed by qualified doctors with written treatment plans and transparent pricing.`,
        alternates: { canonical: `/services/${r.slug}` },
      };
    }
    return { title: "Treatment | KPC Skin Clinic" };
  });
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const full = getTreatmentBySlug(slug);

  // If we have full content, render the complete template
  if (full) {
    return <FullTreatmentTemplate treatment={full} />;
  }

  // Otherwise, render the shared template with generated content
  const r = REMAINING_TREATMENT_SLUGS.find((s) => s.slug === slug);
  if (!r) notFound();
  return <GeneratedTreatmentTemplate slug={r.slug} title={r.title} category={r.category} />;
}

/* ============ Full template (for treatments with detailed content) ============ */
function FullTreatmentTemplate({ treatment: t }: { treatment: Treatment }) {
  return (
    <>
      <PageBanner
        eyebrow={t.category}
        title={t.title}
        description={t.tagline}
        image={t.heroImage}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
          { label: t.title },
        ]}
      />

      {/* Trust bar */}
      <TrustBar pricing={t.pricing} />

      {/* Intro */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Overview
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-6 leading-tight">
            What this treatment does
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Comparison table (if present) */}
      {t.comparisonTable && (
        <section className="py-16 sm:py-24 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-5xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              Comparison
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6">
              {t.comparisonTable.caption}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <caption className="sr-only">{t.comparisonTable.caption}</caption>
                <thead className="bg-brand/5">
                  <tr>
                    {t.comparisonTable.columns.map((col) => (
                      <th
                        key={col}
                        className="text-left font-semibold text-ink px-4 py-3 border-b border-border"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonTable.rows.map((row) => (
                    <tr key={row.label} className="hover:bg-paper/60 transition-colors">
                      <td className="font-medium text-ink px-4 py-3 border-b border-border/60">
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td key={i} className="text-muted-foreground px-4 py-3 border-b border-border/60">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Your exact treatment plan is confirmed at consultation.
            </p>
          </div>
        </section>
      )}

      {/* Treatment subsections */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Treatment options
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-10">
            How we approach it
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {t.subsections.map((s, i) => {
              const colors = ["text-brand", "text-cyan", "text-green", "text-gold", "text-rust", "text-brand"];
              return (
                <div key={s.heading} className="border-l-2 border-brand/30 pl-5">
                  <p className={`section-index text-[11px] mb-1 ${colors[i % colors.length]}`}>
                    0{i + 1}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">
                    {s.heading}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results reality */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rust mb-3">
            Realistic expectations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-6 leading-tight">
            What results to realistically expect
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t.resultsReality}
          </p>
        </div>
      </section>

      {/* Suitability */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Suitability
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-10">
            Is this right for you?
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-green/30 bg-green/5 p-6">
              <p className="font-semibold text-green mb-4 flex items-center gap-2">
                <Check className="h-5 w-5" /> Good for
              </p>
              <ul className="space-y-2.5">
                {t.suitability.ideal.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <Check className="h-4 w-4 text-green mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rust/30 bg-rust/5 p-6">
              <p className="font-semibold text-rust mb-4 flex items-center gap-2">
                <X className="h-5 w-5" /> Not suitable if
              </p>
              <ul className="space-y-2.5">
                {t.suitability.notIdeal.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <X className="h-4 w-4 text-rust mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-8">
            Common questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {t.faq.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-base font-medium text-ink hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaSection
        titlePrefix={`Ready to start ${t.title.toLowerCase()}?`}
        highlight="Book a consultation."
        description={`A 30–45 minute consultation with the right doctor. We'll assess if ${t.title.toLowerCase()} is suitable for you and give you a written plan.`}
        primaryCta="Request an Appointment"
        secondaryCta="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}

/* ============ Generated template (for treatments with title/category only) ============ */
function GeneratedTreatmentTemplate({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  const heroImage = "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg";
  return (
    <>
      <PageBanner
        eyebrow={category}
        title={title}
        description={`${title} at KPC Skin Clinic, Thapathali — performed by qualified doctors with written treatment plans and transparent pricing.`}
        image={heroImage}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
          { label: title },
        ]}
      />

      {/* Trust bar */}
      <TrustBar
        pricing={{
          startingPrice: "From consultation",
          sessions: "Varies by case",
          note: "Written quote before any treatment.",
        }}
      />

      {/* Overview */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Overview
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-6 leading-tight">
            About {title.toLowerCase()}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            {title} is part of our {category} practice at KPC Skin Hair &amp;
            Aesthetic Clinic, Thapathali. Every treatment begins with a 30–45
            minute consultation where we assess your specific case, explain the
            options, and give you a written plan with clear pricing — no
            verbal estimates, no surprise charges.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our doctors have collectively performed over 15,000 procedures
            across hair, skin, and aesthetic medicine. We use clinically proven
            techniques and FDA-cleared equipment — the same devices top clinics
            in Delhi, Bangkok and Seoul use.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-brand hover:bg-brand/90 text-brand-foreground">
              <Link href="/contact">
                Book a consultation
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground">
              <Link href="/packages">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            What to expect
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-10">
            Your journey at KPC
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Consultation",
                body: "30–45 minutes with the right doctor. We examine, diagnose, and write down a plan with expected outcomes and price.",
                color: "text-brand",
              },
              {
                step: "02",
                title: "Treatment",
                body: "Performed by a doctor — not a technician — in our sterile in-house treatment room or theatre at Thapathali.",
                color: "text-cyan",
              },
              {
                step: "03",
                title: "Follow-up",
                body: "Written aftercare instructions. Scheduled review appointments. We photograph and measure at every stage.",
                color: "text-rust",
              },
            ].map((s) => (
              <div key={s.step} className="border-l-2 border-brand/20 pl-5">
                <p className={`section-index text-[11px] mb-1 ${s.color}`}>{s.step}</p>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitability (shared) */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Suitability
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-10">
            Is {title.toLowerCase()} right for you?
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-green/30 bg-green/5 p-6">
              <p className="font-semibold text-green mb-4 flex items-center gap-2">
                <Check className="h-5 w-5" /> Good for
              </p>
              <ul className="space-y-2.5">
                {[
                  "Adults with realistic expectations",
                  "Willing to follow a written treatment plan",
                  "Able to commit to required sessions",
                  "Looking for doctor-led, not technician-led, care",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <Check className="h-4 w-4 text-green mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rust/30 bg-rust/5 p-6">
              <p className="font-semibold text-rust mb-4 flex items-center gap-2">
                <X className="h-5 w-5" /> Not suitable if
              </p>
              <ul className="space-y-2.5">
                {[
                  "You want overnight results",
                  "You can't attend follow-up appointments",
                  "You have active infections at the treatment site",
                  "You expect guarantees that biology doesn't allow",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <X className="h-4 w-4 text-rust mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (shared) */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-8">
            Common questions about {title.toLowerCase()}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: `How much does ${title.toLowerCase()} cost?`,
                a: "Pricing depends on your specific case. We provide a written quote after consultation — no verbal estimates, no hidden charges. Treatments start from NPR 2,500 per session. See our Packages page for starting prices.",
              },
              {
                q: "Is the consultation free?",
                a: "A 15-minute orientation chat with our patient care team is free. A full 30–45 minute consultation with a doctor is NPR 1,000, which is adjusted against your treatment if you proceed.",
              },
              {
                q: "Do you offer EMI?",
                a: "Yes — for treatments above NPR 50,000 we offer 3- and 6-month EMI through partner banks (Nabil, NIC Asia, Global IME). Bring your citizenship and latest payslip.",
              },
              {
                q: "Who performs the treatment?",
                a: "A qualified doctor — not a technician, not a salesperson. We'll tell you the name of the doctor responsible for your care in writing before you commit.",
              },
              {
                q: "What if I'm not happy with the result?",
                a: "Every treatment plan has a written expected outcome. If results fall short of that expectation due to our work, we re-do or adjust at no charge. This is in writing.",
              },
            ].map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-base font-medium text-ink hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaSection
        titlePrefix={`Ready to start ${title.toLowerCase()}?`}
        highlight="Book a consultation."
        description={`Not sure if ${title.toLowerCase()} is right for you? Book a 30-minute consultation and we'll give you an honest answer — even if the answer is "you don't need this."`}
        primaryCta="Request an Appointment"
        secondaryCta="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}

/* ============ Shared trust bar (appears on all treatment pages) ============ */
function TrustBar({
  pricing,
}: {
  pricing: { startingPrice: string; sessions: string; note: string };
}) {
  return (
    <section className="bg-paper border-y border-border">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-brand shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Starting price</p>
              <p className="font-display font-bold text-ink">{pricing.startingPrice}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-cyan shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Sessions</p>
              <p className="font-display font-bold text-ink">{pricing.sessions}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-green shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Performed by</p>
              <p className="font-display font-bold text-ink">Qualified doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-gold shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
              <p className="font-display font-bold text-ink">Thapathali, Kathmandu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
