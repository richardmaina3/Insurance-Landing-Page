# MainaJP Insurance Landing Page

A single-page marketing/contact website for an independent insurance sales professional specializing in corporate and personal international health insurance policies (e.g. Bupa-style global health plans). The site introduces the professional, explains services, builds credibility, and lets prospects reach out via a contact form. Full design source of truth: `planning/engineering_design.md` and `planning/product_requirements.md`.

## Current Status
**Phase:** v1 build — all sections scaffolded and verified locally; not yet deployed.
**Last completed:** Full Astro site scaffolded (Nav, Hero, Services, About, Testimonials, Contact, Footer) in the "Modern Advisor" visual direction; `npm run build` succeeds with 0 vulnerabilities; dev server verified serving the page correctly at `http://localhost:4321` via Docker.
**Next step:** Review the live dev server in a browser, then commit the scaffold; after that, deploy to Netlify and do an end-to-end test of the live contact form submission (Netlify Forms only actually captures submissions once deployed, not in local dev).
**Full history & detail:** see `project_status.md`

- [x] Planning questions & rigor level (Production)
- [x] Product requirements & engineering design confirmed
- [x] GitHub repo + Netlify account provisioned
- [x] Visual direction chosen (see Key Design Decisions)
- [x] Astro project scaffolded
- [x] All v1 sections built (Hero, Services, About, Testimonials, Contact)
- [ ] Netlify Forms wired up (markup done) and tested live
- [ ] Deployed live on Netlify's default subdomain

## Goals
1. Ship a fast, polished, single-page site matching the clean, card-based style of the gayatech.dk reference (sticky nav, hero, services, about/credibility, social proof, contact).
2. Make the site a credible, shareable point of contact for prospective clients (individuals and businesses seeking international health insurance).
3. Keep the stack and hosting genuinely free/low-cost and simple to operate for a non-technical end user.
4. Structure content (services, testimonials) so it's trivial to swap in real bio/credentials/testimonials later without touching layout code.
5. **Core brand principle — peace of mind:** per stakeholder input, what's being sold isn't a policy, it's the reassurance that coverage is sorted wherever you live or work. Copy, imagery, and testimonials should reinforce reassurance, not just list plan features. See product_requirements.md §1.

## Architecture
| Layer | Choice |
|---|---|
| Framework | Astro 7 (static site, ships zero JS by default) |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme` in `src/styles/global.css`, no `tailwind.config.*` file — wired in via the `@tailwindcss/vite` plugin) |
| Hosting | Netlify, connected to GitHub for git-based auto-deploy |
| Contact form | Netlify Forms (built into hosting — no separate service/API key) |
| Domain | Netlify's free default subdomain for now; custom domain deferred |

No backend, database, or third-party service account beyond Netlify itself.

## Key Design Decisions
- **Astro over a heavier framework:** static output, zero JS by default, ideal for a content-driven one-pager. See engineering_design.md §2.
- **Astro 7 + Tailwind v4 (not 4/v3):** the initial scaffold pinned Astro ^4.16 + `@astrojs/tailwind`, but `npm audit` flagged known Astro 4.x CVEs (reflected XSS, SSRF, AVIF RCE) with no fix short of a major upgrade; `@astrojs/tailwind` doesn't support Astro 6/7, so the project uses Tailwind's own `@tailwindcss/vite` plugin instead, with theme tokens defined in `src/styles/global.css` via `@theme` rather than a `tailwind.config.*` file.
- **Netlify + Netlify Forms over Vercel + Formspree/custom function:** keeps hosting and form handling under one dashboard/account — no API keys, no second third-party service — which best fits a non-technical end user and low submission volume. Fully discussed tradeoff in conversation history; Vercel + a custom serverless function was the runner-up if ever needed. See engineering_design.md §2–3.
- **Placeholder content for bio/credentials/testimonials:** real content isn't finalized yet; v1 ships with clearly-structured placeholders (in `src/content/`) so they're trivial to replace later without a layout change. See engineering_design.md §5–7.
- **Services section is count-agnostic:** the grid uses `repeat(auto-fit, minmax(260px, 1fr))` (not a fixed 2-column layout) and icons are looked up from a registry in `Services.astro` keyed by `ServiceIcon`, falling back to a generic "shield" icon for any service without a bespoke one. Adding/removing a service is a pure edit to `src/content/services.ts` — no component change needed unless a new icon is wanted.
- **One page only for v1:** no blog, no CMS, no multi-language, no quote calculators, no login. See product_requirements.md §5.
- **Visual direction — "Modern Advisor":** indigo/navy primary (oklch(28% 0.09 265)) + mint accent (oklch(78% 0.12 165)), geometric sans throughout — Space Grotesk for headings, IBM Plex Sans for body. Icon-badge service cards and a dark indigo contact section for visual contrast. Chosen from a 3-direction mockup comparison; keep new components consistent with this palette/type pairing rather than introducing new fonts or colors.
- **Hero is a full-width photo banner, not a side portrait box:** per stakeholder direction, a calming tree-lined driveway image (reinforcing the "peace of mind" principle) is the hero's full-bleed background, with an indigo gradient overlay (left-to-right, darker under the text) for legibility — this replaced the earlier two-column "text + portrait photo" layout and its decorative circle/rotated-square shapes. The professional's own headshot now lives only in the About section. Image path: `public/images/hero-driveway.jpg` (not yet supplied — falls back to a solid indigo background via CSS `background-color` until the file is added, so the build never breaks on a missing image). **The stock photo(s) under consideration are watermarked preview images — do not ship to production without a proper license or owned replacement.**

## Directory Structure
```
MainaJP_site/
├── planning/
│   ├── product_requirements.md
│   └── engineering_design.md
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── About.astro
│   │   ├── Testimonials.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── services.ts        # corporate/personal service copy
│   │   └── testimonials.ts    # placeholder client quotes
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── favicon.svg
│   └── images/
│       └── (professional photo(s), placeholder assets)
├── netlify.toml                # Netlify build/deploy config
├── astro.config.mjs             # includes @tailwindcss/vite plugin
├── tsconfig.json
├── package.json
├── .gitignore
├── CLAUDE.md
├── Architecture.md
├── Changelog.md
└── project_status.md
```

## Constraints & Policies
**Security — MUST follow:**
- No API keys or secrets are needed for this project (Netlify Forms requires none) — if that ever changes, always use environment variables and never commit `.env` or any file with real credentials.

**Code Quality:**
- Keep components small and content (copy) separated from layout in `src/content/` so non-code edits (swapping testimonials, bio text) don't require touching component logic.
- No premature abstraction — this is a one-page site; don't build for hypothetical future pages/features not in scope.

## Repository Etiquette
- **Branching:** Solo developer — direct commits to `main` are fine for normal day-to-day changes (content edits, styling tweaks, small fixes). For large/risky refactors that could cause an outage or break the live site (e.g. swapping Netlify Forms for Vercel + a custom function, changing hosting providers, major structural changes), create a feature branch instead.
- **PR vs. direct-merge:** Direct-merge for routine changes. For the large/risky refactors described above, open a PR against `main` even though it's a solo project — gives a review checkpoint and clean rollback point before merging.
- **Commit messages:** Concise, present-tense, describe the "why" where non-obvious.

## Frequently Used Commands
**Node/npm are NOT installed natively on this machine — they only exist inside the `node:24-slim` Docker image.** Every `npm`/`astro` command must be run through Docker. From the project root (PowerShell disabled in this environment — use Git Bash with `MSYS_NO_PATHCONV=1` to avoid Docker volume path mangling):

```bash
export MSYS_NO_PATHCONV=1

# install deps
docker run --rm -v "C:/Users/richa/OneDrive/Documents/Claude Workspace/Projects/MainaJP_site:/app" -w /app node:24-slim npm install

# build
docker run --rm -v "C:/Users/richa/OneDrive/Documents/Claude Workspace/Projects/MainaJP_site:/app" -w /app node:24-slim npm run build

# dev server (bind 0.0.0.0 so it's reachable from the host; -p maps the port out)
docker run --rm -p 4321:4321 -v "C:/Users/richa/OneDrive/Documents/Claude Workspace/Projects/MainaJP_site:/app" -w /app node:24-slim npm run dev -- --host 0.0.0.0
```

Dev server is then reachable at `http://localhost:4321` from the host browser.

## Reference Documents
- `planning/product_requirements.md`
- `planning/engineering_design.md`
- `Architecture.md`
- `Changelog.md`
- `project_status.md`
