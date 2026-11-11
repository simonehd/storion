# Storion project instructions

Read and follow all nine Markdown documents in
`Storion_Documentation_Pack_v3/Storion_Documentation/`, including its `AGENTS.md`.
Those documents define the seven-phase plan, approved stack, scope and design.
Use the approved screenshot only as a visual reference. Preserve the documented
Made in Africa footer treatment and global positioning.

Keep `TASKS.md` in that documentation directory accurate. Verify work before
marking it complete. Never commit secrets, `.env.local`, or generated artifacts.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
