import { PageBanner } from "@/components/site/page-banner";
import { CONTACT_INFO } from "@/lib/site-data";

export const metadata = {
  title: "Privacy Policy | KPC Skin Hair & Aesthetic Clinic",
  description:
    "How KPC Skin Hair & Aesthetic Clinic collects, uses, and protects your personal and health information. Thapathali, Kathmandu.",
};

export default function PrivacyPage() {
  const updated = "27 September 2026";
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy."
        description="How we collect, use, and protect your personal and health information."
        image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 max-w-3xl">
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {updated}
          </p>

          <div className="space-y-8 text-base leading-relaxed text-ink/80">
            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">1. Who we are</h2>
              <p>
                KPC Skin Hair &amp; Aesthetic Clinic Pvt. Ltd (&ldquo;KPC&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a skin and hair clinic
                located at {CONTACT_INFO.address}. We are the data controller
                for the personal and health information you provide to us.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">2. What we collect</h2>
              <p className="mb-3">We collect:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Identification details (name, age, gender) when you book an appointment.</li>
                <li>Contact details (phone number, email, address).</li>
                <li>Medical history, photographs, and treatment records relevant to your care.</li>
                <li>Billing and payment information (we do not store full card numbers).</li>
                <li>Website usage data (anonymised) via cookies.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">3. Why we use it</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>To provide medical care and maintain clinical records (legitimate interest).</li>
                <li>To schedule and confirm appointments.</li>
                <li>To process payments and issue receipts.</li>
                <li>To send treatment follow-up and care instructions.</li>
                <li>To comply with Nepal Medical Council record-keeping requirements.</li>
              </ul>
              <p className="mt-3">We do not sell your data. We do not share it for marketing.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">4. How long we keep it</h2>
              <p>
                Clinical records are retained for a minimum of 7 years after
                your last visit, in line with Nepal Medical Council guidelines.
                Appointment and billing data are retained for 5 years for tax
                audit purposes. Newsletter subscribers&apos; data is deleted on
                request.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">5. Your rights</h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Request a copy of your records.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of marketing data.</li>
                <li>Withdraw consent for non-essential processing at any time.</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, email{" "}
                <a href={CONTACT_INFO.emailHref} className="text-brand hover:underline">{CONTACT_INFO.email}</a>{" "}
                or call {CONTACT_INFO.phone}.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">6. Cookies</h2>
              <p>
                This website uses essential cookies (for the booking form to
                function) and anonymised analytics cookies. We do not use
                third-party advertising cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-3">7. Contact</h2>
              <p>
                For any privacy question or request, contact us at{" "}
                <a href={CONTACT_INFO.emailHref} className="text-brand hover:underline">{CONTACT_INFO.email}</a>{" "}
                or {CONTACT_INFO.phone}, or write to us at {CONTACT_INFO.address}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
