import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PILLARS, PLATFORM } from '../components/features/data';
import { JourneyStrip, CloseSection } from '../components/features/parts';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import '../features.css';

export default function Features() {
  useSeo(
    'The MediBytes Intelligence Platform | Medibytes',
    'OPD, IPD, Clinical, Document and Insurance Intelligence: one intelligent layer across the entire patient journey.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main" className="ft ft-hub">
      <section className="ft-hero" aria-labelledby="features-heading">
        <p className="ft-hero-kicker hero-in">{PLATFORM.kicker}</p>
        <h1 id="features-heading">
          <span className="headline-line">{PLATFORM.headline[0]}</span>
          <span className="headline-line ft-soft">{PLATFORM.headline[1]}</span>
        </h1>
        <div className="ft-hero-foot">
          <p className="ft-lead hero-in">{PLATFORM.lead}</p>
          <div className="ft-hero-actions hero-in">
            <Link className="button primary" to="/demo">
              Book a walkthrough <ArrowUpRight aria-hidden="true" />
            </Link>
            <a className="ft-text-link" href="#pillars">
              Explore the platform <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>
        <JourneyStrip className="hero-in" />
      </section>

      <section id="pillars" className="ft-pillars" aria-label="The five product pillars">
        <ol>
          {PILLARS.map((p) => (
            <li key={p.slug} className="reveal">
              <Link to={`/features/${p.slug}`} className="ft-pillar">
                <span className="ft-pillar-num">{p.index}</span>
                <span className="ft-pillar-main">
                  <span className="ft-pillar-name">{p.name}</span>
                  <span className="ft-pillar-summary">{p.summary}</span>
                </span>
                <span className="ft-pillar-card">{p.card}</span>
                <span className="ft-pillar-cta">
                  Explore {p.name} <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <CloseSection />
    </main>
  );
}
