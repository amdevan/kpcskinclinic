"use client";

import { Instagram, Music2 } from "lucide-react";
import { SOCIAL_POSTS } from "@/lib/site-data";

export function SocialSection() {
  return (
    <section id="social" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header — Follow us @ Instagram Tiktok */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-2">
              Follow us @
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              Instagram{" "}
              <span className="text-muted-foreground/40">·</span>{" "}
              <span className="font-italic-accent text-brand font-medium">
                TikTok
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#social"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-amber-400 px-4 py-2 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Instagram className="h-4 w-4" />
              @kpcskin
            </a>
            <a
              href="#social"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-cream text-sm font-semibold hover:bg-ink/85 transition-colors"
            >
              <Music2 className="h-4 w-4" />
              TikTok
            </a>
          </div>
        </div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((p, i) => (
            <a
              key={i}
              href="#social"
              className="group relative aspect-square overflow-hidden rounded-xl bg-secondary"
            >
              { }
              <img
                src={p.image}
                alt={p.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[10px] font-semibold text-cream">
                  {p.handle}
                </p>
                <p className="text-[11px] text-cream/90 line-clamp-2">
                  {p.caption}
                </p>
              </div>
              <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="h-3.5 w-3.5 text-brand" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
