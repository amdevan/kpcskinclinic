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
import {
  getPageSection,
  getPageSectionRows,
  type PageSectionContent,
} from "@/lib/page-content";
import {
  HERO_SLIDES,
  POPULAR_SERVICES,
  BEFORE_AFTER_GALLERY,
  slugify,
  type HeroSlide,
  type PopularService,
  type Testimonial,
} from "@/lib/site-data";

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

  // ---- Relevant images from the CMS ----
  // Treatment hero images (uploaded in Admin → Treatments) enrich every card
  // that is keyed by treatment, and blog images feed the social strip.
  const treatmentImageBySlug = new Map<string, string>();
  const treatmentImageByTitle = new Map<string, string>();
  let blogPosts: { image: string; handle: string; caption: string }[] = [];
  try {
    const [treatments, blogs] = await Promise.all([
      db.treatment.findMany({
        where: { published: true },
        select: { slug: true, title: true, heroImage: true },
      }),
      db.blogArticle.findMany({
        where: { published: true },
        select: { title: true, image: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);
    for (const t of treatments || []) {
      if (!t.heroImage) continue;
      treatmentImageBySlug.set(t.slug, t.heroImage);
      treatmentImageByTitle.set(t.title.toLowerCase(), t.heroImage);
    }
    blogPosts = (blogs || [])
      .filter((b) => b.image)
      .map((b) => ({ image: b.image, handle: "@kpcskin", caption: b.title }));
  } catch {
    // DB not available — static fallbacks are used
  }
  const imageForTreatment = (title: string, fallback: string): string =>
    treatmentImageByTitle.get(title.toLowerCase()) ||
    treatmentImageBySlug.get(slugify(title)) ||
    fallback;

  // Card rows per section: first row is the header (already in `sec`),
  // subsequent rows are individual cards with their own uploaded image.
  const cardRows = async (section: string): Promise<PageSectionContent[]> =>
    (await getPageSectionRows("home", section)).slice(1);
  const [
    popularCards,
    storyCards,
    reviewCards,
    socialCards,
    galleryCards,
  ] = await Promise.all([
    cardRows("popular-services"),
    cardRows("success-stories"),
    cardRows("testimonials"),
    cardRows("social"),
    cardRows("media-gallery"),
  ]);

  const popularServices: PopularService[] =
    popularCards.length > 0
      ? popularCards.map((c) => ({
          title: c.title,
          description: c.body,
          image: c.image || imageForTreatment(c.title, ""),
          href: c.extra.href
            ? `/services/${c.extra.href}`
            : `/services/${slugify(c.title)}`,
          accent: "",
        }))
      : POPULAR_SERVICES.map((s) => ({
          ...s,
          image: imageForTreatment(s.title, s.image),
        }));

  const storyItems =
    storyCards.length > 0
      ? storyCards.map((c) => ({
          image: c.image || imageForTreatment(c.title, ""),
          label: c.title,
          patient: c.extra.patient || c.body,
        }))
      : [
          {
            image: imageForTreatment("Hair Transplant", "/images/gen/hair-transplant.jpg"),
            label: "Hair Transplant",
            patient: "Megha N.",
          },
          {
            image: imageForTreatment("Acne & Acne Scars", "/images/gen/acne-care.jpg"),
            label: "Acne & Scars",
            patient: "Sneha S.",
          },
          {
            image: imageForTreatment("Laser Hair Removal", "/images/gen/laser-care.jpg"),
            label: "Laser Hair Removal",
            patient: "Manju D.",
          },
          {
            image: imageForTreatment("HydraFacial", "/images/gen/hydrafacial.jpg"),
            label: "Hydra Facial",
            patient: "Priya K.",
          },
        ];

  const galleryItems =
    galleryCards.length > 0
      ? galleryCards.map((c) => ({
          image: c.image || imageForTreatment(c.title, ""),
          treatment: c.title,
          patient: c.extra.patient || "",
          sessions: c.extra.sessions || c.body,
        }))
      : BEFORE_AFTER_GALLERY.map((g) => ({
          ...g,
          image: imageForTreatment(g.treatment, g.image),
        }));

  const socialPosts =
    socialCards.length > 0
      ? socialCards.map((c) => ({
          image: c.image || "",
          handle: c.extra.handle || "@kpcskin",
          caption: c.body || c.title,
        }))
      : blogPosts.length > 0
        ? blogPosts
        : undefined;

  const testimonials: Testimonial[] | undefined =
    reviewCards.length > 0
      ? reviewCards.map((c) => ({
          name: c.title,
          date: c.extra.date || "",
          rating: Math.max(1, Math.min(5, parseInt(c.extra.rating || "5", 10) || 5)),
          text: c.body,
          avatar: c.image || "/images/gen/avatar-m1.svg",
          service: c.extra.service || "",
        }))
      : undefined;

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
        services={popularServices}
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
        cards={storyItems}
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
        testimonials={testimonials}
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
        posts={socialPosts}
      />
      <MediaGallery
        eyebrow={gallery?.extra.eyebrow}
        title={gallery?.title || undefined}
        description={gallery?.body || undefined}
        image={gallery?.image || undefined}
        items={galleryItems}
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
