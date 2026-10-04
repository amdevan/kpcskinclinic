"use client";

import { Bell, Search } from "lucide-react";

export function AdminTopbar({ userName }: { userName?: string | null }) {
  const name = userName || "Admin";
  const initial = (name || "A").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-card px-4 lg:pl-6 lg:pr-6">
      {/* Mobile brand */}
      <div className="flex items-center gap-2 lg:hidden">
        <span className="font-display text-base font-bold text-ink">KPC</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-brand">
          Admin
        </span>
      </div>

      <div className="relative hidden flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search appointments, doctors, treatments…"
          className="h-9 w-full max-w-md rounded-md border bg-background pl-9 pr-3 text-sm outline-none ring-brand/40 transition focus:ring-2"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 lg:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-rust ring-2 ring-card" />
        </button>

        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
            {initial}
          </span>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-medium text-foreground">{name}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
