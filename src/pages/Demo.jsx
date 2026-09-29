import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero, ChecklistSection, MiniForm, ClosingCta, StatsBar } from '../components/content';
import { FaqList } from '../components/sections';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import { BOOKING_URL } from '../config/site';

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

export default function Demo() {
  useSeo(
    'Book a Walkthrough | Medibytes',
    'See what we have built. Book a 30-minute walkthrough of the Medibytes documentation layer, and tell us what would have to be true for it to work on your floor.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main">
      <PageHero
        id="demo-heading"
        eyebrow="WALKTHROUGH"
        lines={[{ text: 'Give Your Doctors' }, { text: 'Their Time Back.', green: true }]}
        sub="See what we have built, walk us through how your floor actually documents today, and tell us what would have to be true for Medibytes to work there. Book a slot below."
        actions={
          <a className="button primary" href="#booking-form">
            Book a walkthrough <ArrowRight aria-hidden="true" />
          </a>
        }
      />

      <StatsBar
        label="What the walkthrough covers"
        stats={[
          ['activity', "30-minute walkthrough of what's built"],
          ['file-text', "Straight answers on what isn't ready"],
          ['shield-check', 'Zero-pressure fit check'],
        ]}
      />

      <section className="faq container section" id="booking-form">
        <div className="faq-heading reveal">
          <div className="eyebrow">BOOKING</div>
          <h2>
            Grab your
            <br />
            time slot.
          </h2>
        </div>
        <div className="faq-list reveal">
          {BOOKING_URL && (
            <p style={{ maxWidth: 560, marginBottom: 22 }}>
              <a className="text-button" href={BOOKING_URL}>
                Pick a slot in our calendar <ArrowRight aria-hidden="true" />
              </a>
            </p>
          )}
          <p style={{ maxWidth: 560, marginBottom: 22 }}>
            Drop your details into the short form below and we will come back with times that suit
            your team.
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
      </section>

      <ChecklistSection
        id="what-to-expect"
        eyebrow="THE CALL"
        title="What to expect on our call."
        copy="No high-pressure sales pitch. Just a practical look at fixing administrative bottlenecks."
        items={[
          [
            'activity',
            'Fast, 30-Minute Walkthrough',
            'We jump straight into the product as it stands today.',
          ],
          [
            'scan-line',
            'Custom Workflow Mapping',
            'We pinpoint exactly where your staff loses the most time.',
          ],
          [
            'check',
            'Zero Pressure',
            "If the tech isn't a fit for your system, we will tell you directly.",
          ],
        ]}
      />

      <section className="faq container section" id="faqs" style={{ paddingTop: 0 }}>
        <div className="faq-heading reveal">
          <div className="eyebrow">QUICK ANSWERS</div>
          <h2>
            Before you
            <br />
            book.
          </h2>
        </div>
        <div className="faq-list reveal">
          <FaqList items={DEMO_FAQ} />
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
