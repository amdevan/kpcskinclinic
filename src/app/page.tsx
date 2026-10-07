import { HeroCarousel } from "@/components/site/hero-carousel";
import { PopularServices } from "@/components/site/popular-services";
import { AboutSection } from "@/components/site/about-section";
import { CtaSection } from "@/components/site/cta-section";
import { SuccessStoriesSection } from "@/components/site/success-stories-section";
import { Testimonials } from "@/components/site/testimonials";
import { SocialSection } from "@/components/site/social-section";
import { db } from "@/lib/db";
import { HERO_SLIDES, type HeroSlide } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  let slides: HeroSlide[] = HERO_SLIDES;
  try {
    const rows = await db.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    if (rows && rows.length > 0) {
      slides = rows.map((r) => ({
        eyebrow: r.eyebrow,
        title: r.title,
        highlight: r.highlight,
        description: r.description,
        image: r.image,
        primaryCta: r.primaryCta,
        secondaryCta: r.secondaryCta,
      }));
    }
  } catch {
    // DB not available — fall back to static HERO_SLIDES
  }

  return (
    <>
      <HeroCarousel slides={slides} />
      <PopularServices />
      <AboutSection />
      <CtaSection />
      <SuccessStoriesSection />
      <Testimonials />
      <SocialSection />
    </>
  );
}
