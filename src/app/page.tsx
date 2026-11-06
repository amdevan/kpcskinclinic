import { HeroCarousel } from "@/components/site/hero-carousel";
import { PopularServices } from "@/components/site/popular-services";
import { AboutSection } from "@/components/site/about-section";
import { CtaSection } from "@/components/site/cta-section";
import { SuccessStoriesSection } from "@/components/site/success-stories-section";
import { Testimonials } from "@/components/site/testimonials";
import { SocialSection } from "@/components/site/social-section";
import { MediaGallery } from "@/components/site/media-gallery";
import { VideoEmbed } from "@/components/site/video-embed";
import { db } from "@/lib/db";
import { getPageSection, type PageSectionContent } from "@/lib/page-content";
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

  // Fetch every editable home section in one query. Each section renders its
  // DB title/body/image when present and falls back to the built-in copy.
  const sections: Record<string, PageSectionContent | null> = {};
  for (const s of [
    "hero",
    "popular-services",
    "about",
    "cta",
    "success-stories",
    "testimonials",
    "social",
    "media-gallery",
  ]) {
    sections[s] = await getPageSection("home", s);
  }
  const sec = (s: string) => sections[s];
  const videoOf = (s: string) => sec(s)?.video || "";

  const about = sec("about");
  const popular = sec("popular-services");
  const cta = sec("cta");
  const stories = sec("success-stories");
  const reviews = sec("testimonials");
  const social = sec("social");
  const gallery = sec("media-gallery");

  const heroVideo = videoOf("hero");
  const aboutVideo = videoOf("about");
  const successStoriesVideo = videoOf("success-stories");
  const testimonialsVideo = videoOf("testimonials");
  const ctaVideo = videoOf("cta");
  const socialVideo = videoOf("social");
  const mediaGalleryVideo = videoOf("media-gallery");

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
      <PopularServices
        eyebrow={popular?.extra.eyebrow}
        title={popular?.title || undefined}
        titleHighlight={popular?.extra.highlight}
        description={popular?.body || undefined}
      />
      <AboutSection
        eyebrow={about?.extra.eyebrow}
        title={about?.title || undefined}
        titleHighlight={about?.extra.highlight}
        paragraphs={
          about?.body
            ? about.body
                .split(/\n\s*\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : undefined
        }
        image={about?.image || undefined}
      />
      {aboutVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={aboutVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <CtaSection
        titlePrefix={cta?.title || undefined}
        highlight={cta?.extra.highlight}
        description={cta?.body || undefined}
        image={cta?.image || undefined}
        primaryCta={cta?.extra.primaryCta || undefined}
        secondaryCta={cta?.extra.secondaryCta || undefined}
      />
      {ctaVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={ctaVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <SuccessStoriesSection
        eyebrow={stories?.extra.eyebrow}
        title={stories?.title || undefined}
        titleHighlight={stories?.extra.highlight}
        description={stories?.body || undefined}
      />
      {successStoriesVideo ? (
        <section className="py-12 sm:py-16 bg-background">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={successStoriesVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <Testimonials
        eyebrow={reviews?.extra.eyebrow}
        title={reviews?.title || undefined}
        description={reviews?.body || undefined}
      />
      {testimonialsVideo ? (
        <section className="py-12 sm:py-16 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-5xl mx-auto">
              <VideoEmbed url={testimonialsVideo} />
            </div>
          </div>
        </section>
      ) : null}
      <SocialSection
        eyebrow={social?.extra.eyebrow}
        title={social?.title || undefined}
        titleHighlight={social?.extra.highlight}
        description={social?.body || undefined}
      />
      <MediaGallery
        eyebrow={gallery?.extra.eyebrow}
        title={gallery?.title || undefined}
        description={gallery?.body || undefined}
        image={gallery?.image || undefined}
      />
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
