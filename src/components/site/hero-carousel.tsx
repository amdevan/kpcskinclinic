"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShieldCheck, Award, Users } from "lucide-react";
import { HERO_SLIDES, type HeroSlide } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";

const AUTOPLAY_MS = 7000;

export function HeroCarousel({ slides }: { slides?: HeroSlide[] } = {}) {
  const list = slides && slides.length > 0 ? slides : HERO_SLIDES;
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const { setOpen } = useBookAppointment();

  const next = React.useCallback(() => {
    setActive((p) => (p + 1) % list.length);
  }, [list.length]);
  const prev = React.useCallback(() => {
    setActive((p) => (p - 1 + list.length) % list.length);
  }, [list.length]);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = list[active];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Full-bleed background image with crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
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
        {/* Overlays — heavier on left where text lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/30" />
      </div>

      {/* Content — full-width with generous padding */}
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-24 lg:py-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl text-cream"
          >
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-cyan/50 bg-ink/30 backdrop-blur px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold leading-[1.04] tracking-[-0.02em]">
              {slide.title}{" "}
              <span className="font-italic-accent text-gold">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-cream/80 text-base sm:text-lg lg:text-xl leading-relaxed">
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
                variant="outline"
                asChild
                className="border-cream/30 text-cream hover:bg-cream hover:text-ink bg-ink/20 backdrop-blur"
              >
                <a href="#popular">{slide.secondaryCta}</a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-cream/75 text-sm">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan" />
                5+ years experience
              </span>
              <span className="inline-flex items-center gap-2">
                <Award className="h-4 w-4 text-gold" />
                Board-certified doctors
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-green" />
                5k+ happy patients
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls — bottom right */}
      <div className="absolute bottom-7 right-6 sm:right-10 lg:right-16 z-10 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {list.map((s, i) => (
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
        <div className="flex items-center gap-1.5">
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
    </section>
  );
}
