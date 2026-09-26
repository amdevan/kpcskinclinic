"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";

const AUTOPLAY_MS = 7000;

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
      className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images with crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
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
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
      </div>

      {/* Decorative gold ring */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-gold/20" />
      <div className="pointer-events-none absolute right-32 top-40 h-40 w-40 rounded-full border border-gold/10" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl text-cream"
          >
            <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-gold/40 bg-ink/30 backdrop-blur px-3 py-1.5">
              <Star className="h-3.5 w-3.5 text-gold fill-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                {slide.eyebrow}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              {slide.title}{" "}
              <span className="text-gradient-gold">{slide.highlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-cream/80 text-base sm:text-lg leading-relaxed">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="bg-brand hover:bg-brand/90 text-brand-foreground"
              >
                {slide.primaryCta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
              >
                <a href="#services">{slide.secondaryCta}</a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-cream/70 text-sm">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" />
                10+ years experience
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" />
                Board-certified doctors
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" />
                Clinically proven procedures
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-7 left-0 right-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={
                  i === active
                    ? "h-2.5 w-8 rounded-full bg-gold transition-all"
                    : "h-2.5 w-2.5 rounded-full bg-cream/40 hover:bg-cream/70 transition-all"
                }
              />
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="h-10 w-10 rounded-full border border-cream/30 text-cream hover:bg-cream hover:text-ink transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="h-10 w-10 rounded-full border border-cream/30 text-cream hover:bg-cream hover:text-ink transition-colors flex items-center justify-center"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
