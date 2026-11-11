# AGENTS.md — Instructions for Codex

## Mission

Build the complete Storion MVP described in this repository's documentation, from foundation through testing and deployment.

Storion is a global marketplace connecting stories with opportunities, with African storytelling at its heart. Its core promises are **Discover. Connect. Progress.**

## Required reading

Before implementation, read all of these files:

1. `PROJECT.md`
2. `REQUIREMENTS.md`
3. `TECH_STACK.md`
4. `ARCHITECTURE.md`
5. `DATABASE.md`
6. `DESIGN.md`
7. `DEVELOPMENT_PLAN.md`
8. `AGENTS.md`
9. `TASKS.md`

Also inspect `design-references/storion-approved-design.png`.

These documents are the project context. Do not replace them with assumptions or generic templates.

## Ownership and authority

- The user owns product direction, requirements, scope and design approval.
- You are responsible for technical planning and implementation.
- You may choose technical subtasks and implementation order within the agreed phases.
- You must preserve the seven phases, their tasks and deliverables.
- Do not add unapproved features or change the product concept.
- Do not redesign the approved interface. Follow the exact reference image. Apply only the explicitly documented footer update: “Made in Africa” with an African continent mark to its right, removing the footer tagline/globe and footer navigation labels while retaining the logo and social icons. Do not alter any other part of the design.
- Do not implement deferred features unless explicitly authorised.
- Do not stop after project setup. Continue through all seven phases, verifying each phase and maintaining progress in `TASKS.md`.
- Ask the user when credentials, account permissions, billing choices, external authorisation or a material product/security/architecture decision is required. Do not ask for routine coding decisions that can be made safely within the approved constraints.

## Required delivery

You are responsible for implementing the entire development plan:
- Foundation and architecture.
- Approved user interface.
- Marketplace functionality.
- AI-powered matching.
- Project management and trust.
- Country Spotlight and cultural discovery.
- Testing, deployment and submission preparation.

Keep the application deployable throughout development. Prepare and complete GitHub/Vercel integration and deployment where authorised. The user must approve account access and external actions when required.

## Working method

1. Read the relevant requirements and inspect the existing workspace and Git status.
2. Establish a technical execution plan for the work ahead.
3. Implement a coherent increment, including related files where appropriate.
4. Run relevant linting, type checking, tests and builds.
5. Fix regressions introduced by the work.
6. Update `TASKS.md` with truthful progress.
7. Summarise what changed, checks run, results, blockers and any user action required.
8. Continue to the next task/phase unless a genuine decision or external dependency requires the user's input.

Do not wait for a new prompt after every small task. Continue autonomously through the agreed plan while respecting the approval boundaries above.

## Engineering standards

- Use the approved stack in `TECH_STACK.md`.
- Use Google Gemini initially for genuine AI-powered matching, with the provider kept configurable. Do not present rule-based matching as AI.
- Use TypeScript consistently; avoid `any` where practical.
- Prefer readable, maintainable code over premature abstraction.
- Avoid unnecessary dependencies and unrelated refactors.
- Follow established Next.js conventions and the App Router.
- Use semantic, accessible UI.
- Include loading, empty, success and error states.
- Validate input at trust boundaries.
- Enforce authorisation server-side and with Supabase policies where applicable.
- Do not rely on hidden UI controls for security.
- Use controlled database migrations. Do not rely on unsafe production schema synchronisation.
- Keep private documents protected by appropriate permissions.
- Keep AI-provider credentials and service-role credentials server-side.

## Design requirements

`DESIGN.md` and `design-references/storion-approved-design.png` are authoritative.

- Reproduce the approved Storion layout and visual language.
- Do not substitute a generic dashboard, streaming template or unrelated visual direction.
- Use universal cinematic homepage imagery.
- Give African storytelling meaningful visibility within the global platform.
- Preserve desktop and mobile experiences.
- Do not invent major screens or interactions outside the agreed requirements.

## AI matching requirements

- Implement only the matching scope in `REQUIREMENTS.md`.
- Use the specified matching criteria where data exists.
- Explain why recommendations are relevant.
- Treat AI output as advisory.
- Validate structured output.
- Handle missing credentials, rate limits and provider errors gracefully.
- Never expose API keys in client code.

## Security and secrets

- Use environment variables.
- Maintain `.env.example` with names and safe placeholders only.
- Never commit secrets, real `.env` files or private user data.
- Do not ask the user to paste secrets into source files or commit them.
- Explain required provider-side configuration and request access through the appropriate secure workflow.

## Testing and verification

- Run lint and type checks regularly.
- Add tests for important business logic and critical flows.
- Test authentication and authorisation boundaries.
- Test responsive behaviour for UI work.
- Run production builds at meaningful milestones and before final delivery.
- Verify deployment and key live flows.
- Report exact checks and outcomes. Never claim a test passed unless it was run and passed.

## GitHub and deployment

- Use GitHub for version control and Vercel for hosting, as specified.
- Inspect `git status` before destructive operations.
- Do not overwrite or discard user work.
- Use clear commit messages.
- Do not publish, deploy to production, incur charges or perform irreversible external actions without required user authorisation.
- Configure preview and production environment variables safely.
- Keep the production build passing.
- Report any manual account setup or permission step.

## Progress tracking

- Keep `TASKS.md` current.
- Mark a task complete only after implementation and relevant verification.
- Record blockers and decisions.
- Do not mark a phase complete while required deliverables or critical verification remain outstanding.

## Completion report

At each meaningful milestone, report:
1. Implemented work.
2. Important files created or changed.
3. Verification commands and actual results.
4. Remaining tasks and blockers.
5. Manual user actions required.
6. Next work you will continue with.

At final delivery, provide deployment URL, test/build results, setup notes and known limitations.
