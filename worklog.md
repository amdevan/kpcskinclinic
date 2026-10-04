---
Task ID: ADMIN-REBUILD
Agent: full-stack-developer
Task: Rebuild the full admin panel/CMS at /admin

Work Log:
- Inspected project: confirmed Next.js 16 + App Router, Prisma/SQLite, next-auth v4 already installed.
- The original prisma schema only had User/Post/Appointment/NewsletterSubscriber — added CMS models Doctor, Treatment, Package, BlogArticle, StdTest (with JSON-encoded list fields because SQLite has no native array type). Ran `bun run db:push` to sync the DB and `bun run db:generate` for the client.
- Added `ALL_PACKAGES` export to `src/lib/site-data.ts` (built from PRICING_FULL) so the seed script can populate the Package table.
- Auth:
  - `src/lib/auth.ts` — NextAuth options with CredentialsProvider, env-var super-admin + DB-user fallback, JWT session, custom signIn page `/admin/login`, role callback.
  - `src/app/api/auth/[...nextauth]/route.ts` — handler re-export.
  - `src/middleware.ts` — withAuth allowing `/admin/login` only; all other `/admin/*` require a token. matcher: `["/admin/:path*"]`.
  - Populated `.env` with NEXTAUTH_SECRET, NEXTAUTH_URL, ADMIN_EMAIL, ADMIN_PASSWORD (was missing).
- Admin chrome:
  - `src/app/admin/layout.tsx` (server) — getServerSession; bare-render when no session (login route), otherwise sidebar + topbar + main.
  - `src/components/admin/admin-sidebar.tsx` (client) — w-64 fixed sidebar, bg-ink/text-cream, 8 nav items with usePathname active state, sign-out button, "View site" link.
  - `src/components/admin/admin-topbar.tsx` (client) — sticky h-14, search input, bell with notification dot, user avatar + name (passed as prop from the server layout to avoid needing a SessionProvider).
- Login page `src/app/admin/login/page.tsx` — full-screen bg-ink, KPC logo, prefilled email field, `signIn('credentials', { redirect:false })`, error display, redirect to `/admin` on success, default-credentials hint, link back to `/`.
- Dashboard `src/app/admin/page.tsx` (server, force-dynamic) — counts + recent 5 appointments, 6-card stat grid (AdminStatCard), two-column layout with AdminRecentAppointments + appointment-status breakdown + quick actions.
  - `src/components/admin/admin-stat-card.tsx` — colored icon, big number, label; color map for brand/cyan/green/gold/rust/ink.
  - `src/components/admin/admin-recent-appointments.tsx` — recent-appointment list with avatar, name, service+phone, status badge, date.
- Appointments CRUD:
  - `src/app/admin/appointments/page.tsx` (server) — reads `searchParams.status`, queries filtered appointments, builds per-status count map.
  - `src/app/admin/appointments/actions.ts` — `"use server"` dbAppointmentAction(id, "update"|"delete", data) using db.appointment + revalidatePath.
  - `src/components/admin/admin-appointments-table.tsx` (client) — filter tabs with counts, table with expandable detail rows, confirm/complete/cancel/delete buttons using the action + local state sync.
- Doctors CRUD:
  - `src/app/admin/doctors/page.tsx` — queries all doctors ordered by `order`, deserializes JSON fields for the client.
  - `src/app/admin/doctors/actions.ts` — dbDoctorAction supporting create/update/delete/toggle-publish; JSON-encodes list fields.
  - `src/components/admin/admin-doctor-list.tsx` (client) — card grid with image, role, credentials, specialties; inline edit form; publish-toggle (eye/eye-off); delete; "Add new doctor" modal form.
- Reusable list for Treatments/Packages/Blog/StdTests:
  - `src/components/admin/admin-simple-list.tsx` (client) — generic table (Title, Category, Status, Actions), inline edit modal driven by `fields` config, add-new modal, publish toggle, delete; accepts the server-action function as the `action` prop (not a string path). Booleans are passed as "true"/"false" strings and converted by the per-resource action handlers.
  - Treatments: page + actions with full field list (slug, title, category, heroImage, tagline, intro, metaDescription, startingPrice, sessions, note, subsections, resultsReality, suitabilityIdeal, suitabilityNotIdeal, faq, comparisonTable) — JSON-encoded by the action.
  - Packages: page + actions; string→bool conversion for `popular`.
  - Blog: page + actions with title/slug/excerpt/body/date/author/category/image/readTime.
  - Std-tests: page + actions; string→bool conversion for `isPackage`/`recommended` and parseInt for `tests`.
- Subscribers `src/app/admin/subscribers/page.tsx` — stat cards (total/active/unsubscribed) + table with email, source, date, status badge.
- Seed script `scripts/seed.ts` — imports DOCTORS, TREATMENTS, REMAINING_TREATMENT_SLUGS, ALL_PACKAGES, STD_STI_PACKAGES, STD_STI_INDIVIDUAL_TESTS, BLOG_ARTICLES from `@/lib/site-data`; idempotent upserts (doctors/treatments/blog by slug, packages/stdtests by name); skips lightweight-treatment creation if the slug already exists.
- Verification:
  - `bun run lint` — passes (exit 0).
  - `bun run scripts/seed.ts` — seeded 6 doctors, 2 full + 30 lightweight treatments (32 total), 28 packages, 5 packages + 15 individual STD tests (20 total), 6 blog articles.
  - curl smoke test: `/admin/login` → 200 (no auth needed). All other `/admin/*` routes → 307 redirect to `/admin/login?callbackUrl=…` when unauthenticated, → 200 after sign-in. Verified the full sign-in flow via the credentials callback (admin@kpcskin.com / kpc-admin-2026).

Stage Summary:
- All admin files rebuilt from scratch: auth (3), layout + chrome (3), login (1), dashboard (3), appointments CRUD (3), doctors CRUD (3), reusable simple-list (1), treatments/packages/blog/std-tests CRUD (8 = 2 each), subscribers (1), seed script (1) — plus prisma schema and `.env` updates and the new `ALL_PACKAGES` site-data export.
- Auth flow working end-to-end: NextAuth CredentialsProvider validates against env-vars and DB users, middleware guards `/admin/*`, login page is publicly accessible.
- Database seeded with all production-ready content; admin panel renders every section without 500s.
- Lint clean, no TypeScript errors, dev server serving all routes correctly.
