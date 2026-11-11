# Storion Development Plan

## Product vision

A global marketplace connecting stories with opportunities, with African storytelling at its heart.

## Core promises

- Discover.
- Connect.
- Progress.

## Phase 1: Foundation and architecture

- Create Next.js project with React and TypeScript.
- Configure Tailwind CSS.
- Create GitHub repository.
- Set up Supabase: PostgreSQL, authentication and storage.
- Design database schema.
- Create `AGENTS.md` with project requirements and Codex instructions.
- Deploy initial application to Vercel.

**Deliverable:** Running application foundation.

## Phase 2: Build the user interface

- Implement the approved Storion visual design.
- Build the Homepage.
- Build the Discover page.
- Build project cards and filters.
- Build project detail pages.
- Build creator profiles.
- Build industry professional and company profiles.
- Build Country Spotlight.
- Implement responsive desktop and mobile layouts.

**Deliverable:** Complete visual experience with demonstration data.

## Phase 3: Marketplace functionality

- Registration and login.
- Creator and industry profile management.
- Create and edit project listings.
- Support films, series and books.
- Support ideas and completed works.
- Search and filtering.
- Save favourite projects.
- Express interest in projects.

**Deliverable:** Working marketplace.

## Phase 4: AI-powered matching

- Integrate the Google Gemini API, initially using its free tier where suitable and available. Keep the AI provider configurable so it can be changed later.
- Implement genuine AI-powered matching. Do not replace AI matching with hard-coded or rule-based matching and describe it as AI.
- Match using format and genre, themes, country and language, development stage, budget and funding, partner interests and acquisition criteria, and distribution territories.
- Explain why each recommendation is relevant.

**Deliverable:** Functional AI matching.

## Phase 5: Project management and trust

- Implement submission tracking and statuses.
- Show activity history.
- Include ownership declarations.
- Implement visibility controls.
- Support permission-based document access.

**Deliverable:** Users can monitor and manage submissions/interests.

## Phase 6: Monthly Country Spotlight and cultural discovery

- Feature one country each month.
- Showcase the cultures within the featured country, including communities, traditions, languages, heritage, arts, music, stories and regional identities.
- Feature creators and storytellers from different cultural backgrounds.
- Showcase relevant films, books, series and other creative projects.
- Initially prioritise African countries while keeping the feature extensible to countries worldwide.

**Deliverable:** Cultural discovery demonstration.

## Phase 7: Testing, deployment and submission

- Test the application.
- Check responsive behaviour.
- Fix critical bugs.
- Complete deployment.
- Prepare the submission and demonstration.

**Deliverable:** Deployed MVP ready for demonstration and submission.

## Technology stack

- Next.js with React and TypeScript.
- Tailwind CSS.
- Supabase: PostgreSQL, authentication and storage.
- Google Gemini API initially for AI-powered matching, with a configurable provider integration.
- GitHub.
- Vercel.
- Codex for implementation.

## Explicitly deferred features

These are outside the MVP and must not be implemented unless explicitly authorised:

- Full messaging.
- Collaboration workspace.
- Contracts.
- Licensing workflows.
- Advanced intellectual-property protection.
- Payments.
- Audience social network.

## Codex development workflow

1. Understand the requirement.
2. Inspect the existing architecture.
3. Give each implementation increment a clear scope.
4. Review the proposed changes and important decisions.
5. Run and test the implementation.
6. Commit the changes.
7. Move to the next task.

Codex receives the complete project context and is responsible for carrying the implementation through all seven phases. It may determine technical subtasks and implementation order within the agreed phase structure, but must preserve the phase scope and deliverables. It must not stop after initial setup when further phases remain.

## Schedule

The phases are intentionally undated. The original submission target is recorded in `PROJECT.md` as context. Do not use dates as a reason to skip requirements, testing or quality.
