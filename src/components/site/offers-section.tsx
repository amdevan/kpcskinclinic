"use client";

import { motion } from "framer-motion";
import { OFFERS } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

export function OffersSection() {
  const { setOpen } = useBookAppointment();
  const [featured, ...rest] = OFFERS;

  return (
    <section id="offers" className="py-16 sm:py-24 bg-paper">
      <div className="container mx-auto px-4">
        <SectionHeader
          variant="lead"
          index="09"
          eyebrow="This season"
          title={
            <>
              A few offers worth{" "}
              <span className="font-italic-accent text-brand">
                knowing about.
              </span>
            </>
          }
          description="We don't run sales. These are seasonal packages and new-patient bundles that genuinely save money if you were going to do the treatment anyway."
          align="left"
        />

        <div className="mt-10 grid lg:grid-cols-12 gap-5">
          {/* Featured offer — large, dark */}
          <motion.article
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-ink text-cream p-7 sm:p-10 card-lift"
          >
            <div className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-gold/10 blur-2xl" />
            <div className="relative">
              <p className="section-index text-[11px] text-gold mb-4">
                {featured.badge} · Featured
              </p>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight max-w-xl">
                {featured.title}
              </h3>
              <p className="mt-4 text-cream/75 text-sm sm:text-base leading-relaxed font-serif-body max-w-lg">
                {featured.description}
              </p>
              <button
                onClick={() => setOpen(true)}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-cream transition-colors link-underline"
              >
                {featured.cta} →
              </button>
            </div>
          </motion.article>

          {/* Smaller offers — stacked, lighter */}
          <div className="lg:col-span-5 grid gap-5">
            {rest.map((o, i) => (
              <motion.article
                key={o.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "relative rounded-2xl border border-border bg-card p-6 card-lift"
                )}
              >
                <p className="section-index text-[11px] text-brand mb-2">
                  {o.badge}
                </p>
                <h3 className="font-display text-lg font-medium text-ink leading-snug">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed font-serif-body">
                  {o.description}
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="mt-4 text-xs font-medium text-brand hover:text-ink transition-colors link-underline"
                >
                  {o.cta} →
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
