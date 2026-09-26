"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { SectionHeader } from "./popular-services";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [page, setPage] = React.useState(0);
  const perPage = 3;
  const pages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="stories" className="py-16 sm:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Success Stories"
          title={
            <>
              Hear From Our <span className="text-brand">Satisfied Clients</span>
            </>
          }
          description="Discover why so many people trust our clinic to boost their confidence and well-being."
          action={
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground">
                <a href="#stories">
                  <PlayCircle className="mr-1.5 h-4 w-4" />
                  Watch Stories
                </a>
              </Button>
              <Button asChild variant="outline" className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground">
                <a href="#stories">Read Success Stories</a>
              </Button>
            </div>
          }
        />

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <motion.article
              key={t.name + t.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-lift relative bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-brand/15" />
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/85 flex-1 line-clamp-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-secondary shrink-0">
                  { }
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <span className="ml-auto text-[11px] font-medium text-brand bg-brand/10 rounded-full px-2 py-0.5 whitespace-nowrap">
                  {t.service}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination dots */}
        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => (p - 1 + pages) % pages)}
              aria-label="Previous testimonials"
              className="h-8 w-8 border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === page
                      ? "w-6 bg-brand"
                      : "w-2 bg-ink/20 hover:bg-ink/40"
                  )}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => (p + 1) % pages)}
              aria-label="Next testimonials"
              className="h-8 w-8 border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
