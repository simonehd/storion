# Storion sprint demonstration

Open https://storion-coral.vercel.app. Use the supplied confirmed creator and industry accounts in separate browser sessions; keep their credentials private.

1. Start at the homepage. Explain Storion: a global marketplace connecting stories with opportunities — Discover. Connect. Progress.
2. Explore the prominent South Africa Country Spotlight, its cultural perspectives, storytellers and project links. The launch edition is curated, not exhaustive. Storion welcomes countries and creators worldwide.
3. As creator, open Projects and create a film, series or book. Choose a development stage, synopsis and discovery details. Save privately first if useful; declare ownership or permission before publishing publicly.
4. As industry professional, use Discover search and filters to find the published story. Open its details and creator profile, then express interest with a category and message. Repeated submissions are prevented.
5. As creator, open the dashboard to see received interest and change its status to Viewed or Action required. The industry account can see the updated status and activity.
6. As industry professional, complete interests and acquisition criteria in Edit profile. From the dashboard, consent and choose Recommend projects. Gemini recommends public projects with explanations and caveats. Recommendations are advisory and depend on provider availability.
7. Finish with global discovery and the Made in Africa origin signature.

## Demonstration boundaries

- Public registration is closed for the sprint; use confirmed demonstration accounts. Email confirmation remains enabled. Opening registration later requires custom SMTP.
- Document sharing is excluded by product-owner decision. Uploads, downloads and permission changes remain disabled; the prepared storage-policy repair has not been applied. Do not demonstrate confidential documents or enable the storage flag.
- Fictional curated listings are labelled and cannot receive real interest. Use an actual published test-account project for the interaction journey. The retained synthetic project is titled “Echoes Across the Water — Storion PoC Demo”.
- Full messaging, contracts, licensing, payments and collaboration workspaces are deferred.
- Local run: preserve `.env.local`, then `npm run dev`. Existing dependencies are installed. See README.md for checks and setup.

## Verified release

Production build and deployment succeeded. Marketplace actions and Gemini recommendations were verified against the hosted database. Local lint, TypeScript and four tests passed. Final production checks covered public pages, callback failure handling, AI cross-origin denial, disabled documents and mobile overflow. No Git commits or pushes were made.
