"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useBookAppointment } from "./book-appointment-context";

export function AboutSection() {
  const { setOpen } = useBookAppointment();

  return (
    <section id="about" className="py-20 sm:py-28 bg-background">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              Welcome to KPC
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              The country&apos;s leading skin clinic, with{" "}
              <span className="font-italic-accent text-brand font-medium">
                unique treatment procedures.
              </span>
            </h2>

            <div className="mt-5 space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                At{" "}
                <strong className="text-ink">
                  KPC Skin Hair &amp; Aesthetic Clinic Pvt. Ltd
                </strong>
                , we are dedicated to delivering the highest quality treatments
                for all skin and hair concerns. By combining the expertise of
                experienced dermatologists, advanced technologies, and
                personalized care, we ensure that every patient receives safe,
                effective, and lasting results.
              </p>
              <p>
                With nearly <strong className="text-ink">10 years of experience</strong>{" "}
                in the field, we are one of Nepal&apos;s leading skin and hair
                clinics, trusted for our accurate diagnosis, expert counseling,
                and innovative treatments. Our clinic prides itself on using
                state-of-the-art medical equipment and clinically proven
                procedures, giving you confidence in every step of your skincare
                or haircare journey.
              </p>
              <p>
                Whether it&apos;s laser hair removal, hair transplants, acne
                &amp; acne scar treatments, cosmetic procedures, or professional
                product recommendations, our team is committed to delivering
                results that enhance your natural beauty while keeping your
                health and comfort as a priority.
              </p>
            </div>

            {/* Checklist */}
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
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

            <div className="mt-7 flex flex-wrap items-center gap-4">
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
          </motion.div>

          {/* RIGHT — team photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl bg-cream aspect-[4/3] shadow-lg">
              { }
              <img
                src="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
                alt="KPC Skin Hair & Aesthetic Clinic team and interior"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              {/* Logo overlay center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-2xl bg-cream/95 backdrop-blur shadow-lg flex items-center justify-center">
                  <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
                    <path
                      d="M32 14c-7 0-12 5-12 12 0 6 4 9 6 14 1 3 2 6 6 6s5-3 6-6c2-5 6-8 6-14 0-7-5-12-12-12z"
                      fill="#1f5a4a"
                    />
                    <circle cx="32" cy="26" r="4" fill="#c9a063" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating experience badge */}
            <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-card border border-border rounded-2xl shadow-lg px-5 py-3.5 flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-brand/10 flex items-center justify-center font-display text-brand text-lg font-bold">
                10+
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Years of trust</p>
                <p className="text-[11px] text-muted-foreground">
                  Nepal&apos;s leading clinic
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

