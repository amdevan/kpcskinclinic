// Build orchestrator for Vercel.
//
// Why this exists instead of an inline `&&` chain in package.json:
//   - Prisma's CLI validates the datasource URL at startup (prisma generate /
//     db push), which runs BEFORE the runtime resolveDbUrl() in src/lib/db.ts.
//     With DATABASE_URL unset on Vercel (the default — .env is gitignored and
//     not deployed) the build crashes with
//     "the URL must start with the protocol 'file:'".
//   - Inline `DATABASE_URL="${DATABASE_URL:-file:/tmp/custom.db}" && ...` chains
//     in package.json rely on the shell expanding the `${VAR:-default}` syntax
//     exactly the way the build runner parses the script. That is fragile.
//
// This wrapper sets the env var in-process before spawning anything, so every
// child (copy-db, prisma generate, prisma db push, seed, next build) inherits
// it deterministically — no shell quoting to get wrong.
import { spawnSync } from "bun";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:/tmp/custom.db";
  console.log("[build] DATABASE_URL was unset → defaulting to file:/tmp/custom.db");
} else {
  console.log(`[build] DATABASE_URL = ${process.env.DATABASE_URL}`);
}

const steps = [
  "bun run scripts/copy-db-to-tmp.ts",
  "prisma generate",
  "prisma db push --accept-data-loss",
  "bun run scripts/seed-if-empty.ts",
  "next build",
];

for (const step of steps) {
  console.log(`\n=== build: ${step} ===`);
  const res = spawnSync(["sh", "-c", step], { stdin: "inherit", stdout: "inherit", stderr: "inherit", env: process.env });
  if (res.exitCode !== 0) {
    console.error(`\n=== build: FAILED at "${step}" (exit ${res.exitCode}) ===`);
    process.exit(res.exitCode ?? 1);
  }
}

console.log("\n=== build: complete ===");