# Storion

**Discover. Connect. Progress.** Storion is a global marketplace connecting original films, series and books with industry opportunities. Its cinematic web experience celebrates international storytelling, with African creators prominently represented and a Made in Africa identity.

Live: https://storion-coral.vercel.app

## Current experience

The approved redesigned homepage is served at `/`. All nine redesigned views remain accessible. They now share a clearly labelled fictional demo collection: 20 stories, 10 creators and three industry partners across seven countries. These records are presentation data, not real members, rights offers, investments or marketplace activity.

- Browse and filter stories; open consistent project descriptions, development information and linked creator portfolios.
- Explore fictional studios, distributors and publishers with acquisition criteria and territories.
- Save demo favourites, revisit them and simulate validated expressions of interest. Favourites and simulated activity stay in browser local storage, separate from real account records. Message text is not persisted. If storage is unavailable, the UI explains the limitation.
- Explore South Africa’s cultural discovery collection and fictional progress milestones in Stories in Motion.
- Use **Demo** or **Real** mode within the redesigned AI Matches screen.

The original homepage is preserved unchanged at `/original-home`. Existing real marketplace routes, authentication, Supabase policies and Gemini APIs remain available. The redesigned demo catalogue is not connected to real publishing, interest or favourite writes. Full integration of those interactions is deferred.

## AI matching: two modes

Open `/design/matches` from the screen navigation or a project’s “Explore AI Matches” link.

**Demo mode is the default.** Prepared examples link fictional stories to fictional industry briefs, with explanations and caveats. They are explicitly labelled samples, not AI-generated results. This mode neither calls Gemini nor inserts fictional records into Supabase.

**Real mode** mounts the existing redesigned recommendation panel. An industry/company user signs in with an existing Storion account, explicitly consents, then requests recommendations. The unchanged `/api/recommendations` endpoint reads the signed-in user’s profile and up to 30 recent public database projects, excluding their own projects. Gemini considers supplied format, genre, themes, country, language, development stage, budget/funding, acquisition interests and territories, returning up to five validated project IDs, explanations and caveats. No artificial percentage scores are shown. No private projects or documents are sent. Results are advisory, not commitments.

`/api/matches` remains the existing public-project-to-partner matching endpoint for the original application. It is separate from the new industry-to-project recommendation flow. Gemini credentials stay server-side. Missing configuration, provider failures, role/session restrictions, cooldowns and empty results are surfaced explicitly; no sample fallback is presented as genuine AI output.

## Stack and architecture

- Next.js App Router, React and TypeScript.
- Tailwind CSS/PostCSS and scoped CSS for the approved cinematic design.
- Supabase PostgreSQL, Auth and RLS for real application records; existing private Storage infrastructure remains disabled for the PoC.
- Google Gemini REST API called only by server routes.
- Vercel hosting, reusing the linked Storion project. No Git commit or push is required for an authorised CLI deployment.

Server Components and Server Actions reuse the Supabase SSR client. `proxy.ts` validates/refreshes existing sessions. The browser client uses the public Supabase URL and publishable key; it never receives a service-role key or Gemini secret. React components render the redesigned layouts with individual local artwork, not screenshots of the designs.

```text
app/                         Routes, server actions entry points and API handlers
  page.tsx                   Redesigned default homepage; retains auth-code forwarding
  original-home/page.tsx      Preserved original live-data homepage
  design/[screen]/           Redesigned views and scoped review.css
  api/recommendations/       Real industry-to-project Gemini recommendations
  api/matches/               Existing public-project-to-partner matching
components/
  design-preview.tsx         Nine-screen demo and linked profile/favourite views
  design-ai-modes.tsx        Explicit Demo / Real selector
  design-recommendations.tsx Real authenticated recommendation UI
lib/design-demo.ts           Shared fictional records and prepared sample matches
lib/demo-browser.ts          Browser-local demo favourites/activity; no database writes
lib/                        Existing real queries, actions, types and matching validation
utils/supabase/             Existing browser/server/middleware clients
supabase/migrations/         Versioned SQL; see migration restrictions below
public/                     Individual local photographic/generated artwork
tests/                      Existing targeted matching and policy tests
scripts/                    Existing opt-in integration/setup helpers
Storion_Documentation_Pack_v3/Storion_Documentation/
                            Original roadmap and requirements; TASKS.md is the live record
```

## Local setup

Prerequisites: a Node.js version satisfying the installed Next.js package’s engine requirement, npm, and access to the existing Supabase project for real mode. The fictional catalogue needs no database seeding. The existing application proxy expects public Supabase environment settings even when exploring demo pages.

For a fresh checkout:

```sh
npm ci
```

Copy `.env.example` to `.env.local` and populate it privately. Preserve an existing `.env.local` instead of replacing it. Safe example:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
GEMINI_API_KEY=your-server-only-gemini-key
GEMINI_MODEL=your-enabled-gemini-model-id
REGISTRATION_MODE=demo
DOCUMENT_STORAGE_READY=false
```

The Gemini model must be an available `gemini-*` model authorised for the configured account. Use the existing working setting when resuming this workspace. Never prefix `GEMINI_API_KEY` with `NEXT_PUBLIC_`. Never include `.env.local`, passwords, tokens or generated test artifacts in Git or deployment uploads. Optional `TEST_CREATOR_EMAIL`, `TEST_CREATOR_PASSWORD`, `TEST_INDUSTRY_EMAIL` and `TEST_INDUSTRY_PASSWORD` are only for explicitly authorised local integration exercises and must not be deployed.

```sh
npm run dev          # http://localhost:3000
npm run typecheck    # targeted static verification when needed
npm run build        # production build
npm start            # serve the production build
```

Targeted UI lint can be run on changed component paths. Existing matching tests can be run with `node --experimental-strip-types --test tests/matching.test.mjs`. Do not run broad or mutating integration scripts merely to view the demo. `scripts/verify-hosted.mjs --write-demo` is explicitly opt-in and can create/update labelled database demonstration records; it is not required for this milestone.

## Routes

| Experience | Route |
| --- | --- |
| Default redesigned homepage | `/` |
| Preserved original homepage | `/original-home` |
| South Africa Spotlight | `/design/spotlight` |
| Stories in Motion | `/design/motion` |
| Redesigned homepage alias | `/design/home` |
| Catalogue, search and filters | `/design/discover` |
| Project detail | `/design/detail?story=baobab` |
| AI Matches, Demo / Real modes | `/design/matches` |
| Simulated expression of interest | `/design/interest?story=baobab` |
| Welcome | `/design/welcome` |
| Featured discovery | `/design/featured` |
| Creator/industry directory | `/design/people` |
| Creator biography and portfolio | `/design/creator?person=amina` |
| Industry profile and acquisition interests | `/design/industry?person=lumen` |
| Browser-local demo favourites | `/design/favourites` |

The existing real application remains at `/discover`, `/projects/new`, `/projects/[id]`, `/projects/[id]/edit`, `/projects/[id]/interest`, `/projects/[id]/matches`, `/people`, `/people/[id]`, `/profile/edit`, `/dashboard`, `/login`, `/auth/callback`, `/spotlight` and the existing document routes. Real mode stays inside the new AI Matches screen; it does not redirect to the original matching UI.

## Supabase, authentication and migrations

Reuse the existing project. The foundation migration `supabase/migrations/202611100001_foundation.sql` was previously applied successfully: **do not rerun it on this project**. For a separately authorised fresh environment, review the SQL and configure Supabase Auth/RLS according to the V3 documentation. No migrations or schema changes are required for the fictional demo dataset or the new AI mode selector.

The document-read policy repair `202611110001_document_read_policy.sql` has **not** been approved/applied remotely. The product owner explicitly declined it for the PoC. Keep `DOCUMENT_STORAGE_READY=false` and document sharing disabled; do not apply the repair or enable uploads/downloads as part of demo setup. The existing `project-documents` bucket and resources are preserved.

The sprint uses confirmed demo accounts for real authenticated journeys. `REGISTRATION_MODE=demo` keeps public registration unavailable in the application; email confirmation remains enabled. Custom SMTP is needed before public signup can be opened. Supabase Auth’s existing Site URL and allowed deployed/local `/auth/callback` URLs remain in place. The root homepage still forwards confirmation codes to the existing callback.

## Deployment and verification status

Production uses the existing linked `storion` Vercel project and https://storion-coral.vercel.app. Preserve its environment variables and `.vercel/project.json`. `.vercelignore` excludes secrets, test artifacts, source-control internals and local dependencies. Do not deploy through Git commits/pushes unless the owner requests that workflow.

Before this demo milestone, the real redesigned recommendation journey was verified locally with the confirmed industry account: sign-in, consent, genuine Gemini explanation and a displayed recommendation independently matched to a public Supabase project. Authentication, role and consent restrictions were checked. Those implementations are reused unchanged in Real mode.

For this milestone, TypeScript and targeted UI lint passed during implementation. The production build and deployment outcome are recorded in the latest TASKS.md entry. Per the requested efficient verification scope, no exhaustive route walkthrough, screenshots, full test suite or additional Gemini calls are required.

## Limitations and deferred work

- Fictional biographies, budgets, progress milestones, sample matches and simulated submissions are not real opportunities or commercial commitments. Images are illustrative artwork, not identity verification.
- Browser-local favourites/activity are device-specific, can be cleared by the browser, and are separate from authenticated marketplace state. No messages are actually sent. Demo video/social controls show explanatory previews; no teaser streaming or configured social destinations are provided.
- Real recommendations depend on available public database records, profile quality, configured Gemini access and provider quotas. The existing per-instance cooldown is not a distributed rate limiter.
- Existing backend marketplace functionality is preserved; fully integrating redesigned publishing, profiles, interest and tracking with real account actions remains deferred.
- Public registration, document sharing, full messaging, contracts, licensing, payments and a collaboration workspace are outside the immediate demo milestone.

The original seven-phase roadmap remains unchanged in `DEVELOPMENT_PLAN.md`. The immediate demo scope and its verification/deployment status are tracked separately in `TASKS.md`.
