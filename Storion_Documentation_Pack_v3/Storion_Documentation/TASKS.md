# Storion Implementation Tasks

## Approved GitHub source handover — 2026-11-11

- The owner explicitly authorised committing the complete approved project and pushing to the existing `main` branch at https://github.com/simonehd/storion.git, superseding the earlier no-commit/no-push restriction for this handover.
- Source-delivery preflight passed: 118 intended files before this documentation update, including all nine V3 Markdown files, both SQL migrations, source code, required local artwork, lockfile and safe configuration examples. No deletion or application/deployment configuration change required.
- Exact local credential-value and common secret-pattern scans found no matches in the intended text files. `.env.local`, dependencies, build outputs, `.vercel` credentials and `.local-tests` artifacts are excluded by `.gitignore`; `.env.example` is included. The storage-policy repair is included as versioned source only and remains unapplied/unapproved for the PoC.
- Git commit and push results are recorded in the delivery response and repository history. Earlier checkpoint statements about no commits/pushes describe their respective implementation increments.


## Cohesive redesigned demo milestone — deployed

Authoritative immediate milestone; earlier checkpoints below are historical.

- [x] Added `lib/design-demo.ts`: 20 shared fictional stories, 10 creators, three industry partners, development details, themes, languages, territories, budgets and three prepared sample matches. All profile/project/sample references pass a targeted consistency check. No fictional records inserted into Supabase.
- [x] All nine approved views now use the shared collection. Homepage includes featured story/creator/industry cards; Discover searches titles, creators, themes, countries and languages with format/genre/stage/country filters. Details, team and update tabs use each story's actual demo metadata. Featured discovery and Stories in Motion reuse the same story IDs.
- [x] Added linked demo people directory, creator biographies/portfolios, industry acquisition profiles and favourites views within the approved visual system. Country Spotlight includes the shared South African creators and cultural story context; its collection counts derive from the fictional dataset.
- [x] Favourites persist across demo screens using browser local storage. Interest forms validate message/category selection, clearly simulate confirmation, and record only browser-local activity; message text is not persisted. Header demo activity reflects those simulations. No actual messages or marketplace writes occur.
- [x] New AI Matches screen defaults to clearly labelled Demo mode with prepared sample explanations. Real mode mounts the existing `DesignRecommendations` component unchanged, preserving the authenticated/consented `/api/recommendations` Gemini flow. No Gemini requests occur from Demo mode. Existing real recommendation API, matching logic and security restrictions untouched.
- [x] README rewritten to distinguish fictional demo interactions, real AI/backend functionality, setup/env, routes, migrations and deferred work. DESIGN_REVIEW.md updated. AGENTS.md reviewed; no instruction changes needed. DEVELOPMENT_PLAN.md is unchanged. `/original-home` remains unchanged.
- [x] TypeScript and targeted lint passed during implementation; shared-data field and cross-reference check passed. No full suite, browser walkthrough, screenshots or new Gemini calls for this milestone, as requested.
- [x] One local production build passed, including TypeScript and route generation. Existing-project production deployment dpl_EwbjogQfAo7w24aVx6S8qFRdLuyu is READY and aliased to https://storion-coral.vercel.app. No exhaustive live-route checks or browser walkthrough were performed, per the requested minimal verification scope. No Git commits or pushes. Document sharing stays disabled; no infrastructure or schema changes.


## Redesigned AI matching integration — verified locally, not deployed

- [x] `/design/matches` now uses `components/design-recommendations.tsx` and the existing `/api/recommendations` endpoint. Fictional partner recommendations, explanations and percentage scores removed from this screen. Approved panel/card styling and expandable explanations retained.
- [x] Existing Supabase browser authentication reused within the new matching panel, with industry/company role gating and explicit Gemini consent. Loading, empty, session/role and API error states implemented. Only public project/profile matching data goes through the unchanged server-side Gemini implementation; no private documents are sent.
- [x] Local browser journey verified with the existing confirmed industry demo account: sign in in the redesigned screen, consent, request Gemini, display and expand the actual recommendation and caveat. Gemini returned one recommendation for the existing database demonstration project; its displayed ID/title/public visibility were independently checked against Supabase. No records created or edited.
- [x] Targeted TypeScript and UI lint passed. Existing matching tests: 3 passed. Signed-out request rejected (401), creator role rejected (403), missing industry consent rejected (400). Responsive AI panel checked at 390px with no page overflow.
- `/original-home`, existing API routes, Gemini logic, database schema and policies remain untouched. Other redesigned screens retain their previous mock interactions. No deployments, Git commits or pushes performed for this increment. Document sharing remains disabled. Existing backend bounds remain: up to 30 recent public projects considered, up to five recommendations, existing per-user cooldown/provider limits.


## Homepage promotion — 2026-11-11

- Approved redesigned homepage now renders at `/`, reusing the existing `DesignPreview` home component and stylesheet. The original homepage was copied byte-for-byte to `/original-home` before replacing the root page; its live project/spotlight loading and links are preserved.
- Root authentication-code redirect retained. All nine `/design/...` routes and their navigation are unchanged. No backend, API, database, Auth, Gemini or marketplace logic changes; no Stage 2 integration. Document sharing remains disabled.
- Production build including TypeScript and targeted lint passed. Backup SHA-256 matches the original root page (E56F72FCFA7FF54B04CB270B00D01BFB12843EEBB73EB4A4F4A30D1CC5E1FDFC). Existing-project deployment dpl_DPrAzqd676S1qJqpQnJBTSdqejn9 is READY at https://storion-coral.vercel.app. Live verification of the homepage, backup and nine review routes remains unconfirmed because the verification command was declined. No Git commits or pushes.


## Current stage: approved React reconstruction — deployed

- [x] Nine independent static views implemented under /design/spotlight, /design/motion, /design/home, /design/discover, /design/detail, /design/matches, /design/interest, /design/welcome and /design/featured. These are the authoritative Stage 1 review routes; earlier application routes are preserved for later integration.
- [x] Superseded the screenshot-crop implementation with real React/HTML/CSS/SVG components and individual local artwork. No reference screenshot is rendered in the nine review views. Interactive local mock navigation, filters, carousels, bookmarks, menus, tabs, match explanations and form validation/feedback implemented.
- [x] Compared all nine views visually on desktop; refined duplicated source lettering, art ratios, portrait/logo crops, detail scenery and mobile editorial cropping. All nine fit at 768px and 390px without horizontal page overflow.
- [x] TypeScript and targeted lint checks passed for the static review code. No functional tests run. Review views have no Supabase/Auth/Gemini/action imports or API calls.
- [x] DESIGN_REVIEW.md updated with all nine direct review links. Local preview running for user review at http://localhost:3000/design/spotlight.
- User approved the nine-screen rebuild and authorised deploying the latest local changes to the existing Vercel project. Production build, TypeScript and targeted lint passed. Deployment READY: dpl_z5ZFiDsLYdou8zK3H1v1fuKj26kp, https://storion-coral.vercel.app/design/spotlight. All nine production review routes returned HTTP 200 with the rebuilt React UI. No Stage 2 integration, backend, database, authentication or API changes. No Git commits or pushes. Document sharing remains disabled. Earlier redesign checkpoints below are historical.

## UI redesign checkpoint — three new references

- User clarified that the references represent **nine distinct screens**. Added /welcome and /featured-discover as separate responsive web translations of the two phone-reference screens, without device frames. All nine routes are listed in root DESIGN_REVIEW.md; no screens combined or omitted.
- Final TypeScript check passed for all nine views. Targeted UI lint completion recorded below. Existing photographic assets are now local under public/cinema; only image-source presentation was changed in lib/demo.ts, with story metadata and business logic preserved.
- Targeted lint passed for the changed UI components and nine-screen page sources (exit 0). Local visual review covered Country Spotlight, Stories in Motion and Express Interest; mobile country-page overflow check passed. Other screens received shared styling and type/lint checks; comprehensive visual parity review remains outstanding. Preview server stopped after review. No functional integration tests or deployment performed for this UI-only increment.

- Latest user scope is UI/UX only. The three supplied Downloads images supersede earlier visual direction. No API, database, Auth, Gemini or marketplace business logic changed; no functional tests, migrations, commits or pushes performed.
- Shared cinematic design layer added in app/cinema.css: dark layered surfaces, warm gold buttons, illuminated borders, serif hierarchy, responsive web layouts, icon navigation, refined cards, details tabs and forms.
- South Africa Spotlight rebuilt with editorial portrait/landscape hero, About panel, five-card feature rail and labelled illustrative metrics; existing cultural content retained below.
- New /stories-in-motion web page contains cinematic hero and Recently Funded/Produced/Distributed visual rails with explicitly illustrative content.
- Homepage, Discover, Project Detail, AI Matches and Express Interest restyled. Static demo match cards are explicitly not AI results; demo interest form is non-submitting. Existing real forms/integrations retained.
- Separate generated local imagery: public/south-africa-editorial.webp and public/stories-in-motion.webp. Source reference images unchanged. Existing homepage globe/camera asset reused.
- Typecheck and targeted UI lint passed. Local responsive country-page check found no horizontal overflow at 390px. Final UI typecheck/visual review in progress. Redesign saved locally; production remains the prior verified PoC release.

## Current PoC release status — 2026-11-11

- [x] Final checks: public people/spotlight pages HTTP 200; invalid auth callback redirects to login; both AI endpoints reject cross-origin requests with 403; final mobile page document width fits viewport and browser console shows no errors. No new application changes were needed. Demo handover saved in root DEMO.md. Current production release remains dpl_2FwmNn1Q6CeTRkNTQdj7nT15ZGmN.

Authoritative latest status; earlier checkpoint entries below are retained as history.

- [x] Deployed visual experience, including editorial Country Spotlight immediately below navigation, global branding, profiles, discovery and project details.
- [x] Verified production creator-to-industry publishing, discovery, interest and status journey.
- [x] Verified genuine industry-to-project Gemini recommendations and explanations in production.
- [x] Ownership declarations and public/private listing isolation verified.
- [x] Confirmed demo-account mode selected by user; public email signup deferred until SMTP setup.
- [x] Final release cleanup: unavailable document controls removed and demonstration instructions updated. Production cleanup deployment READY: dpl_2FwmNn1Q6CeTRkNTQdj7nT15ZGmN. Typecheck and cloud production build passed.
- Document sharing is **excluded from this PoC by explicit user decision**. The storage-policy repair is not approved and must not be applied. Keep DOCUMENT_STORAGE_READY disabled. This is an accepted scope exclusion, not a pending approval request. The original long-term roadmap remains unchanged.
- Production: https://storion-coral.vercel.app. No routine Git commits or pushes.

## Instructions

This file is the live progress tracker for the seven-phase plan in `DEVELOPMENT_PLAN.md`.

- Keep it updated as work progresses.
- Use `[ ]` for not started, `[-]` for in progress, and `[x]` for completed.
- Only mark work complete after implementation and relevant verification.
- Record blockers and manual user actions.
- Do not change the scope or reorder the seven phases without approval.

## Phase 1: Foundation and architecture

- [x] Create Next.js project with React and TypeScript.
- [x] Configure Tailwind CSS.
- [x] Create/configure GitHub repository.
- [ ] Set up Supabase PostgreSQL, authentication and storage.
- [x] Design and implement database schema.
- [x] Create and maintain `AGENTS.md`.
- [x] Deploy initial application to Vercel.
- [x] Verify running application foundation.

**Phase status:** PoC foundation, hosted Auth and production deployment verified. Document sharing is excluded. All ten public tables and RLS were verified remotely. Earlier checkpoint entries below are historical.

## Immediate PoC delivery — 2026-11-11

The user authorised the five-batch PoC scope. The seven-phase roadmap below remains the long-term roadmap. No migration reruns, new infrastructure, dependency reinstallations, commits or pushes were performed in this implementation increment.

- [-] Batch 1: Homepage, navigation, discover/search/filter UI, project cards/details, responsive styles and Made in Africa footer implemented. Curated fictional projects are labelled. Browser/reference comparison remains outstanding.
- [-] Batch 2: Registration/login, protected dashboard, creator/industry/company profile editing, project create/edit, public/private ownership declarations, favourites and duplicate-safe interest actions implemented. Typecheck passed after these additions; hosted two-account journey remains unverified.
- [-] Batch 3: Server-side Gemini route and matching interface implemented. Explicit consent, public-only project input, structured output validation, provider error handling and per-instance request cooldown included. Fictional opportunity briefs are used only with fictional demo projects. GEMINI_API_KEY and GEMINI_MODEL are absent; user asked to configure them securely. No AI success claimed.
- [-] Batch 4: Interest status/activity dashboard, private PDF upload/download, owner grants/revocation and recipient document list implemented. Downloads recheck RLS and do not expose permanent links. November South Africa curated Spotlight and published monthly database edition lookup implemented. Hosted bucket/upload tests outstanding.
- [-] Batch 5: Typecheck passed after document implementation. Lint/database tests currently running; new matching/validation tests added. Production build, responsive browser checks, hosted critical journeys and Vercel deployment remain outstanding.

**Files changed:** app routes and globals, components/, lib/, next.config.ts, .env.example, tests/matching.test.mjs and this tracker. Existing .env.local and applied migration untouched.

**Access blockers:** Gemini credentials/model missing. Vercel CLI is not installed and signed-in deployment access is not verified. Authenticated hosted two-account tests require usable test accounts. Storage bucket and grants have not been independently reverified since the successful migration transaction.

**Disk:** Approximately 1.18 GB free at latest inspection; .next is approximately 36.7 MB. No cleanup performed. Monitor during build and avoid new package downloads.

### Verified checkpoint — 2026-11-11, continued

- [x] Local lint, typecheck and production build pass. Four local tests pass, including the expanded storage correlation regression after applying the repair in the isolated test database only.
- [x] Browser verified 390px mobile homepage/discovery/detail layouts, search reducing seven demo results to one, desktop AI consent screen and signed-out dashboard redirect. No horizontal homepage overflow at 390px or 1440px.
- [x] New cinematic globe/camera/chair hero generated as a separate asset: public/storion-hero.webp (about 166 KB); prompt/tool provenance in public/storion-hero-provenance.txt. Original screenshot unchanged.
- [x] Confirmed two distinct supplied test accounts. Hosted integration exercised actual application sign-in/profile/project/favourite/interest actions: private draft isolation, public publication with ownership declaration, unauthorized edit denial, duplicate interest denial, status RPC/history and signed-in pages all passed. Synthetic labelled demo records retained; IDs in ignored .local-tests/poc-state.json. Existing profiles were preserved.
- [x] Genuine Gemini match verified through authenticated /api/matches (HTTP 200) for the real hosted demo project and industry profile, with a validated explanation and caveat. Gemini 2.5 Flash returned 404 (unavailable to new users); 3.8 Flash timed out twice. Gemini 3.5 Flash-Lite worked; only GEMINI_MODEL was updated in .env.local, preserving credentials. Generation uses LOW thinking for Gemini 3 models.
- [-] Vercel CLI installed in npm cache, authorised by the user, and team inventory verified empty. Created one storion project under simone-s-team2 and linked the existing workspace. CLI appended its managed OIDC value to .env.local; existing settings preserved. Production environment configuration/deployment in progress. No Git commit/push.

**Critical storage finding:** Expanded tests exposed the ambiguous `d.storage_path=name` comparison in the original storage SELECT policy. A crafted document display name could authorize unrelated storage objects. Repair is prepared at supabase/migrations/202611110001_document_read_policy.sql, changing only the comparison to `d.storage_path = storage.objects.name`. It passes owner/recipient/revocation and cross-object isolation tests. The original foundation migration remains untouched. The user explicitly answered **“Do not apply yet”**: no remote repair has been run. Document upload, permission actions and download routes fail closed until DOCUMENT_STORAGE_READY=true. Do not set that flag or advertise document sharing as working until the repair is approved, applied and verified. This remains a delivery blocker.

**Remaining:** Production deployment and verification; Auth URL configuration/registration confirmation journey; hosted document upload/download/grants/revocation after policy approval. Full browser form journey is not yet exercised, although server-action HTTP integration passed. Native Chrome was used only for Vercel authorization; no Supabase changes were made in this checkpoint.

## Phase 2: Build the user interface

- [ ] Implement the approved Storion visual design.
- [x] Build Homepage.
- [x] Build Discover page.
- [x] Build project cards and filters.
- [x] Build project detail pages.
- [x] Build creator profiles.
- [x] Build industry professional and company profiles.
- [ ] Build monthly Country Spotlight, showcasing all cultures within the featured country.
- [x] Implement responsive desktop and mobile layouts.
- [ ] Verify complete visual experience with demonstration data.

**Phase status:** Reduced PoC work delivered; unchecked items retain the long-term scope and verification requirements.

## Phase 3: Marketplace functionality

- [ ] Implement registration and login.
- [x] Implement creator and industry profile management.
- [x] Implement project creation and editing.
- [x] Support films, series and books.
- [x] Support idea-stage and completed projects.
- [x] Implement search and filtering.
- [x] Implement favourites.
- [x] Implement expressions of interest.
- [x] Verify working marketplace flows.

**Phase status:** Reduced PoC work delivered; unchecked items retain the long-term scope and verification requirements.

## Phase 4: AI-powered matching

- [x] Integrate Google Gemini API securely as the initial configurable AI provider.
- [x] Implement matching using format and genre.
- [x] Include themes.
- [x] Include country and language.
- [x] Include development stage.
- [x] Include budget and funding.
- [x] Include partner interests and acquisition criteria.
- [x] Include distribution territories.
- [x] Explain match relevance.
- [x] Verify matching and error handling.

**Phase status:** Reduced PoC work delivered; unchecked items retain the long-term scope and verification requirements.

## Phase 5: Project management and trust

- [x] Implement submission/interest tracking and statuses.
- [x] Implement activity history.
- [x] Implement ownership declarations.
- [x] Implement visibility controls.
- [ ] Implement permission-based document access.
- [ ] Verify tracking and access permissions.

**Phase status:** Reduced PoC work delivered; unchecked items retain the long-term scope and verification requirements.

## Phase 6: Monthly Country Spotlight and cultural discovery

- [ ] Feature one country each month.
- [ ] Showcase the cultures, communities, traditions, languages, heritage, arts, music, stories and regional identities within the featured country.
- [ ] Feature creators and storytellers from different cultural backgrounds.
- [ ] Include relevant creative projects.
- [ ] Keep the feature extensible to countries worldwide.
- [ ] Verify the cultural discovery experience.

**Phase status:** Reduced PoC work delivered; unchecked items retain the long-term scope and verification requirements.

## Phase 7: Testing, deployment and submission

- [x] Test critical application flows.
- [x] Check responsive behaviour.
- [x] Fix critical bugs.
- [x] Verify production build.
- [x] Complete deployment to Vercel.
- [x] Verify deployed application.
- [x] Prepare submission and demonstration.
- [x] Document known limitations and setup requirements.

**Phase status:** Reduced PoC work delivered; unchecked items retain the long-term scope and verification requirements.

## Blockers and decisions

- 2026-11-10: Recovered dependency installation after disk-space interruption. Tailwind 4.3.5 and PostCSS integration installed. Typecheck and production build passed. Root AGENTS.md points to authoritative documentation.
- 2026-11-10: Browser access verified for existing healthy Storion Supabase project and signed-in GitHub account. No duplicate resources created. Existing private simonehd/storion repository selected as origin.
- 2026-11-10: ESLint initially failed because its parser requires the TypeScript JavaScript API. Applied Microsoft's side-by-side compatibility aliases, preserving TypeScript 7 compiler. Lint, typecheck and production build passed.
- 2026-11-10: Foundation migration drafted at supabase/migrations/202611100001_foundation.sql. Local PostgreSQL test passes for ownership, private listings, interest statuses/history, document grants and revocation. Supabase auth/storage primitives are simulated in this test; hosted integration and storage behavior still require verification. Migration has NOT been applied remotely.
- 2026-11-10: Production dependency audit reports zero vulnerabilities; installation reported seven moderate development dependency advisories, still to triage.
- 2026-11-10: Chrome sessions verified successfully. Window subsequently minimized; live database inventory and migration application pending. No remote resources changed.
- 2026-11-10: Subsequent read-only SQL inventory verified no public relations/functions, storion_private schema, buckets or public/storage policies, and zero auth users/storage objects. Foundation migration is compatible with this inspected state. Added transactional preflight and explicit privilege reset to prevent inherited TRUNCATE access. Local tests pass, including unauthorized TRUNCATE denial and repeat-application rollback preserving existing rows. Awaiting action-time confirmation for live permission grants through Computer Use; migration remains unapplied.

## Deployment status

### Reduced PoC priority update — 2026-11-11

- Visual-priority deployment verified HTTP 200 with Country Spotlight before the cinematic hero. Confirmed-account mode is configured in production, per user decision.
- Industry-to-project Gemini endpoint and dashboard interface added. Typecheck and targeted lint passed. Final deployment/live recommendation verification in progress.
- Final reduced-scope deployment READY: dpl_DeMsL39iatUt1eaz7y3xR2KQz7Py, https://storion-coral.vercel.app. Production industry dashboard rendered the recommendation control; absent consent returned 400; genuine Gemini returned HTTP 200 with one explained recommendation, independently checked against a public database project. Confirmed-account signup notice verified. Cloud production build passed.
- Remaining blocked requirement: hosted confidential-document sharing, pending the user's approval of the tested read-policy repair. Application document operations remain disabled. No further schema changes or Git commits/pushes performed. Resume with this repair only when explicitly approved, then verify upload, recipient access and revocation before enabling the storage flag.
- Production core journey verified through actual sign-in, publishing/editing, favourite and interest actions; a separate production dashboard form successfully changed the demo interest to Action required and recorded activity. Existing test/demo records retained.
- Production project-to-partner Gemini matching returned HTTP 200 with one validated recommendation. A previous transient provider failure was handled; diagnostics record only status/reason codes, without keys or story content.

- User revised priority: complete visual experience and deploy it before remaining functionality. Country Spotlight moved immediately below navigation as a prominent editorial feature with cultural introduction, photography and links to the existing full country edition.
- Production marketplace actions already verified: creator publishing/editing, private/public isolation, industry discovery, favourites, duplicate-safe interest and owner status/history. Production Gemini project-to-partner matching returned HTTP 200 with a validated explanation. Industry-to-project recommendations remain the next functional adjustment.
- Approved Supabase Auth Site URL and exact local/production callback URLs were saved and verified. Custom SMTP is unconfigured; user selected confirmed demo accounts for the sprint. REGISTRATION_MODE=demo now enforces and explains that choice; public signup implementation remains available for later SMTP setup.
- Existing production URL: https://storion-coral.vercel.app. Visual-priority update deployment is in progress. Explicit Next.js framework preset configured after correcting the initial static-preset 404; upload ignore rule now preserves utils/supabase.
- Secret scan: 68 source/client files and assets, including eight production browser scripts, contained zero matches for the Gemini key. Key references occur only in the server API route. Git has zero commits; local secrets, integration state and Vercel metadata are ignored. Production settings contain the Gemini server secret; test-account passwords were not uploaded.
- Storage policy repair remains unapplied at the user's explicit instruction. Document operations remain disabled. Do not enable DOCUMENT_STORAGE_READY until repair approval and hosted verification.

- GitHub repository: Existing private simonehd/storion; local origin configured, no push yet.
- Supabase project: Existing schema and Auth configuration verified; document sharing excluded and storage repair unapplied.
- Vercel project: simone-s-team2/storion (configured)
- Production deployment: https://storion-coral.vercel.app (verified)









