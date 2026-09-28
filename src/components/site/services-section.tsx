"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site-data";
import { SectionHeader } from "./section-header";
import { useBookAppointment } from "./book-appointment-context";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [active, setActive] = React.useState(SERVICE_CATEGORIES[0].id);
  const cat = SERVICE_CATEGORIES.find((c) => c.id === active)!;
  const { setPrefillService, setOpen } = useBookAppointment();

  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          variant="lead"
          index="04"
          eyebrow="Our services"
          title={
            <>
              Twenty-eight treatments.{" "}
              <span className="font-italic-accent text-brand">
                Six doctors who do them.
              </span>
            </>
          }
          description="Pick a category to see what's on the menu. Every procedure is performed in-house at our Thapathali clinic — no outsourcing, no contractor doctors."
          align="left"
        />

        {/* Category tabs — quieter, underline-style */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-1">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "relative pb-2 text-sm transition-colors -mb-px",
                active === c.id
                  ? "text-ink"
                  : "text-ink/55 hover:text-ink"
              )}
            >
              {c.title}
              {active === c.id && (
                <motion.span
                  layoutId="services-tab-underline"
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand"
                />
              )}
            </button>
          ))}
        </div>

        {/* Active category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* Feature card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl bg-ink">
                <div className="aspect-[4/3] relative">
                  { }
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-cream">
                    <p className="font-italic-accent text-sm text-gold mb-1">
                      {cat.tagline}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-normal">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 sm:p-7 text-cream/75 text-sm leading-relaxed">
                  {cat.description}
                </div>
              </div>
            </div>

            {/* Services list */}
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border">
                {cat.services.map((s, i) => (
                  <li
                    key={s.title}
                    className="py-4 flex items-start gap-4 group"
                  >
                    <span className="section-index mt-0.5 shrink-0 text-[11px] text-clay w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink">{s.title}</p>
                      <p className="text-sm text-ink/55 mt-0.5">
                        {s.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPrefillService(s.title);
                        setOpen(true);
                      }}
                      className="text-[11px] font-medium text-brand hover:text-ink transition-colors link-underline whitespace-nowrap opacity-70 group-hover:opacity-100"
                    >
                      Book
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5">
                <p className="text-sm text-ink/55">
                  Not sure which is right for you? Book a 30-min consultation
                  and we&apos;ll figure it out together.
                </p>
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-brand hover:bg-brand/90 text-brand-foreground shrink-0"
                >
                  Book appointment
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>

              {/* Other categories — inline list, not card grid */}
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-[11px] text-ink/45 mb-2 section-index">
                  Or jump to:
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {SERVICE_CATEGORIES.filter((c) => c.id !== active).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActive(c.id)}
                      className="text-sm text-ink/65 hover:text-brand transition-colors link-underline"
                    >
                      {c.title}
                      <span className="text-ink/35 text-xs ml-1">
                        ({c.services.length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
