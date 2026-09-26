import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { TEAM, VALUES, STATS_FULL, CONTACT_INFO } from "@/lib/site-data";
import { CheckCircle2, Target, Eye, Heart } from "lucide-react";

export const metadata = {
  title: "About Us | KPC Skin Hair & Aesthetic Clinic",
  description:
    "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — founded 2016 in Maharajgunj, Kathmandu. Meet our doctors, our values, and the story behind Nepal's leading skin & hair clinic.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Us"
        title="A small clinic that takes"
        highlight="a long time with each patient."
        description="Founded 2016 in Maharajgunj. Four doctors, one philosophy: honest treatment plans, written down, performed by doctors — not salespeople."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story + stats */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                Our story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-6">
                We started KPC because we were tired of clinics that treated
                patients like{" "}
                <span className="font-italic-accent text-brand font-medium">
                  transactions.
                </span>
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground font-serif-body">
                <p className="drop-cap">
                  KPC Skin Hair &amp; Aesthetic Clinic started in 2016 with
                  two rooms in Maharajgunj and one dermatologist who refused
                  to recommend treatments he wouldn&apos;t do on his own
                  family. Nine years on, we&apos;ve grown — but that rule
                  hasn&apos;t changed.
                </p>
                <p>
                  We are not the biggest clinic in Kathmandu, and we don&apos;t
                  want to be. What we are is deliberate: every consultation
                  runs 30–45 minutes, every treatment plan is written down and
                  handed to you, and every procedure is performed by a
                  doctor — not a technician, not a salesperson.
                </p>
                <p>
                  Today, KPC is a team of four full-time doctors, a patient
                  care team of three, and an in-house surgical theatre. We&apos;ve
                  performed over 15,000 procedures — from hair transplants to
                  rhinoplasty to laser hair removal — and we still answer
                  every appointment request ourselves. No call center, no
                  bots.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
                {STATS_FULL.map((s) => (
                  <div key={s.label} className="bg-card p-5 text-center">
                    <p className="font-display text-3xl sm:text-4xl font-bold text-brand">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-2xl p-7 border border-border">
              <div className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Mission
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-serif-body">
                To deliver dermatology and aesthetic care that puts the
                patient&apos;s long-term outcome above short-term revenue — and
                to prove that honesty is a viable business model.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-7 border border-border">
              <div className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                <Eye className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Vision
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-serif-body">
                To be Nepal&apos;s most trusted skin and hair clinic — where
                patients come for a second opinion before they commit to a
                procedure anywhere else.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-7 border border-border">
              <div className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                <Heart className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                Promise
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-serif-body">
                Every patient leaves with a written plan, a clear price, and
                the name of the doctor responsible for their care. If we
                can&apos;t help, we&apos;ll tell you who can.
              </p>
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8">
            What we will{" "}
            <span className="font-italic-accent text-brand font-medium">
              never
            </span>{" "}
            compromise on
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-ink mb-1">{v.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-serif-body">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              The team
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
              Four doctors.{" "}
              <span className="font-italic-accent text-brand font-medium">
                One philosophy.
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <article key={m.name} className="group">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary mb-4">
                  { }
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="font-display text-lg font-semibold text-ink">
                  {m.name}
                </p>
                <p className="text-sm text-brand font-medium">{m.role}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {m.credentials}
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-serif-body">
                  {m.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        titlePrefix="Want to meet the team?"
        highlight="Book a consultation."
        description="Meet the doctor who'll actually perform your procedure, walk through the clinic, and leave with a written plan. Consultations are 30–45 minutes."
        primaryCta="Request an Appointment"
        secondaryCta="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
