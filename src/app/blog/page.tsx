import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { BlogList } from "@/components/site/blog-list";
import { BLOG_ARTICLES, type BlogArticle } from "@/lib/site-data";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Skincare tips, treatment explainers, and clinic news from the doctors at KPC Skin Clinic Thapathali. Honest, doctor-written, no listicles. Filter by category.",
  alternates: { canonical: "/blog" },
};

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
      orderBy: { createdAt: "desc" },
    });
    if (rows && rows.length > 0) {
      return rows.map(transformArticle);
    }
  } catch {
    // DB not available — fall back to static
  }
  return BLOG_ARTICLES;
}

export default async function BlogPage() {
  const articles = await getArticles();
  return (
    <>
      <PageBanner eyebrow="Blog" title="Doctor-written, not" highlight="listicle-spun." description="Skincare tips, treatment explainers, and clinic news — written by our doctors, not a content agency. Filter by category below." image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e1b6422719.jpg" crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <BlogList articles={articles} />
      <CtaSection titlePrefix="Have a question you'd like us to write about?" highlight="Tell us." description="We write based on what our patients ask." primaryCta="Request an Appointment" secondaryCta="Contact Us" secondaryHref="/contact" />
    </>
  );
}
