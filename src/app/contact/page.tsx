import { PageBanner } from "@/components/site/page-banner";
import { ContactForm } from "@/components/site/contact-form";
import { CONTACT_INFO } from "@/lib/site-data";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Navigation } from "lucide-react";

export const metadata = {
  title: "Contact Us | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Get in touch with KPC Skin Clinic in Maharajgunj, Kathmandu. Call, email, or send us a message — we reply within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Get in touch"
        title="Talk to a"
        highlight="human."
        description="Call us, email us, or send a message below. Sunita on the front desk will get you booked with the right doctor."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left — contact info */}
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                Contact details
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-8">
                We answer{" "}
                <span className="font-italic-accent text-brand font-medium">
                  every message
                </span>{" "}
                ourselves.
              </h2>

              <div className="space-y-5">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-start gap-4 group"
                >
                  <span className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-brand" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Clinic phone
                    </p>
                    <p className="font-display text-lg font-semibold text-ink group-hover:text-brand transition-colors">
                      {CONTACT_INFO.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.mobileHref}
                  className="flex items-start gap-4 group"
                >
                  <span className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-brand" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Mobile / WhatsApp
                    </p>
                    <p className="font-display text-lg font-semibold text-ink group-hover:text-brand transition-colors">
                      {CONTACT_INFO.mobile}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.emailHref}
                  className="flex items-start gap-4 group"
                >
                  <span className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-brand" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </p>
                    <p className="font-display text-lg font-semibold text-ink group-hover:text-brand transition-colors">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.addressMapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <span className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-brand" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Address
                    </p>
                    <p className="font-medium text-ink group-hover:text-brand transition-colors">
                      {CONTACT_INFO.address}
                    </p>
                    <p className="text-[11px] text-brand mt-1 inline-flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      Open in Google Maps
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <span className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-brand" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Opening hours
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {CONTACT_INFO.hours.map((h) => (
                        <p key={h.day} className="text-sm text-ink">
                          <span className="font-medium">{h.day}:</span>{" "}
                          <span className="text-muted-foreground">{h.time}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Follow us
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-brand hover:text-brand-foreground hover:border-brand transition-all"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-brand hover:text-brand-foreground hover:border-brand transition-all"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder strip */}
      <section className="bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="rounded-2xl overflow-hidden border border-border bg-card">
            <div className="relative aspect-[21/9] bg-secondary flex items-center justify-center">
              {/* Stylised map placeholder */}
              <div className="absolute inset-0 opacity-30">
                <svg className="h-full w-full" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.36 0.05 160 / 0.2)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="800" height="340" fill="url(#grid)" />
                  <path d="M0,180 Q200,140 400,200 T800,160" stroke="oklch(0.58 0.09 70 / 0.4)" strokeWidth="3" fill="none" />
                  <path d="M100,0 L120,340" stroke="oklch(0.36 0.05 160 / 0.3)" strokeWidth="2" fill="none" />
                  <path d="M500,0 L520,340" stroke="oklch(0.36 0.05 160 / 0.3)" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="relative text-center">
                <div className="h-14 w-14 rounded-full bg-brand flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <MapPin className="h-7 w-7 text-cream" />
                </div>
                <p className="font-display text-xl font-semibold text-ink">
                  KPC Skin Hair &amp; Aesthetic Clinic
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Maharajgunj, Kathmandu
                </p>
                <a
                  href={CONTACT_INFO.addressMapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-ink transition-colors link-underline"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
