import { Database } from "bun:sqlite";
import {
  HERO_SLIDES,
  SERVICE_CATEGORIES,
  CONTACT_INFO,
} from "../src/lib/site-data";

const db = new Database("db/custom.db");
const now = () => new Date().toISOString();

function cuid() {
  return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

// Seed HeroSlide
const existingHero = db.query("SELECT COUNT(*) as c FROM HeroSlide").get() as any;
if (existingHero.c === 0) {
  for (let i = 0; i < HERO_SLIDES.length; i++) {
    const h = HERO_SLIDES[i];
    db.run(
      `INSERT INTO HeroSlide (id, eyebrow, title, highlight, description, image, primaryCta, secondaryCta, isActive, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cuid(), h.eyebrow, h.title, h.highlight, h.description, h.image, h.primaryCta, h.secondaryCta, 1, i, now(), now()]
    );
  }
  console.log(`✓ ${HERO_SLIDES.length} hero slides seeded`);
} else {
  console.log(`• HeroSlide already has ${existingHero.c} rows`);
}

// Seed ServiceCategory
const existingCats = db.query("SELECT COUNT(*) as c FROM ServiceCategory").get() as any;
if (existingCats.c === 0) {
  for (let i = 0; i < SERVICE_CATEGORIES.length; i++) {
    const c = SERVICE_CATEGORIES[i];
    db.run(
      `INSERT INTO ServiceCategory (id, slug, title, tagline, description, image, services, published, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cuid(), c.id, c.title, c.tagline, c.description, c.image, JSON.stringify(c.services), 1, i, now(), now()]
    );
  }
  console.log(`✓ ${SERVICE_CATEGORIES.length} service categories seeded`);
} else {
  console.log(`• ServiceCategory already has ${existingCats.c} rows`);
}

// Seed SiteSetting
const existingSettings = db.query("SELECT COUNT(*) as c FROM SiteSetting").get() as any;
if (existingSettings.c === 0) {
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
  for (const s of settings) {
    db.run(
      `INSERT INTO SiteSetting (id, key, value, "group", updatedAt) VALUES (?, ?, ?, ?, ?)`,
      [cuid(), s.key, s.value, s.group, now()]
    );
  }
  console.log(`✓ ${settings.length} site settings seeded`);
} else {
  console.log(`• SiteSetting already has ${existingSettings.c} rows`);
}

// Seed PageContent
const existingPages = db.query("SELECT COUNT(*) as c FROM PageContent").get() as any;
if (existingPages.c === 0) {
  const pages: { page: string; section: string; title: string; body: string; image: string; order: number }[] = [
    { page: "about", section: "banner", title: "A small clinic that takes a long time with each patient.", body: "Founded 2021 in Thapathali. Trusted care, one promise: honest treatment plans, written down, performed by doctors — not salespeople.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg", order: 0 },
    { page: "about", section: "story", title: "We started KPC because we were tired of clinics that treated patients like transactions.", body: "KPC Skin Hair & Aesthetic Clinic started in 2021 with two rooms in Thapathali and one dermatologist who refused to recommend treatments he wouldn't do on his own family. Five years on, we've grown — but that rule hasn't changed.", image: "", order: 1 },
    { page: "about", section: "mission", title: "Mission", body: "To deliver dermatology and aesthetic care that puts the patient's long-term outcome above short-term revenue — and to prove that honesty is a viable business model.", image: "", order: 2 },
    { page: "about", section: "vision", title: "Vision", body: "To be Nepal's most trusted skin and hair clinic — where patients come for a second opinion before they commit to a procedure anywhere else.", image: "", order: 3 },
    { page: "about", section: "promise", title: "Promise", body: "Every patient leaves with a written plan, a clear price, and the name of the doctor responsible for their care. If we can't help, we'll tell you who can.", image: "", order: 4 },
    { page: "hair-transplant", section: "banner", title: "Hair Transplant at KPC.", body: "Natural, permanent hair restoration performed by experienced surgeons at our Thapathali clinic. Written graft count and price before surgery — no surprises.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg", order: 0 },
    { page: "hair-transplant", section: "sub_procedures", title: "Three transplant procedures", body: JSON.stringify([
      { slug: "hair-transplant", title: "FUE Hair Transplant", desc: "Follicular Unit Extraction — natural density, no linear scar, permanent results.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg", price: "NPR 60,000+" },
      { slug: "beard-transplant", title: "Beard Transplant", desc: "Fill patchy beards, moustache and sideburns with your own follicles.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b2eebe27adf.jpg", price: "NPR 45,000+" },
      { slug: "eyebrow-transplant", title: "Eyebrow Transplant", desc: "Restore over-plucked, thin or scarred eyebrows — natural angle and density.", image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg", price: "NPR 35,000+" },
    ]), image: "", order: 1 },
    { page: "hair-transplant", section: "steps", title: "From consultation to full result", body: JSON.stringify([
      { step: "01", title: "Consultation", body: "We assess your hair loss pattern (Norwood scale), donor density, and design a natural hairline. You get a written graft count and price." },
      { step: "02", title: "Surgery", body: "FUE harvest + implantation by the surgeon, not a technician. 8–10 hours, local anaesthetic, painless. No linear scar." },
      { step: "03", title: "Recovery", body: "Redness 3–5 days. Shedding 2–4 weeks. New growth 3–4 months. Full result 12 months." },
      { step: "04", title: "Follow-up", body: "Review at 1 week, 1 month, 4 months, 8 months, 12 months. We photograph and measure at every stage." },
    ]), image: "", order: 2 },
  ];
  for (const p of pages) {
    db.run(
      `INSERT INTO PageContent (id, page, section, title, body, image, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cuid(), p.page, p.section, p.title, p.body, p.image, p.order, now(), now()]
    );
  }
  console.log(`✓ ${pages.length} page content rows seeded`);
} else {
  console.log(`• PageContent already has ${existingPages.c} rows`);
}

console.log("\n✅ Done");
