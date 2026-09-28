import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Blog | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Skincare tips, treatment explainers, and clinic news from the doctors at KPC Skin Clinic Thapathali. Honest, doctor-written, no listicles.",
  alternates: { canonical: "/blog" },
};

const ARTICLES = [
  {
    slug: "is-hair-transplant-right-for-you",
    title: "Is a hair transplant right for you? An honest checklist.",
    excerpt:
      "Before you spend NPR 2 lakh on a transplant, read this. We break down who benefits, who should wait, and who should never have one.",
    date: "20 Sep 2026",
    author: "Dr. Rupak Maharjan",
    category: "Hair Transplant",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
  },
  {
    slug: "acne-scar-types-explained",
    title: "Acne scars are six different conditions. Here's how we treat each.",
    excerpt:
      "Ice pick, boxcar, rolling, hypertrophic, PIH, erythema — each responds to different treatments. A single laser won't fix all of them.",
    date: "15 Sep 2026",
    author: "Dr. Sneha Shrestha",
    category: "Acne & Scars",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
  },
  {
    slug: "laser-hair-removal-myths",
    title: "Five laser hair removal myths we hear every week — debunked.",
    excerpt:
      "Does it hurt? Does it work on dark skin? Is it permanent? We answer the questions we get asked most often.",
    date: "8 Sep 2026",
    author: "Dr. Sneha Shrestha",
    category: "Laser",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg",
  },
  {
    slug: "prp-vs-gfc-for-hair",
    title: "PRP vs GFC for hair loss: which is actually better?",
    excerpt:
      "Both use your own blood. Both claim to regrow hair. We explain the difference in cost, process, and evidence.",
    date: "1 Sep 2026",
    author: "Dr. Anil Shakya",
    category: "Hair Clinic",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
  },
  {
    slug: "rhinoplasty-recovery-timeline",
    title: "Rhinoplasty recovery: what to expect week by week.",
    excerpt:
      "From day 1 swelling to month 12 final shape — a surgeon's honest guide to what happens after nose surgery.",
    date: "25 Aug 2026",
    author: "Dr. Rajesh Maharjan",
    category: "Surgery",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg",
  },
  {
    slug: "hydrafacial-vs-chemical-peel",
    title: "HydraFacial vs chemical peel: which should you choose?",
    excerpt:
      "Both exfoliate. Both give you a glow. But they work differently and suit different skin types. Here's how to decide.",
    date: "18 Aug 2026",
    author: "Dr. Priya Karki",
    category: "Aesthetic",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageBanner
        eyebrow="Blog"
        title="Doctor-written, not"
        highlight="listicle-spun."
        description="Skincare tips, treatment explainers, and clinic news — written by our doctors, not a content agency. Honest, specific, occasionally contrarian."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e1b6422719.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ARTICLES.map((a, i) => {
              const styles = [
                { text: "text-brand", soft: "bg-brand/10" },
                { text: "text-cyan", soft: "bg-cyan/10" },
                { text: "text-green", soft: "bg-green/10" },
                { text: "text-gold", soft: "bg-gold/10" },
                { text: "text-rust", soft: "bg-rust/10" },
              ];
              const s = styles[i % styles.length];
              return (
                <article key={a.slug} className="group bg-card rounded-2xl border border-border overflow-hidden card-lift">
                  <Link href="/blog" className="block">
                    <div className="relative overflow-hidden aspect-[16/10] bg-secondary">
                      { }
                      <img
                        src={a.image}
                        alt={a.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className={`absolute top-3 left-3 rounded-full ${s.soft} px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${s.text}`}>
                        {a.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        {a.date}
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                        {a.author}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-brand transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                      <p className={`mt-3 text-sm font-medium ${s.text} inline-flex items-center gap-1`}>
                        Read article <ArrowRight className="h-3.5 w-3.5" />
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Have a question you'd like us to write about?"
        highlight="Tell us."
        description="We write based on what our patients ask. Send your question and we'll add it to the list — or write a full article if it's a common one."
        primaryCta="Request an Appointment"
        secondaryCta="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
