# MediBytes

Register: brand. An AI documentation layer for Indian hospitals, presented to hospital leadership, clinicians and prospective investors. Doctors dictate; structured, claim-ready clinical documents appear, with every field traceable to the original audio and mandatory human review before anything is filed.

Positioning: layers over the hospital's existing HMIS — no data migration, no replacement system. Languages: Indian-accented clinical English and Tamil, with mixed-language speech. Deployment: cloud or inside the hospital's own infrastructure, with an offline queue for unreliable connectivity.

Voice: precise, calm, optimistic, plain-spoken about what is and is not built yet.

Claims policy: every sentence on the site must fall into one of three buckets, phrased so the reader can tell which.

- **Design fact** — how the product is built. Present tense, confident. "Nothing exports until a clinician verifies it."
- **Target** — what we are aiming at. Explicitly labelled as an aim. "Discharge summaries: 40 min → under 10" under the heading "Targets we're designing against".
- **Current-state observation** — the problem being described. Attributed. "What clinicians tell us one discharge summary costs them today."

Never assert an outcome as measured, and never state a capability level that has not been validated per language. The performance figures from the approved content document in `docs/` — roughly 40 minutes down to under 10 for a discharge summary, and about an hour returned per doctor per day — are presented as targets, not results, until a pilot produces real numbers.

Retired and not to be reintroduced without evidence: the 8% claim-denial rate, the 90 → 25 minute charting figure, and "claim rejections ≈ 5%". None of these appear in the approved content document. Also retired: "we never let AI hallucinate" (replaced by the traceability mechanism it was standing in for) and "stop medication errors before they happen" (replaced by "surfaces … for the clinician to review"), both of which read as regulated-device claims.

Do not add new numbers, and do not assert regulatory certification, named customers, pricing or compliance audits that have not been supplied. The site presents the product; it is not a functioning clinical service and handles no real patient data. The site's single consistent frame is pre-pilot: in development, recruiting first hospital partners, and open for walkthrough bookings. Every primary CTA reads "Book a walkthrough" and resolves to `/demo`.

Contact: published details live in `src/config/site.js`. Anything not yet available stays null and is hidden rather than faked.
