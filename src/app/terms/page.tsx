import { PageBanner } from "@/components/site/page-banner";
import { CONTACT_INFO } from "@/lib/site-data";

export const metadata = {
  title: "Terms of Service | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Terms of service for the KPC Skin Hair & Aesthetic Clinic website and the treatments we provide. Thapathali, Kathmandu.",
};

export default function TermsPage() {
  const updated = "27 September 2026";
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms of"
        highlight="Service."
        description="The terms under which we provide this website and our treatments."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cb095eaff0da.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-8">Last updated: {updated}</p>

          <div className="space-y-8 text-base leading-relaxed text-ink/80">
            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">1. About these terms</h2>
              <p>
                These terms govern your use of the KPC Skin Hair &amp; Aesthetic
                Clinic website at kpcskinhairclinic.space-z.ai and the booking
                of any treatment at our clinic at {CONTACT_INFO.address}. By
                booking an appointment or using this website, you agree to them.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">2. This website</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Information on this site is general and educational, not medical advice. A consultation is required for any specific recommendation.</li>
                <li>We do not guarantee the accuracy of pricing on the site; written quotes provided at consultation govern.</li>
                <li>Before-and-after photographs are of real patients with consent. Individual results vary.</li>
                <li>You may not reproduce content without written permission.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">3. Booking and cancellation</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Appointments are confirmed by phone or email by our front desk.</li>
                <li>To cancel or reschedule, give us at least 24 hours notice.</li>
                <li>The consultation fee (NPR 1,000) is adjusted against treatment if you proceed; it is non-refundable otherwise.</li>
                <li>Deposits for surgical procedures are non-refundable within 7 days of the scheduled date.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">4. Treatments</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>All treatments are performed by qualified doctors at our Thapathali clinic.</li>
                <li>A written treatment plan, including expected outcome and price, is provided before any procedure.</li>
                <li>Outcomes depend on your biology and aftercare. We guarantee the procedure and technique, not the biological result.</li>
                <li>If a result falls short of the agreed written outcome due to our work, we re-do or adjust at no charge.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">5. Payment</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Payment is due at the time of treatment unless agreed otherwise in writing.</li>
                <li>EMI plans are available for treatments above NPR 50,000 through partner banks.</li>
                <li>Prices are inclusive of all taxes.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">6. Liability</h2>
              <p>
                Nothing in these terms limits our liability for death or personal
                injury caused by our negligence, or for fraud. Otherwise, our
                liability is limited to the amount you paid for the treatment
                in question.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">7. Governing law</h2>
              <p>
                These terms are governed by the laws of Nepal. Any dispute will
                be resolved in the courts of Kathmandu. For any question, email{" "}
                <a href={CONTACT_INFO.emailHref} className="text-brand hover:underline">{CONTACT_INFO.email}</a>{" "}
                or call {CONTACT_INFO.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
