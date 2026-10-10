import { Database } from "bun:sqlite";

// One-off migration: add the `video` column to PageContent.
//
// Why this script exists:
//   prisma/schema.prisma declares `provider = "postgresql"` (kept for Vercel
//   production) but the local `DATABASE_URL=file:.../custom.db` is SQLite.
//   Prisma's CLI rejects this mismatch — `bun run db:push` fails with
//   "the URL must start with the protocol postgresql:// or postgres://".
//   The runtime PrismaClient, however, happily uses SQLite via its bundled
//   libquery_engine binary regardless of the schema's `provider` field.
//
// Run once after adding the `video` column to the PageContent model:
//   bun run scripts/add-video-column.ts
//
// Idempotent — checks PRAGMA table_info first.

const db = new Database("db/custom.db");

const cols = db.query("PRAGMA table_info(PageContent)").all() as any[];
const hasVideo = cols.some((c) => c.name === "video");
if (hasVideo) {
  console.log("• PageContent.video column already exists — nothing to do");
} else {
  db.run(
    `ALTER TABLE PageContent ADD COLUMN video TEXT NOT NULL DEFAULT ''`,
  );
  console.log("✓ Added PageContent.video column");
}

const fresh = db.query("PRAGMA table_info(PageContent)").all() as any[];
console.log("\nPageContent columns now:");
for (const r of fresh) {
  console.log(`  - ${r.name} ${r.type} (notnull=${r.notnull} default=${r.dflt_value})`);
}
db.close();
