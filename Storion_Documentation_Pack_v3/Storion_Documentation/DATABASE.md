# Storion Database Design

## 1. Purpose

This document defines the data concepts Storion must support. Implement the smallest coherent schema that satisfies `REQUIREMENTS.md`. Do not invent unnecessary entities or build deferred features.

The final physical schema, SQL migrations and Supabase policies must be kept in sync with this document as implementation decisions are made.

## 2. Core data concepts

The MVP needs to represent:

- Users and their authentication identity.
- Profiles for creators and industry participants.
- Companies.
- Projects/stories.
- Project formats: film, series and book.
- Project development stage, including idea-stage and completed works.
- Genres, themes, countries and languages.
- Partner interests and acquisition criteria where relevant to matching.
- Budget/funding information where provided.
- Distribution territories where provided.
- Favourites.
- Expressions of interest and submission status.
- Activity history.
- Ownership declarations.
- Project visibility.
- Project documents and their access permissions.
- Country Spotlight content and featured projects.

## 3. Suggested logical entities

These are logical data responsibilities, not a mandate to create one table per bullet. Choose a practical relational design and document the final table names and relationships.

| Concept | Purpose |
|---|---|
| User | Authenticated account identity and account-level information |
| Profile | Public or controlled professional information for a user |
| Company | Organisation profile and company information |
| Project | Story/project listing and its core details |
| Project metadata | Format, genre, themes, country, language and stage |
| Favourite | Relationship between a user and a saved project |
| Interest / Submission | A user's expression of interest in a project and its status |
| Activity | Relevant history of project or submission activity |
| Ownership declaration | User declaration associated with a project |
| Project document | File metadata, storage reference and visibility/access information |
| Country | Country reference data |
| Country Spotlight | Featured country content and its featured projects |
| Matching criteria | Structured criteria used to evaluate potential relevance |

## 4. Relationship expectations

The implementation should support these relationship patterns:

- A user can manage an appropriate profile.
- A company can have relevant associated users or representatives.
- A creator can own or manage multiple projects.
- A project can have one or more relevant metadata values such as genres, themes, countries or languages, according to the final schema.
- Users can favourite multiple projects; a project can be favourited by multiple users.
- Users can express interest in projects; projects can receive interest from multiple users.
- Interests/submissions have statuses and relevant activity history.
- Projects can have associated documents with controlled access.
- A Country Spotlight can feature a country and associated projects.

## 5. Security and data integrity

- Use stable primary keys and appropriate foreign keys.
- Add uniqueness constraints where duplicate relationships or identities must be prevented.
- Add indexes for common lookups and filters.
- Use Row Level Security for user-specific and private data.
- Ensure only authorised users can create or edit their projects and profiles.
- Ensure private documents are accessible only to permitted users.
- Validate status values and required fields.
- Avoid storing secrets or unnecessary sensitive personal information.

## 6. Migrations and schema management

- Use controlled SQL migrations for schema changes.
- Do not rely on automatic production schema synchronisation.
- Keep migrations and this document aligned.
- Update this document when an approved schema decision changes.
- Do not silently change existing data semantics.

## 7. Open implementation decisions

The exact columns, enum values, role model, profile cardinality, matching representation and access rules must be finalised during architecture/database implementation based on the requirements. Codex should present material decisions before committing to them. Do not assume that every logical concept requires a separate table.

## 8. Foundation migration draft (10 November 2026)

`supabase/migrations/202611100001_foundation.sql` implements the proposed physical
schema; it has passed a local PostgreSQL access-policy test but has not been applied
to the hosted project. Inspect the remote schema before applying it.

- One profile per auth user, with creator, industry or company role. Roles do not
  grant administrative powers. Companies have one responsible representative in the MVP.
- Projects belong to an individual owner; listings default to private. Publication
  requires an ownership declaration. Countries, languages, themes, genres and
  matching criteria use arrays for the initial schema.
- One interest per sender/project. Received, Viewed and Action required are the
  supported statuses. Only the project owner can change status through a transactional
  function that records activity. Interest messages remain visible to participants only.
- Documents use a private PDF bucket with a 10 MB limit. Explicit per-user grants
  control access independently of public listing visibility. No public document URLs.
- Monthly country entries and featured-project relationships are readable only when
  published; publication is an administrative operation, not a user permission.
- Public profiles contain professional information, never auth email addresses.

The local database test simulates Supabase auth and storage schemas. Hosted auth,
storage uploads/downloads and policy behavior require separate integration checks.

### Hosted preflight inspection

On 10 November 2026, a read-only query in the existing Storion Supabase SQL
Editor returned zero public tables/views, public functions, storion_private
schemas, storage buckets, public/storage policies, auth users and storage objects.
No resource-name conflicts were found. The migration now checks for existing
application relations, its private schema, buckets and policies inside its
transaction and aborts if present. It revokes inherited table privileges before
granting required operations, including denying TRUNCATE to API roles.
The migration remains unapplied pending live permission-change confirmation.
