import { useId, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Plus } from 'lucide-react';
import { MiniForm, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import { BOOKING_URL } from '../config/site';
import '../form-panel.css';
import '../demo.css';

const COVERS = [
  "30-minute walkthrough of what's built",
  "Straight answers on what isn't ready",
  'Zero-pressure fit check',
];

const STEPS = [
  ['Fast, 30-Minute Walkthrough', 'We jump straight into the product as it stands today.'],
  ['Custom Workflow Mapping', 'We pinpoint exactly where your staff loses the most time.'],
  ['Zero Pressure', "If the tech isn't a fit for your system, we will tell you directly."],
];

const DEMO_FAQ = [
  [
    'Will this break our current EMR?',
    'Nope. The platform wraps right around your existing setup. No data migrations required.',
  ],
  [
    'Can it handle heavy regional accents?',
    'Indian-accented clinical English and Tamil are core design targets, including mixed English-Tamil speech. We will show you where it stands today and where it does not yet hold up.',
  ],
  [
    'How do you handle data privacy?',
    'Local, on-premise deployment is central to the plan — clinical processing designed to stay inside your own environment — and every generated line stays traceable to the physician’s original audio, so nothing is invented. The walkthrough itself uses sample data only; no patient data is involved. Bring your IT and compliance team and we will go through the specifics.',
  ],
];

/** Accordion row; the answer opens by transitioning grid-template-rows, not height. */
function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`dm-faq${open ? ' is-open' : ''}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          id={`${id}-q`}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{q}</span>
          <span className="dm-faq-icon" aria-hidden="true">
            <Plus />
          </span>
        </button>
      </h3>
      <div className="dm-faq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Demo() {
  useSeo(
    'Book a Walkthrough | Medibytes',
    'See what we have built. Book a 30-minute walkthrough of the Medibytes documentation layer, and tell us what would have to be true for it to work on your floor.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main" className="dm">
      <section className="dm-hero" aria-labelledby="demo-heading">
        <div className="dm-hero-copy">
          <p className="dm-kicker hero-in">Walkthrough</p>
          <h1 id="demo-heading">
            <span className="headline-line">Give Your Doctors</span>
            <span className="headline-line dm-accent">Their Time Back.</span>
          </h1>
          <p className="dm-sub hero-in">
            See what we have built, walk us through how your floor actually documents today, and
            tell us what would have to be true for Medibytes to work there. Book a slot below.
          </p>

          <div className="dm-covers hero-in">
            <p className="dm-label">What the walkthrough covers</p>
            <ul>
              {COVERS.map((c) => (
                <li key={c}>
                  <span className="dm-tick" aria-hidden="true">
                    <Check />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <a className="dm-jump hero-in" href="#booking-form">
            Book a walkthrough <ArrowDown aria-hidden="true" />
          </a>
        </div>

        <div className="dm-hero-form">
          <div className="fp hero-in" id="booking-form">
            <p className="dm-label">Booking</p>
            <h2>Grab your time slot.</h2>
            {BOOKING_URL && (
              <a className="dm-calendar" href={BOOKING_URL}>
                Pick a slot in our calendar <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            <p className="fp-intro">
              Drop your details into the short form below and we will come back with times that
              suit your team.
            </p>
            <MiniForm
              idPrefix="demo"
              button="Book a walkthrough"
              subject="Demo request — Medibytes"
              fields={{
                name: {
                  label: 'Name',
                  hint: 'Who are we speaking with?',
                  autoComplete: 'name',
                },
                email: {
                  label: 'Work Email',
                  hint: 'Where should we send the invite?',
                  type: 'email',
                  inputMode: 'email',
                  autoComplete: 'email',
                },
                facility: {
                  label: 'Facility Type',
                  hint: 'e.g., 500-Bed Hospital',
                  placeholder: 'e.g., 500-Bed Hospital',
                  autoComplete: 'organization',
                },
                whatsapp: {
                  label: 'WhatsApp Number',
                  hint: 'For quick updates.',
                  type: 'tel',
                  inputMode: 'tel',
                  autoComplete: 'tel',
                },
              }}
            />
          </div>
        </div>
      </section>

      <section className="dm-call" id="what-to-expect" aria-labelledby="call-heading">
        <header className="dm-call-head reveal">
          <p className="dm-label">The call</p>
          <h2 id="call-heading">What to expect on our call.</h2>
          <p>
            No high-pressure sales pitch. Just a practical look at fixing administrative
            bottlenecks.
          </p>
        </header>
        <ol className="dm-steps">
          {STEPS.map(([title, copy], i) => (
            <li key={title} className="dm-step reveal">
              <span className="dm-step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="dm-step-rule" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="dm-faqs" id="faqs" aria-labelledby="faqs-heading">
        <header className="dm-faqs-head reveal">
          <p className="dm-label">Quick answers</p>
          <h2 id="faqs-heading">Before you book.</h2>
        </header>
        <div className="dm-faq-list reveal">
          {DEMO_FAQ.map(([q, a]) => (
            <Faq key={q} q={q} a={a} />
          ))}
        </div>
      </section>

      <ClosingCta
        eyebrow="READY WHEN YOU ARE"
        title="Ready to upgrade your floor?"
        copy="Help shape what the first pilots look like. The hospitals we talk to now are the ones the product gets built around."
        button="Book a walkthrough"
      />
    </main>
  );
}
