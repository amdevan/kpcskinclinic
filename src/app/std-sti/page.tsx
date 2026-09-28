"use client";

import * as React from "react";
import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { STD_STI_PACKAGES, STD_STI_INDIVIDUAL_TESTS } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Lock, Clock, AlertCircle } from "lucide-react";

export default function StdStiPage() {
  return (
    <>
      <PageBanner
        eyebrow="Standalone Service"
        title="STD / STI"
        highlight="Testing."
        description="Confidential, doctor-counselled STD and STI testing at KPC Skin Clinic Thapathali. Pre- and post-test counselling included. Results within 2–5 working days."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e1b6422719.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "STD/STI" }]}
      />

      {/* Trust badges */}
      <section className="bg-paper border-y border-border">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-brand shrink-0" />
              <p className="text-sm text-ink/75"><strong className="text-ink">100% confidential</strong> — your results are not shared with anyone without your written consent.</p>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-cyan shrink-0" />
              <p className="text-sm text-ink/75"><strong className="text-ink">Doctor-counselled</strong> — pre and post-test counselling by a qualified doctor, not a lab technician.</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green shrink-0" />
              <p className="text-sm text-ink/75"><strong className="text-ink">2–5 working days</strong> for most tests. PCR panels take up to 7 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package cards — 6 by default (spec requirement) */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            Test packages
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
            Choose a package
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Not sure which you need? Book a 15-minute consultation with our
            doctor — we&apos;ll recommend the right panel based on your exposure
            risk and symptoms.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {STD_STI_PACKAGES.map((p, i) => {
              const styles = [
                { bar: "bg-brand", text: "text-brand", ring: "border-brand/30", soft: "bg-brand/5" },
                { bar: "bg-cyan", text: "text-cyan", ring: "border-cyan/30", soft: "bg-cyan/5" },
                { bar: "bg-green", text: "text-green", ring: "border-green/30", soft: "bg-green/5" },
                { bar: "bg-gold", text: "text-gold", ring: "border-gold/30", soft: "bg-gold/5" },
                { bar: "bg-rust", text: "text-rust", ring: "border-rust/30", soft: "bg-rust/5" },
              ];
              const s = styles[i % styles.length];
              return (
                <article
                  key={p.name}
                  className={`relative rounded-2xl border-2 ${p.recommended ? `${s.ring} ${s.soft}` : "border-border bg-card"} p-6 card-lift`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${s.bar} rounded-t-2xl`} />
                  {p.recommended && (
                    <span className={`absolute -top-3 right-4 rounded-full ${s.bar} px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream`}>
                      Most chosen
                    </span>
                  )}
                  <p className={`text-[11px] font-semibold uppercase tracking-wider ${s.text} mb-1`}>
                    {p.tests} tests
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
                  <p className={`font-display text-2xl font-bold mt-2 ${s.text}`}>{p.price}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.composition}</p>
                </article>
              );
            })}
            {/* Individual tests card */}
            <article className="relative rounded-2xl border-2 border-dashed border-border p-6 flex flex-col justify-center items-center text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                32 tests
              </p>
              <h3 className="font-display text-xl font-bold text-ink">Individual tests</h3>
              <p className="font-display text-2xl font-bold mt-2 text-brand">NPR 150 – 9,050</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Priced per test. See full list below.
              </p>
            </article>
          </div>

          {/* Note: spec says don't present Panel 3 as default recommendation */}
          <p className="mt-6 text-xs text-muted-foreground flex items-start gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-rust mt-0.5 shrink-0" />
            <span>
              We do not recommend the broadest panel by default. The right
              package depends on your exposure risk and symptoms — book a
              consultation for a tailored recommendation.
            </span>
          </p>
        </div>
      </section>

      {/* Individual tests — behind a disclosure (spec: mobile-friendly) */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <Accordion type="single" collapsible>
            <AccordionItem value="individual" className="border-b-0">
              <AccordionTrigger className="text-base font-semibold text-ink hover:no-underline">
                View all individual tests (32 tests, NPR 150 – 9,050)
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4">
                  <div className="overflow-x-auto rounded-2xl border border-border">
                    <table className="w-full text-sm">
                      <caption className="sr-only">
                        Individual STD/STI test prices at KPC Skin Clinic
                      </caption>
                      <thead className="bg-brand/5">
                        <tr>
                          <th className="text-left font-semibold text-ink px-4 py-3 border-b border-border">Test name</th>
                          <th className="text-right font-semibold text-ink px-4 py-3 border-b border-border">Price (NPR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {STD_STI_INDIVIDUAL_TESTS.map((t, i) => (
                          <tr key={i} className="hover:bg-paper/60 transition-colors">
                            <td className="text-ink/80 px-4 py-2.5 border-b border-border/60">{t.name}</td>
                            <td className="text-right font-medium text-brand px-4 py-2.5 border-b border-border/60 tabular-nums">{t.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Prices include sample collection and lab processing. Add NPR 1,000 for doctor counselling if booked separately.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-8">
            Confidential, doctor-led testing
          </h2>
          <div className="space-y-5">
            {[
              { step: "01", title: "Book a consultation", body: "15–30 minutes with a doctor. We discuss your exposure risk, symptoms, and recommend the right panel." },
              { step: "02", title: "Sample collection", body: "Blood and/or urine sample collected at our Thapathali clinic. Discreet, private room." },
              { step: "03", title: "Results (2–5 days)", body: "Results sent to you privately. Positive results come with a doctor consultation and treatment plan — at no extra charge." },
              { step: "04", title: "Treatment (if needed)", body: "We treat most STIs in-house. For complex cases, we refer to our partner infectious disease specialists." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <span className="section-index text-sm font-semibold text-brand mt-1 shrink-0 w-8">{s.step}</span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Concerned about an exposure?"
        highlight="Book a confidential test."
        description="15-minute consultation with a doctor. We recommend the right panel, collect the sample, and deliver results privately — all at our Thapathali clinic."
        primaryCta="Request an Appointment"
        secondaryCta="View All Services"
        secondaryHref="/services"
      />
    </>
  );
}
