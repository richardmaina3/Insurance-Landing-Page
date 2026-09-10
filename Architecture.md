# Architecture

## Overview
MainaJP's insurance landing page is a static, single-page site built with Astro and styled with Tailwind CSS. It's hosted on Netlify, deployed via git push from the GitHub repo. There is no backend or database; the only dynamic behavior is the contact form, which is handled entirely by Netlify Forms (built into the hosting platform) and delivers submissions to the professional's email inbox as a notification — no custom server code or third-party API involved.

## Components
- **Nav** — sticky top navigation linking to each section on the page (Hero/Home, Services, About, Testimonials, Contact).
- **Hero** — name, tagline, professional photo, and a CTA that scrolls to the contact form.
- **Services** — two cards distinguishing corporate vs. personal international health insurance policies; copy sourced from `src/content/services.ts`.
- **About** — professional background/experience section; placeholder bio copy until real content is supplied.
- **Testimonials** — placeholder client quotes/social proof; copy sourced from `src/content/testimonials.ts`.
- **Contact** — name/email/message form wired to Netlify Forms, with inline success/error feedback on submit (no page reload).
- **Footer** — repeats key contact info for accessibility at the bottom of the page.

## Data flow
1. Netlify serves the statically-built Astro output to the visitor's browser from its CDN.
2. On contact form submit, the browser posts form data to Netlify's form-handling endpoint via fetch (no page reload).
3. Netlify runs its built-in honeypot spam check and, if the submission passes, triggers the email notification configured in the Netlify dashboard.
4. The visitor sees an inline success or error message based on the fetch response.
