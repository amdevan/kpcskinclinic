"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";

const AUTOPLAY_MS = 7500;

export function HeroCarousel() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const { setOpen } = useBookAppointment();

  const next = React.useCallback(() => {
    setActive((p) => (p + 1) % HERO_SLIDES.length);
  }, []);
  const prev = React.useCallback(() => {
    setActive((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = HERO_SLIDES[active];

  return (
    <section
      id="home"
      className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images with crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            { }
            <img
              src={slide.image}
              alt={slide.eyebrow}
              className="h-full w-full object-cover animate-kenburns"
            />
          </motion.div>
        </AnimatePresence>
        {/* Asymmetric gradient — heavier on the left where text lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      </div>

      {/* Content — left-aligned, deliberately not vertically centered */}
      <div className="relative h-full container mx-auto px-4 flex items-end pb-24 sm:pb-28 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-cream"
          >
            {/* Quiet section index, not a pill badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="section-index text-[11px] text-gold/90">
                0{active + 1} —
              </span>
              <span className="text-[11px] tracking-[0.18em] uppercase text-cream/70">
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-[2.5rem] sm:text-6xl lg:text-[4.25rem] font-normal leading-[1.04] tracking-[-0.02em]">
              {slide.title}{" "}
              <span className="font-italic-accent text-gold">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-cream/75 text-base sm:text-[1.05rem] leading-relaxed font-serif-body">
              {slide.description}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="bg-brand hover:bg-brand/90 text-brand-foreground"
              >
                {slide.primaryCta}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a href="#services">{slide.secondaryCta} →</a>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls — bottom right, quieter */}
      <div className="absolute bottom-7 right-4 sm:right-8 z-10 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? "h-[3px] w-10 rounded-full bg-gold transition-all"
                  : "h-[3px] w-5 rounded-full bg-cream/30 hover:bg-cream/60 transition-all"
              }
            />
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="h-9 w-9 rounded-full text-cream/70 hover:text-cream hover:bg-cream/10 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="h-9 w-9 rounded-full text-cream/70 hover:text-cream hover:bg-cream/10 transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
