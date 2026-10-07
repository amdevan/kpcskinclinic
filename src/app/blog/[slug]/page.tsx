import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_ARTICLES, type BlogArticle } from "@/lib/site-data";
import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function transformArticle(a: any): BlogArticle {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || "",
    body: a.body || "",
    date: a.date || "",
    author: a.author || "",
    category: a.category || "",
    image: a.image || "",
    readTime: a.readTime || "",
  };
}

async function getArticle(slug: string): Promise<BlogArticle | null> {
  // Try DB first
  try {
    const row = await db.blogArticle.findUnique({ where: { slug } });
    if (row && row.published) return transformArticle(row);
  } catch {
    // DB not available — fall through to static lookup
  }
  // Fall back to static
  return BLOG_ARTICLES.find((a) => a.slug === slug) || null;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
  try {
    const rows = await db.blogArticle.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (rows && rows.length > 0) {
      for (const r of rows) {
        if (!params.some((p) => p.slug === r.slug)) {
          params.push({ slug: r.slug });
        }
      }
    }
  } catch {
    // DB not available — static params only
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (a) {
    return {
      title: `${a.title} | KPC Skin Clinic Blog`,
      description: a.excerpt,
      alternates: { canonical: `/blog/${a.slug}` },
      openGraph: {
        title: a.title,
        description: a.excerpt,
        type: "article",
      },
    };
  }
  return { title: "Article | KPC Skin Clinic" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  // Convert markdown-ish body to simple HTML
  const paragraphs = article.body.split("\n\n");
  const styles = ["text-brand", "text-cyan", "text-green", "text-gold", "text-rust"];
  const catColor = styles[Math.abs(article.slug.charCodeAt(0)) % styles.length];

  // Build a list of all other articles for the "Related articles" section
  let allArticles: BlogArticle[] = BLOG_ARTICLES;
  try {
    const rows = await db.blogArticle.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows && rows.length > 0) {
      allArticles = rows.map(transformArticle);
    }
  } catch {
    // DB not available — use static BLOG_ARTICLES
  }
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageBanner
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        image={article.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.category },
        ]}
      />

      {/* Article body */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-3xl">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand" />
              {article.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand" />
              {article.readTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span className={`font-medium ${catColor}`}>{article.author}</span>
          </div>

          {/* Body */}
          <div className="space-y-6 text-base leading-relaxed text-ink/80">
            {paragraphs.map((p, i) => {
              if (p.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-display text-2xl font-bold text-ink mt-10 mb-2"
                  >
                    {p.replace("## ", "")}
                  </h2>
                );
              }
              if (p.startsWith("| ")) {
                // Simple table rendering
                const lines = p.split("\n").filter((l) => l.trim());
                return (
                  <div key={i} className="overflow-x-auto rounded-xl border border-border my-6">
                    <table className="w-full text-sm">
                      {lines.map((line, li) => {
                        const cells = line.split("|").filter((c) => c.trim());
                        const isSep = line.includes("---");
                        if (isSep) return null;
                        const isHeader = li === 0;
                        return (
                          <tr key={li} className={isHeader ? "bg-brand/5" : ""}>
                            {cells.map((c, ci) => (
                              <td
                                key={ci}
                                className={`px-4 py-3 border-b border-border/60 ${
                                  isHeader ? "font-semibold text-ink" : "text-ink/80"
                                }`}
                              >
                                {c.trim()}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                );
              }
              if (p.startsWith("- ")) {
                const items = p.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1.5 my-4">
                    {items.map((item, ii) => (
                      <li key={ii} className="text-ink/80">{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-ink/80">
                  {p.split(/(\*\*[^*]+\*\*)/).map((seg, si) =>
                    seg.startsWith("**") && seg.endsWith("**") ? (
                      <strong key={si} className="text-ink font-semibold">
                        {seg.slice(2, -2)}
                      </strong>
                    ) : (
                      seg
                    )
                  )}
                </p>
              );
            })}
          </div>

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-ink transition-colors link-underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Keep reading
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8">
            Related articles
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((a, i) => {
              const colors = ["text-brand", "text-cyan", "text-green"];
              return (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden card-lift"
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-secondary">
                    { }
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute top-3 left-3 rounded-full bg-cream/95 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${colors[i % colors.length]}`}>
                      {a.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-muted-foreground mb-1">{a.date} · {a.readTime}</p>
                    <h3 className="font-display text-base font-bold text-ink leading-snug group-hover:text-brand transition-colors">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Have a question about this article?"
        highlight="Book a consultation."
        description="Articles are general education. For a specific recommendation, book a 30-minute consultation with the right doctor."
        primaryCta="Request an Appointment"
        secondaryCta="Read More Articles"
        secondaryHref="/blog"
      />
    </>
  );
}
