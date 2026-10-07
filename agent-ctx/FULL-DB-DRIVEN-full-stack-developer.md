# Task: FULL-DB-DRIVEN

## Summary
Made all public pages read from the database (with fallback to static `site-data.ts`). The site will never crash if the DB is unavailable — every DB query is wrapped in try/catch and falls back to the static data exports.

## Files Modified

### Prisma schema (1)
- `prisma/schema.prisma` — added 4 new models: `HeroSlide`, `ServiceCategory`, `PageContent`, `SiteSetting`. Also added an `order` field to `StdTest` (used by the std-sti packages ordering).

### Seed scripts (2)
- `scripts/seed.ts` — extended to also upsert hero slides, service categories, site settings, and page content. Idempotent.
- `scripts/seed-new-tables.ts` — NEW one-off SQLite-direct seeder for the new tables (run after `db:push` succeeds with a real DB URL). Creates the new tables in the local SQLite DB and seeds them with the static data.

### Components (4)
- `src/components/site/logo.tsx` — now accepts `logoUrl`, `clinicName`, `clinicTagline` props (with defaults) so the brand chrome is DB-driven.
- `src/components/site/header.tsx` — accepts the same props and forwards them to both desktop and mobile `<Logo>` instances.
- `src/components/site/footer.tsx` — same — accepts and forwards to `<Logo>`.
- `src/components/site/hero-carousel.tsx` — accepts an optional `slides` prop (defaults to static `HERO_SLIDES`) so the home page can pass DB-loaded slides.
- `src/components/site/blog-list.tsx` — accepts an optional `articles` prop (defaults to static `BLOG_ARTICLES`).

### Public pages (10)
- `src/app/layout.tsx` — now `async`. Reads site settings from `db.siteSetting.findMany({ where: { group: "general" } })` and passes `logoUrl`/`clinicName`/`clinicTagline` to `<Header>` and `<Footer>`. Sets the favicon via `<link rel="icon" href={faviconUrl} />` in `<head>`.
- `src/app/page.tsx` — reads hero slides from `db.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } })` and passes them to `<HeroCarousel slides={slides} />`. Falls back to `HERO_SLIDES`.
- `src/app/doctors/page.tsx` — reads doctors from `db.doctor.findMany({ where: { published: true }, orderBy: { order: "asc" } })`. Parses JSON fields (`specialties`, `education`, `treatments`). Falls back to `DOCTORS`.
- `src/app/doctors/[slug]/page.tsx` — reads single doctor from `db.doctor.findUnique({ where: { slug } })`. `generateStaticParams` returns both DB slugs AND static slugs. Falls back to `DOCTORS.find(...)`.
- `src/app/services/page.tsx` — reads service categories from `db.serviceCategory.findMany({ where: { published: true }, orderBy: { order: "asc" } })`. Parses the `services` JSON field. Falls back to `SERVICE_CATEGORIES`.
- `src/app/packages/page.tsx` — reads packages from `db.package.findMany({ where: { published: true } })` and STD packages from `db.stdTest.findMany({ where: { published: true, isPackage: true }, orderBy: { order: "asc" } })`. Transforms STD tests to PackageCard format. Falls back to `ALL_PACKAGES` and `STD_STI_PACKAGE_CARDS`.
- `src/app/blog/page.tsx` — reads articles from `db.blogArticle.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } })`. Passes them to `<BlogList articles={articles} />`. Falls back to `BLOG_ARTICLES`.
- `src/app/blog/[slug]/page.tsx` — reads single article from `db.blogArticle.findUnique({ where: { slug } })`. `generateStaticParams` returns both DB slugs AND static slugs. Also reads all articles for the "Related articles" section. Falls back to `BLOG_ARTICLES.find(...)`.
- `src/app/std-sti/page.tsx` — converted from `"use client"` to a server component. Reads packages and individual tests from `db.stdTest.findMany()` with the appropriate `isPackage` filter. Falls back to `STD_STI_PACKAGES` and `STD_STI_INDIVIDUAL_TESTS`. The price range in the "Individual tests" card is computed dynamically from the DB rows.
- `src/app/about/page.tsx` — reads banner, story, mission, vision, and promise sections from `db.pageContent.findMany({ where: { page: "about" } })`. Falls back to hardcoded defaults.
- `src/app/contact/page.tsx` — reads phone, email, address, hours, and socials from `db.siteSetting.findMany()`. Parses the `hours` and `socials` JSON fields. Falls back to `CONTACT_INFO`.
- `src/app/hair-transplant/page.tsx` — reads banner, sub-procedures, and steps from `db.pageContent.findMany({ where: { page: "hair-transplant" } })`. The sub-procedures and steps are stored as JSON in the `body` field. Falls back to hardcoded defaults.

## Pattern used everywhere
Every server page that reads DB data uses:
```typescript
import { db } from "@/lib/db";
import { STATIC_DATA } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Page() {
  let data = STATIC_DATA;
  try {
    const dbData = await db.modelName.findMany({ where: { published: true } });
    if (dbData.length > 0) data = transformDbData(dbData);
  } catch {
    // DB not available — use static data
  }
  // render with `data`
}
```

## Resilience
- All DB calls wrapped in try/catch — site never crashes if DB unavailable
- Static data is the fallback for every page
- `db.ts` Proxy fallback handles PrismaClient initialization failures
- For `generateStaticParams`, returns both DB slugs AND static slugs (SSG fallback works in both directions)
- JSON fields are parsed with a safe helper that returns `[]` on parse failure

## Dev environment note
The local SQLite DB now has all the new tables (HeroSlide, ServiceCategory, PageContent, SiteSetting) seeded with the static data. The dev server's PrismaClient was cached in `globalThis.prisma` before the new models were added — so until the dev server restarts, queries for the new models will fail (TypeError) and fall back to static data. After a dev-server restart, the regenerated Prisma Client will pick up the new models and the pages will become fully DB-driven. In the meantime, the existing models (Doctor, Package, BlogArticle, StdTest) continue to work DB-driven — admin edits to doctors/packages/blog/std-tests already reflect on the live site.

## Verification
- `bun run lint` — passes (exit 0)
- All 9 public routes return 200 OK via curl smoke test
- Two dynamic routes (`/doctors/[slug]`, `/blog/[slug]`) return 200 OK
- No exceptions or 500s in the dev log
- Existing DB-driven models (doctors, packages, blog, std-tests) confirmed working — pages render with DB data
- New models (hero slides, service categories, page content, site settings) confirmed working via static fallback — pages render correctly
