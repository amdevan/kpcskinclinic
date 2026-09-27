"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, Send, Loader2 } from "lucide-react";
import { Logo } from "./logo";
import { SERVICE_CATEGORIES } from "@/lib/site-data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="newsletter"
      className="mt-auto bg-gradient-to-b from-background to-brand/5"
    >
      {/* Newsletter strip — top of footer */}
      <div className="border-b border-border">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-12 sm:py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-2">
                Newsletter
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-ink">
                Subscribe to our newsletter
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                Subscribe to our newsletter for the latest tips, offers, and
                updates straight to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main footer — brand + links (3 columns like sample) */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand + contact */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-sm">
              KPC Skin Hair &amp; Aesthetic Clinic Pvt. Ltd — Nepal&apos;s
              leading skin &amp; hair clinic. Nearly 10 years of trusted care,
              advanced technology, and personalized treatment plans.
            </p>
            <div className="mt-5 space-y-2.5 text-sm">
              <a
                href="tel:+97714000000"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-brand transition-colors"
              >
                <Phone className="h-4 w-4 text-brand" />
                +977-1-4XXXXXX
              </a>
              <a
                href="mailto:info@kpcskin.com"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-brand transition-colors"
              >
                <Mail className="h-4 w-4 text-brand" />
                info@kpcskin.com
              </a>
              <span className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                Maharajgunj, Kathmandu, Nepal
              </span>
              <span className="flex items-center gap-2.5 text-muted-foreground">
                <Clock className="h-4 w-4 text-brand" />
                Sun–Fri: 8:00 AM – 6:00 PM · Sat: Closed
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2">
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

          {/* Our Services column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href="#popular"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory column */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand mb-4">
              Directory
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                "About",
                "Pricing",
                "Contact Us",
                "Gallery",
                "Awards",
                "News & Article",
                "Success Stories",
                "Offers",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#about"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar — green bottom banner like sample */}
      <div className="bg-brand text-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-cream/90">
            © {year} KPC Skin Hair &amp; Aesthetic Clinic. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-cream/80">
            <a href="#home" className="hover:text-gold transition-colors">
              Privacy
            </a>
            <span className="h-1 w-1 rounded-full bg-cream/40" />
            <a href="#home" className="hover:text-gold transition-colors">
              Terms
            </a>
          </p>
          <p className="text-cream/60">Powered by: Rewa Soft</p>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-brand hover:text-brand-foreground hover:border-brand transition-all"
    >
      {children}
    </a>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("You're subscribed — thank you!");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md lg:ml-auto w-full"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="bg-background border-border focus-visible:ring-brand h-11"
        aria-label="Email address"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-brand hover:bg-brand/90 text-brand-foreground h-11 shrink-0"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Send
            <Send className="ml-1.5 h-3.5 w-3.5" />
          </>
        )}
      </Button>
    </form>
  );
}
