import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Procedures | Surgical Treatments | KPC Skin Clinic Thapathali",
  description:
    "Surgical procedures at KPC Skin Clinic — rhinoplasty, blepharoplasty, scar revision, anti-ageing surgery, plastic surgery. Performed by a board-certified plastic surgeon in our in-house theatre.",
  alternates: { canonical: "/procedures" },
};

const SURGICAL_PROCEDURES = [
  {
    slug: "rhinoplasty",
    title: "Rhinoplasty",
    desc: "Nose reshaping for harmony and function — performed by a board-certified plastic surgeon.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg",
    price: "NPR 1,50,000+",
  },
  {
    slug: "blepharoplasty",
    title: "Blepharoplasty (Eyelid)",
    desc: "Upper and lower eyelid surgery for a refreshed, rested appearance.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2daf75b22fb4.jpg",
    price: "NPR 80,000+",
  },
  {
    slug: "scar-revision",
    title: "Scar Revision",
    desc: "Minimise and refine visible scars from injury, surgery, or acne.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/846084de6b09.jpg",
    price: "NPR 25,000+",
  },
  {
    slug: "anti-ageing-surgery",
    title: "Anti-Ageing Surgery",
    desc: "Surgical facial rejuvenation — facelift, brow lift, neck lift.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg",
    price: "NPR 1,20,000+",
  },
  {
    slug: "plastic-surgery",
    title: "Plastic Surgery",
    desc: "Comprehensive cosmetic and reconstructive plastic surgery options.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2daf75b22fb4.jpg",
    price: "On consultation",
  },
];

export default function ProceduresPage() {
  return (
    <>
      <PageBanner
        eyebrow="Surgical"
        title="Procedures"
        description="Surgical cosmetic and reconstructive procedures performed by Dr. Rajesh Maharjan, our board-certified plastic surgeon, in our in-house sterile theatre at Thapathali."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Procedures" }]}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              All surgical procedures
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
              Performed in-house, by a surgeon
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SURGICAL_PROCEDURES.map((p, i) => {
              const styles = ["text-brand", "text-cyan", "text-green", "text-gold", "text-rust"];
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
                    <h3 className="font-display text-lg font-bold text-ink mb-1">{p.title}</h3>
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

      <CtaSection
        titlePrefix="Considering a surgical procedure?"
        highlight="Book a consultation."
        description="A consultation with Dr. Rajesh Maharjan, our plastic surgeon. We assess, explain options, and give you a written surgical plan with expected outcome and price."
        primaryCta="Request an Appointment"
        secondaryCta="See Pricing"
        secondaryHref="/packages"
      />
    </>
  );
}
