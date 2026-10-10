import { HeroCarousel } from "@/components/site/hero-carousel";
import { PopularServices } from "@/components/site/popular-services";
import { AboutSection } from "@/components/site/about-section";
import { CtaSection } from "@/components/site/cta-section";
import { SuccessStoriesSection } from "@/components/site/success-stories-section";
import { Testimonials } from "@/components/site/testimonials";
import { SocialSection } from "@/components/site/social-section";
import { VideoEmbed } from "@/components/site/video-embed";
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

  // Fetch any PageContent videos for the home page sections
  // (hero / about / success-stories / testimonials / cta / social / media-gallery).
  // Each section that has a `video` set will render an embed at the right spot.
  let heroVideo = "";
  let aboutVideo = "";
  let successStoriesVideo = "";
  let testimonialsVideo = "";
  let ctaVideo = "";
  let socialVideo = "";
  let mediaGalleryVideo = "";
  try {
    const rows = await db.pageContent.findMany({
      where: { page: "home" },
      orderBy: { order: "asc" },
    });
    if (rows && rows.length > 0) {
      const bySection = (section: string) =>
        rows.filter((r) => r.section === section);
      const pickVideo = (section: string) => {
        const matches = bySection(section);
        for (const r of matches) {
          const v = (r as any).video ?? "";
          if (v) return v;
        }
        return "";
      };
      heroVideo = pickVideo("hero");
      aboutVideo = pickVideo("about");
      successStoriesVideo = pickVideo("success-stories");
      testimonialsVideo = pickVideo("testimonials");
      ctaVideo = pickVideo("cta");
      socialVideo = pickVideo("social");
      mediaGalleryVideo = pickVideo("media-gallery");
    }
  } catch {
    // DB not available — no videos
  }

  return (
    <>
      <HeroCarousel slides={slides} />
      {heroVideo ? (
        <section className="py-12 sm:py-16 bg-background">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={heroVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <PopularServices />
      <AboutSection />
      {aboutVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={aboutVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <CtaSection />
      {ctaVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={ctaVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <SuccessStoriesSection />
      {successStoriesVideo ? (
        <section className="py-12 sm:py-16 bg-background">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={successStoriesVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <Testimonials />
      {testimonialsVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={testimonialsVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <SocialSection />
      {socialVideo ? (
        <section className="py-12 sm:py-16 bg-background">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={socialVideo} />
            </div>
          </div>
        </section>
      ) : null}
      {mediaGalleryVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={mediaGalleryVideo} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
