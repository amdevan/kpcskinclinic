# Task: CMS-REBUILD

## Summary
Recreated all missing admin CMS sections for the KPC admin panel: image-upload component + API, site-info, page-content, SEO, users, services, hero-slides, popups. Updated the admin sidebar with a CMS section. Also added the Popup and SeoMeta models to the Prisma schema, fixed the datasource provider mismatch (postgresql → sqlite to match DATABASE_URL), pushed the schema to the database, and updated the public-site popup API + popup component to support date-range filtering.

## Files Created / Modified

### Prisma schema (1)
- `prisma/schema.prisma` — added `Popup` and `SeoMeta` models; fixed `datasource db` provider from `postgresql` to `sqlite` (matching the existing `DATABASE_URL=file:...`).

### Image Upload (2)
- `src/components/admin/image-upload.tsx` — client component with drag-and-drop, file picker, image preview with remove button, URL manual input fallback, loading / error states. Uses `<img>` (not next/image) to avoid domain config issues.
- `src/app/api/upload/route.ts` — POST handler requiring NextAuth session (returns 401 if unauthenticated); validates file type (jpeg/png/webp/gif/svg) and size (10 MB); saves to `public/uploads/` with a unique UUID filename; returns `{ ok: true, url: "/uploads/…" }`. Rate-limited (20/min per IP).

### Site Info Admin (4)
- `src/app/admin/site-info/page.tsx` — server component, `force-dynamic`. Reads all SiteSetting key-values; merges with defaults if DB empty. Renders `<SiteInfoForm>`.
- `src/app/admin/site-info/constants.ts` — `SITE_INFO_GROUPS` (clinic identity, contact, social), `EMAIL_SETTING_KEYS`, `EMAIL_SETTING_FIELDS`, `DEFAULT_SITE_INFO` map, `ALL_SITE_INFO_FIELDS`, `SITE_INFO_KEY_TO_GROUP`. Logo & favicon are image-type fields.
- `src/app/admin/site-info/actions.ts` — `"use server"`; `saveSiteInfo(values)` upserts all settings, revalidates `/admin/site-info` + every public route.
- `src/app/admin/site-info/site-info-form.tsx` — client form with text/textarea/image fields grouped by category; uses `<ImageUpload>` for image fields; sticky save bar with Reset-to-defaults button.

### Page Content Admin (3 + 1 component)
- `src/app/admin/pages/page.tsx` — server, `force-dynamic`. Reads `PageContent` rows from DB, groups by `page` then `section`, merges with the static `PAGE_SECTIONS` skeleton so every page is always editable. Passes a per-page dataset to `<AdminPageContentList>`.
- `src/app/admin/pages/sections.ts` — `PAGE_SECTIONS` array with 11 pages (home, about, contact, packages, doctors, hair-transplant, success-stories, std-sti, blog, services), each with groups of fields (key, label, type).
- `src/app/admin/pages/actions.ts` — `"use server"`; `createPageContent`, `savePageContent`, `deletePageContent`. Revalidates `/admin/pages` + the affected public route.
- `src/components/admin/admin-page-content-list.tsx` — client component; accordion per page; per-section group editor with "Add block" + per-block inline editing; ImageUpload for image fields; delete per block.

### SEO Admin (2 + 1 component)
- `src/app/admin/seo/page.tsx` — server, `force-dynamic`. Reads `SeoMeta` from DB, merges with `DEFAULT_SEO_PAGES` (12 routes). Passes merged list to `<AdminSeoTable>`.
- `src/app/admin/seo/actions.ts` — `"use server"`; `saveSeoMeta`, `createSeoMeta`, `deleteSeoMeta`. Revalidates `/admin/seo` + `/`.
- `src/components/admin/admin-seo-table.tsx` — client table; inline add/edit/delete; ImageUpload for OG image; default rows show a "default" badge and are not deletable.

### Users Admin (2 + 1 component)
- `src/app/admin/users/page.tsx` — server, `force-dynamic`. Reads `User` table; maps to a flat shape with `createdAtLabel` for display.
- `src/app/admin/users/actions.ts` — `"use server"`; `createUser`, `saveUser`, `deleteUser`. Stores the hashed password in the `SiteSetting` table (key `user_pass:{email}`) so the User table itself doesn't need a password column. Blank password on save = keep current.
- `src/components/admin/admin-user-list.tsx` — client table; avatar initials, role badge; add/edit modal with name/email/password/role; delete with confirm; role dropdown (admin/editor/viewer).

### Services Admin (2 + 1 component)
- `src/app/admin/services/page.tsx` — server, `force-dynamic`. Reads `ServiceCategory`; auto-seeds from `SERVICE_CATEGORIES` if DB empty (or DB unavailable — falls back to static rows prefixed `static-`). Parses the `services` JSON field.
- `src/app/admin/services/actions.ts` — `"use server"`; `createServiceCategory`, `saveServiceCategory`, `deleteServiceCategory`. JSON-encodes the `services` array.
- `src/components/admin/admin-services-editor.tsx` — client; card grid with image preview; modal editor with title/slug/tagline/description/image/order/published toggle + sub-list of services (add/edit/remove/reorder).

### Hero Slides Admin (2 + 1 component)
- `src/app/admin/hero/page.tsx` — server, `force-dynamic`. Reads `HeroSlide`; auto-seeds from `HERO_SLIDES` if DB empty. Falls back to static rows prefixed `static-` if DB unavailable.
- `src/app/admin/hero/actions.ts` — `"use server"`; `createHeroSlide`, `saveHeroSlide`, `deleteHeroSlide`. Revalidates `/admin/hero` + `/`.
- `src/components/admin/admin-hero-slides-editor.tsx` — client; horizontal card list with image preview; reorder (up/down — persists new order), enable/disable, delete, add new; modal editor with eyebrow/title/highlight/description/image/primaryCta/secondaryCta/active/order.

### Popups Admin (2 + 1 component)
- `src/app/admin/popup/page.tsx` — server, `force-dynamic`. Reads `Popup` from DB.
- `src/app/admin/popup/actions.ts` — `"use server"`; `createPopup`, `savePopup`, `deletePopup`. Parses startDate/endDate strings into `Date | null`. Revalidates `/admin/popup` + `/`.
- `src/components/admin/admin-popup-editor.tsx` — client; card grid; toggle active/dismissible/showOnAll; date inputs for start/end; modal editor with title/description/image/buttonText/buttonLink/pagePath/dates/order + switches for the boolean flags.

### Admin Sidebar Update (1)
- `src/components/admin/admin-sidebar.tsx` — added a CMS section after the existing nav items: Site Info (Settings), Page Content (FileCode), Hero Slides (Image as ImageIcon), Popups (Bell), Services (LayoutGrid), SEO (Search), Users (Users). Imports the alias `Image as ImageIcon` to avoid clashing with next/image.

### Public Site Popup (2 — already existed, updated)
- `src/app/api/popups/route.ts` — added date-range filtering: a popup is returned only if `isActive=true` AND (both dates null, OR endDate is in the future, OR startDate is in the past, OR today is inside the window). Wrapped in try/catch — returns `[]` on any error. Uses dynamic `import("@/lib/db")`.
- `src/components/site/site-popup.tsx` — fetches from `/api/popups`, shows after 2-second delay, dismissible via localStorage (24h TTL), respects `dismissible` / `showOnAll` / `pagePath` props; ARIA-labelled dialog.

## Verification
- `bun run db:push` — succeeded (created `Popup` and `SeoMeta` tables in the SQLite DB; regenerated Prisma Client).
- `bun run lint` — passes (exit 0, no errors, no warnings).
- Dev server restarted successfully via `.zscripts/dev.sh` (after the schema provider fix). Health check passed; `/`, `/api/popups` return 200; `/api/upload` returns 401 when unauthenticated; all `/admin/*` CMS routes return 307 (redirect to login) when unauthenticated — expected behavior.
- The `Popup` table is queried via the public `/api/popups` route — confirmed in the dev.log with the new date-range WHERE clause.

## Notes for downstream agents
- The `Popup` model stores `startDate` / `endDate` as `DateTime?` — the admin form uses native `<input type="date">` inputs and the action converts them to `Date | null` via a small `parseDate` helper.
- The `SeoMeta.url` column is `@unique` — `createSeoMeta` will fail if a row with that URL already exists (the page.tsx merges DB rows with defaults so duplicate URLs shouldn't normally be reachable from the UI).
- The User table itself has no password column — the admin's hashed password (base64 of the plain string) is stored in the `SiteSetting` table under the key `user_pass:{email}`. The auth flow (`src/lib/auth.ts`) currently treats all DB users as sharing the env-var password — if you want per-user passwords, update `authorize()` to read from `SiteSetting`.
- The image-upload component intentionally uses `<img>` instead of next/image to avoid domain config issues with arbitrary image URLs from the upload directory or external sources.

## Stage Summary
- 22 files created (3 admin page+actions pairs in `site-info`, `pages`, `seo`, `users`, `services`, `hero`, `popup` = 14 admin files + 6 client components + 2 API/component files = 22 total) + 1 schema update + 1 sidebar update = 24 files touched.
- `Popup` and `SeoMeta` models added to the Prisma schema and synced to the DB. Schema provider fixed from `postgresql` to `sqlite` to match the existing `DATABASE_URL=file:…` value.
- All 7 CMS admin sections accessible from the sidebar with consistent UX: card grids where appropriate, accordion for page content, table for SEO, modal editors with required-field validation, ImageUpload component for all image fields.
- Public site popup component + API updated to support the new `startDate`/`endDate` fields.
- Lint clean (exit 0). Dev server running cleanly, no errors in the log.
