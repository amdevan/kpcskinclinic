"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.18 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.82 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-sky-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Welcome to KPC
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            What Our Patients Say?
          </h2>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            Reflects trust, quality service, and the positive impact we&apos;ve
            made on their confidence and well-being.
          </p>
        </div>

        {/* Google review cards — masonry-style staggered grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name + t.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm card-lift ${
                i === 1 ? "lg:mt-6" : i === 2 ? "lg:mt-12" : ""
              }`}
            >
              {/* Google logo + rating */}
              <div className="flex items-center justify-between mb-4">
                <GoogleG className="h-5 w-5" />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <Quote className="h-6 w-6 text-brand/15 mb-2" />

              <p className="text-sm leading-relaxed text-ink/85 font-serif-body">
                {t.text}
              </p>

              {/* Attribution */}
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <div className="h-9 w-9 overflow-hidden rounded-full bg-secondary shrink-0">
                  { }
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink text-sm truncate">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{t.date}</p>
                </div>
                <span className="ml-auto text-[10px] font-medium text-brand bg-brand/10 rounded-full px-2 py-0.5 whitespace-nowrap">
                  {t.service}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all on Google */}
        <div className="mt-10 text-center">
          <a
            href="#reviews"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-ink transition-colors link-underline"
          >
            <GoogleG className="h-4 w-4" />
            View all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
