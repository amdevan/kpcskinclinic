import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { BlogList } from "@/components/site/blog-list";

export const metadata = {
  title: "Blog | KPC Skin Hair & Aesthetic Clinic",
  description:
    "Skincare tips, treatment explainers, and clinic news from the doctors at KPC Skin Clinic Thapathali. Honest, doctor-written, no listicles. Filter by category.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageBanner eyebrow="Blog" title="Doctor-written, not" highlight="listicle-spun." description="Skincare tips, treatment explainers, and clinic news — written by our doctors, not a content agency. Filter by category below." image="https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e1b6422719.jpg" crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <BlogList />
      <CtaSection titlePrefix="Have a question you'd like us to write about?" highlight="Tell us." description="We write based on what our patients ask." primaryCta="Request an Appointment" secondaryCta="Contact Us" secondaryHref="/contact" />
    </>
  );
}
