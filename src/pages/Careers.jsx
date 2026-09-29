import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero, ModuleGrid, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import { CAREERS_EMAIL } from '../config/site';

const CULTURE = [
  {
    icon: 'activity',
    kicker: '01 / INNOVATION',
    title: 'Fiercely Innovative',
    copy: 'We refuse to copy legacy HMIS vendors. We build the intelligence layer of the future.',
    cta: "Read Our Founder's Story",
    to: '/founders',
  },
  {
    icon: 'layers',
    kicker: '02 / NO RED TAPE',
    title: 'Zero Bureaucracy',
    copy: 'We care about the code you ship, not your job title. Our workspace is designed for people who hate red tape.',
    cta: "Read Our Founder's Story",
    to: '/founders',
  },
  {
    icon: 'shield-check',
    kicker: '03 / MISSION',
    title: 'Mission-Driven',
    copy: 'Every single feature saves a physician from useless data entry. Startups move fast — we move faster because our mission actually matters.',
    cta: "Read Our Founder's Story",
    to: '/founders',
  },
];

export default function Careers() {
  useSeo(
    'Healthcare IT Careers | Join Medibytes',
    'Want to fix broken hospital software? We are a mission-driven startup curing doctor burnout. Submit your resume to join our talent network today.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main">
      <PageHero
        id="careers-heading"
        eyebrow="CAREERS AT MEDIBYTES"
        lines={[{ text: 'Build the Future of' }, { text: 'Healthcare IT with Us.', green: true }]}
        sub="We are rewriting the rules of hospital software. We want builders eager to give doctors their time back."
        actions={
          <a className="button primary" href={`mailto:${CAREERS_EMAIL}`}>
            Join Our Talent Network <ArrowRight aria-hidden="true" />
          </a>
        }
      />

      <ModuleGrid
        eyebrow="OUR CULTURE"
        title="A culture built on solving real problems."
        copy="Administrative bloat is actively burning out doctors. We are here to fix that."
        modules={CULTURE}
      />

      <section className="faq container section">
        <div className="faq-heading reveal">
          <div className="eyebrow">OPEN ROLES</div>
          <h2>
            Where our hiring
            <br />
            stands right now.
          </h2>
        </div>
        <div className="faq-list reveal">
          <p style={{ maxWidth: 640 }}>
            Here is the honest truth. We are currently fully staffed. Our core team is completely
            heads-down building the product. But things change quickly — we are always on the
            lookout for exceptional talent. If you know how to fix complex clinical workflows, we
            want you on our radar.
          </p>
          <p style={{ maxWidth: 640, marginTop: 16 }}>
            Drop your resume at{' '}
            <a className="text-button" href={`mailto:${CAREERS_EMAIL}`}>
              {CAREERS_EMAIL}
            </a>{' '}
            to join our talent network for future opportunities.
          </p>
        </div>
      </section>

      <ClosingCta
        eyebrow="TALENT NETWORK"
        title="Ready to build what matters?"
        copy="Stop tweaking apps nobody needs. Help us strip away the administrative nightmare in modern medicine."
        button="Email Your Resume"
        to={`mailto:${CAREERS_EMAIL}`}
      />
    </main>
  );
}
