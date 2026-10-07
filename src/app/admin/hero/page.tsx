import { db } from "@/lib/db";
import { HERO_SLIDES } from "@/lib/site-data";
import { AdminHeroSlidesEditor } from "@/components/admin/admin-hero-slides-editor";

export const dynamic = "force-dynamic";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
  isActive: boolean;
  order: number;
};

export default async function AdminHeroPage() {
  let rows: any[] = [];

  try {
    rows = await db.heroSlide.findMany({ orderBy: { order: "asc" } });

    // Auto-seed from static data when DB is empty
    if (rows.length === 0) {
      for (let i = 0; i < HERO_SLIDES.length; i++) {
        const s = HERO_SLIDES[i];
        await db.heroSlide
          .create({
            data: {
              eyebrow: s.eyebrow,
              title: s.title,
              highlight: s.highlight,
              description: s.description,
              image: s.image,
              primaryCta: s.primaryCta,
              secondaryCta: s.secondaryCta,
              isActive: true,
              order: i,
            },
          })
          .catch(() => {});
      }
      rows = await db.heroSlide.findMany({ orderBy: { order: "asc" } });
    }
  } catch {
    // DB not available — use static slides
    rows = HERO_SLIDES.map((s, i) => ({
      id: `static-${i}`,
      eyebrow: s.eyebrow,
      title: s.title,
      highlight: s.highlight,
      description: s.description,
      image: s.image,
      primaryCta: s.primaryCta,
      secondaryCta: s.secondaryCta,
      isActive: true,
      order: i,
    }));
  }

  const slides: Slide[] = rows.map((r: any) => ({
    id: r.id,
    eyebrow: r.eyebrow ?? "",
    title: r.title ?? "",
    highlight: r.highlight ?? "",
    description: r.description ?? "",
    image: r.image ?? "",
    primaryCta: r.primaryCta ?? "",
    secondaryCta: r.secondaryCta ?? "",
    isActive: !!r.isActive,
    order: r.order ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Hero slides
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage the rotating carousel on the homepage. Reorder slides,
          toggle visibility and edit the headline / CTAs in place.
        </p>
      </div>

      <AdminHeroSlidesEditor slides={slides} />
    </div>
  );
}
