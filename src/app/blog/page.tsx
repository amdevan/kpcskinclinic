import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { BlogList } from "@/components/site/blog-list";
import { BLOG_ARTICLES, type BlogArticle } from "@/lib/site-data";
import { db } from "@/lib/db";
import { getPageSection } from "@/lib/page-content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata("/blog", {
    title: "Blog | KPC Skin Hair & Aesthetic Clinic",
    description:
      "Skincare tips, treatment explainers, and clinic news from the doctors at KPC Skin Clinic Thapathali. Honest, doctor-written, no listicles. Filter by category.",
    canonical: "/blog",
  });
}

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

async function getArticles(): Promise<BlogArticle[]> {
  try {
    const rows = await db.blogArticle.findMany({
      where: { published: true },
    });
    if (rows && rows.length > 0) {
      // Sort by the admin-controlled display date (string) when parseable,
      // otherwise fall back to the row's createdAt.
      const ts = (a: { date: string; createdAt: Date }) => {
        const d = a.date ? new Date(a.date).getTime() : NaN;
        return Number.isNaN(d) ? new Date(a.createdAt).getTime() || 0 : d;
      };
      return rows.sort((x, y) => ts(y) - ts(x)).map(transformArticle);
    }
  } catch {
    // DB not available — fall back to static
  }
  return BLOG_ARTICLES;
}

export default async function BlogPage() {
  const articles = await getArticles();
  const banner = await getPageSection("blog", "banner");
  return (
    <>
      <PageBanner
        eyebrow={banner?.extra.eyebrow || "Blog"}
        title={banner?.title || "Doctor-written, not"}
        highlight={banner?.extra.highlight || "listicle-spun."}
        description={banner?.body || "Skincare tips, treatment explainers, and clinic news — written by our doctors, not a content agency. Filter by category below."}
        image={banner?.image || "/images/gen/lab-diagnostics.jpg"}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogList articles={articles} />
      <CtaSection titlePrefix="Have a question you'd like us to write about?" highlight="Tell us." description="We write based on what our patients ask." primaryCta="Request an Appointment" secondaryCta="Contact Us" secondaryHref="/contact" />
    </>
  );
}
