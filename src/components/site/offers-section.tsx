"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tag, ArrowRight } from "lucide-react";
import { OFFERS } from "@/lib/site-data";
import { SectionHeader } from "./popular-services";
import { useBookAppointment } from "./book-appointment-context";

export function OffersSection() {
  const { setOpen } = useBookAppointment();
  return (
    <section id="offers" className="py-16 sm:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Offers"
          title={
            <>
              Limited-time <span className="text-brand">packages & savings</span>
            </>
          }
          description="Seasonal packages and special offers across our most popular treatments. Book early — slots fill fast."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {OFFERS.map((o, i) => (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-lift relative rounded-3xl overflow-hidden border border-border bg-card shadow-sm"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand via-gold to-brand" />
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
                    <Tag className="h-3 w-3" />
                    {o.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink leading-snug">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {o.description}
                </p>
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  className="mt-5 w-full border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground"
                >
                  {o.cta}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
