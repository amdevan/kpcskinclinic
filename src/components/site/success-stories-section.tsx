"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const STORY_CARDS = [
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    label: "Hair Transplant",
    patient: "Megha N.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
    label: "Acne & Scars",
    patient: "Sneha S.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg",
    label: "Laser Hair Removal",
    patient: "Manju D.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg",
    label: "Hydra Facial",
    patient: "Priya K.",
  },
];

export function SuccessStoriesSection() {
  return (
    <section id="stories" className="py-20 sm:py-28 bg-background">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* 4 before/after style cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14">
          {STORY_CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary card-lift"
            >
              { }
              <img
                src={c.image}
                alt={`${c.label} — ${c.patient}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              {/* Before/After label */}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-cream/95 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                Before / After
              </span>
              {/* Play icon */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-cream/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="h-7 w-7 text-cream" />
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-cream">
                <p className="font-display text-sm font-semibold">{c.label}</p>
                <p className="text-[11px] text-cream/70">{c.patient}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centered intro text */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Watch Stories | Success Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            Hear From Our{" "}
            <span className="font-italic-accent text-brand font-medium">
              Satisfied Clients
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Discover why so many people trust our clinic to boost their
            confidence and well-being.
          </p>
          <div className="mt-7">
            <Button
              asChild
              className="bg-brand hover:bg-brand/90 text-brand-foreground"
            >
              <Link href="#reviews">Read Success Stories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
