import { BLOG_ARTICLES } from "@/lib/site-data";
import { AdminSimpleList, type AdminField } from "@/components/admin/admin-simple-list";
import { dbBlogArticleAction } from "@/app/admin/blog/actions";

export const dynamic = "force-dynamic";

const fields: AdminField[] = [
  { key: "title", label: "Title", required: true },
  { key: "slug", label: "Slug", required: true, placeholder: "is-hair-transplant-right-for-you" },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  { key: "date", label: "Date", placeholder: "20 Sep 2026" },
  { key: "readTime", label: "Read time", placeholder: "6 min read" },
  { key: "image", label: "Image", type: "image", full: true },
  { key: "excerpt", label: "Excerpt", type: "textarea", full: true },
  { key: "body", label: "Body (Markdown)", type: "textarea", full: true },
];

// `date` is a display string (e.g. "20 Sep 2026") — sort by it when it
// parses as a date, falling back to the row's createdAt.
function sortByDisplayDate<T extends { date: string; createdAt: Date }>(rows: T[]) {
  const ts = (a: T) => {
    const d = a.date ? new Date(a.date).getTime() : NaN;
    return Number.isNaN(d) ? new Date(a.createdAt).getTime() || 0 : d;
  };
  rows.sort((x, y) => ts(y) - ts(x));
}

export default async function AdminBlogPage() {
  let items: any[] = [];
  try {
    const { db } = await import("@/lib/db");
    const articles = await db.blogArticle.findMany({ orderBy: { createdAt: "desc" } });
    sortByDisplayDate(articles);
    items = articles.map((a) => ({
      id: a.id, title: a.title, slug: a.slug, excerpt: a.excerpt, body: a.body,
      date: a.date, author: a.author, category: a.category, image: a.image,
      readTime: a.readTime, published: a.published,
    }));
    
    // Auto-seed if empty
    if (items.length === 0) {
      for (const a of BLOG_ARTICLES) {
        await db.blogArticle.upsert({
          where: { slug: a.slug },
          create: { slug: a.slug, title: a.title, excerpt: a.excerpt, body: a.body, date: a.date, author: a.author, category: a.category, image: a.image, readTime: a.readTime, published: true },
          update: {},
        }).catch(() => {});
      }
      const seeded = await db.blogArticle.findMany({ orderBy: { createdAt: "desc" } });
      sortByDisplayDate(seeded);
      items = seeded.map((a) => ({
        id: a.id, title: a.title, slug: a.slug, excerpt: a.excerpt, body: a.body,
        date: a.date, author: a.author, category: a.category, image: a.image,
        readTime: a.readTime, published: a.published,
      }));
    }
  } catch {
    // DB not available — use static data
    items = BLOG_ARTICLES.map((a) => ({ ...a, id: a.slug, published: true }));
  }

  return (
    <AdminSimpleList
      title="Blog"
      subtitle="Manage blog articles shown on /blog"
      items={items}
      fields={fields}
      action={dbBlogArticleAction}
    />
  );
}
