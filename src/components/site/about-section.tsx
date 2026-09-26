"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles, Stethoscope, Award } from "lucide-react";
import { STATS } from "@/lib/site-data";
import { useBookAppointment } from "./book-appointment-context";

export function AboutSection() {
  const { setOpen } = useBookAppointment();

  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl aspect-[4/5] shadow-md">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1bc026548584.webp"
                    alt="Healthy glowing skin after treatment at KPC"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl aspect-square shadow-md">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
                    alt="KPC Skin Hair & Aesthetic Clinic interior"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl aspect-square shadow-md">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg"
                    alt="Facial treatment in progress"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl aspect-[4/5] shadow-md">
                  { }
                  <img
                    src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg"
                    alt="Hair clinic treatment"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 left-6 sm:left-10 bg-card border border-border rounded-2xl p-4 shadow-lg flex items-center gap-3"
            >
              <div className="h-11 w-11 rounded-full bg-brand/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Nepal&apos;s leading clinic
                </p>
                <p className="text-xs text-muted-foreground">
                  Trusted for nearly 10 years
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Welcome to KPC
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-ink">
              The country&apos;s leading skin clinic, with{" "}
              <span className="text-brand">unique treatment procedures.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              At <strong className="text-ink">KPC Skin Hair & Aesthetic Clinic Pvt. Ltd</strong>,
              we are dedicated to delivering the highest quality treatments for all
              skin and hair concerns. By combining the expertise of experienced
              dermatologists, advanced technologies, and personalized care, we
              ensure that every patient receives safe, effective, and lasting
              results.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              With nearly <strong className="text-ink">10 years of experience</strong>{" "}
              in the field, we are one of Nepal&apos;s leading skin and hair
              clinics — trusted for our accurate diagnosis, expert counseling, and
              innovative treatments.
            </p>

            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Experienced dermatologists",
                "State-of-the-art equipment",
                "Clinically proven procedures",
                "Personalized care plans",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                  <span className="text-ink/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => setOpen(true)}
                className="bg-brand hover:bg-brand/90 text-brand-foreground"
              >
                Learn More
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground">
                <a href="#services">Explore our Services</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-brand">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
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
    <section id="cta" className="relative py-16 sm:py-24 bg-ink overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[140%] w-[140%] border border-gold/5 rounded-full" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-cream">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-gold/40 bg-ink/30 backdrop-blur px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Get Started
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Take the First Step to{" "}
            <span className="text-gradient-gold">
              Radiant Skin & Healthy Hair
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-cream/80 leading-relaxed">
            Whether it&apos;s hair transplants, laser treatments, cosmetic surgery
            or product recommendations — trust us to do right by you. Your journey
            starts with a single personalized consultation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="bg-brand hover:bg-brand/90 text-brand-foreground"
            >
              Request an Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-cream/30 text-cream hover:bg-cream hover:text-ink"
            >
              <a href="#stories">
                <Stethoscope className="mr-1.5 h-4 w-4" />
                Request a Quote
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
