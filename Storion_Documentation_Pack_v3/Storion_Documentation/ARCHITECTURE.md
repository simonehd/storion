# Storion Architecture

## 1. Architectural objective

Build a maintainable Next.js application that delivers the Storion marketplace experience and integrates with Supabase and a configurable AI provider, initially Google Gemini.

This document records architectural boundaries. The detailed feature scope is in `REQUIREMENTS.md`; the approved stack is in `TECH_STACK.md`.

## 2. High-level system

```text
User's browser
     |
     v
Next.js application
  |-- Public pages and discovery
  |-- Authenticated profile and project experiences
  |-- Server-side application logic
  |-- API routes / server actions as appropriate
     |
     +--------------------> Supabase
     |                       |-- PostgreSQL
     |                       |-- Authentication
     |                       |-- Storage
     |
     +--------------------> Google Gemini API (initial provider)
                             |-- Matching assistance

GitHub repository -------> Vercel build and deployment
```

## 3. Application areas

Organise the application around the agreed user experiences:

- Public homepage.
- Project discovery and search.
- Project detail.
- Creator profiles.
- Industry professional profiles.
- Company profiles.
- Authentication.
- Project creation and editing.
- Favourites and expressions of interest.
- AI matches.
- Progress and submission tracking.
- Country Spotlight.

Use the Next.js App Router. Keep route organisation clear and group related components and server-side logic sensibly.

## 4. Frontend boundaries

- React components render the user interface.
- Shared components should be extracted where reuse is meaningful.
- Keep business logic out of presentation components where practical.
- Use server components by default where appropriate; use client components for genuinely interactive experiences.
- Provide loading, empty, error and success states.
- Follow `DESIGN.md` and the supplied approved screenshot.

## 5. Server and integration boundaries

- Perform privileged operations and secret-bearing API calls on the server.
- Use Supabase Auth for identity and sessions.
- Use PostgreSQL for persistent marketplace data.
- Use Supabase Storage for files, with access rules appropriate to document visibility.
- Call the configured AI provider from a secure server-side boundary.
- Validate and authorise mutations before changing data.

Choose API routes, server actions or other Next.js patterns based on the operation. Avoid adding a separate backend service unless a concrete requirement justifies it and the user approves the change.

## 6. Security architecture

- Apply least-privilege access.
- Enforce ownership and role-based access where needed.
- Use Supabase Row Level Security policies for protected data.
- Keep service-role credentials server-only.
- Restrict document downloads and access according to project permissions.
- Validate user input and AI-generated structured output.
- Do not treat client-side visibility as authorisation.

## 7. Deployment architecture

- GitHub is the source repository.
- Vercel hosts the Next.js application.
- Supabase provides database, authentication and storage services.
- Configure environment variables separately for local, preview and production environments.
- Keep the production build passing throughout development.
- Deploy an initial foundation early and verify subsequent changes in preview/production as appropriate.

## 8. Decisions requiring confirmation

Do not silently invent major architecture decisions not settled by the project documents. Surface decisions involving:
- Authentication and role model details that affect access.
- Data ownership and visibility rules.
- Document access and retention.
- Material third-party services or costs.
- Changes to the approved stack.
