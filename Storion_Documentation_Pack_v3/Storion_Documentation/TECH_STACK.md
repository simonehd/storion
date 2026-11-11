# Storion Technology Stack

## Approved stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend framework | Next.js | Web application and routing |
| UI library | React | Interface components |
| Language | TypeScript | Application code and type safety |
| Styling | Tailwind CSS | Styling and responsive layouts |
| Database | Supabase PostgreSQL | Persistent application data |
| Authentication | Supabase Auth | Registration and login |
| File storage | Supabase Storage | Project documents and assets |
| AI | Google Gemini API initially | Genuine AI-powered matching assistance; provider kept configurable |
| Source control | GitHub | Repository and version history |
| Hosting/deployment | Vercel | Build and host the Next.js application |
| Implementation assistant | Codex | Project implementation, testing and deployment preparation |

## Version policy

- Use current stable versions when implementation begins.
- Select mutually compatible versions.
- Record important version choices in the project manifests and lockfiles.
- Avoid unnecessary dependencies.
- Do not replace an approved technology without explaining the reason and obtaining approval for a material change.

## Environment configuration

- Use environment variables for provider credentials and secrets.
- Maintain an `.env.example` with variable names and safe placeholder values only.
- Never commit real `.env` files, API keys, service-role keys, access tokens or private credentials.
- Keep server-only secrets on the server. Never expose AI provider credentials or the Supabase service-role key to client-side code.

## Expected integrations

### Supabase
Use Supabase for:
- PostgreSQL database.
- Authentication.
- Storage.
- Database access policies and permissions appropriate to the data.

### AI provider
Use the Google Gemini API initially, starting with its free tier where suitable and available. Keep the provider integration configurable so another provider can be substituted later without redesigning the matching feature. Implement genuine AI-powered matching, validate model output and handle errors. AI output is advisory. Review provider data-use terms and avoid sending confidential, unpublished project material unless the user has approved that data handling.

### GitHub and Vercel
- Keep source code in GitHub.
- Configure Vercel to build and deploy the application from the repository where authorised.
- Use environment-specific configuration for local, preview and production deployments.
- Verify the production build and deployed application.

## Operational notes

Codex may implement configuration and integration work, but account creation, authentication, billing decisions, credential provision and external authorisations require the user's participation when the provider requires it.
