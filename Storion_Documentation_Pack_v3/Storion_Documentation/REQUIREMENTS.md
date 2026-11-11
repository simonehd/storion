# Storion Requirements

## 1. Purpose

Define the functional and non-functional requirements for the Storion MVP. The product vision is in `PROJECT.md`; the implementation sequence is in `DEVELOPMENT_PLAN.md`.

## 2. User groups

The MVP supports:

- **Creators:** people who own, develop or submit stories and projects.
- **Industry professionals:** people seeking stories or projects and evaluating potential opportunities.
- **Companies:** organisations participating in the storytelling marketplace.

The platform is global, with African storytelling at its heart.

## 3. Functional requirements

### 3.1 Public discovery

- Present Storion's purpose and global identity with African roots.
- Provide a homepage based on the approved design.
- Provide a Discover experience for browsing projects.
- Show project cards and project detail pages.
- Support search and filtering.
- Support filters relevant to project format, genre, development stage and region.
- Include a Country Spotlight experience that highlights a country's culture, creators and stories, initially prioritising African countries.

### 3.2 Authentication and profiles

- Allow users to register and log in.
- Support creator profiles.
- Support industry professional profiles.
- Support company profiles.
- Allow users to manage the profile information relevant to discovery and matching.
- Protect authenticated areas and user-specific data.

### 3.3 Project listings

- Allow creators to create and edit project listings.
- Support the formats: film, series and book.
- Support projects at idea stage as well as completed works.
- Present project information on a project detail page.
- Allow users to save favourite projects.
- Allow users to express interest in projects.

### 3.4 AI-powered matching

- Integrate the Google Gemini API initially for genuine AI-powered matching. Keep the provider configurable for a future switch. Do not substitute hard-coded or rule-based matching and label it AI.
- Consider the following criteria where the data is available:
  - Format and genre.
  - Themes.
  - Country and language.
  - Development stage.
  - Budget and funding.
  - Partner interests and acquisition criteria.
  - Distribution territories.
- Present potentially relevant matches.
- Explain why each recommendation may be relevant.
- Treat AI recommendations as advisory, not guaranteed outcomes or automatic decisions.
- Handle missing configuration, API errors and unavailable responses gracefully.

### 3.5 Progress and tracking

- Allow users to track project interests and submissions.
- Represent submission/interest statuses.
- Show relevant activity history.
- Include ownership declarations.
- Provide visibility controls.
- Support permission-based access to project documents.

### 3.6 Country Spotlight and cultural discovery

- Feature one country each month.
- Showcase the cultures within the featured country, including communities, traditions, languages, heritage, arts, music, stories and regional identities.
- Feature creators and storytellers from different cultural backgrounds.
- Include relevant films, books, series and other creative projects.
- Prioritise African countries initially while keeping the feature extensible to countries worldwide.

## 4. Non-functional requirements

### Usability and accessibility
- Responsive layouts for desktop and mobile.
- Clear navigation and understandable user journeys.
- Semantic markup, labelled controls, keyboard accessibility and visible focus states.
- Readable contrast and clear loading, empty, success and error states.

### Security and privacy
- Enforce authorisation on the server and through database policies where applicable.
- Do not rely on hiding interface controls as a security boundary.
- Keep secrets out of source control and browser bundles.
- Restrict access to private project documents.
- Validate inputs at appropriate boundaries.

### Reliability and maintainability
- Keep the application buildable and deployable throughout development.
- Use maintainable TypeScript and clear module boundaries.
- Handle integration failures gracefully.
- Test critical user journeys and important business logic.

### Performance
- Avoid unnecessary dependencies and excessive client-side work.
- Optimise imagery and assets appropriately.
- Keep the interface responsive and usable on mobile connections.

## 5. Acceptance criteria

The MVP should demonstrate that:

1. A visitor understands Storion's purpose and can discover projects.
2. A user can register, log in and manage an appropriate profile.
3. A creator can create and edit a project listing.
4. Users can search and filter projects, save favourites and express interest.
5. AI matching can return potentially relevant suggestions with explanations.
6. Users can track interest/submission status and activity.
7. Country Spotlight demonstrates a monthly, multicultural country feature, initially prioritising African countries and designed to extend worldwide.
8. The experience works on desktop and mobile.
9. The application is deployed and ready for demonstration.

## 6. Explicitly deferred features

Do not implement these in the MVP unless the user explicitly changes scope:

- Full messaging.
- Collaboration workspace.
- Contracts.
- Licensing workflows.
- Advanced intellectual-property protection.
- Payments.
- Audience social network.

## 7. Scope discipline

Do not invent additional product features to fill gaps. Where a minor detail is unspecified, choose the smallest sensible MVP behaviour and document the decision. Ask the user when an ambiguity materially affects product behaviour, data ownership, security, cost or architecture.
