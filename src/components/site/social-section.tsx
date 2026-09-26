"use client";

import { Instagram, ArrowUpRight } from "lucide-react";
import { SOCIAL_POSTS } from "@/lib/site-data";

export function SocialSection() {
  return (
    <section id="social" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="section-index text-[11px] text-brand mb-3">
              10 — From our feed
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-normal leading-[1.1] tracking-[-0.02em] text-ink">
              We post the boring stuff and the{" "}
              <span className="font-italic-accent text-brand">
                real results.
              </span>
            </h2>
            <p className="mt-4 text-ink/65 font-serif-body text-base leading-relaxed">
              Before-and-afters, day-of procedure photos, clinic life, and
              the occasional skincare myth we debunk. No filters, no stock
              photos of smiling models.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#social"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-ink transition-colors link-underline"
            >
              <Instagram className="h-4 w-4" />
              @kpcskin
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Asymmetric image grid — varied sizes, like a real IG feed */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[160px]">
          {SOCIAL_POSTS.map((p, i) => {
            // Vary spans for an organic, magazine-style layout
            const span =
              i === 0
                ? "row-span-2 col-span-2"
                : i === 3
                ? "row-span-2"
                : i === 5
                ? "col-span-2"
                : "";
            return (
              <a
                key={i}
                href="#social"
                className={`group relative overflow-hidden rounded-xl bg-secondary ${span}`}
              >
                { }
                <img
                  src={p.image}
                  alt={p.caption}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[10px] font-medium text-gold">
                    {p.handle}
                  </p>
                  <p className="text-[11px] text-cream/90 line-clamp-2 font-serif-body">
                    {p.caption}
                  </p>
                </div>
                <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram className="h-3.5 w-3.5 text-brand" />
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] text-ink/45 font-serif-body italic">
          Tag us @kpcskin — we repost our favourite patient transformations
          every Friday.
        </p>
      </div>
    </section>
  );
}
