# MediBytes marketing site

A static, responsive marketing site for MediBytes, an AI documentation layer for
hospitals. Built with Vite, React 19 and react-router, animated with GSAP
ScrollTrigger and Motion, styled with Tailwind v4 tokens over a hand-written
stylesheet.

## Run locally

```sh
npm install
npm run dev      # http://127.0.0.1:5173
```

## Production

```sh
npm run build    # static output in dist/
npm run preview  # serve the build at http://127.0.0.1:4173
```

Hosting configuration lives in `.openai/hosting.json`.

### Host requirement: SPA rewrite

Routing is client-side, so the host **must serve `index.html` for any path that
has no matching file**. Without it, opening or refreshing `/demo` returns 404.
`public/_redirects` covers Netlify and Cloudflare Pages, and `vercel.json` covers
Vercel. On other hosts set the equivalent rewrite (`try_files $uri /index.html`
on nginx, a catch-all rewrite on Firebase).

## Structure

```
src/
  App.jsx              routes, lazy page loading, scroll/anchor handling
  components/
    Layout.jsx         header + footer wrapper for every route
    Chrome.jsx         header, navigation, footer
    content.jsx        shared page blocks (hero, stats, checklist, CTA, form)
    sections.jsx       home/how-it-works sections
    ProductPreview.jsx interactive concept mockup
    BackgroundVideo.jsx responsive, poster-backed decorative video
  config/site.js       contact details and outbound links — edit these here
  hooks/
    useSeo.js          per-page title, description, canonical, OG/Twitter tags
    useSiteMotion.js   all scroll/entrance animation and the motion toggle
  pages/               one file per route
```

## Contact details and enquiries

All published contact details live in `src/config/site.js`. Values that are not
yet available are `null` and the UI hides them rather than showing a
placeholder:

- `CONTACT_PHONE` — set it to reveal the support/WhatsApp line on `/contact`.
- `BOOKING_URL` — set it to show a "pick a slot" link on `/demo`.

**Enquiry forms have no backend.** The site is a static build, so submitting the
contact or demo form opens a prefilled draft in the visitor's email client
addressed to `CONTACT_EMAIL`; nothing is stored or transmitted by the page, and
the on-screen note says exactly that. If enquiries should instead arrive
automatically, point `MiniForm` at a form endpoint (a serverless function, or a
service such as Formspree) and only then claim the message was sent.

## Media

Background videos are committed at two widths plus a poster frame
(`blue-sky-*`, `cta-blend-*`). `BackgroundVideo` serves the 960px encode to
narrow screens and to visitors with Data Saver on. To replace a video, encode
both widths and a poster rather than dropping in a single large file — the
original source was 43 MB, which is unusable on mobile data:

```sh
ffmpeg -i source.mp4 -an -vf scale=1600:-2 -c:v libx264 -crf 30 -preset slow \
  -movflags +faststart public/name-1600.mp4
ffmpeg -i source.mp4 -an -vf scale=960:-2  -c:v libx264 -crf 31 -preset slow \
  -movflags +faststart public/name-960.mp4
ffmpeg -i source.mp4 -vframes 1 -vf scale=1280:-2 -q:v 6 public/name-poster.jpg
```

## Accessibility and motion

- Skip link, labelled navigation, focus-visible outlines throughout.
- `prefers-reduced-motion` disables animation, pinning and video playback.
- The footer's "Pause animations" button toggles the same state manually.

## Content boundaries

Marketing copy comes from the client content document (`docs/`). Performance
figures quoted on the site (7-minute discharges, 65 minutes returned per doctor)
are the client's own claims; no compliance certification, customer count or
pricing is asserted anywhere.
