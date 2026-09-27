import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { PRICING_FULL, FAQ } from "@/lib/site-data";
import { CONTACT_INFO } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, ShieldCheck, CreditCard, FileText } from "lucide-react";

export const metadata = {
  title: "Pricing | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Transparent starting prices for every KPC treatment — hair transplant, PRP, laser, surgery, HydraFacial, Botox, fillers and more. No hidden charges, EMI available.",
};

export default function PricingPage() {
  return (
    <>
      <PageBanner
        eyebrow="Pricing"
        title="Honest starting prices."
        highlight="No hidden charges."
        description="What you see is what you pay. Every quote is confirmed in writing before any procedure, with no surprise add-ons."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cb095eaff0da.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      {/* Pricing tables by category */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Trust badges */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="flex items-center gap-3 bg-cream rounded-xl p-4 border border-border">
              <ShieldCheck className="h-5 w-5 text-brand shrink-0" />
              <p className="text-sm text-ink/75">
                <strong className="text-ink">Written quotes</strong> — no verbal
                pricing, ever.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-cream rounded-xl p-4 border border-border">
              <CreditCard className="h-5 w-5 text-brand shrink-0" />
              <p className="text-sm text-ink/75">
                <strong className="text-ink">3/6-month EMI</strong> on
                treatments above NPR 50,000.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-cream rounded-xl p-4 border border-border">
              <FileText className="h-5 w-5 text-brand shrink-0" />
              <p className="text-sm text-ink/75">
                <strong className="text-ink">Outcome guarantee</strong> in
                writing on every plan.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {PRICING_FULL.map((cat) => (
              <div key={cat.category}>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-5 pb-3 border-b border-border">
                  {cat.category}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="py-3 border-b border-border/60 flex items-baseline justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-ink text-sm">
                          {item.name}
                        </p>
                        {item.note && (
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display text-base font-semibold text-brand tabular-nums whitespace-nowrap">
                          {item.price}
                        </p>
                        {item.unit && (
                          <p className="text-[10px] text-muted-foreground">
                            /{item.unit}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground max-w-2xl">
            All prices include the pre-treatment consultation and
            post-treatment care guidance. Prices may vary based on the area
            treated, the number of sessions, and your specific case. Final
            pricing is confirmed in writing before any procedure.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                FAQ
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
                Things people{" "}
                <span className="font-italic-accent text-brand font-medium">
                  ask us
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Can&apos;t find your answer? Call{" "}
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="text-brand hover:underline"
                >
                  {CONTACT_INFO.phone}
                </a>{" "}
                — Sunita on the front desk knows the answer.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4 text-brand" />
                <span>Updated for 2026</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="text-left text-base font-medium text-ink hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Not sure which treatment fits your budget?"
        highlight="Ask us."
        description="Send us your concern and budget range — we'll recommend the most effective option within it. No upselling, ever."
        primaryCta="Request an Appointment"
        secondaryCta="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
