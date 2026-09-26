"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { PRICING } from "@/lib/site-data";
import { SectionHeader } from "./popular-services";
import { useBookAppointment } from "./book-appointment-context";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const { setPrefillService, setOpen } = useBookAppointment();
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Transparent <span className="text-brand">starting prices</span> for
              every treatment
            </>
          }
          description="Indicative starting prices to help you plan. Final pricing is confirmed after a free consultation, based on your unique needs and treatment plan."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                "relative rounded-3xl border p-6 sm:p-7 flex flex-col",
                p.popular
                  ? "border-brand bg-ink text-cream shadow-xl scale-[1.02]"
                  : "border-border bg-card shadow-sm"
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
                  <Crown className="h-3 w-3" /> Most booked
                </span>
              )}
              <p
                className={cn(
                  "text-[11px] uppercase tracking-[0.22em] font-semibold",
                  p.popular ? "text-gold" : "text-brand"
                )}
              >
                {p.note}
              </p>
              <h3
                className={cn(
                  "font-display text-2xl font-bold mt-1",
                  p.popular ? "text-cream" : "text-ink"
                )}
              >
                {p.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span
                  className={cn(
                    "font-display text-3xl sm:text-4xl font-bold",
                    p.popular ? "text-cream" : "text-ink"
                  )}
                >
                  {p.price}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    p.popular ? "text-cream/60" : "text-muted-foreground"
                  )}
                >
                  /{p.unit}
                </span>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-2 text-sm",
                      p.popular ? "text-cream/85" : "text-ink/80"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        p.popular ? "text-gold" : "text-brand"
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  setPrefillService(p.name);
                  setOpen(true);
                }}
                className={cn(
                  "mt-6 w-full",
                  p.popular
                    ? "bg-brand hover:bg-brand/90 text-brand-foreground"
                    : "bg-ink hover:bg-ink/90 text-cream"
                )}
              >
                Book now
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          All procedures include pre-treatment consultation and post-treatment
          care guidance. EMI options available for treatments above NPR 50,000.
        </p>
      </div>
    </section>
  );
}
