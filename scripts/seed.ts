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
  HERO_SLIDES,
  SERVICE_CATEGORIES,
  CONTACT_INFO,
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

  console.log("→ Seeding hero slides…");
  let heroCount = 0;
  for (let i = 0; i < HERO_SLIDES.length; i++) {
    const h = HERO_SLIDES[i];
    // Use order as the unique key (since slides don't have a slug)
    const existing = await db.heroSlide.findFirst({ where: { order: i } });
    if (existing) {
      await db.heroSlide.update({
        where: { id: existing.id },
        data: {
          eyebrow: h.eyebrow,
          title: h.title,
          highlight: h.highlight,
          description: h.description,
          image: h.image,
          primaryCta: h.primaryCta,
          secondaryCta: h.secondaryCta,
          isActive: true,
          order: i,
        },
      });
    } else {
      await db.heroSlide.create({
        data: {
          eyebrow: h.eyebrow,
          title: h.title,
          highlight: h.highlight,
          description: h.description,
          image: h.image,
          primaryCta: h.primaryCta,
          secondaryCta: h.secondaryCta,
          isActive: true,
          order: i,
        },
      });
    }
    heroCount++;
  }
  console.log(`  ✓ ${heroCount} hero slides upserted`);

  console.log("→ Seeding service categories…");
  let catCount = 0;
  for (let i = 0; i < SERVICE_CATEGORIES.length; i++) {
    const c = SERVICE_CATEGORIES[i];
    await db.serviceCategory.upsert({
      where: { slug: c.id },
      create: {
        slug: c.id,
        title: c.title,
        tagline: c.tagline,
        description: c.description,
        image: c.image,
        services: JSON.stringify(c.services || []),
        published: true,
        order: i,
      },
      update: {
        title: c.title,
        tagline: c.tagline,
        description: c.description,
        image: c.image,
        services: JSON.stringify(c.services || []),
        order: i,
      },
    });
    catCount++;
  }
  console.log(`  ✓ ${catCount} service categories upserted`);

  console.log("→ Seeding site settings…");
  const settings: { key: string; value: string; group: string }[] = [
    { key: "logo_url", value: "/kpc-logo.png", group: "general" },
    { key: "favicon_url", value: "/favicon.svg", group: "general" },
    { key: "clinic_name", value: "KPC", group: "general" },
    { key: "clinic_tagline", value: "Skin · Hair · Aesthetic", group: "general" },
    { key: "phone", value: CONTACT_INFO.phone, group: "contact" },
    { key: "phone_href", value: CONTACT_INFO.phoneHref, group: "contact" },
    { key: "mobile", value: CONTACT_INFO.mobile, group: "contact" },
    { key: "mobile_href", value: CONTACT_INFO.mobileHref, group: "contact" },
    { key: "whatsapp", value: CONTACT_INFO.whatsapp, group: "contact" },
    { key: "email", value: CONTACT_INFO.email, group: "contact" },
    { key: "email_href", value: CONTACT_INFO.emailHref, group: "contact" },
    { key: "address", value: CONTACT_INFO.address, group: "contact" },
    { key: "address_short", value: CONTACT_INFO.addressShort, group: "contact" },
    { key: "address_map_href", value: CONTACT_INFO.addressMapHref, group: "contact" },
    { key: "hours", value: JSON.stringify(CONTACT_INFO.hours), group: "contact" },
    { key: "socials", value: JSON.stringify(CONTACT_INFO.socials), group: "social" },
  ];
  let settingCount = 0;
  for (const s of settings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      create: { key: s.key, value: s.value, group: s.group },
      update: { value: s.value, group: s.group },
    });
    settingCount++;
  }
  console.log(`  ✓ ${settingCount} site settings upserted`);

  console.log("→ Seeding page content…");
  const pages: { page: string; section: string; title: string; body: string; image: string; order: number }[] = [
    {
      page: "about",
      section: "banner",
      title: "A small clinic that takes a long time with each patient.",
      body: "Founded 2021 in Thapathali. Trusted care, one promise: honest treatment plans, written down, performed by doctors — not salespeople.",
      image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg",
      order: 0,
    },
    {
      page: "about",
      section: "story",
      title: "We started KPC because we were tired of clinics that treated patients like transactions.",
      body: "KPC Skin Hair & Aesthetic Clinic started in 2021 with two rooms in Thapathali and one dermatologist who refused to recommend treatments he wouldn't do on his own family. Five years on, we've grown — but that rule hasn't changed.",
      image: "",
      order: 1,
    },
    {
      page: "about",
      section: "mission",
      title: "Mission",
      body: "To deliver dermatology and aesthetic care that puts the patient's long-term outcome above short-term revenue — and to prove that honesty is a viable business model.",
      image: "",
      order: 2,
    },
    {
      page: "about",
      section: "vision",
      title: "Vision",
      body: "To be Nepal's most trusted skin and hair clinic — where patients come for a second opinion before they commit to a procedure anywhere else.",
      image: "",
      order: 3,
    },
    {
      page: "about",
      section: "promise",
      title: "Promise",
      body: "Every patient leaves with a written plan, a clear price, and the name of the doctor responsible for their care. If we can't help, we'll tell you who can.",
      image: "",
      order: 4,
    },
    {
      page: "hair-transplant",
      section: "banner",
      title: "Hair Transplant at KPC.",
      body: "Natural, permanent hair restoration performed by experienced surgeons at our Thapathali clinic. Written graft count and price before surgery — no surprises.",
      image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
      order: 0,
    },
    {
      page: "hair-transplant",
      section: "sub_procedures",
      title: "Three transplant procedures",
      body: JSON.stringify([
        { slug: "hair-transplant", title: "FUE Hair Transplant", desc: "Follicular Unit Extraction — natural density, no linear scar, permanent results.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg", price: "NPR 60,000+" },
        { slug: "beard-transplant", title: "Beard Transplant", desc: "Fill patchy beards, moustache and sideburns with your own follicles.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b2eebe27adf.jpg", price: "NPR 45,000+" },
        { slug: "eyebrow-transplant", title: "Eyebrow Transplant", desc: "Restore over-plucked, thin or scarred eyebrows — natural angle and density.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg", price: "NPR 35,000+" },
      ]),
      image: "",
      order: 1,
    },
    {
      page: "hair-transplant",
      section: "steps",
      title: "From consultation to full result",
      body: JSON.stringify([
        { step: "01", title: "Consultation", body: "We assess your hair loss pattern (Norwood scale), donor density, and design a natural hairline. You get a written graft count and price." },
        { step: "02", title: "Surgery", body: "FUE harvest + implantation by the surgeon, not a technician. 8–10 hours, local anaesthetic, painless. No linear scar." },
        { step: "03", title: "Recovery", body: "Redness 3–5 days. Shedding 2–4 weeks. New growth 3–4 months. Full result 12 months." },
        { step: "04", title: "Follow-up", body: "Review at 1 week, 1 month, 4 months, 8 months, 12 months. We photograph and measure at every stage." },
      ]),
      image: "",
      order: 2,
    },
  ];
  let pageContentCount = 0;
  for (const p of pages) {
    const existing = await db.pageContent.findFirst({ where: { page: p.page, section: p.section } });
    if (existing) {
      await db.pageContent.update({
        where: { id: existing.id },
        data: { title: p.title, body: p.body, image: p.image, order: p.order },
      });
    } else {
      await db.pageContent.create({
        data: { page: p.page, section: p.section, title: p.title, body: p.body, image: p.image, order: p.order },
      });
    }
    pageContentCount++;
  }
  console.log(`  ✓ ${pageContentCount} page content rows upserted`);

  await seedPopups();
  await seedSeoMeta();
  await seedAdminUser();

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

// ===== Seed Popups =====
async function seedPopups() {
  console.log("\n📦 Seeding Popups...");
  const popups = [
    {
      title: "Welcome to KPC Skin Clinic",
      description: "Book a consultation this month and get a free skin analysis worth NPR 2,000. Our expert dermatologists are ready to help you achieve healthy, glowing skin.",
      image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg",
      buttonText: "Book Now",
      buttonLink: "/contact",
      isActive: true,
      dismissible: true,
      showOnAll: true,
      pagePath: "",
      order: 0,
    },
    {
      title: "Monsoon Offer — 20% Off Laser Hair Removal",
      description: "Book a full-body laser hair removal package before the end of the month and save 20% plus a free HydraFacial add-on.",
      image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg",
      buttonText: "Claim Offer",
      buttonLink: "/packages",
      isActive: false,
      dismissible: true,
      showOnAll: true,
      pagePath: "",
      order: 1,
    },
    {
      title: "Free Skin Consultation for First-Time Visitors",
      description: "New to KPC? Get a complimentary 15-minute skin consultation with our dermatologists and 15% off your first treatment.",
      image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg",
      buttonText: "Book Consultation",
      buttonLink: "/contact",
      isActive: false,
      dismissible: true,
      showOnAll: false,
      pagePath: "/",
      order: 2,
    },
  ];
  let count = 0;
  for (const p of popups) {
    const existing = await db.popup.findFirst({ where: { title: p.title } });
    if (existing) {
      await db.popup.update({ where: { id: existing.id }, data: p });
    } else {
      await db.popup.create({ data: p });
    }
    count++;
  }
  console.log(`  ✓ ${count} popups seeded`);
}

// ===== Seed SeoMeta =====
async function seedSeoMeta() {
  console.log("\n🔍 Seeding SEO Metadata...");
  const seoPages = [
    { url: "/", title: "KPC Skin Hair & Aesthetic Clinic | Nepal's Leading Skin & Hair Clinic", description: "KPC Skin Hair & Aesthetic Clinic — Nepal's leading skin and hair clinic in Thapathali, Kathmandu. Expert hair transplants, laser treatments, cosmetic surgery, and dermatology care.", keywords: "skin clinic kathmandu, hair transplant nepal, laser hair removal, dermatologist nepal", canonical: "https://www.kpcskinclinic.com/" },
    { url: "/about", title: "About Us | KPC Skin Hair & Aesthetic Clinic", description: "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — founded 2021 in Thapathali, Kathmandu. Meet our doctors, our values, and the story behind Nepal's leading skin & hair clinic.", keywords: "about kpc, skin clinic nepal, dermatologist kathmandu", canonical: "https://www.kpcskinclinic.com/about" },
    { url: "/doctors", title: "Our Doctors | KPC Skin Hair & Aesthetic Clinic", description: "Meet the five full-time doctors at KPC Skin Clinic Thapathali — dermatologists, a plastic surgeon, an aesthetic specialist, and a hair transplant surgeon.", keywords: "dermatologist nepal, skin doctor kathmandu, hair transplant surgeon", canonical: "https://www.kpcskinclinic.com/doctors" },
    { url: "/services", title: "Our Services | KPC Skin Hair & Aesthetic Clinic", description: "All 28 treatments across 6 categories — hair transplant, hair treatment, laser, cosmetic concerns, aesthetic services, and surgery.", keywords: "skin treatment nepal, hair transplant, laser treatment, cosmetic surgery", canonical: "https://www.kpcskinclinic.com/services" },
    { url: "/packages", title: "Packages & Pricing | KPC Skin Hair & Aesthetic Clinic", description: "Transparent starting prices for every KPC treatment. No hidden charges. EMI available. Thapathali, Kathmandu.", keywords: "skin treatment price nepal, hair transplant cost, laser hair removal price", canonical: "https://www.kpcskinclinic.com/packages" },
    { url: "/hair-transplant", title: "Hair Transplant | KPC Skin Clinic Thapathali", description: "FUE hair transplant, beard transplant and eyebrow transplant at KPC Skin Clinic Thapathali. Performed by experienced surgeons. Written graft count and price before surgery.", keywords: "hair transplant nepal, fue hair transplant kathmandu, beard transplant", canonical: "https://www.kpcskinclinic.com/hair-transplant" },
    { url: "/success-stories", title: "Success Stories | KPC Skin Hair & Aesthetic Clinic", description: "Real patient transformations — before & after gallery, video stories, and Google reviews from patients treated at KPC Skin Clinic, Kathmandu.", keywords: "hair transplant results, before after acne treatment, patient reviews nepal", canonical: "https://www.kpcskinclinic.com/success-stories" },
    { url: "/std-sti", title: "STD/STI Testing | KPC Skin Clinic Thapathali", description: "Confidential, doctor-counselled STD and STI testing at KPC Skin Clinic Thapathali. Pre- and post-test counselling included. Results within 2-5 working days.", keywords: "std test nepal, sti testing kathmandu, hiv test nepal", canonical: "https://www.kpcskinclinic.com/std-sti" },
    { url: "/blog", title: "Blog | KPC Skin Hair & Aesthetic Clinic", description: "Skincare tips, treatment explainers, and clinic news from the doctors at KPC Skin Clinic Thapathali. Honest, doctor-written, no listicles.", keywords: "skin care blog nepal, hair transplant blog, dermatology tips", canonical: "https://www.kpcskinclinic.com/blog" },
    { url: "/contact", title: "Contact Us | KPC Skin Hair & Aesthetic Clinic", description: "Get in touch with KPC Skin Clinic in Thapathali, Kathmandu. Call, email, or send us a message — we reply within one working day.", keywords: "contact skin clinic kathmandu, kpc skin clinic phone, dermatologist contact nepal", canonical: "https://www.kpcskinclinic.com/contact" },
  ];
  let count = 0;
  for (const s of seoPages) {
    const existing = await db.seoMeta.findUnique({ where: { url: s.url } });
    if (existing) {
      await db.seoMeta.update({ where: { id: existing.id }, data: s });
    } else {
      await db.seoMeta.create({ data: s });
    }
    count++;
  }
  console.log(`  ✓ ${count} SEO entries seeded`);
}

// ===== Seed Admin User =====
async function seedAdminUser() {
  console.log("\n👤 Seeding Admin User...");
  const admin = {
    email: "admin@kpcskin.com",
    name: "KPC Admin",
    role: "admin",
    password: "kpc-admin-2026",
  };
  const existing = await db.user.findUnique({ where: { email: admin.email } });
  if (existing) {
    await db.user.update({ where: { id: existing.id }, data: admin });
  } else {
    await db.user.create({ data: admin });
  }
  console.log(`  ✓ Admin user seeded (admin@kpcskin.com)`);
}
