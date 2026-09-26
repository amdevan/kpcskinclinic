"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Request failed");
      }
      setDone(true);
      toast.success("You're subscribed! Check your inbox to confirm.");
      setEmail("");
    } catch (err: any) {
      const msg =
        err?.message === "already_subscribed"
          ? "You're already on our list!"
          : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="newsletter" className="py-16 sm:py-20 bg-brand text-brand-foreground relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full border border-cream/20" />
        <div className="absolute right-10 bottom-0 h-80 w-80 rounded-full border border-cream/15" />
        <div className="absolute left-1/3 top-1/4 h-40 w-40 rounded-full border border-cream/10" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-cream/10 backdrop-blur px-3 py-1.5">
            <Mail className="h-3.5 w-3.5 text-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream">
              Newsletter
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-cream">
            Subscribe to our newsletter
          </h2>
          <p className="mt-3 text-cream/80 text-base sm:text-lg">
            Get the latest skincare tips, member-only offers, and clinic updates
            straight to your inbox.
          </p>

          {done ? (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-cream/10 backdrop-blur px-5 py-3 border border-cream/20">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              <span className="text-sm font-medium text-cream">
                You&apos;re subscribed — welcome to the Aavaran family!
              </span>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-cream/95 text-ink border-cream/30 focus-visible:ring-gold h-11"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-ink hover:bg-ink/90 text-cream h-11"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send
              </Button>
            </form>
          )}
          <p className="mt-3 text-xs text-cream/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
