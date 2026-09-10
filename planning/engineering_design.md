# MainaJP Site — Engineering Design Document
**Version:** 0.1
**Status:** Draft
**Date:** 2026-09-09

## 1. Purpose & Goals
### 1.1 Primary Goals
- Ship a fast, polished, single-page marketing/contact site for an international health insurance sales professional.
- Match the clean, professional, card-and-section style of the reference site (gayatech.dk): sticky nav, hero, services cards, about/credibility section, experience/social-proof section, contact section with form.
- Make the site trivially easy to update later (swap in real bio, credentials, and testimonials as they become available) without a rebuild of the architecture.
- Keep the stack lightweight — this is one page, not an app.

### 1.2 Non-Goals
- Not building a CMS or multi-page site in v1.
- Not building any backend business logic beyond receiving contact-form submissions.
- Not integrating a quote engine, policy database, or client portal.
- Not optimizing for scale — this is a low-traffic marketing site, not a high-throughput service.

## 2. Tech Stack
**Confirmed:**
- **Framework:** [Astro](https://astro.build) — static-site generator, ships zero JS by default, ideal for a fast, content-driven one-pager, easy to add interactivity later if needed. Free, open-source (MIT licensed) — no service cost.
- **Styling:** Tailwind CSS — fast to build a clean, card-based layout matching the reference site.
- **Hosting:** Netlify, connected to a GitHub repo for git-based auto-deploy. Free tier, custom domain support with free SSL.
- **Contact form:** Netlify Forms — built into Netlify hosting, no separate account/API key required. The form is marked up with `data-netlify="true"` (plus a hidden field for Netlify's build-time bot detection); email notification on each submission is a one-time toggle in Site Settings → Forms → Notifications. Free tier covers 100 submissions/month, with basic honeypot spam filtering included.
- **Domain:** To be provisioned by the user (not yet decided).
- **Images:** Static assets committed to the repo (professional photo(s) already available); placeholder imagery for testimonials/social proof until real content exists.

**Why this combination:** it puts hosting and form handling under a single Netlify account/dashboard — no second third-party service, no API keys to manage — which best fits a non-technical end user and a low-submission-volume lead form. The only platform-specific piece is Netlify Forms itself; everything else (Astro/Tailwind site code) is fully portable to another host later if ever needed. See project chat history for the fuller Vercel-vs-Netlify tradeoff discussion.

## 3. System Architecture
```
Visitor Browser
      │
      ▼
Static Site (Astro build output, hosted on Netlify)
 ├─ Hero section
 ├─ Services section (corporate vs. personal intl. health policies)
 ├─ About / Experience section
 ├─ Testimonials / Social proof section
 └─ Contact section
        │
        ▼  (form POST on submit)
   Netlify Forms (built into hosting — no separate service)
        │
        ▼
  Email to professional's inbox (Netlify notification)
```
No custom server, database, or third-party service account — the entire site, including form handling, is served by Netlify.

## 4. Component: Hero Section
- Responsibilities: Immediately identify who the professional is and their specialty (international health insurance — corporate & personal).
- Content: Name, title/tagline, professional photo, primary CTA button ("Contact" — scrolls to contact form).
- Tech: Static Astro component, Tailwind for layout.

## 5. Component: Services Section
- Responsibilities: Clearly separate and describe the two offering types.
- Content: Two cards — "Corporate International Health Policies" and "Personal International Health Policies" — each with a short description of what's covered/who it's for.
- Tech: Static Astro component; content sourced from a simple content file (e.g. `src/content/services.ts` or frontmatter) so copy can be edited without touching layout code.

## 6. Component: About / Experience Section
- Responsibilities: Build credibility — background, years of experience, (credentials once available).
- Content: Placeholder bio copy and a placeholder "years of experience" stat until real content is supplied; structured so both are trivial to replace.
- Tech: Static Astro component, professional photo asset.

## 7. Component: Testimonials / Contact Section
- **Testimonials:** Placeholder client quotes/logos (structured as a simple list so real testimonials can be dropped in later).
- **Contact form:** Name, email, message fields; marked up for Netlify Forms detection (`data-netlify="true"` + hidden `form-name` field); submitted via fetch to avoid a full page reload; inline success/error message on the page. Email notification per submission configured once in the Netlify dashboard (no code/API key involved).

## 8. Data Flow: End-to-End
1. Visitor loads the static site (served from Netlify's CDN — no server rendering per request).
2. Visitor fills out the contact form and clicks submit.
3. Browser POSTs form data to Netlify's form-handling endpoint (via fetch, to avoid a full page reload).
4. Netlify runs honeypot spam-checking and triggers the configured email notification to the professional's inbox.
5. Site displays a success message to the visitor based on the fetch response.

## 9. Build Phases
- **Phase 1 (v1):** All sections in Section 4–7 above, with placeholder bio/credentials/testimonials, real professional photo, working contact form, deployed live and shareable.
- **Phase 2 (later, not built now):** Swap in real bio/credentials/testimonials as the professional finalizes them; possibly add a custom domain, basic analytics, and refined copy/SEO metadata.

## 10. Directory Structure (Proposed)
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
│   └── images/
│       └── (professional photo(s), placeholder assets)
├── netlify.toml                # Netlify build/deploy config
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── CLAUDE.md
├── Architecture.md
├── Changelog.md
└── project_status.md
```

## 11. Testing / Bring-up Plan
- Manual cross-browser check (Chrome, Safari, mobile Safari/Chrome) for layout correctness at desktop/tablet/mobile breakpoints.
- Manual test of the contact form: successful submission reaches the configured inbox; error state displays correctly if the request fails.
- Lighthouse check for basic performance/accessibility/SEO scores before calling v1 done.
- Visual review against the gayatech.dk-inspired layout for section parity (nav, hero, services, about, testimonials, contact).

## 12. Key Constraints & Assumptions
- No backend/database, and no API keys or third-party service accounts beyond Netlify itself — the entire site plus form handling lives under one Netlify account.
- Real bio, credentials, and testimonials are not yet available; v1 ships with clearly-structured placeholder content that's trivial to replace later.
- Domain/hosting account provisioning (GitHub repo, Netlify account, optional custom domain) is the user's responsibility (see infrastructure list) — no real credentials will be entered by Claude.
- Netlify Forms free tier caps at 100 submissions/month; more than sufficient for expected lead volume. If ever exceeded, upgrading is a Netlify plan change, not a code change.
