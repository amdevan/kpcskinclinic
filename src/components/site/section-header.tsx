"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial section header.
 * Variants:
 *  - "lead"   : numbered eyebrow + serif display headline (default)
 *  - "quiet"  : small label only
 *  - "center": centered with decorative rule
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  action,
  align = "center",
  variant = "center",
  light = false,
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  variant?: "lead" | "quiet" | "center";
  light?: boolean;
  className?: string;
}) {
  if (variant === "lead" || align === "left") {
    return (
      <div className={cn("max-w-3xl", className)}>
        {(index || eyebrow) && (
          <p
            className={cn(
              "section-index text-[11px] mb-3",
              light ? "text-gold" : "text-brand"
            )}
          >
            {index && <span>{index}</span>}
            {index && eyebrow && <span> — </span>}
            {eyebrow && <span className="uppercase tracking-[0.16em]">{eyebrow}</span>}
          </p>
        )}
        <h2
          className={cn(
            "font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.1] tracking-[-0.02em]",
            light ? "text-cream" : "text-ink"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-base sm:text-[1.05rem] leading-relaxed ",
              light ? "text-cream/75" : "text-ink/65"
            )}
          >
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }

  // centered / default
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center gap-3 max-w-3xl mx-auto",
        className
      )}
    >
      {(index || eyebrow) && (
        <p
          className={cn(
            "section-index text-[11px]",
            light ? "text-gold" : "text-brand"
          )}
        >
          {index && <span>{index}</span>}
          {index && eyebrow && <span> — </span>}
          {eyebrow && <span className="uppercase tracking-[0.16em]">{eyebrow}</span>}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.1] tracking-[-0.02em]",
          light ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed ",
            light ? "text-cream/75" : "text-ink/65"
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
