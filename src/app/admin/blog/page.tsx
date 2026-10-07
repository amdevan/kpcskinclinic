import { db } from "@/lib/db";
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
  { key: "image", label: "Image URL", full: true },
  { key: "excerpt", label: "Excerpt", type: "textarea", full: true },
  { key: "body", label: "Body (Markdown)", type: "textarea", full: true },
];

export default async function AdminBlogPage() {
  const articles = await db.blogArticle.findMany({
    orderBy: [{ date: "desc" }, { title: "asc" }],
  });

  const items = articles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    body: a.body,
    date: a.date,
    author: a.author,
    category: a.category,
    image: a.image,
    readTime: a.readTime,
    published: a.published,
  }));

  return (
    <AdminSimpleList
      title="Blog"
      subtitle="Manage blog articles shown on /blog"
      items={items as any}
      fields={fields}
      action={dbBlogArticleAction}
    />
  );
}
