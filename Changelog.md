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
