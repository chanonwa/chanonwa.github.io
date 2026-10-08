# Chanon Wasusopon — Resume site

A static resume and portfolio built with Next.js and TypeScript, hosted on GitHub Pages at https://chanonwa.github.io.

## Edit your content

Everything on the page comes from [data/resume.ts](data/resume.ts): profile, experience, selected work, skills, education and volunteering.

- Project photos: put images in `public/projects/` and set `image: '/projects/name.png'` on the project. A photo replaces the big number on that card.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy

No local Node.js is needed to publish: GitHub Actions installs dependencies and builds the site.

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
One-time setup: in the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.

## Theme

The Light/Night button in the nav switches themes. The choice is saved in the browser; the first visit follows the system setting.
