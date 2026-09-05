# Olowomakan Esther Bukola — Creative Portfolio

Multi-page portfolio of **Olowomakan Esther Bukola**, Creative Graphics
Designer & Digital Media Specialist — Ikorodu, Lagos State, Nigeria.

## ✦ Pages

| Route | Page |
| ----- | ---- |
| `/#/` | Home — hero, services index, work preview, organizations, testimonial |
| `/#/services` | Services + working process |
| `/#/about` | About, stats, CV download, experience, certifications, philosophy |
| `/#/projects` | Filterable gallery, case-study lightbox, featured case studies, tools |
| `/#/blog` | Insights with article reader |
| `/#/testimonials` | Testimonials + organizations |
| `/#/contact` | Contact details + project brief form (mailto) |
| `/#/admin` | **Admin Studio** — manage services, projects, blog, testimonials |

## ✦ Admin Studio

Open `/#/admin` and enter the passcode (`bukkie2026` — change it in
`src/pages.tsx`, `ADMIN_PASS`). Edits save to the browser and preview live.
Use **Export JSON** to take the content permanent (paste into `src/data.tsx`).

## ✦ Your photo

Place your portrait at `public/img/buk.jpeg`. The hero and About sections
load it automatically (with a built-in fallback if the file is missing).

## ✦ Tech stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · react-router-dom (HashRouter)

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → /dist
```

## ✦ Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and
deploys to GitHub Pages on every push to `main`. Enable via
**Repository Settings → Pages → Source: GitHub Actions**.

## ✦ Contact

- 📧 esther.olowomakan@gmail.com
- 📱 +234 814 590 4088 · +234 701 492 1004
- 📍 Ikorodu, Lagos State, Nigeria

© 2026 Olowomakan Esther Bukola. All rights reserved.
