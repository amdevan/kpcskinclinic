"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CalendarClock,
  Stethoscope,
  Pill,
  Package,
  FileText,
  TestTube,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarClock },
  { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { label: "Treatments", href: "/admin/treatments", icon: Pill },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "STD/STI Tests", href: "/admin/std-tests", icon: TestTube },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-ink text-cream lg:flex">
      <div className="flex h-14 items-center gap-2.5 border-b border-cream/10 px-5">
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cream/10 ring-1 ring-cream/20 overflow-hidden">
          <Image
            src="/kpc-logo.png"
            alt="KPC admin"
            fill
            className="object-cover"
            sizes="36px"
            priority
          />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-base font-bold tracking-tight text-cream">
            KPC
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-cream/60">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <p className="px-2 pb-2 text-[10px] uppercase tracking-[0.16em] text-cream/40">
          Manage
        </p>
        <ul className="space-y-1">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand text-cream"
                      : "text-cream/70 hover:bg-cream/5 hover:text-cream",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-cream/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream"
        >
          <ExternalLink className="size-4" />
          View site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-cream/70 transition-colors hover:bg-rust/20 hover:text-rust"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
