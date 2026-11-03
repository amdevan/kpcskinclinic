// Build-time step: copy the committed SQLite database into /tmp so the
// Prisma CLI can open it during `prisma db push`.
//
// NOTE: This only applies when the datasource is SQLite. With the schema now
// on PostgreSQL the build relies on the DATABASE_URL env var (set in the
// Vercel project settings) pointing at the Postgres database, so there is no
// local SQLite file to copy — this script becomes a no-op.
import { existsSync, copyFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const SRC = resolve(process.cwd(), "db/custom.db");
const DST_DIR = "/tmp";
const DST = resolve(DST_DIR, "custom.db");

if (existsSync(SRC)) {
  mkdirSync(DST_DIR, { recursive: true });
  copyFileSync(SRC, DST);
  console.log("[copy-db] copied db/custom.db -> /tmp/custom.db");
} else {
  console.log("[copy-db] no db/custom.db to copy — using DATABASE_URL as-is");
}