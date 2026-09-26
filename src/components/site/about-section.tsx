"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBookAppointment } from "./book-appointment-context";
import { SectionHeader } from "./section-header";

export function AboutSection() {
  const { setOpen } = useBookAppointment();

  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Image collage — left, asymmetric */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1 lg:col-span-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl aspect-[4/5] shadow-sm">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1bc026548584.webp"
                    alt="Healthy glowing skin after treatment at KPC"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl aspect-square shadow-sm">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
                    alt="KPC Skin Hair & Aesthetic Clinic interior"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl aspect-square shadow-sm">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg"
                    alt="Facial treatment in progress at KPC"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl aspect-[4/5] shadow-sm">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg"
                    alt="Hair clinic treatment at KPC"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Photo caption — editorial, not a floating badge */}
            <p className="mt-4 text-[11px] text-ink/45 font-serif-body italic max-w-xs">
              Above: our Maharajgunj clinic, ground floor. Photographed by the
              KPC team, monsoon 2025.
            </p>
          </motion.div>

          {/* Copy — right, takes more space */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 lg:col-span-6"
          >
            <SectionHeader
              variant="lead"
              index="03"
              eyebrow="Our story"
              title={
                <>
                  We&apos;re a small clinic that takes{" "}
                  <span className="font-italic-accent text-brand">
                    a long time
                  </span>{" "}
                  with each patient.
                </>
              }
            />
            <div className="mt-6 space-y-4 text-base sm:text-[1.05rem] leading-relaxed text-ink/75 font-serif-body">
              <p className="drop-cap">
                KPC Skin Hair &amp; Aesthetic Clinic started in 2016 with two
                rooms in Maharajgunj and one dermatologist who refused to
                recommend treatments he wouldn&apos;t do on his own family.
                Nine years on, we&apos;ve grown — but that rule hasn&apos;t
                changed.
              </p>
              <p>
                We are not the biggest clinic in Kathmandu, and we don&apos;t
                want to be. What we are is deliberate: every consultation runs
                30–45 minutes, every treatment plan is written down and handed
                to you, and every procedure is performed by a doctor — not a
                technician, not a salesperson.
              </p>
            </div>

            {/* Inline editorial mention — replaces the stats grid */}
            <p className="mt-6 text-sm text-ink/55 font-serif-body italic border-l-2 border-brand/40 pl-4">
              Since 2016, we&apos;ve done over 15,000 procedures — hair
              transplants, laser, aesthetic, surgical — and we still answer
              every appointment request ourselves. No call center, no bots.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button
                onClick={() => setOpen(true)}
                className="bg-brand hover:bg-brand/90 text-brand-foreground"
              >
                Book a consultation
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <a
                href="#services"
                className="link-underline text-sm font-medium text-ink/70 hover:text-brand"
              >
                See what we treat
              </a>
            </div>

            {/* Signature line — adds a human touch */}
            <div className="mt-10 pt-6 border-t border-border flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center font-display text-brand text-sm font-semibold">
                RM
              </div>
              <div>
                <p className="font-italic-accent text-sm text-ink">
                  Dr. Rupak Maharjan
                </p>
                <p className="text-[11px] text-ink/55">
                  MBBS, MD (Dermatology) · Founder &amp; Medical Director
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  const { setOpen } = useBookAppointment();

  return (
    <section id="cta" className="relative py-20 sm:py-28 bg-ink overflow-hidden">
      {/* Quiet, single decorative element instead of multiple blurred blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl text-cream">
          <p className="section-index text-[11px] text-gold mb-4">
            06 — Take the first step
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
            Radiant skin and healthy hair start with{" "}
            <span className="font-italic-accent text-gold">
              a single conversation.
            </span>
          </h2>
          <p className="mt-5 text-cream/75 text-base sm:text-lg leading-relaxed font-serif-body">
            Whether it&apos;s a hair transplant, laser, cosmetic surgery, or
            just figuring out which moisturizer actually works for you —
            book a 30-minute consultation and we&apos;ll give you an honest
            plan, even if the answer is &ldquo;you don&apos;t need a
            procedure.&rdquo;
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="bg-brand hover:bg-brand/90 text-brand-foreground"
            >
              Request an appointment
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href="#stories">Read patient stories →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
