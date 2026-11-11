# Storion Design System and Approved Interface

## 1. Source of truth

The image at `design-references/storion-approved-design.png` is the approved Storion visual reference.

**Implement the design shown in that exact reference. Do not substitute a generic dark dashboard, streaming-service template, moodboard or newly invented layout.**

The screenshot is a composite visual reference showing the intended homepage, discovery experience, mobile previews, project detail, AI matching, expression of interest and footer. Use it as the visual authority for the MVP.

## 2. Product identity

- Brand: **STORION**
- Hero headline: **A universe of stories.**
- Core promises: **Discover. Connect. Progress.**
- Footer positioning: **A global platform for storytellers, with African roots.**
- Storion is global, with African storytelling at its heart.
- “Made in Africa” communicates origin; it must not imply that the platform is Africa-exclusive. Its approved footer treatment is specified in Section 4, “Footer”.

## 3. Approved visual language

- Dark, cinematic, premium interface.
- Deep charcoal and black surfaces.
- Warm orange/gold accents and restrained glow.
- Subtle glassmorphism and layered surfaces.
- Cinematic imagery.
- Elegant serif display headings.
- Clean, readable sans-serif interface typography.
- Refined cards, subtle borders and considered spacing.
- Responsive desktop and mobile layouts.

Do not overuse glow, gradients or glass effects. Preserve readability and hierarchy.

## 4. Reference composition and interface areas

### Header/navigation
The reference shows the Storion wordmark and navigation:
- Discover
- Projects
- People
- How it Works

### Homepage hero
- Headline: “A universe of stories.”
- Cinematic globe/film-camera visual.
- Primary action: “Explore Projects”.
- Secondary action: “Join as a Creator”.
- Universal cinematic imagery. The homepage should communicate a global storytelling marketplace, not an Africa-only catalogue.

### Value proposition cards
The reference includes four cards:
- Create
- Connect
- Collaborate
- Get to Market

These are interface content labels from the approved visual. They do not authorise implementation of deferred collaboration-workspace functionality.

### Projects discovery
- Search.
- Project format filters: All Projects, Film, Series, Book.
- Genre, Stage and Region filters.
- Cinematic project-card grid.

### Mobile previews
The reference includes mobile application previews. Build responsive desktop and mobile layouts that retain the same visual identity and key journeys.

### Project detail
The reference project is **The Last Baobab**. Its detail experience includes:
- Overview.
- Team.
- Documents.
- Updates.
- Project details.
- Looking-for needs.

Use demonstration content for the reference project where real content is not supplied. Do not present invented demonstration data as real user data.

### AI Matches
- Display potentially relevant partner matches.
- Show match percentages only when supported by the matching implementation.
- Explain why each match is relevant.
- Treat scores as indicative, not guaranteed outcomes.

### Express Interest
- Message field.
- Interest/collaboration categories.
- Clear submission action and feedback.

### Footer
The supplied screenshot remains the visual source of truth for the overall interface. Apply this specific brand-copy update to the footer without redesigning the rest of the reference:

- Retain the Storion logo on the left and the social icons on the right.
- Replace the globe icon and the footer tagline “A global platform for storytellers, with African roots.” with the exact text **“Made in Africa”** and an African continent mark immediately to its right.
- Remove the footer navigation labels “Discover”, “Projects”, “People” and “How it Works”.
- Place the “Made in Africa” signature naturally around the middle of the footer, balanced between the logo and social icons. Do not force it to the far right.
- Match the reference's existing typography, font weight, warm orange/gold accent, scale, spacing and alignment. Keep the treatment restrained and integrated with the footer rather than introducing a new badge, banner or separate visual style.
- The phrase is an origin signature only. It must not imply that Storion is Africa-exclusive.

This is a footer-only content and styling adjustment. Preserve every other part of the supplied screenshot, including the desktop and mobile compositions, imagery, cards, navigation, project details and overall layout. Implement the footer as responsive UI, not as a flattened screenshot.

## 5. Imagery and cultural representation

- Use universal cinematic imagery on the homepage.
- Represent African storytelling prominently throughout discovery and Country Spotlight.
- Do not make all imagery exclusively African.
- Avoid stereotypes and tokenistic representation.
- Use imagery that supports the specific story, project or country being represented.
- Use placeholders or clearly labelled demonstration assets where licensed/approved content is unavailable.

## 6. Responsive behaviour

- Preserve the hierarchy and identity on mobile.
- Adapt navigation, cards, filters, panels and project details for narrow screens.
- Ensure controls remain usable by touch.
- Avoid horizontal overflow.
- Test key flows at mobile and desktop widths.

## 7. Design implementation rules

- Treat the supplied screenshot as the reference, not as a reason to invent additional screens or features.
- Keep spacing, typography, card treatment and accent use consistent.
- Use reusable design tokens and components where useful.
- Ensure accessible contrast, focus states and semantic controls.
- Do not redesign unless a genuine usability, accessibility or implementation issue requires improvement. Explain material deviations before making them.
