# Olowomakan Esther Bukola — Creative Portfolio

Professional portfolio of **Olowomakan Esther Bukola**, a Creative Graphics
Designer & Digital Media Specialist based in Ikorodu, Lagos State, Nigeria.

Built as a single-page folio covering graphic design, digital media, branding,
print production, video content, communications, and IT support.

## ✦ Live sections

| # | Section | Highlights |
| - | ------- | ---------- |
| 01 | Hero | Scramble-decode name, campaign polaroids, discipline marquee |
| 02 | About | Portrait, mission, career stats |
| 03 | Professional Focus | Graphic design, communications, IT support |
| 04 | Selected Works | Filterable gallery with case-study lightbox |
| 05 | Featured Projects | Bramble Network · Business Women Hub · SPM & Shapers of Nation |
| 06 | Experience & Certifications | 2021 → present |
| 07 | Skills & Tools | Animated proficiency bars + skill chips |
| 08 | Philosophy | Clarity · Creativity · Consistency |
| 09 | Testimonials & Contact | Copy-to-clipboard details + project brief form |

## ✦ Tech stack

- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- Custom motion system (scramble text, line-mask reveals, scroll reveals,
  count-ups, marquees) with full `prefers-reduced-motion` support

## ✦ Getting started

```bash
npm install     # install dependencies
npm run dev     # start local dev server
npm run build   # production build (outputs to /dist)
```

## ✦ Admin Studio (content manager)

Visit **`/#/admin`** (or the "Admin Studio" link in the footer) to manage
**Services, Projects, Blog posts, and Testimonials** without touching code.

- **Passcode:** `bukkie2026` — change it in `src/pages.tsx` (`ADMIN_PASS`).
- Edits save instantly to the browser (localStorage) and appear live on the
  site for preview.
- **Publishing:** click **Export JSON** and replace the matching arrays in
  `src/data.tsx` (or send the file to your developer) so changes go live for
  every visitor. **Reset** restores the original content.

> Because this is a static site (no database), the dashboard is a draft &
> preview tool; the exported JSON is the source of truth for the public build.

## ✦ Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds
and deploys the site to **GitHub Pages** on every push to `main`. Enable it via
**Repository Settings → Pages → Source: GitHub Actions**.

## ✦ Contact

- 📧 esther.olowomakan@gmail.com
- 📱 +234 814 590 4088 · +234 701 492 1004
- 📍 Ikorodu, Lagos State, Nigeria

© 2026 Olowomakan Esther Bukola. All rights reserved.
