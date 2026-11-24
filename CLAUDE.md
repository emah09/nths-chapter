# Project conventions

- Next.js App Router with TypeScript. The six routes live in `app/`. Shared navigation and content components live in `components/`.
- `content/chapter.json` holds chapter copy and the IANA timezone. Meetings, events, volunteer opportunities, and officers each have a JSON file in `content/`. Announcements use one Markdown file per post under `content/announcements/`.
- Announcement frontmatter uses single-line `title`, `date`, and optional `image` and `imageAlt` fields. Bodies support paragraphs and dash-prefixed lists. Keep officer-facing examples in README.md in sync with any format changes.
- Put photos in `public/images/` and reference them as `/images/filename.jpg`. Use the shared `ContentImage` component and supply descriptive alt text.
- Keep date filtering and formatting in `lib/dates.ts`. Content dates and times are local calendar values. Upcoming items include today. Date-sensitive routes render per request so the archive rolls over in the chapter timezone without a deploy.
- Use the Tailwind theme tokens in `app/globals.css` with the existing light and dark palettes. Preserve keyboard navigation, visible focus states, and semantic headings.
- Keep the project file-backed and dependency-light. Before committing, run `npm run build` and `npm run typecheck`. GitHub's `main` branch is intended for Vercel production deployments.
