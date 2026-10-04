import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { PackageCard } from "@/components/site/package-card";
import { ALL_PACKAGES, STD_STI_PACKAGE_CARDS, FAQ, CONTACT_INFO } from "@/lib/site-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Packages & Pricing | KPC Skin Hair & Aesthetic Clinic",
  description:
    "All KPC treatment packages — hair transplant, PRP, laser, surgery, HydraFacial, Botox, fillers, STD/STI testing. Transparent pricing, EMI available. Thapathali, Kathmandu.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  const categories = Array.from(new Set(ALL_PACKAGES.map((p) => p.category)));
  return (
    <>
      <PageBanner eyebrow="Packages & Pricing" title="Honest starting prices." highlight="No hidden charges." description="What you see is what you pay. Every package has a transparent starting price — click any package to book instantly." image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cb095eaff0da.jpg" crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]} />
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">Our most-booked treatments</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">All packages, by category</h2>
            <p className="mt-4 text-muted-foreground">Browse every treatment package. Each card shows the starting price, what&apos;s included, and a booking button.</p>
          </div>
          {categories.map((cat) => {
            const catPackages = ALL_PACKAGES.filter((p) => p.category === cat);
            return (
              <div key={cat} className="mb-16">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6 pb-3 border-b border-border">{cat}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{catPackages.map((p) => <PackageCard key={p.name} p={p} />)}</div>
              </div>
            );
          })}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">STD / STI Testing</h3>
              <Link href="/std-sti" className="text-sm font-medium text-brand hover:text-ink transition-colors">View full test list →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{STD_STI_PACKAGE_CARDS.map((p) => <PackageCard key={p.name} p={p} />)}</div>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl">All prices include pre-treatment consultation and post-treatment care guidance. Final pricing is confirmed in writing before any procedure.</p>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">FAQ</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-ink">Things people ask us</h2>
              <p className="mt-4 text-muted-foreground">Can&apos;t find your answer? Call <a href={CONTACT_INFO.phoneHref} className="text-brand hover:underline">{CONTACT_INFO.phone}</a>.</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><Info className="h-4 w-4 text-brand" /><span>Updated for 2026</span></div>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((f, i) => <AccordionItem key={i} value={`item-${i}`} className="border-b border-border"><AccordionTrigger className="text-left text-base font-medium text-ink hover:no-underline py-5">{f.q}</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent></AccordionItem>)}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <CtaSection titlePrefix="Not sure which package fits your needs?" highlight="Ask us." description="Send us your concern and budget range — we'll recommend the most effective option. No upselling, ever." primaryCta="Request an Appointment" secondaryCta="Contact Us" secondaryHref="/contact" />
    </>
  );
}
