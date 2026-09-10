# Project Status

## Current milestone
Phase 1 (v1): a functional, shareable one-page site — Hero, Services (corporate vs. personal international health policies), About/Experience, Testimonials, and a working Contact form — deployed live on Netlify's default subdomain.

## Completed
- Rigor level established: Production.
- AI-assisted planning pass completed (services focus, conversion action, available assets clarified).
- `planning/product_requirements.md` and `planning/engineering_design.md` drafted and confirmed.
- Tech stack decided: Astro + Tailwind CSS, hosted on Netlify (GitHub-connected auto-deploy), Netlify Forms for the contact form. Decision history: Vercel + Formspree and Vercel + custom serverless function + Resend were both considered and set aside in favor of keeping hosting and form handling under one Netlify account/dashboard, given the non-technical end user and low expected form volume.
- Infrastructure provisioned by user: GitHub repo (`richardmaina3/Insurance-Landing-Page`), Netlify account. Custom domain deferred — using Netlify's free default subdomain for now.
- `CLAUDE.md` drafted and confirmed, including repository etiquette (direct-to-main for routine changes; feature branch + PR for large/risky refactors like a future hosting/provider swap).
- Automated docs created: `Architecture.md`, `Changelog.md`, `project_status.md`.
- Plugins installed: `frontend-design`, `feature-dev`. MCP-related plugins installed: `playwright`, `netlify-skills`.
- Permissions drafted and confirmed; written to `.claude/settings.local.json`.
- Visual direction chosen: "Modern Advisor" (indigo/navy + mint accent, Space Grotesk + IBM Plex Sans, dark contact section) — selected from a 3-direction mockup comparison against Directions A ("Global Trust") and C ("Warm Personal"). See `CLAUDE.md` Key Design Decisions.
- Full Astro site scaffolded (Nav, Hero, Services, About, Testimonials, Contact, Footer); upgraded to Astro 7 + Tailwind v4 (0 known vulnerabilities) after the initial Astro 4.x pin was flagged by `npm audit`.
- Node/npm run via Docker (`node:24-slim`) on this machine — no native Node install; see `CLAUDE.md` Frequently Used Commands.
- Captured "peace of mind" as a core brand principle (stakeholder input) in `product_requirements.md` and `CLAUDE.md`.
- Hero redesigned as a full-width photo banner (tree-lined driveway image + indigo gradient overlay), replacing the earlier side-by-side portrait layout; professional headshot now lives in the About section only.
- Services section generalized (auto-fit grid, icon registry with a fallback icon) so a 3rd/4th service is a content-only edit to `src/content/services.ts` — real content pending stakeholder discussion.
- Real hero and headshot images wired in. **Hero image is a placeholder pending a licensed/final asset — do not deploy live as-is.**

## Next up
- Get the 3rd/4th service content from the client and add to `src/content/services.ts`.
- Resolve licensing for the hero image (or swap in an owned/licensed replacement) before any live deploy.
- Fill in real bio, credentials, and testimonials as they become available.
- Wire up Netlify Forms notification in the Netlify dashboard and test end-to-end submission live (Netlify Forms only captures submissions once deployed, not in local dev).
- Deploy and verify on Netlify's default subdomain; cross-browser/responsive check per engineering_design.md §11.

## Deferred
- Blog / articles / resources section.
- Multi-language support.
- Client login, quote calculators, or policy-comparison tools.
- CMS or admin panel for editing content without a code change.
- Payment processing or online policy purchase.
- Calendar/booking integration.
- Analytics dashboards beyond basic page-view tracking.
- SEO/content marketing strategy beyond basic on-page metadata.
- Custom domain (currently using Netlify's free default subdomain).
