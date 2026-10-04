"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, ArrowLeft, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kpcskin.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-ink px-4 py-12 text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, oklch(0.52 0.07 205 / 0.35), transparent), radial-gradient(50% 50% at 90% 90%, oklch(0.62 0.17 45 / 0.25), transparent)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cream/10 ring-1 ring-cream/20 overflow-hidden">
            <Image
              src="/kpc-logo.png"
              alt="KPC Skin Hair & Aesthetic Clinic"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </span>
          <h1 className="font-display text-2xl font-bold text-cream">KPC Admin</h1>
          <p className="mt-1 text-sm text-cream/60">
            Sign in to manage your clinic website
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-6 backdrop-blur"
        >
          {error && (
            <div className="mb-4 rounded-md border border-rust/40 bg-rust/10 px-3 py-2 text-sm text-rust">
              {error}
            </div>
          )}

          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream/70">
              Email
            </span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@kpcskin.com"
                className="h-11 w-full rounded-md border border-cream/15 bg-ink/60 pl-10 pr-3 text-sm text-cream outline-none transition placeholder:text-cream/30 focus:border-brand focus:ring-2 focus:ring-brand/40"
              />
            </div>
          </label>

          <label className="mb-5 block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-cream/70">
              Password
            </span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="h-11 w-full rounded-md border border-cream/15 bg-ink/60 pl-10 pr-3 text-sm text-cream outline-none transition placeholder:text-cream/30 focus:border-brand focus:ring-2 focus:ring-brand/40"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand font-medium text-brand-foreground transition hover:bg-brand/90 disabled:opacity-60"
          >
            {loading ? (
              <span className="size-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
            ) : (
              <>
                Sign in to Admin
                <ArrowRight className="size-4" />
              </>
            )}
          </button>

          <div className="mt-4 rounded-md border border-cream/10 bg-ink/40 px-3 py-2 text-center text-[11px] text-cream/50">
            Default credentials:{" "}
            <span className="font-mono text-cream/80">admin@kpcskin.com</span>{" "}
            /{" "}
            <span className="font-mono text-cream/80">kpc-admin-2026</span>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
          >
            <ArrowLeft className="size-3.5" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
