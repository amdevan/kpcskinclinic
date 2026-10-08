/**
 * Only seeds the database if it's empty.
 * Run during Vercel build — skips seeding if admin has already made changes.
 */
import { db } from "../src/lib/db";

async function isEmpty(): Promise<boolean> {
  try {
    const count = await db.doctor.count();
    return count === 0;
  } catch {
    return true; // DB not available — try seeding anyway
  }
}

async function main() {
  if (!(await isEmpty())) {
    console.log("📊 Database already has data — skipping seed (preserving admin changes)");
    return;
  }
  console.log("📊 Database is empty — running seed...");
  // Import and run the main seed
  await import("./seed");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
