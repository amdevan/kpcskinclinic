"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function dbBlogArticleAction(
  id: string,
  action: "create" | "update" | "delete" | "toggle-publish",
  data?: Record<string, any>,
) {
  try {
    if (action === "create") {
      const slug = String(data?.slug || "").trim();
      const title = String(data?.title || "").trim();
      if (!slug || !title) return { ok: false, error: "Slug and title are required" };
      await db.blogArticle.create({
        data: {
          slug,
          title,
          excerpt: String(data?.excerpt ?? ""),
          body: String(data?.body ?? ""),
          date: String(data?.date ?? ""),
          author: String(data?.author ?? ""),
          category: String(data?.category ?? ""),
          image: String(data?.image ?? ""),
          readTime: String(data?.readTime ?? ""),
          published: parseBool(data?.published, true),
        },
      });
      revalidatePath("/admin/blog");
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      return { ok: true };
    }

    if (action === "update") {
      await db.blogArticle.update({
        where: { id },
        data: {
          ...(data?.slug !== undefined ? { slug: String(data.slug) } : {}),
          ...(data?.title !== undefined ? { title: String(data.title) } : {}),
          ...(data?.excerpt !== undefined ? { excerpt: String(data.excerpt) } : {}),
          ...(data?.body !== undefined ? { body: String(data.body) } : {}),
          ...(data?.date !== undefined ? { date: String(data.date) } : {}),
          ...(data?.author !== undefined ? { author: String(data.author) } : {}),
          ...(data?.category !== undefined ? { category: String(data.category) } : {}),
          ...(data?.image !== undefined ? { image: String(data.image) } : {}),
          ...(data?.readTime !== undefined ? { readTime: String(data.readTime) } : {}),
          ...(data?.published !== undefined ? { published: parseBool(data.published, true) } : {}),
        },
      });
      revalidatePath("/admin/blog");
      revalidatePath("/blog");
      return { ok: true };
    }

    if (action === "toggle-publish") {
      const existing = await db.blogArticle.findUnique({ where: { id } });
      if (!existing) return { ok: false, error: "Not found" };
      await db.blogArticle.update({
        where: { id },
        data: { published: !existing.published },
      });
      revalidatePath("/admin/blog");
      revalidatePath("/blog");
      return { ok: true };
    }

    if (action === "delete") {
      await db.blogArticle.delete({ where: { id } });
      revalidatePath("/admin/blog");
      revalidatePath("/blog");
      return { ok: true };
    }

    return { ok: false, error: "Unknown action" };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Action failed" };
  }
}

function parseBool(v: any, fallback: boolean): boolean {
  if (v === true || v === "true") return true;
  if (v === false || v === "false") return false;
  return fallback;
}
