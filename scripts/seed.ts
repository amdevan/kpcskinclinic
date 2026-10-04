/**
 * Seed the CMS database from the centralized site-data.
 *
 * Run with:  bun run scripts/seed.ts
 *
 * Uses upserts so the script is idempotent — running it again will
 * refresh the existing rows with the latest data from site-data.ts
 * without duplicating them.
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
} from "../src/lib/site-data";

async function main() {
  console.log("→ Seeding doctors…");
  let doctorCount = 0;
  for (let i = 0; i < DOCTORS.length; i++) {
    const d = DOCTORS[i] as any;
    await db.doctor.upsert({
      where: { slug: d.slug },
      create: {
        slug: d.slug,
        name: d.name,
        role: d.role,
        credentials: d.credentials,
        specialties: JSON.stringify(d.specialties || []),
        bio: d.bio || "",
        fullBio: d.fullBio || "",
        education: JSON.stringify(d.education || []),
        treatments: JSON.stringify(d.treatments || []),
        approach: d.approach || "",
        image: d.image || "",
        experience: d.experience || "",
        published: true,
        order: i,
      },
      update: {
        name: d.name,
        role: d.role,
        credentials: d.credentials,
        specialties: JSON.stringify(d.specialties || []),
        bio: d.bio || "",
        fullBio: d.fullBio || "",
        education: JSON.stringify(d.education || []),
        treatments: JSON.stringify(d.treatments || []),
        approach: d.approach || "",
        image: d.image || "",
        experience: d.experience || "",
        order: i,
      },
    });
    doctorCount++;
  }
  console.log(`  ✓ ${doctorCount} doctors upserted`);

  console.log("→ Seeding treatments (full)…");
  let fullCount = 0;
  for (const t of TREATMENTS) {
    await db.treatment.upsert({
      where: { slug: t.slug },
      create: {
        slug: t.slug,
        title: t.title,
        category: t.category,
        heroImage: t.heroImage,
        tagline: t.tagline,
        intro: t.intro,
        metaDescription: t.metaDescription,
        startingPrice: t.pricing?.startingPrice || "",
        sessions: t.pricing?.sessions || "",
        note: t.pricing?.note || "",
        subsections: JSON.stringify(t.subsections || []),
        resultsReality: t.resultsReality || "",
        suitabilityIdeal: JSON.stringify(t.suitability?.ideal || []),
        suitabilityNotIdeal: JSON.stringify(t.suitability?.notIdeal || []),
        faq: JSON.stringify(t.faq || []),
        comparisonTable: t.comparisonTable ? JSON.stringify(t.comparisonTable) : "",
        published: true,
      },
      update: {
        title: t.title,
        category: t.category,
        heroImage: t.heroImage,
        tagline: t.tagline,
        intro: t.intro,
        metaDescription: t.metaDescription,
        startingPrice: t.pricing?.startingPrice || "",
        sessions: t.pricing?.sessions || "",
        note: t.pricing?.note || "",
        subsections: JSON.stringify(t.subsections || []),
        resultsReality: t.resultsReality || "",
        suitabilityIdeal: JSON.stringify(t.suitability?.ideal || []),
        suitabilityNotIdeal: JSON.stringify(t.suitability?.notIdeal || []),
        faq: JSON.stringify(t.faq || []),
        comparisonTable: t.comparisonTable ? JSON.stringify(t.comparisonTable) : "",
      },
    });
    fullCount++;
  }
  console.log(`  ✓ ${fullCount} full treatments upserted`);

  console.log("→ Seeding treatments (lightweight)…");
  let lightCount = 0;
  for (const r of REMAINING_TREATMENT_SLUGS) {
    // Only create if not already present (don't overwrite a full one)
    const existing = await db.treatment.findUnique({ where: { slug: r.slug } });
    if (existing) continue;
    await db.treatment.create({
      data: {
        slug: r.slug,
        title: r.title,
        category: r.category,
        published: true,
      },
    });
    lightCount++;
  }
  console.log(`  ✓ ${lightCount} lightweight treatments created`);

  console.log("→ Seeding packages…");
  let pkgCount = 0;
  for (const p of ALL_PACKAGES) {
    await db.package.upsert({
      where: { name: p.name },
      create: {
        name: p.name,
        price: p.price,
        unit: p.unit,
        note: p.note,
        features: JSON.stringify(p.features || []),
        image: p.image,
        category: p.category,
        color: p.color,
        popular: p.popular,
        published: true,
      },
      update: {
        price: p.price,
        unit: p.unit,
        note: p.note,
        features: JSON.stringify(p.features || []),
        image: p.image,
        category: p.category,
        color: p.color,
        popular: p.popular,
      },
    });
    pkgCount++;
  }
  console.log(`  ✓ ${pkgCount} packages upserted`);

  console.log("→ Seeding STD/STI tests…");
  let stdCount = 0;
  for (const p of STD_STI_PACKAGES) {
    await db.stdTest.upsert({
      where: { name: p.name },
      create: {
        name: p.name,
        price: p.price,
        composition: p.composition,
        isPackage: true,
        tests: p.tests,
        recommended: p.recommended,
        published: true,
      },
      update: {
        price: p.price,
        composition: p.composition,
        isPackage: true,
        tests: p.tests,
        recommended: p.recommended,
      },
    });
    stdCount++;
  }
  for (const t of STD_STI_INDIVIDUAL_TESTS) {
    await db.stdTest.upsert({
      where: { name: t.name },
      create: {
        name: t.name,
        price: t.price,
        composition: "",
        isPackage: false,
        tests: 1,
        recommended: false,
        published: true,
      },
      update: {
        price: t.price,
      },
    });
    stdCount++;
  }
  console.log(`  ✓ ${stdCount} STD/STI tests upserted`);

  console.log("→ Seeding blog articles…");
  let blogCount = 0;
  for (const b of BLOG_ARTICLES) {
    await db.blogArticle.upsert({
      where: { slug: b.slug },
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        body: b.body,
        date: b.date,
        author: b.author,
        category: b.category,
        image: b.image,
        readTime: b.readTime,
        published: true,
      },
      update: {
        title: b.title,
        excerpt: b.excerpt,
        body: b.body,
        date: b.date,
        author: b.author,
        category: b.category,
        image: b.image,
        readTime: b.readTime,
      },
    });
    blogCount++;
  }
  console.log(`  ✓ ${blogCount} blog articles upserted`);

  console.log("\n✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
