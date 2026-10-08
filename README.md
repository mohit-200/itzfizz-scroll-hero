# ITZFIZZ Scroll-Driven Hero

A submission-ready recreation of the reference car-scroll hero using:

- Next.js
- React
- Tailwind CSS
- GSAP + ScrollTrigger
- GitHub Pages

## What is implemented

- Full-screen pinned hero scene
- 210vh scroll section for the interaction
- GSAP `ScrollTrigger` with `scrub` for scroll-driven car motion
- GPU-friendly transform-based car movement
- Green trail synced to scroll progress
- Letter-by-letter headline reveal
- Premium intro fade/stagger for headline and metrics
- Four impact metric cards
- Responsive layout
- GitHub Pages deployment workflow

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static output is generated in `out/`.

## GitHub Pages

1. Create a public repository named `itzfizz-scroll-hero`.
2. Push this project to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Set the source to **GitHub Actions**.
5. Push again if necessary.
6. The included workflow builds and deploys the static Next.js site.

Expected URL:

`https://YOUR_GITHUB_USERNAME.github.io/itzfizz-scroll-hero/`

## Submission checklist

- [ ] Live webpage URL
- [ ] GitHub repository URL
- [ ] Test desktop and mobile scrolling
- [ ] Confirm GitHub Pages deployment is green
- [ ] Replace the placeholder author/repository name if desired

## Notes

The car is an inline SVG, so the project has no external image dependency. This also avoids broken asset paths on GitHub Pages.
