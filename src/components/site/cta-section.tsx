"use client";

import { Button } from "@/components/ui/button";
import { useBookAppointment } from "./book-appointment-context";

export function CtaSection({
  titlePrefix = "Take the First Step to",
  highlight = "Radiant Skin & Healthy Hair",
  description = "Whether it comes to Hair transplants, laser treatments, cosmetic surgery or product recommendations, trust us to do right by you!",
  primaryCta = "Request an Appointment",
  secondaryCta = "Request a Quote",
  secondaryHref = "/contact",
  image = "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e1b6422719.jpg",
}: {
  titlePrefix?: string;
  highlight?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  image?: string;
}) {
  const { setOpen } = useBookAppointment();

  return (
    <section className="relative min-h-[60vh] flex items-center py-20 sm:py-28 overflow-hidden bg-ink">
      <div className="absolute inset-0">
        { }
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto text-center text-cream">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-gold/40 bg-ink/30 backdrop-blur px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Get Started
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em]">
            {titlePrefix}{" "}
            <span className="font-italic-accent text-gold font-medium">
              {highlight}
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-cream/80 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="bg-brand hover:bg-brand/90 text-brand-foreground"
            >
              {primaryCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-cream/30 text-cream hover:bg-cream hover:text-ink bg-ink/20 backdrop-blur"
            >
              <a href={secondaryHref}>{secondaryCta}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
