import { PageBanner } from "@/components/site/page-banner";
import { ContactForm } from "@/components/site/contact-form";
import { CONTACT_INFO } from "@/lib/site-data";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Navigation } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Get in touch with KPC Skin Clinic in Thapathali, Kathmandu. Call, email, or send us a message — we reply within one working day.",
};

type HoursEntry = { day: string; time: string };
type SocialEntry = { label: string; href: string; handle: string; icon: string };

type ContactInfo = {
  phone: string;
  phoneHref: string;
  mobile: string;
  mobileHref: string;
  whatsapp: string;
  whatsappLabel: string;
  email: string;
  emailHref: string;
  address: string;
  addressShort: string;
  addressMapHref: string;
  hours: HoursEntry[];
  socials: SocialEntry[];
};

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

async function getContactInfo(): Promise<ContactInfo> {
  let info: ContactInfo = { ...CONTACT_INFO };
  try {
    const rows = await db.siteSetting.findMany();
    if (rows && rows.length > 0) {
      const map: Record<string, string> = {};
      for (const r of rows) map[r.key] = r.value;
      const phone = map.phone || CONTACT_INFO.phone;
      const mobile = map.mobile || CONTACT_INFO.mobile;
      const email = map.email || CONTACT_INFO.email;
      const address = map.address || CONTACT_INFO.address;
      info = {
        phone,
        phoneHref: map.phone_href || `tel:${phone.replace(/[^+\d]/g, "")}`,
        mobile,
        mobileHref: map.mobile_href || `tel:${mobile.replace(/[^+\d]/g, "")}`,
        whatsapp: map.whatsapp || CONTACT_INFO.whatsapp,
        whatsappLabel: CONTACT_INFO.whatsappLabel,
        email,
        emailHref: map.email_href || `mailto:${email}`,
        address,
        addressShort: map.address_short || CONTACT_INFO.addressShort,
        addressMapHref: map.map_link || map.address_map_href || CONTACT_INFO.addressMapHref,
        hours: parseJson<HoursEntry[]>(map.hours, CONTACT_INFO.hours),
        socials: [
          { label: "Instagram", href: map.social_instagram || CONTACT_INFO.socials[0]?.href || "#", handle: "@kpcskin", icon: "instagram" },
          { label: "Facebook", href: map.social_facebook || CONTACT_INFO.socials[1]?.href || "#", handle: "KPC Skin Clinic", icon: "facebook" },
          { label: "TikTok", href: map.social_tiktok || CONTACT_INFO.socials[2]?.href || "#", handle: "@kpcskin", icon: "tiktok" },
          ...(map.social_youtube ? [{ label: "YouTube", href: map.social_youtube, handle: "KPC Skin", icon: "youtube" }] : []),
        ],
      };
    }
  } catch {
    // DB not available — fall back to static
  }
  return info;
}

export default async function ContactPage() {
  const CONTACT = await getContactInfo();
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
                  href={CONTACT.phoneHref}
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
                      {CONTACT.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT.mobileHref}
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
                      {CONTACT.mobile}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT.emailHref}
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
                      {CONTACT.email}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT.addressMapHref}
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
                      {CONTACT.address}
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
                      {CONTACT.hours.map((h) => (
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
                  {CONTACT.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-brand hover:text-brand-foreground hover:border-brand transition-all"
                    >
                      {s.icon === "instagram" ? (
                        <Instagram className="h-4 w-4" />
                      ) : s.icon === "facebook" ? (
                        <Facebook className="h-4 w-4" />
                      ) : s.icon === "tiktok" ? (
                        <span className="text-xs font-bold">TT</span>
                      ) : (
                        <Phone className="h-4 w-4" />
                      )}
                    </a>
                  ))}
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
                  {CONTACT.addressShort}
                </p>
                <a
                  href={CONTACT.addressMapHref}
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
