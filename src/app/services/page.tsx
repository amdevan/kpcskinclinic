import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { SERVICE_CATEGORIES, slugify, type ServiceCategory } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services | KPC Skin Hair & Aesthetic Clinic",
  description:
    "All 28 treatments across 6 categories — hair transplant, hair clinic, surgery, cosmetic face concerns, aesthetic services, and laser treatments. Performed by doctors, in-house.",
};

function parseJsonArray<T>(value: string | null | undefined, fallback: T[] = []): T[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function transformCategory(c: any): ServiceCategory {
  return {
    id: c.slug || c.id,
    title: c.title,
    tagline: c.tagline || "",
    description: c.description || "",
    image: c.image || "",
    services: parseJsonArray<any>(c.services).map((s: any) => ({
      title: s.title,
      href: s.href || "#services",
      description: s.description || "",
      slug: s.slug,
    })),
  };
}

async function getCategories(): Promise<ServiceCategory[]> {
  try {
    const rows = await db.serviceCategory.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (rows && rows.length > 0) {
      return rows.map(transformCategory);
    }
  } catch {
    // DB not available — fall back to static
  }
  return SERVICE_CATEGORIES;
}

export default async function ServicesPage() {
  const categories = await getCategories();
  return (
    <>
      <PageBanner
        eyebrow="Our Services"
        title="Twenty-eight treatments."
        highlight="Six doctors who do them."
        description="Pick a category to see what's on the menu. Every procedure is performed in-house at our Thapathali clinic — no outsourcing, no contractor doctors."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Services" }]}
      />

      {/* Services list by category */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 space-y-16 sm:space-y-20">
          {categories.map((cat, idx) => {
            const styles = [
              { text: "text-brand", bar: "bg-brand", soft: "bg-brand/10" },
              { text: "text-cyan", bar: "bg-cyan", soft: "bg-cyan/10" },
              { text: "text-green", bar: "bg-green", soft: "bg-green/10" },
              { text: "text-gold", bar: "bg-gold", soft: "bg-gold/10" },
              { text: "text-rust", bar: "bg-rust", soft: "bg-rust/10" },
              { text: "text-brand", bar: "bg-brand", soft: "bg-brand/10" },
            ];
            const s = styles[idx % styles.length];
            return (
            <div
              key={cat.id}
              id={cat.id}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-28"
            >
              {/* Image */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-ink sticky top-28">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className={`absolute top-0 left-0 right-0 h-2 ${s.bar}`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                    <p className="font-italic-accent text-sm text-gold mb-1">
                      {cat.tagline}
                    </p>
                    <p className="section-index text-[11px] text-cream/60">
                      0{idx + 1} / 0{categories.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7">
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-2 ${s.text}`}>
                  Category 0{idx + 1}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-4">
                  {cat.title}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {cat.description}
                </p>

                <ul className="divide-y divide-border border-t border-border">
                  {cat.services.map((sv, i) => (
                    <li
                      key={sv.title}
                      className="py-3.5 flex items-start gap-4 group"
                    >
                      <span className={`mt-1 shrink-0 w-6 h-6 rounded-full ${s.soft} flex items-center justify-center text-[11px] font-semibold ${s.text}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Link href={`/services/${slugify(sv.title)}`} className="font-medium text-ink hover:text-brand transition-colors">{sv.title}</Link>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {sv.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-5">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${s.text} hover:text-ink transition-colors link-underline`}
                  >
                    Book this category
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/packages"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    See pricing →
                  </Link>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </section>

      <CtaSection
        titlePrefix="Not sure which treatment is right for you?"
        highlight="Book a consultation."
        description="A 30–45 minute consultation with the right doctor. We'll figure out what you actually need — and if the answer is nothing, we'll say so."
        primaryCta="Request an Appointment"
        secondaryCta="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
