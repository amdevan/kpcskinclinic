"use client";

import { PackageBookButton } from "./package-book-button";
import { Check } from "lucide-react";
import type { PackageCard as PackageCardType } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<string, { text: string; bg: string; soft: string; border: string }> = {
  brand: { text: "text-brand", bg: "bg-brand", soft: "bg-brand/5", border: "border-brand/30" },
  cyan: { text: "text-cyan", bg: "bg-cyan", soft: "bg-cyan/5", border: "border-cyan/30" },
  green: { text: "text-green", bg: "bg-green", soft: "bg-green/5", border: "border-green/30" },
  gold: { text: "text-gold", bg: "bg-gold", soft: "bg-gold/5", border: "border-gold/30" },
  rust: { text: "text-rust", bg: "bg-rust", soft: "bg-rust/5", border: "border-rust/30" },
};

export function PackageCard({ p }: { p: PackageCardType }) {
  const s = COLOR_STYLES[p.color] || COLOR_STYLES.brand;
  return (
    <div className={cn("relative rounded-3xl border-2 bg-card p-6 sm:p-7 card-lift", p.popular ? cn(s.border, s.soft) : "border-border")}>
      {p.popular && <span className={cn("absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream", s.bg)}>Most booked</span>}
      <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-secondary mb-5">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
        <div className={cn("absolute top-0 left-0 right-0 h-1.5", s.bg)} />
      </div>
      <p className={cn("text-[11px] font-semibold uppercase tracking-wider mb-1", s.text)}>{p.note}</p>
      <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className={cn("font-display text-3xl font-bold", s.text)}>{p.price}</span>
        <span className="text-xs text-muted-foreground">/{p.unit}</span>
      </div>
      <ul className="mt-5 space-y-2">
        {p.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-ink/80"><Check className={cn("h-4 w-4 mt-0.5 shrink-0", s.text)} />{f}</li>)}
      </ul>
      <div className="mt-6"><PackageBookButton packageName={p.name} className={cn("w-full text-cream hover:opacity-90", s.bg)} /></div>
    </div>
  );
}
