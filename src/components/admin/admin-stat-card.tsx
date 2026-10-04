import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type ColorKey = "brand" | "cyan" | "green" | "gold" | "rust" | "ink";

const colorMap: Record<ColorKey, string> = {
  brand: "bg-brand/10 text-brand",
  cyan: "bg-cyan/10 text-cyan",
  green: "bg-green/10 text-green",
  gold: "bg-gold/10 text-gold",
  rust: "bg-rust/10 text-rust",
  ink: "bg-ink/10 text-ink",
};

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  color = "brand",
  hint,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: ColorKey;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold tabular-nums text-foreground">
            {value}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
        <span
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-lg",
            colorMap[color],
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}
