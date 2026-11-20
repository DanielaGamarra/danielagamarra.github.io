# danielagamarra.github.io

**DAGA's digibook**: Daga's portfolio + CV (root `index.html`), a digital sketchbook on an infinite canvas.

- All text, projects, awards, talks and links: `assets/content.js` (add `img: "assets/img/x.webp"` to a project to show a real picture; it renders as ASCII and reveals on hover).
- CV view: `/#cv` (print button saves a PDF). Deep links: `/#films`, `/#aota`, etc.
- Writing page: set `site.substack` in `assets/content.js`. `.github/workflows/substack.yml` reads the RSS feed hourly into `assets/writing.json`.
- Text layout: Pretext (`vendor/pretext`, MIT, @chenglou/pretext 1.0.0).
- `postest/` = Postest public pages (source: DanielaGamarra/postest site/postest).

Local preview: `npx serve .`
