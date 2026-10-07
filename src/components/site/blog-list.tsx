"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_ARTICLES, type BlogArticle } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function BlogList({ articles }: { articles?: BlogArticle[] } = {}) {
  const list = articles && articles.length > 0 ? articles : BLOG_ARTICLES;
  const categories = ["All", ...Array.from(new Set(list.map((a) => a.category)))];
  const [active, setActive] = React.useState("All");
  const filtered = active === "All" ? list : list.filter((a) => a.category === active);

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all border", active === cat ? "bg-brand text-cream border-brand shadow-sm" : "bg-card text-ink/70 border-border hover:border-brand/40 hover:text-brand")}>{cat}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((a, i) => {
            const styles = [{ text: "text-brand", soft: "bg-brand/10" }, { text: "text-cyan", soft: "bg-cyan/10" }, { text: "text-green", soft: "bg-green/10" }, { text: "text-gold", soft: "bg-gold/10" }, { text: "text-rust", soft: "bg-rust/10" }];
            const s = styles[i % styles.length];
            return (
              <article key={a.slug} className="group bg-card rounded-2xl border border-border overflow-hidden card-lift">
                <Link href={`/blog/${a.slug}`} className="block">
                  <div className="relative overflow-hidden aspect-[16/10] bg-secondary">
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className={cn("absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider", s.soft, s.text)}>{a.category}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />{a.date}<span className="h-1 w-1 rounded-full bg-muted-foreground/40" /><Clock className="h-3 w-3" />{a.readTime}
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-brand transition-colors">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                    <p className="mt-3 text-[11px] text-muted-foreground">By {a.author}</p>
                    <p className={cn("mt-2 text-sm font-medium inline-flex items-center gap-1", s.text)}>Read article <ArrowRight className="h-3.5 w-3.5" /></p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No articles in this category yet.</p>}
      </div>
    </section>
  );
}
