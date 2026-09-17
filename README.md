# MediBytes presentation site

A responsive, dark emerald product site built with Vite, GSAP ScrollTrigger, Motion, and Lucide icons. Content is based on the supplied IDEA.md. The clinical platform is described as in development.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The static output is `dist/`. Sites publishing configuration lives in `.openai/hosting.json`.

## Interactions

- GSAP hero entrance, section reveals, desktop pinned workflow and scroll progress.
- Motion button hover and partnership panel transitions.
- Responsive mobile navigation, native FAQ disclosures, optional animation pause.
- A clearly labeled concept preview with editable synthetic fields and an explicit review/confirmation/reset flow. It does not upload, record, process, or export patient data.
- Reduced-motion preferences disable animation and pinning.

## Contact setup

No contact email or booking URL was supplied. The partnership action currently reveals an honest availability message, and no enquiries are collected. To enable scheduling, replace the partnership button and its event handler in `src/main.js` with an anchor to the approved booking URL. Update the navigation and hero contact links to the same URL if desired.

## Content boundaries

No customer counts, accuracy guarantees, pricing, compliance certifications, or testimonials are asserted. Deployment and integration capabilities are identified as planned. Fonts are loaded from Google Fonts with local sans-serif fallbacks.
