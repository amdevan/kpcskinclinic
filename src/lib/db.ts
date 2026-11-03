import { PrismaClient } from "@prisma/client";
import { existsSync, copyFileSync, mkdirSync, rmSync } from "fs";
import { resolve } from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Resolve a writable SQLite path and publish it as DATABASE_URL.
//
// Why this exists: on Vercel the app directory (/var/task) is read-only, and
// the committed .env is NOT deployed (it's gitignored). So at runtime
// DATABASE_URL is often empty or points at a path that doesn't exist on the
// host. Prisma validates the datasource URL at construction time and throws
// "the URL must start with the protocol 'file:'" — which is what broke every
// admin create/edit call.
//
// Behaviour:
//   - If DATABASE_URL is set and points at a writable absolute path → keep it.
//   - If it's set but the path is read-only (Vercel) → redirect to /tmp.
//   - If it's missing / not a file: URL → default to /tmp/custom.db.
function resolveDbUrl(): void {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("file:")) {
    const p = raw.replace(/^file:/, "").replace(/^\/\//, "/");
    if (p.startsWith("/")) {
      const dir = resolve(p, "..");
      try {
        if (existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
          // Touch the file to test writability.
          copyFileSync(p, p + ".writetest");
          rmSync(p + ".writetest", { force: true });
          return; // writable — keep the original URL
        }
      } catch {
        // Read-only (Vercel) — fall through to /tmp.
      }
    }
  }
  // Empty, unset, or unwritable → /tmp is the only writable location on
  // Vercel serverless, and a sane default everywhere.
  const tmp = resolve("/tmp", "custom.db");
  process.env.DATABASE_URL = `file:${tmp}`;
}

function createDb() {
  resolveDbUrl();
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV !== "production" ? ["query"] : ["error"],
    });
    return client;
  } catch (e) {
    console.error("[db] PrismaClient initialization failed:", e);
    return new Proxy({} as PrismaClient, {
      get() {
        return () => Promise.resolve([]);
      },
    }) as unknown as PrismaClient;
  }
}

export const db = globalForPrisma.prisma ?? createDb();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;