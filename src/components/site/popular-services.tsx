"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { POPULAR_SERVICES } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";
import { cn } from "@/lib/utils";

// Re-export for backwards-compatible imports across other sections.
export { SectionHeader } from "./section-header";

export function PopularServices() {
  const { setPrefillService, setOpen } = useBookAppointment();
  return (
    <section id="popular" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Editorial header — left aligned, mixed sizes */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="section-index text-[11px] text-brand mb-3">
              02 — Popular this season
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.1] tracking-[-0.02em] text-ink">
              The treatments our patients{" "}
              <span className="font-italic-accent text-brand">
                keep coming back for.
              </span>
            </h2>
          </div>
          <Button
            asChild
            variant="link"
            className="text-brand hover:text-ink p-0 h-auto text-sm font-medium"
          >
            <Link href="#services">
              Browse all 28 services
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Bento grid — 4 cards, varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {/* Card 1 — large, spans 2 cols on md, taller */}
          <BentoCard
            service={POPULAR_SERVICES[0]}
            className="md:col-span-3 md:row-span-2 min-h-[420px] md:min-h-0"
            priority
          />
          {/* Card 2 — smaller, top right */}
          <BentoCard
            service={POPULAR_SERVICES[1]}
            className="md:col-span-3 min-h-[200px]"
          />
          {/* Card 3 — smaller */}
          <BentoCard
            service={POPULAR_SERVICES[2]}
            className="md:col-span-3 min-h-[200px]"
          />
        </div>

        {/* Hair loss — featured as a wide editorial row, not a 4th card */}
        <div className="mt-5 grid md:grid-cols-12 gap-5 items-stretch">
          <div className="md:col-span-5 relative overflow-hidden rounded-2xl bg-cream border border-border min-h-[220px]">
            { }
            <img
              src={POPULAR_SERVICES[3].image}
              alt={POPULAR_SERVICES[3].title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-between bg-paper border border-border rounded-2xl p-6 sm:p-8">
            <div>
              <p className="section-index text-[11px] text-clay mb-2">Featured</p>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-ink leading-tight">
                {POPULAR_SERVICES[3].title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-ink/70 leading-relaxed font-serif-body">
                {POPULAR_SERVICES[3].description} Diagnosis-first — we figure out
                <em> why</em> you're losing hair before we sell you a solution.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <button
                onClick={() => {
                  setPrefillService(POPULAR_SERVICES[3].title);
                  setOpen(true);
                }}
                className="link-underline text-sm font-medium text-brand"
              >
                Book a consultation
              </button>
              <Link
                href="#services"
                className="text-sm text-ink/60 hover:text-brand transition-colors"
              >
                See what's included →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  service,
  className,
  priority = false,
}: {
  service: (typeof POPULAR_SERVICES)[number];
  className?: string;
  priority?: boolean;
}) {
  const { setPrefillService, setOpen } = useBookAppointment();
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card card-lift",
        className
      )}
    >
      { }
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          priority
            ? "from-ink/95 via-ink/55 to-ink/10"
            : "from-ink/90 via-ink/45 to-ink/10"
        )}
      />
      <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 text-cream">
        <h3
          className={cn(
            "font-display font-normal leading-tight",
            priority
              ? "text-2xl sm:text-3xl"
              : "text-xl sm:text-2xl"
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-cream/80 leading-relaxed font-serif-body",
            priority ? "text-sm sm:text-base max-w-md" : "text-sm max-w-xs"
          )}
        >
          {service.description}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => {
              setPrefillService(service.title);
              setOpen(true);
            }}
            className="link-underline text-xs font-medium text-gold"
          >
            Book
          </button>
          <Link
            href="#services"
            className="text-xs text-cream/60 hover:text-cream transition-colors inline-flex items-center gap-0.5"
          >
            Learn more <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
