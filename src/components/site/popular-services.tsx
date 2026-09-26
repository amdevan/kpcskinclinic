"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { POPULAR_SERVICES } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";

export function PopularServices() {
  const { setPrefillService, setOpen } = useBookAppointment();
  return (
    <section id="popular" className="py-16 sm:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Popular Services"
          title={
            <>
              Advanced Solutions for{" "}
              <span className="text-brand">Healthy, Glowing Skin & Hair</span>
            </>
          }
          action={
            <Button asChild variant="outline" className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground">
              <Link href="#services">
                Explore All Services
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-lift group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                { }
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${s.accent} opacity-20 group-hover:opacity-30 transition-opacity`}
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 backdrop-blur text-brand shadow-sm group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {s.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href="#services"
                    className="text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => {
                      setPrefillService(s.title);
                      setOpen(true);
                    }}
                    className="text-xs font-medium text-ink/60 hover:text-brand transition-colors"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center text-center gap-3 max-w-3xl mx-auto"
          : "flex flex-col gap-3 max-w-3xl"
      }
    >
      <div
        className={
          align === "center"
            ? "flex items-center gap-3 w-full justify-center"
            : "flex items-center gap-3"
        }
      >
        <span className="h-px w-8 bg-brand" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-brand" />
      </div>
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? "text-cream/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
