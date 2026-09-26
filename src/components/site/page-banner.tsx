"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function PageBanner({
  eyebrow,
  title,
  highlight,
  description,
  image,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  image: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative min-h-[46vh] flex items-end overflow-hidden bg-ink">
      { }
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24 pb-12 sm:pb-16 pt-28">
        {/* Breadcrumb */}
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[11px] text-cream/60 mb-4"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cream/85">{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-cream/30" />
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] text-cream max-w-4xl">
          {title}{" "}
          {highlight && (
            <span className="font-italic-accent text-gold font-medium">
              {highlight}
            </span>
          )}
        </h1>

        {description && (
          <p className="mt-4 text-cream/75 text-base sm:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
