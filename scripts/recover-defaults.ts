/**
 * Recover default data — INSERT ONLY, never overwrite.
 *
 * Run with:  bun run scripts/recover-defaults.ts
 *
 * For every default item defined in src/lib/site-data.ts (and the
 * DEFAULT_SITE_INFO / DEFAULT_SEO_PAGES constants), this script:
 *   1. Checks if a row with the same unique key already exists.
 *   2. If it DOES exist → SKIP (preserve whatever the admin has changed).
 *   3. If it does NOT exist → INSERT the default.
 *
 * It NEVER calls update() or upsert()'s update branch. Existing data is
 * 100% preserved. Only missing defaults are recovered.
 */
import { db } from "../src/lib/db";
import {
  DOCTORS,
  TREATMENTS,
  REMAINING_TREATMENT_SLUGS,
  ALL_PACKAGES,
  STD_STI_PACKAGES,
  STD_STI_INDIVIDUAL_TESTS,
  BLOG_ARTICLES,
  HERO_SLIDES,
  SERVICE_CATEGORIES,
} from "../src/lib/site-data";
import { DEFAULT_SITE_INFO } from "../src/app/admin/site-info/constants";

// Mirrors DEFAULT_SEO_PAGES from src/app/admin/seo/page.tsx (duplicated here
// so we don't have to import a server-component file).
const DEFAULT_SEO_PAGES = [
  { url: "/", title: "KPC Skin, Hair & Aesthetic Clinic | Kathmandu" },
  { url: "/about", title: "About KPC Skin Clinic" },
  { url: "/services", title: "Services — KPC Skin Clinic" },
  { url: "/doctors", title: "Our doctors — KPC Skin Clinic" },
  { url: "/packages", title: "Treatment packages — KPC Skin Clinic" },
  { url: "/hair-transplant", title: "Hair transplant — KPC Skin Clinic" },
  { url: "/success-stories", title: "Success stories — KPC Skin Clinic" },
  { url: "/std-sti", title: "STD / STI testing — KPC Skin Clinic" },
  { url: "/blog", title: "Blog — KPC Skin Clinic" },
  { url: "/contact", title: "Contact KPC Skin Clinic" },
  { url: "/pricing", title: "Pricing — KPC Skin Clinic" },
  { url: "/privacy", title: "Privacy policy — KPC Skin Clinic" },
  { url: "/terms", title: "Terms of service — KPC Skin Clinic" },
];

type Tally = { table: string; total: number; skipped: number; added: number };

async function recover() {
  const tally: Tally[] = [];

  // ─── 1. Doctors ────────────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (let i = 0; i < DOCTORS.length; i++) {
      const d = DOCTORS[i] as any;
      const existing = await db.doctor.findUnique({ where: { slug: d.slug } });
      if (existing) { skipped++; continue; }
      await db.doctor.create({
        data: {
          slug: d.slug, name: d.name, role: d.role, credentials: d.credentials,
          specialties: JSON.stringify(d.specialties || []),
          bio: d.bio || "", fullBio: d.fullBio || "",
          education: JSON.stringify(d.education || []),
          treatments: JSON.stringify(d.treatments || []),
          approach: d.approach || "", image: d.image || "",
          experience: d.experience || "", published: true, order: i,
        },
      });
      added++;
    }
    tally.push({ table: "doctor", total: DOCTORS.length, skipped, added });
  }

  // ─── 2. Treatments (full) ──────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const t of TREATMENTS as any[]) {
      const existing = await db.treatment.findUnique({ where: { slug: t.slug } });
      if (existing) { skipped++; continue; }
      await db.treatment.create({
        data: {
          slug: t.slug, title: t.title, category: t.category,
          heroImage: t.heroImage, tagline: t.tagline, intro: t.intro,
          metaDescription: t.metaDescription,
          startingPrice: t.pricing?.startingPrice || "",
          sessions: t.pricing?.sessions || "",
          note: t.pricing?.note || "",
          subsections: JSON.stringify(t.subsections || []),
          resultsReality: t.resultsReality || "",
          suitabilityIdeal: JSON.stringify(t.suitabilityIdeal || []),
          suitabilityNotIdeal: JSON.stringify(t.suitabilityNotIdeal || []),
          faq: JSON.stringify(t.faq || []),
          comparisonTable: t.comparisonTable ? JSON.stringify(t.comparisonTable) : "",
          published: true,
        },
      });
      added++;
    }
    tally.push({ table: "treatment (full)", total: TREATMENTS.length, skipped, added });
  }

  // ─── 3. Treatments (lightweight) ───────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const r of REMAINING_TREATMENT_SLUGS) {
      const existing = await db.treatment.findUnique({ where: { slug: r.slug } });
      if (existing) { skipped++; continue; }
      await db.treatment.create({
        data: { slug: r.slug, title: r.title, category: r.category, published: true },
      });
      added++;
    }
    tally.push({ table: "treatment (lightweight)", total: REMAINING_TREATMENT_SLUGS.length, skipped, added });
  }

  // ─── 4. Packages ───────────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const p of ALL_PACKAGES as any[]) {
      const existing = await db.package.findUnique({ where: { name: p.name } });
      if (existing) { skipped++; continue; }
      await db.package.create({
        data: {
          name: p.name, price: p.price || "", unit: p.unit || "",
          note: p.note || "", features: JSON.stringify(p.features || []),
          image: p.image || "", category: p.category || "",
          color: p.color || "", popular: p.popular || false, published: true,
        },
      });
      added++;
    }
    tally.push({ table: "package", total: ALL_PACKAGES.length, skipped, added });
  }

  // ─── 5. STD/STI tests ─────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const s of STD_STI_PACKAGES as any[]) {
      const existing = await db.stdTest.findUnique({ where: { name: s.name } });
      if (existing) { skipped++; continue; }
      await db.stdTest.create({
        data: {
          name: s.name, price: s.price || "", composition: s.composition || "",
          isPackage: true, tests: s.tests || 0,
          recommended: s.recommended || false, published: true, order: s.order || 0,
        },
      });
      added++;
    }
    for (const s of STD_STI_INDIVIDUAL_TESTS as any[]) {
      const existing = await db.stdTest.findUnique({ where: { name: s.name } });
      if (existing) { skipped++; continue; }
      await db.stdTest.create({
        data: {
          name: s.name, price: s.price || "", composition: s.composition || "",
          isPackage: false, tests: 0,
          recommended: s.recommended || false, published: true, order: s.order || 0,
        },
      });
      added++;
    }
    const totalStd = STD_STI_PACKAGES.length + STD_STI_INDIVIDUAL_TESTS.length;
    tally.push({ table: "stdTest", total: totalStd, skipped, added });
  }

  // ─── 6. Blog articles ─────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const b of BLOG_ARTICLES as any[]) {
      const existing = await db.blogArticle.findUnique({ where: { slug: b.slug } });
      if (existing) { skipped++; continue; }
      await db.blogArticle.create({
        data: {
          slug: b.slug, title: b.title, excerpt: b.excerpt || "",
          body: b.body || "", date: b.date || "", author: b.author || "",
          category: b.category || "", image: b.image || "",
          readTime: b.readTime || "", published: true,
        },
      });
      added++;
    }
    tally.push({ table: "blogArticle", total: BLOG_ARTICLES.length, skipped, added });
  }

  // ─── 7. Hero slides ───────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (let i = 0; i < HERO_SLIDES.length; i++) {
      const h = HERO_SLIDES[i] as any;
      const existing = await db.heroSlide.findFirst({ where: { title: h.title, order: i } });
      if (existing) { skipped++; continue; }
      await db.heroSlide.create({
        data: {
          eyebrow: h.eyebrow || "", title: h.title || "",
          highlight: h.highlight || "", description: h.description || "",
          image: h.image || "", primaryCta: h.primaryCta || "",
          secondaryCta: h.secondaryCta || "",
          isActive: h.isActive !== false, order: i,
        },
      });
      added++;
    }
    tally.push({ table: "heroSlide", total: HERO_SLIDES.length, skipped, added });
  }

  // ─── 8. Service categories ────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (let i = 0; i < SERVICE_CATEGORIES.length; i++) {
      const c = SERVICE_CATEGORIES[i] as any;
      const existing = await db.serviceCategory.findUnique({ where: { slug: c.id } });
      if (existing) { skipped++; continue; }
      await db.serviceCategory.create({
        data: {
          slug: c.id, title: c.title, tagline: c.tagline || "",
          description: c.description || "", image: c.image || "",
          services: JSON.stringify(c.services || []),
          published: true, order: i,
        },
      });
      added++;
    }
    tally.push({ table: "serviceCategory", total: SERVICE_CATEGORIES.length, skipped, added });
  }

  // ─── 9. Site settings ─────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const [key, value] of Object.entries(DEFAULT_SITE_INFO)) {
      const existing = await db.siteSetting.findUnique({ where: { key } });
      if (existing) { skipped++; continue; }
      let group = "general";
      if (key.startsWith("social_")) group = "social";
      else if (["phone", "mobile", "whatsapp", "email", "address", "address_short", "map_link"].includes(key)) group = "contact";
      else if (key.startsWith("header_")) group = "header";
      else if (key.startsWith("footer_")) group = "footer";
      else if (["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "email_from", "email_to"].includes(key)) group = "email";
      await db.siteSetting.create({ data: { key, value: String(value ?? ""), group } });
      added++;
    }
    const total = Object.keys(DEFAULT_SITE_INFO).length;
    tally.push({ table: "siteSetting", total, skipped, added });
  }

  // ─── 10. SEO meta ──────────────────────────────────────────────────────
  {
    let skipped = 0, added = 0;
    for (const s of DEFAULT_SEO_PAGES) {
      const existing = await db.seoMeta.findUnique({ where: { url: s.url } });
      if (existing) { skipped++; continue; }
      await db.seoMeta.create({
        data: { url: s.url, title: s.title, description: "", keywords: "", ogImage: "", canonical: "" },
      });
      added++;
    }
    tally.push({ table: "seoMeta", total: DEFAULT_SEO_PAGES.length, skipped, added });
  }

  return tally;
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  RECOVER DEFAULT DATA — insert missing, preserve existing");
  console.log("  (no updates, no overwrites — pure INSERT-if-not-exists)");
  console.log("═══════════════════════════════════════════════════════════════\n");

  const tally = await recover();

  console.log("\n┌──────────────────────────┬────────┬──────────┬──────────┐");
  console.log("│ Table                    │ Total  │ Skipped  │ Added    │");
  console.log("├──────────────────────────┼────────┼──────────┼──────────┤");
  for (const t of tally) {
    console.log(`│ ${t.table.padEnd(24)} │ ${String(t.total).padStart(6)} │ ${String(t.skipped).padStart(8)} │ ${String(t.added).padStart(8)} │`);
  }
  console.log("└──────────────────────────┴────────┴──────────┴──────────┘");

  const totalAdded = tally.reduce((sum, t) => sum + t.added, 0);
  const totalSkipped = tally.reduce((sum, t) => sum + t.skipped, 0);
  console.log(`\n✓ Recovery complete: ${totalAdded} rows added, ${totalSkipped} rows preserved (already existed).`);
  if (totalAdded === 0) {
    console.log("  All default data was already present — nothing to recover.");
  }
}

main()
  .catch((e) => { console.error("✗ Recovery failed:", e); process.exit(1); })
  .finally(() => db.$disconnect());
