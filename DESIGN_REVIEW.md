# Storion redesigned demo experience

The nine approved views use real React/CSS components and individual local artwork. The user approved the designs; this milestone populates them with consistent fictional content without changing the existing real application infrastructure.

| Screen | Route |
| --- | --- |
| Homepage | / and /design/home |
| South Africa Spotlight | /design/spotlight |
| Stories in Motion | /design/motion |
| Discover | /design/discover |
| Project detail | /design/detail?story=baobab |
| AI Matches | /design/matches |
| Express Interest | /design/interest?story=baobab |
| Welcome | /design/welcome |
| Featured discovery | /design/featured |

Header People links to /design/people. Creator and industry cards open /design/creator?person=amina and /design/industry?person=lumen, with biography/portfolio or acquisition-criteria content. Profile menu links to /design/favourites. All nine original review links remain accessible.

## Content and behaviour

lib/design-demo.ts supplies 20 fictional stories, 10 fictional creators, three fictional industry partners and prepared sample matching explanations. Story IDs, authorship, descriptions, budgets, languages, themes and territories remain consistent across cards, detail pages, portfolios and matching examples. No records are seeded into Supabase. All demo content and progress milestones are labelled fictional.

lib/demo-browser.ts stores demo favourites and simulated interest activity only in this browser. Interest message text is never persisted. Forms validate input and show explicitly simulated confirmation. Menus, tabs, carousels, catalogue filters and profile navigation reuse the approved visual controls. Documents remain disabled; video/social controls are explanatory previews.

## AI modes — preserve both

Demo is the default: three prepared sample recommendations, expandable explanations/caveats and links to the corresponding demo story and industry profile. No Gemini calls or database writes.

Real mounts the existing working DesignRecommendations component, signs in through existing Supabase authentication when needed and requires explicit consent before POST /api/recommendations. It uses public database projects and the user's real industry/company profile, with Gemini explanations and validated project IDs. No mock fallback or invented percentages. Its backend, provider settings and restrictions are unchanged.

## Preservation and verification

The redesigned homepage remains at /. The original-home page is unchanged. Existing real marketplace pages, auth callback, APIs, policies and Gemini functions are preserved. No database migrations, infrastructure changes or Git commits/pushes.

TypeScript, targeted UI lint and a shared-data consistency check passed during implementation. One production build and deployment status are recorded in TASKS.md. No exhaustive route checks, browser walkthroughs, screenshots or additional Gemini requests were performed for this milestone, per the user's requested verification scope. README.md now contains the current setup, architecture, route and demo/real-mode guide. The V3 development roadmap remains unchanged.

Deployment complete: dpl_EwbjogQfAo7w24aVx6S8qFRdLuyu reports READY on the existing Storion project, aliased to https://storion-coral.vercel.app. One local production build passed. No Git commits or pushes.
