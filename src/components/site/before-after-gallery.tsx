"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { BEFORE_AFTER_GALLERY } from "@/lib/site-data";

export function BeforeAfterGallery() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
      {BEFORE_AFTER_GALLERY.map((c, i) => (
        <motion.article
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
          className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary card-lift cursor-pointer"
        >
          { }
          <img
            src={c.image}
            alt={`${c.treatment} — ${c.patient}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          {/* Before/After badge */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-cream/95 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
            Before / After
          </span>
          {/* Play icon */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-cream/15 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="h-8 w-8 text-cream" />
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-cream">
            <p className="font-display text-base font-semibold">
              {c.treatment}
            </p>
            <p className="text-[11px] text-cream/75 mt-0.5">{c.patient}</p>
            <p className="text-[10px] text-cream/55 mt-0.5">
              {c.sessions}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
