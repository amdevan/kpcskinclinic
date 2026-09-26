"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = React.useState(0);
  const t = TESTIMONIALS[active];

  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () =>
    setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="stories" className="py-16 sm:py-24 bg-paper">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left column — section intro, sticky-ish */}
          <div className="lg:col-span-4">
            <p className="section-index text-[11px] text-brand mb-3">
              08 — Patient stories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-normal leading-[1.1] tracking-[-0.02em] text-ink">
              What people{" "}
              <span className="font-italic-accent text-brand">
                actually said
              </span>{" "}
              after walking out.
            </h2>
            <p className="mt-4 text-ink/65 font-serif-body text-base leading-relaxed">
              These are real reviews from our Google and Facebook pages.
              We&apos;ve lightly trimmed length, but not the sentiment.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="h-9 w-9 rounded-full border border-border text-ink/70 hover:border-brand hover:text-brand transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="h-9 w-9 rounded-full border border-border text-ink/70 hover:border-brand hover:text-brand transition-colors flex items-center justify-center"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="section-index text-[11px] text-ink/50 ml-1">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right column — the pull quote */}
          <div className="lg:col-span-8 relative min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name + t.date}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                {/* Star rating — quiet, not in a card */}
                <div className="flex items-center gap-1 text-gold mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
                  ))}
                </div>

                {/* The quote — big serif */}
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-normal leading-[1.25] tracking-[-0.01em] text-ink">
                  <span className="text-brand/30 mr-1">&ldquo;</span>
                  {t.text}
                  <span className="text-brand/30 ml-1">&rdquo;</span>
                </blockquote>

                {/* Attribution — editorial */}
                <figcaption className="mt-8 flex items-center gap-4 pt-5 border-t border-border">
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-secondary shrink-0">
                    { }
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-ink text-sm">{t.name}</p>
                    <p className="text-[11px] text-ink/55 mt-0.5">
                      {t.service} · reviewed {t.date}
                    </p>
                  </div>
                  <a
                    href="#stories"
                    className="ml-auto hidden sm:inline-flex text-[11px] text-brand hover:text-ink transition-colors link-underline"
                  >
                    Read full review
                  </a>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Thumbnail strip — pick any testimonial */}
            <div className="mt-10 flex items-center gap-2 flex-wrap">
              {TESTIMONIALS.map((tt, i) => (
                <button
                  key={tt.name}
                  onClick={() => setActive(i)}
                  aria-label={`Show review from ${tt.name}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === active
                      ? "w-10 bg-brand"
                      : "w-5 bg-ink/15 hover:bg-ink/35"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
