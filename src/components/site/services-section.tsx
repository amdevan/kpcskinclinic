"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site-data";
import { SectionHeader } from "./popular-services";
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
          eyebrow="Our Services"
          title={
            <>
              A full spectrum of{" "}
              <span className="text-brand">skin & hair care</span>, under one roof
            </>
          }
          description="From hair transplants and cosmetic surgery to laser treatments and aesthetic facials — every procedure is delivered by certified specialists using clinically proven protocols."
        />

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                active === c.id
                  ? "bg-brand text-brand-foreground border-brand shadow-sm"
                  : "bg-card text-ink/70 border-border hover:border-brand/40 hover:text-brand"
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Active category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start"
          >
            {/* Feature card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lg">
                <div className="aspect-[4/3] relative">
                  { }
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-cream">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                      {cat.tagline}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 sm:p-8 text-cream/85 text-sm leading-relaxed">
                  {cat.description}
                </div>
              </div>
            </div>

            {/* Services list */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-sm">
                <ul className="divide-y divide-border">
                  {cat.services.map((s, i) => (
                    <motion.li
                      key={s.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="py-4 flex items-start gap-4 group"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-xs font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink">{s.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setPrefillService(s.title);
                            setOpen(true);
                          }}
                          className="text-xs font-medium text-brand hover:underline whitespace-nowrap"
                        >
                          Book
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">
                    Not sure which is right for you?{" "}
                    <span className="text-ink font-medium">
                      Book a free consultation.
                    </span>
                  </p>
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-brand hover:bg-brand/90 text-brand-foreground w-full sm:w-auto"
                  >
                    Book Appointment
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Other categories preview */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.filter((c) => c.id !== active).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    className="text-left rounded-xl border border-border bg-card p-3 hover:border-brand/40 hover:shadow-sm transition-all"
                  >
                    <p className="text-sm font-semibold text-ink">{c.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                      {c.services.length} service
                      {c.services.length > 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
