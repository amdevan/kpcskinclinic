"use client";

import { motion } from "framer-motion";
import { Stethoscope, Microscope, HeartHandshake, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Specialists, not generalists",
    description:
      "Each treatment is led by a board-certified dermatologist or plastic surgeon — not a technician, not a junior, not a salesperson.",
    color: "text-brand",
    bg: "bg-brand/10",
  },
  {
    icon: Microscope,
    title: "Equipment we'd use on ourselves",
    description:
      "We invest in the same FDA-cleared devices top clinics in Delhi and Bangkok use. No grey-market imports, no shortcuts.",
    color: "text-cyan",
    bg: "bg-cyan/10",
  },
  {
    icon: HeartHandshake,
    title: "Honest about outcomes",
    description:
      "If a treatment won't help you, we say so. We've turned away patients — and they've come back for the right thing later.",
    color: "text-green",
    bg: "bg-green/10",
  },
  {
    icon: ShieldCheck,
    title: "Sterile, every time",
    description:
      "Single-use disposables where it matters, autoclaved instruments otherwise, and a theatre you can walk through any day.",
    color: "text-rust",
    bg: "bg-rust/10",
  },
];

export function FeaturesStrip() {
  return (
    <section className="py-14 sm:py-20 bg-paper border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <p className="section-index text-[11px] text-brand mb-3">
            01 — Why people choose us
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink leading-snug">
            We started KPC because we were tired of{" "}
            <span className="font-italic-accent text-brand">
              clinics that treated patients like transactions.
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start gap-3"
            >
              <div className="flex items-baseline gap-3 w-full">
                <span className="section-index text-[11px] text-clay">
                  0{i + 1}
                </span>
                <div className={`h-10 w-10 rounded-xl ${f.bg} flex items-center justify-center`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold text-ink leading-snug">
                {f.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
