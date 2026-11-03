// Copy the committed SQLite database into /tmp so it is writable at runtime.
// On Vercel the app directory (/var/task) is read-only; /tmp is the only
// writable location available to serverless functions.
//
// Run this at BUILD time (before `prisma db push` / `prisma generate`) so the
// runtime /tmp copy starts from the committed seed data.
import { existsSync, copyFileSync, mkdirSync } from "fs";
import { resolve } from "path";

// Publish DATABASE_URL before any Prisma CLI runs in this process. Prisma
// validates the datasource URL at startup; without this the build fails with
// "the URL must start with the protocol 'file:'" when the env var is unset.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = `file:${resolve("/tmp", "custom.db")}`;
}

const SRC = resolve(process.cwd(), "db/custom.db");
const DST_DIR = "/tmp";
const DST = resolve(DST_DIR, "custom.db");

if (existsSync(SRC)) {
  mkdirSync(DST_DIR, { recursive: true });
  copyFileSync(SRC, DST);
  console.log("[copy-db] copied db/custom.db -> /tmp/custom.db");
} else {
  console.log("[copy-db] no db/custom.db to copy — prisma db push will create it");
}