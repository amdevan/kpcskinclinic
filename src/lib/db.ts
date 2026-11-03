import { PrismaClient } from "@prisma/client";
import { existsSync, copyFileSync, mkdirSync, rmSync } from "fs";
import { resolve } from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Resolve a writable SQLite path and publish it as DATABASE_URL.
// - On dev (macOS/Linux) the committed db/custom.db is writable — use it as-is.
// - On Vercel the app directory (/var/task) is read-only; redirect to /tmp.
function resolveDbUrl(): void {
  const raw = process.env.DATABASE_URL || "";
  if (!raw.startsWith("file:")) return;
  const p = raw.replace(/^file:/, "").replace(/^\/\//, "/");
  if (!p.startsWith("/")) return;
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