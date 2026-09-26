import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <Link
      href="#home"
      className={cn("flex items-center gap-2.5 group", className)}
      aria-label="KPC Skin Hair & Aesthetic Clinic home"
    >
      <span className="relative inline-flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-brand shadow-sm overflow-hidden">
        <svg
          viewBox="0 0 64 64"
          className="h-6 w-6 lg:h-7 lg:w-7"
          aria-hidden="true"
        >
          <path
            d="M32 14c-7 0-12 5-12 12 0 6 4 9 6 14 1 3 2 6 6 6s5-3 6-6c2-5 6-8 6-14 0-7-5-12-12-12z"
            fill="#c9a063"
          />
          <circle cx="32" cy="26" r="4" fill="#1f5a4a" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-lg lg:text-xl font-bold tracking-tight",
            variant === "light" ? "text-cream" : "text-ink"
          )}
        >
          KPC
        </span>
        <span
          className={cn(
            "text-[10px] lg:text-[11px] uppercase tracking-[0.18em] font-medium -mt-0.5",
            variant === "light" ? "text-cream/70" : "text-brand"
          )}
        >
          Skin · Hair · Aesthetic
        </span>
      </span>
    </Link>
  );
}
