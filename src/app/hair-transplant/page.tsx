import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hair Transplant | KPC Skin Clinic Thapathali",
  description:
    "FUE hair transplant, beard transplant and eyebrow transplant at KPC Skin Clinic Thapathali. Performed by experienced surgeons. Written graft count and price before surgery. EMI available.",
  alternates: { canonical: "/hair-transplant" },
};

const DEFAULT_SUB_PROCEDURES = [
  {
    slug: "hair-transplant",
    title: "FUE Hair Transplant",
    desc: "Follicular Unit Extraction — natural density, no linear scar, permanent results.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    price: "NPR 60,000+",
  },
  {
    slug: "beard-transplant",
    title: "Beard Transplant",
    desc: "Fill patchy beards, moustache and sideburns with your own follicles.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b2eebe27adf.jpg",
    price: "NPR 45,000+",
  },
  {
    slug: "eyebrow-transplant",
    title: "Eyebrow Transplant",
    desc: "Restore over-plucked, thin or scarred eyebrows — natural angle and density.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
    price: "NPR 35,000+",
  },
];

const DEFAULT_STEPS = [
  { step: "01", title: "Consultation", body: "We assess your hair loss pattern (Norwood scale), donor density, and design a natural hairline. You get a written graft count and price." },
  { step: "02", title: "Surgery", body: "FUE harvest + implantation by the surgeon, not a technician. 8–10 hours, local anaesthetic, painless. No linear scar." },
  { step: "03", title: "Recovery", body: "Redness 3–5 days. Shedding 2–4 weeks. New growth 3–4 months. Full result 12 months." },
  { step: "04", title: "Follow-up", body: "Review at 1 week, 1 month, 4 months, 8 months, 12 months. We photograph and measure at every stage." },
];

const DEFAULT_BANNER = {
  title: "Hair Transplant at KPC.",
  description:
    "Natural, permanent hair restoration performed by experienced surgeons at our Thapathali clinic. Written graft count and price before surgery — no surprises.",
  image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
};

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

async function getHairTransplantContent() {
  let banner = DEFAULT_BANNER;
  let subProcedures = DEFAULT_SUB_PROCEDURES;
  let steps = DEFAULT_STEPS;
  try {
    const rows = await db.pageContent.findMany({
      where: { page: "hair-transplant" },
      orderBy: { order: "asc" },
    });
    if (rows && rows.length > 0) {
      for (const r of rows) {
        if (r.section === "banner") {
          banner = {
            title: r.title,
            description: r.body,
            image: r.image || DEFAULT_BANNER.image,
          };
        } else if (r.section === "sub_procedures") {
          const parsed = parseJson<typeof DEFAULT_SUB_PROCEDURES>(r.body, DEFAULT_SUB_PROCEDURES);
          if (Array.isArray(parsed) && parsed.length > 0) subProcedures = parsed;
        } else if (r.section === "steps") {
          const parsed = parseJson<typeof DEFAULT_STEPS>(r.body, DEFAULT_STEPS);
          if (Array.isArray(parsed) && parsed.length > 0) steps = parsed;
        }
      }
    }
  } catch {
    // DB not available — fall back to defaults
  }
  return { banner, subProcedures, steps };
}

export default async function HairTransplantHubPage() {
  const { banner, subProcedures, steps } = await getHairTransplantContent();
  return (
    <>
      <PageBanner
        eyebrow="Flagship Treatment"
        title={banner.title.split(" at KPC")[0]}
        highlight="at KPC."
        description={banner.description}
        image={banner.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Hair Transplant" }]}
      />

      {/* Sub-procedures */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Hair restoration options
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-10">
            Three transplant procedures
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subProcedures.map((p, i) => {
              const styles = ["text-brand", "text-gold", "text-cyan"];
              return (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden card-lift"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-secondary">
                    { }
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-cream/95 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-brand">
                      {p.price}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className={`font-display text-lg font-bold text-ink mb-1`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    <p className={`mt-3 text-sm font-medium ${styles[i % styles.length]} inline-flex items-center gap-1`}>
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            The process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-10">
            From consultation to full result
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const colors = ["text-brand", "text-cyan", "text-green", "text-rust"];
              return (
                <div key={s.step} className="border-l-2 border-brand/20 pl-5">
                  <p className={`section-index text-[11px] mb-1 ${colors[i]}`}>{s.step}</p>
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why KPC for hair transplant */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Why KPC
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-8 leading-tight">
            Why people choose us for{" "}
            <span className="font-italic-accent text-brand">hair restoration</span>
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {[
              "Surgeon-performed, not technician-performed",
              "Written graft count and price before surgery",
              ">95% graft survival rate",
              "No linear scar (FUE technique)",
              "Natural hairline design, not a 'pluggy' look",
              "EMI available on packages above NPR 50,000",
              "Photographed progress at every review",
              "5+ years of experience",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild className="bg-brand hover:bg-brand/90 text-brand-foreground">
              <Link href="/contact">
                Book a hair transplant consultation
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Ready to restore your hair?"
        highlight="Book a consultation."
        description="A 45-minute consultation with our hair transplant surgeon. We'll assess your donor density, map your hairline, and give you a written graft count and quote."
        primaryCta="Request an Appointment"
        secondaryCta="See Pricing"
        secondaryHref="/packages"
      />
    </>
  );
}
