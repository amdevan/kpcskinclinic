"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import { Logo } from "./logo";
import { SERVICE_CATEGORIES } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/85 mt-auto">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + about */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-cream/70 max-w-sm">
              KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — Nepal&apos;s leading skin &amp; hair
              clinic. Nearly 10 years of trusted care, advanced technology, and
              personalized treatment plans for every patient.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href="tel:+97714000000"
                className="flex items-center gap-2.5 text-cream/75 hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4 text-gold" />
                +977-1-4XXXXXX
              </a>
              <a
                href="mailto:info@kpcskin.com"
                className="flex items-center gap-2.5 text-cream/75 hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4 text-gold" />
                info@kpcskin.com
              </a>
              <span className="flex items-start gap-2.5 text-cream/75">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                Maharajgunj, Kathmandu, Nepal
              </span>
              <span className="flex items-center gap-2.5 text-cream/75">
                <Clock className="h-4 w-4 text-gold" />
                Sun–Fri: 8:00 AM – 6:00 PM · Sat: Closed
              </span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="#social" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#social" label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="#social" label="TikTok">
                <span className="text-xs font-bold">TT</span>
              </SocialLink>
            </div>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-4">
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {SERVICE_CATEGORIES.map((c) => (
                <div key={c.id} className="space-y-1.5">
                  <p className="text-xs font-semibold text-cream/90">{c.title}</p>
                  {c.services.slice(0, 4).map((s) => (
                    <Link
                      key={s.title}
                      href={s.href}
                      className="block text-[13px] text-cream/65 hover:text-gold transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Directory */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-4">
              Directory
            </h3>
            <ul className="space-y-2">
              {[
                "About",
                "Pricing",
                "Contact Us",
                "Gallery",
                "Awards",
                "News & Article",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#about"
                    className="text-[13px] text-cream/65 hover:text-gold transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#stories"
                  className="text-[13px] text-cream/65 hover:text-gold transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="#offers"
                  className="text-[13px] text-cream/65 hover:text-gold transition-colors"
                >
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA mini card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-cream/5 border border-cream/10 p-5">
              <p className="text-sm font-semibold text-cream">
                Need help booking?
              </p>
              <p className="mt-1.5 text-xs text-cream/65 leading-relaxed">
                Our front desk is happy to help you choose the right treatment
                and slot.
              </p>
              <Link
                href="tel:+97714000000"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline"
              >
                <Phone className="h-3.5 w-3.5" />
                Call the clinic
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/55">
          <p>
            © {new Date().getFullYear()} KPC Skin Hair & Aesthetic Clinic. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Beta version</span>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <a href="#home" className="hover:text-gold transition-colors">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <a href="#home" className="hover:text-gold transition-colors">
              Terms
            </a>
          </p>
          <p className="text-cream/40">
            Kathmandu, Nepal
          </p>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/75 hover:bg-gold hover:text-ink hover:border-gold transition-all"
    >
      {children}
    </a>
  );
}
