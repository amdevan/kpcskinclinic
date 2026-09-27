"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";
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
      toast.success("You're subscribed — see you in your inbox.");
      setEmail("");
    } catch (err: any) {
      const msg =
        err?.message === "already_subscribed"
          ? "You're already on our list — thank you!"
          : "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="newsletter" className="py-16 sm:py-24 bg-paper border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="section-index text-[11px] text-brand mb-3">
            11 — The newsletter
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.15] tracking-[-0.02em] text-ink">
            Once a month, we write about{" "}
            <span className="font-italic-accent text-brand">
              what actually works.
            </span>
          </h2>
          <p className="mt-4 text-ink/65 text-base leading-relaxed max-w-lg">
            No &ldquo;10 tips for glowing skin&rdquo; listicles. Just one short
            email a month — new treatments we&apos;ve added, things
            we&apos;ve learned from patients, and the occasional offer. You
            can unsubscribe in one click.
          </p>

          {done ? (
            <div className="mt-7 inline-flex items-center gap-3 rounded-lg bg-brand/5 border border-brand/15 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              <span className="text-sm text-ink">
                You&apos;re on the list — welcome.
              </span>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-background border-border focus-visible:ring-brand h-11"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-ink hover:bg-ink/90 text-cream h-11 shrink-0"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Subscribe
              </Button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-ink/45">
            ~600 readers. We never share your email.
          </p>
        </div>
      </div>
    </section>
  );
}
