import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
  logoUrl,
  clinicName,
  clinicTagline,
}: {
  className?: string;
  variant?: "default" | "light";
  logoUrl?: string;
  clinicName?: string;
  clinicTagline?: string;
}) {
  const src = logoUrl || "/kpc-logo.png";
  const name = clinicName || "KPC";
  const tagline = clinicTagline || "Skin · Hair · Aesthetic";
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group", className)}
      aria-label={`${name} home`}
    >
      <span className="relative inline-flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-xl bg-cream shadow-sm overflow-hidden ring-1 ring-brand/15">
        <Image
          src={src}
          alt={`${name} logo`}
          fill
          className="object-cover"
          sizes="44px"
          priority
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-lg lg:text-xl font-bold tracking-tight",
            variant === "light" ? "text-cream" : "text-ink"
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "text-[10px] lg:text-[11px] uppercase tracking-[0.16em] font-medium -mt-0.5",
            variant === "light" ? "text-cream/70" : "text-brand"
          )}
        >
          {tagline}
        </span>
      </span>
    </Link>
  );
}
