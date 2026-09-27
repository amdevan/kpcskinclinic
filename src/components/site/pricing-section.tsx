"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRICING } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";
import { SectionHeader } from "./section-header";

export function PricingSection() {
  const { setPrefillService, setOpen } = useBookAppointment();
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          variant="lead"
          index="07"
          eyebrow="Pricing"
          title={
            <>
              Honest starting prices.{" "}
              <span className="font-italic-accent text-brand">
                No hidden charges.
              </span>
            </>
          }
          description="These are starting prices — what most patients pay for a straightforward first session. Final pricing depends on the area treated, the number of sessions, and your specific case. We confirm every quote in writing before any procedure."
          align="left"
        />

        {/* Editorial pricing list — rows, not cards */}
        <div className="mt-10 max-w-4xl">
          <div className="border-t border-border">
            {PRICING.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="group grid grid-cols-12 gap-3 sm:gap-6 items-baseline py-6 sm:py-7 border-b border-border hover:bg-paper/60 transition-colors px-1 sm:px-3 -mx-1 sm:-mx-3 rounded-md"
              >
                <div className="col-span-12 sm:col-span-5">
                  <p className="section-index text-[11px] text-clay mb-1">
                    {p.note}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-ink leading-tight">
                    {p.name}
                  </h3>
                </div>
                <div className="col-span-7 sm:col-span-4">
                  <ul className="space-y-1">
                    {p.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="text-xs text-ink/65 leading-snug"
                      >
                        — {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-5 sm:col-span-3 text-right flex flex-col items-end">
                  <p className="font-display text-xl sm:text-2xl font-medium text-ink tabular-nums">
                    {p.price}
                  </p>
                  <p className="text-[11px] text-ink/50 mb-2">/{p.unit}</p>
                  <button
                    onClick={() => {
                      setPrefillService(p.name);
                      setOpen(true);
                    }}
                    className="text-[11px] font-medium text-brand hover:text-ink transition-colors link-underline"
                  >
                    Book →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-ink/45 max-w-2xl">
          All procedures include the pre-treatment consultation and
          post-treatment care guidance. For treatments above NPR 50,000 we
          offer 3- and 6-month EMI plans through our partner banks — ask at
          the front desk.
        </p>
      </div>
    </section>
  );
}
