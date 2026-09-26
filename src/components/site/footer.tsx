"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { SERVICE_CATEGORIES } from "@/lib/site-data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream/85 mt-auto">
      <div className="container mx-auto px-4 pt-16 pb-10">
        {/* Top — editorial statement + contact, not a perfect 4-column grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-cream/10">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 text-cream/65 font-serif-body text-[15px] leading-relaxed max-w-md">
              KPC Skin Hair &amp; Aesthetic Clinic Pvt. Ltd. A small clinic in
              Maharajgunj that takes a long time with each patient. Founded
              2016.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href="tel:+97714000000"
                className="flex items-center gap-2.5 text-cream/75 hover:text-gold transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-gold/70" />
                +977-1-4XXXXXX
              </a>
              <a
                href="mailto:info@kpcskin.com"
                className="flex items-center gap-2.5 text-cream/75 hover:text-gold transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-gold/70" />
                info@kpcskin.com
              </a>
              <span className="flex items-start gap-2.5 text-cream/75">
                <MapPin className="h-3.5 w-3.5 text-gold/70 mt-0.5 shrink-0" />
                Maharajgunj, Kathmandu, Nepal
              </span>
              <span className="flex items-center gap-2.5 text-cream/75">
                <Clock className="h-3.5 w-3.5 text-gold/70" />
                Sun–Fri: 8 AM – 6 PM · Sat: closed
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <SocialLink href="#social" label="Instagram">
                <Instagram className="h-3.5 w-3.5" />
              </SocialLink>
              <SocialLink href="#social" label="Facebook">
                <Facebook className="h-3.5 w-3.5" />
              </SocialLink>
              <SocialLink href="#social" label="TikTok">
                <span className="text-[11px] font-bold">TT</span>
              </SocialLink>
            </div>
          </div>

          {/* Services — inline list, not a perfect 2x3 directory */}
          <div className="lg:col-span-4">
            <p className="section-index text-[11px] text-gold/80 mb-4">
              What we do
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {SERVICE_CATEGORIES.map((c) =>
                c.services.slice(0, 4).map((s) => (
                  <li key={s.title}>
                    <Link
                      href={s.href}
                      className="text-[13px] text-cream/60 hover:text-gold transition-colors"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Directory — small, quiet */}
          <div className="lg:col-span-3">
            <p className="section-index text-[11px] text-gold/80 mb-4">
              The clinic
            </p>
            <ul className="space-y-1.5">
              {[
                { label: "About us", href: "#about" },
                { label: "Pricing", href: "#pricing" },
                { label: "Patient stories", href: "#stories" },
                { label: "This season's offers", href: "#offers" },
                { label: "Gallery", href: "#about" },
                { label: "Contact", href: "tel:+97714000000" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-cream/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg bg-cream/5 border border-cream/10 p-4">
              <p className="text-xs text-cream/80 font-medium">
                Prefer to talk to a human?
              </p>
              <p className="mt-1 text-[11px] text-cream/55 leading-relaxed">
                Sunita on the front desk picks up between 8 and 6.
              </p>
              <Link
                href="tel:+97714000000"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-cream transition-colors link-underline"
              >
                Call the clinic
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom — signed-off feel, not a generic copyright row */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-cream/45">
          <p className="font-serif-body italic">
            © {year} KPC Skin Hair &amp; Aesthetic Clinic Pvt. Ltd.
            <span className="mx-2">·</span>
            Made in Kathmandu.
          </p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-gold transition-colors">
              Privacy
            </a>
            <a href="#home" className="hover:text-gold transition-colors">
              Terms
            </a>
            <a href="#home" className="hover:text-gold transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/60 hover:bg-gold hover:text-ink hover:border-gold transition-all"
    >
      {children}
    </a>
  );
}
