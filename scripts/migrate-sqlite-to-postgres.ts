// One-off migration: copy all rows from the committed SQLite database into the
// Postgres database pointed at by DATABASE_URL.
//
// Run once after switching prisma/schema.prisma provider from sqlite to
// postgresql and running `prisma db push` (which creates the empty tables):
//   bun run scripts/migrate-sqlite-to-postgres.ts
//
// Idempotent — skips tables that already have rows.
import { PrismaClient } from "@prisma/client";
import { Database } from "bun:sqlite";
import { resolve } from "path";

const POSTGRES = new PrismaClient({ log: ["error"] });
const SQLITE = new Database(resolve(process.cwd(), "db/custom.db"));

const TABLES = [
  "User",
  "Post",
  "Appointment",
  "NewsletterSubscriber",
  "Doctor",
  "Treatment",
  "Package",
  "BlogArticle",
  "StdTest",
  "HeroSlide",
  "ServiceCategory",
  "PageContent",
  "SiteSetting",
  "Popup",
  "SeoMeta",
  "LoginAttempt",
] as const;

type Table = (typeof TABLES)[number];

// Map each model to its column list (must match prisma/schema.prisma).
const COLUMNS: Record<Table, string[]> = {
  User: ["id", "email", "name", "role", "password", "createdAt", "updatedAt"],
  Post: ["id", "title", "content", "published", "authorId", "createdAt", "updatedAt"],
  Appointment: ["id", "name", "phone", "email", "service", "preferredDate", "message", "status", "createdAt", "updatedAt"],
  NewsletterSubscriber: ["id", "email", "active", "source", "createdAt", "updatedAt"],
  Doctor: ["id", "slug", "name", "role", "credentials", "specialties", "bio", "fullBio", "education", "treatments", "approach", "image", "experience", "published", "order", "createdAt", "updatedAt"],
  Treatment: ["id", "slug", "title", "category", "heroImage", "tagline", "intro", "metaDescription", "startingPrice", "sessions", "note", "subsections", "resultsReality", "suitabilityIdeal", "suitabilityNotIdeal", "faq", "comparisonTable", "published", "createdAt", "updatedAt"],
  Package: ["id", "name", "price", "unit", "note", "features", "image", "category", "color", "popular", "published", "createdAt", "updatedAt"],
  BlogArticle: ["id", "slug", "title", "excerpt", "body", "date", "author", "category", "image", "readTime", "published", "createdAt", "updatedAt"],
  StdTest: ["id", "name", "price", "composition", "isPackage", "tests", "recommended", "published", "order", "createdAt", "updatedAt"],
  HeroSlide: ["id", "eyebrow", "title", "highlight", "description", "image", "primaryCta", "secondaryCta", "isActive", "order", "createdAt", "updatedAt"],
  ServiceCategory: ["id", "slug", "title", "tagline", "description", "image", "services", "published", "order", "createdAt", "updatedAt"],
  PageContent: ["id", "page", "section", "title", "body", "image", "video", "order", "createdAt", "updatedAt"],
  SiteSetting: ["id", "key", "value", "group", "updatedAt"],
  Popup: ["id", "title", "description", "image", "buttonText", "buttonLink", "isActive", "dismissible", "showOnAll", "pagePath", "startDate", "endDate", "order", "createdAt", "updatedAt"],
  SeoMeta: ["id", "url", "title", "description", "keywords", "ogImage", "canonical", "updatedAt", "createdAt"],
  LoginAttempt: ["id", "email", "ip", "userAgent", "success", "reason", "createdAt"],
};

// Prisma client accessor per model. Using the generic client API keeps this
// table-driven; the model names match the Prisma schema exactly.
const modelOf: Record<Table, keyof PrismaClient> = {
  User: "user", Post: "post", Appointment: "appointment",
  NewsletterSubscriber: "newsletterSubscriber", Doctor: "doctor",
  Treatment: "treatment", Package: "package", BlogArticle: "blogArticle",
  StdTest: "stdTest", HeroSlide: "heroSlide", ServiceCategory: "serviceCategory",
  PageContent: "pageContent", SiteSetting: "siteSetting", Popup: "popup",
  SeoMeta: "seoMeta", LoginAttempt: "loginAttempt",
};

// SQLite stores DateTime columns as Unix timestamps (ms). Prisma expects an
// ISO string or Date. Convert by column name — the only Int fields in the
// schema (`order`, `tests`) are small and never reach here.
const DATETIME_COLS = new Set([
  "createdAt",
  "updatedAt",
  "preferredDate",
  "startDate",
  "endDate",
]);

// SQLite stores Boolean columns as INTEGER 0/1. Prisma expects a real boolean.
const BOOLEAN_COLS = new Set([
  "published",
  "active",
  "isPackage",
  "recommended",
  "isActive",
  "dismissible",
  "showOnAll",
  "success",
  "popular",
]);

function toPgValue(v: unknown, col?: string): unknown {
  if (v === null || v === undefined) return null;
  if (typeof v === "bigint") return Number(v);
  if (col && BOOLEAN_COLS.has(col)) return v === 1 || v === "1" || v === true;
  if (typeof v === "number" && col && DATETIME_COLS.has(col)) {
    return new Date(v).toISOString();
  }
  return v;
}

let total = 0;
for (const table of TABLES) {
  const cols = COLUMNS[table];
  const rows = SQLITE.query(`SELECT ${cols.map((c) => `"${c}"`).join(", ")} FROM "${table}"`).all() as Record<string, unknown>[];
  if (rows.length === 0) {
    console.log(`• ${table}: no rows in SQLite — skipping`);
    continue;
  }

  // Skip if Postgres already has data (idempotent).
  const model = POSTGRES[modelOf[table]] as unknown as {
    count: () => Promise<number>;
    createMany: (args: { data: Record<string, unknown>[] }) => Promise<{ count: number }>;
  };
  const existing = await model.count();
  if (existing > 0) {
    console.log(`• ${table}: ${existing} rows already in Postgres — skipping`);
    continue;
  }

  const data = rows.map((r) => {
    const out: Record<string, unknown> = {};
    for (const c of cols) out[c] = toPgValue(r[c], c);
    return out;
  });

  const res = await model.createMany({ data });
  total += res.count;
  console.log(`✓ ${table}: migrated ${res.count} rows`);
}

console.log(`\nDone — ${total} total rows migrated.`);
SQLITE.close();
await POSTGRES.$disconnect();