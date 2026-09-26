"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { POPULAR_SERVICES } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";

export function PopularServices() {
  const { setPrefillService, setOpen } = useBookAppointment();
  return (
    <section
      id="popular"
      className="relative py-16 sm:py-20 bg-brand text-cream overflow-hidden"
    >
      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full border border-cream/20" />
        <div className="absolute right-10 bottom-0 h-80 w-80 rounded-full border border-cream/15" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Popular Services
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-[-0.02em]">
              Advanced Solutions for{" "}
              <span className="font-italic-accent text-gold font-medium">
                Healthy, Glowing Skin &amp; Hair
              </span>
            </h2>
          </div>
          <Button
            asChild
            className="bg-gold hover:bg-gold/90 text-ink rounded-full font-semibold shrink-0"
          >
            <Link href="#services">
              Explore All Services
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* 4-card grid — clean photos, text below */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {POPULAR_SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group card-lift"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-cream/10">
                { }
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-cream/95 backdrop-blur text-brand shadow-sm group-hover:bg-gold group-hover:text-ink transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-cream/70 leading-relaxed line-clamp-2">
                  {s.description}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <Link
                    href="#services"
                    className="text-xs font-medium text-gold hover:text-cream inline-flex items-center gap-1"
                  >
                    Learn More
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                  <button
                    onClick={() => {
                      setPrefillService(s.title);
                      setOpen(true);
                    }}
                    className="text-[11px] text-cream/55 hover:text-gold transition-colors"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Re-export for backwards-compatible imports.
export { SectionHeader } from "./section-header";
