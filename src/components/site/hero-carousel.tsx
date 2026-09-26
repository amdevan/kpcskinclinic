"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShieldCheck, Award, Users } from "lucide-react";
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
      className="relative w-full overflow-hidden bg-gradient-to-b from-cream via-cream to-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative soft green blob behind the image — matches sample's organic shape */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 hidden lg:block">
        <svg
          viewBox="0 0 600 700"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroBlob" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.06 160)" />
              <stop offset="100%" stopColor="oklch(0.78 0.08 150)" />
            </linearGradient>
          </defs>
          <path
            d="M540,40 C420,20 320,80 250,180 C180,280 90,320 60,420 C30,520 80,640 200,670 C320,700 440,660 500,560 C560,460 620,360 600,240 C580,120 580,80 540,40 Z"
            fill="url(#heroBlob)"
            opacity="0.55"
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT — image inside the organic green shape */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Soft green organic background */}
              <div className="absolute inset-0 bg-brand/15 rounded-[42%_58%_42%_58%/52%_48%_52%_48%]" />
              <div className="absolute inset-2 bg-brand/10 rounded-[58%_42%_58%_42%/48%_52%_48%_52%]" />
              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative rounded-[42%_58%_42%_58%/52%_48%_52%_48%] overflow-hidden aspect-[4/5] shadow-xl"
                >
                  { }
                  <img
                    src={slide.image}
                    alt={slide.eyebrow}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating stat badge */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-card border border-border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-brand/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-ink leading-none">
                    15k+
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Happy patients
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — text */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-brand/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {slide.eyebrow}
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
                  {slide.title}{" "}
                  <span className="font-italic-accent text-brand font-medium">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="mt-5 max-w-lg mx-auto lg:mx-0 text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {slide.description}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
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
                    className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground"
                  >
                    <a href="#services">{slide.secondaryCta}</a>
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-brand" />
                    10+ years experience
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-brand" />
                    Certified doctors
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide controls */}
            <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={
                      i === active
                        ? "h-2 w-8 rounded-full bg-brand transition-all"
                        : "h-2 w-2 rounded-full bg-ink/20 hover:bg-ink/40 transition-all"
                    }
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="h-8 w-8 rounded-full border border-border text-ink/70 hover:border-brand hover:text-brand transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="h-8 w-8 rounded-full border border-border text-ink/70 hover:border-brand hover:text-brand transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
