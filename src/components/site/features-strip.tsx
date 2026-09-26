"use client";

import { motion } from "framer-motion";
import { Stethoscope, Microscope, HeartHandshake, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Experienced specialists",
    description:
      "Board-certified dermatologists and plastic surgeons with nearly 10 years of clinical experience.",
  },
  {
    icon: Microscope,
    title: "Advanced technology",
    description:
      "State-of-the-art medical equipment and clinically proven procedures for safe, lasting results.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized care",
    description:
      "Every treatment plan is built around your unique skin, hair, lifestyle and goals — never one-size-fits-all.",
  },
  {
    icon: ShieldCheck,
    title: "Safety first",
    description:
      "Sterile environment, transparent counseling, and honest guidance — only the treatments you actually need.",
  },
];

export function FeaturesStrip() {
  return (
    <section className="py-12 sm:py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-start gap-3"
            >
              <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
