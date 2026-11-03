// Build orchestrator for Vercel.
//
// Why this exists instead of an inline `&&` chain in package.json:
//   - Prisma's CLI validates the datasource URL at startup (prisma generate /
//     db push), which runs BEFORE the runtime resolveDbUrl() in src/lib/db.ts.
//     With DATABASE_URL unset the build crashes with
//     "the URL must start with the protocol 'file:'" (SQLite) or a connection
//     error (Postgres).
//   - Inline `DATABASE_URL="${DATABASE_URL:-...}" && ...` chains in package.json
//     rely on the shell expanding `${VAR:-default}` exactly the way the build
//     runner parses the script. That is fragile.
//
// This wrapper logs the effective DATABASE_URL and fails fast if it is missing,
// so the error is visible in the build log instead of a cryptic Prisma crash.
// On Vercel the value must be set in the project Settings → Environment
// Variables (it is NOT in vercel.json, which would hardcode a single value for
// every environment).
import { spawnSync } from "bun";

const url = process.env.DATABASE_URL || "";
if (!url) {
  console.error(
    "[build] FATAL: DATABASE_URL is unset. Set it in the Vercel project " +
      "environment variables (e.g. postgresql://user:pass@host:5432/db).",
  );
  process.exit(1);
}
console.log(`[build] DATABASE_URL = ${url}`);

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