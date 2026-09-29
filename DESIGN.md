# Design direction

Light-blue sky canvas (#E6F2FF → #B3D9FF → #80B3FF → #6699E6), primary #2F5AA8 / deep #1E3F7A, navy text (#0F2A4D), slate secondary (#3A5A8C). Geist typeface, 1256px content width, generous two-line headlines, thin #B3D9FF borders, soft blue glow.

Stack: React 19 SPA on Vite. Routes: / /how-it-works /hospitals /vision /about /founders /careers /contact /demo, plus a 404. Header and footer render once in `components/Layout.jsx`; pages are lazy-loaded and render only their `<main>`. Tailwind v4 theme tokens (sky-pale/soft/mid/deep, primary, navy) sit alongside the original hand-written layout CSS in `style.css`, which is still the source of most structure.

Media: the home hero and the closing CTA band use `<BackgroundVideo>` — a decorative looping video at two widths with a poster frame, choosing the narrow encode on small screens and under Data Saver. The home hero also carries a film-grain feel from the source footage; the earlier live WebGL sky component has been removed.

Motion: `useSiteMotion` owns everything — GSAP hero entrance, scroll reveals, grid staggers, checklist slides, count-ups, the scroll progress bar, the desktop pinned workflow on /how-it-works, and the scrubbed vision statement. Motion powers button and card hover transitions. Reduced-motion preference, or the footer's "Pause animations" toggle, freezes animation and pauses the videos. Mobile stacks without pinning.

Product imagery is built as semantic interface components rather than screenshots. No fake testimonials, customer counts or certifications.
