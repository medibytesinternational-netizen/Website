import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

const HELPFUL_LINKS = [
  ['Home', '/', 'Start from the beginning.'],
  ['Features', '/features', 'The intelligence layer, end to end.'],
  ['How it works', '/how-it-works', 'Voice to structured, verified notes.'],
  ['For hospitals', '/hospitals', 'Deployment paths and security.'],
];

export default function NotFound() {
  useSeo(
    'Page not found | Medibytes',
    'The page you asked for does not exist. Head back home or explore the platform.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main">
      <PageHero
        id="not-found-heading"
        eyebrow="404 — PAGE NOT FOUND"
        lines={[
          { text: 'That page slipped' },
          { text: 'off the chart.', green: true },
        ]}
        sub="The link you followed does not exist or was moved. The notes are safe — just pick a path below."
        actions={
          <>
            <Link className="button primary" to="/">
              Back to home <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="text-button" to="/demo">
              Book a walkthrough
            </Link>
          </>
        }
      />

      <section className="platform-teaser container section" aria-label="Where to go next">
        <div className="section-intro reveal">
          <div className="eyebrow">WHERE TO NEXT</div>
          <div className="intro-row">
            <h2>Find your way back.</h2>
            <p>Popular destinations across the site.</p>
          </div>
        </div>
        <div className="teaser-grid">
          {HELPFUL_LINKS.map(([name, to, copy]) => (
            <div className="teaser-card reveal" key={to}>
              <h3>{name}</h3>
              <p>{copy}</p>
              <div className="teaser-cta">
                <Link className="text-button" to={to}>
                  Go to {name} <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
