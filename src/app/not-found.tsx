import Link from "next/link";
import { Home as HomeIcon, Search } from "lucide-react";

export const metadata = {
  title: "Page not found | KPC Skin Hair & Aesthetic Clinic",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-background">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-display text-[7rem] sm:text-[9rem] font-bold text-brand leading-none mb-2">
            404
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Page not found
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            That page doesn&apos;t exist.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            The link may be broken, or the page may have moved. Try one of these
            instead:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand/90 text-brand-foreground px-6 py-3 text-sm font-semibold transition-colors"
            >
              <HomeIcon className="h-4 w-4" />
              Back to home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground px-6 py-3 text-sm font-semibold transition-colors"
            >
              <Search className="h-4 w-4" />
              Browse all services
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-brand transition-colors link-underline">About</Link>
            <Link href="/doctors" className="text-muted-foreground hover:text-brand transition-colors link-underline">Doctors</Link>
            <Link href="/packages" className="text-muted-foreground hover:text-brand transition-colors link-underline">Pricing</Link>
            <Link href="/success-stories" className="text-muted-foreground hover:text-brand transition-colors link-underline">Success Stories</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-brand transition-colors link-underline">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
