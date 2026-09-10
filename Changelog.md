# Changelog

## [Unreleased]
- Initial project setup: planning docs, CLAUDE.md, automated docs created.
- GitHub repo and Netlify account provisioned; decided on Astro + Tailwind + Netlify Forms stack.
- Visual direction chosen ("Modern Advisor": indigo/mint palette, Space Grotesk + IBM Plex Sans) after comparing 3 mockup directions.
- Scaffolded full Astro v1 site (Nav, Hero, Services, About, Testimonials, Contact, Footer); upgraded to Astro 7 + Tailwind v4 after `npm audit` flagged CVEs in the initial Astro 4.x pin.
- Captured "peace of mind" as a core brand principle per stakeholder input.
- Redesigned Hero as a full-width photo banner (tree-lined driveway image, indigo gradient overlay) replacing the earlier side-by-side portrait-photo layout; professional headshot moved to the About section.
- Generalized Services section (auto-fit grid, icon registry with fallback) so adding a 3rd/4th service is a content-only edit to `src/content/services.ts`.
- Wired in real hero and headshot images (hero image is a placeholder pending licensing/final asset).
- Deployed to Netlify (GitHub-connected auto-deploy); form detection enabled.
- Fixed mobile nav: added a hamburger menu (nav links collapse below `md`) and fixed a z-index bug where Hero content rendered above the sticky nav while scrolling past it (Hero's `z-10` collided with Nav's; fixed by isolating section stacking contexts and bumping Nav to `z-50`).
- Worked around a Docker-on-Windows bind-mount file-watching issue by enabling Vite polling, since the dev server was silently serving stale content after edits.
