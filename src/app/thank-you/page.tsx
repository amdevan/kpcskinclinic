import Link from "next/link";
import { CheckCircle2, Phone, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/site-data";

export const metadata = {
  title: "Thank You | KPC Skin Hair & Aesthetic Clinic",
  description: "Your request has been received. We'll be in touch within one working day.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center bg-background">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="h-20 w-20 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
            Thank you.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Your request has been received. Sunita or one of our patient care
            team will call you back within one working day to confirm your
            appointment.
          </p>

          <div className="bg-cream rounded-2xl border border-border p-6 mb-8">
            <p className="text-sm font-semibold text-ink mb-4">Need to speak to us now?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-2 text-brand hover:text-ink transition-colors"
              >
                <Phone className="h-4 w-4" />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand hover:text-ink transition-colors"
              >
                <Clock className="h-4 w-4" />
                WhatsApp {CONTACT_INFO.mobile}
              </a>
            </div>
            <p className="text-[11px] text-muted-foreground mt-4">
              Clinic hours: {CONTACT_INFO.hours[0].day}, {CONTACT_INFO.hours[0].time}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-brand hover:bg-brand/90 text-brand-foreground px-6 py-3 text-sm font-semibold transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground px-6 py-3 text-sm font-semibold transition-colors"
            >
              Browse services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
