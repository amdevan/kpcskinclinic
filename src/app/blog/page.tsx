import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { BLOG_ARTICLES } from "@/lib/site-data";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Skincare tips, treatment explainers, and clinic news from the doctors at KPC Skin Clinic Thapathali. Honest, doctor-written, no listicles.",
  alternates: { canonical: "/blog" },
};

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
            {BLOG_ARTICLES.map((a, i) => {
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
                  <Link href={`/blog/${a.slug}`} className="block">
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
                        <Clock className="h-3 w-3" />
                        {a.readTime}
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-brand transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                      <p className="mt-3 text-[11px] text-muted-foreground">By {a.author}</p>
                      <p className={`mt-2 text-sm font-medium ${s.text} inline-flex items-center gap-1`}>
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
