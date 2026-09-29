import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import { PILLARS, pillarBySlug } from '../components/features/data';
import { JourneyStrip, CloseSection } from '../components/features/parts';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import '../features.css';

function Capability({ pillar, cap, i }) {
  const { Visual } = pillar;
  const total = pillar.caps.length;
  const multi = total > 1;
  return (
    <section
      id={cap.key}
      className={`ft-cap${multi && i % 2 ? ' is-flip' : ''}`}
      aria-labelledby={`${cap.key}-heading`}
    >
      <div className="ft-cap-copy reveal">
        <div className="ft-cap-kicker">
          {multi && (
            <span className="ft-cap-count">
              {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          )}
          {cap.title}
        </div>
        <h2 id={`${cap.key}-heading`}>{cap.headline}</h2>
        <p>{cap.body}</p>
        {cap.highlight && <p className="ft-cap-highlight">{cap.highlight}</p>}
        {cap.note && <p className="ft-cap-note">{cap.note}</p>}
        {cap.points && (
          <div className="ft-cap-points">
            {cap.pointsLabel && <span className="ft-points-label">{cap.pointsLabel}</span>}
            <ul className={cap.inline ? 'ft-chips' : 'ft-points'}>
              {cap.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <figure className="ft-stage reveal" aria-label={`Illustrative example: ${cap.title}`}>
        <Visual active={cap.key} />
      </figure>
    </section>
  );
}

function Pillar({ pillar }) {
  useSeo(`${pillar.name} | Medibytes`, pillar.lead);
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  const at = PILLARS.indexOf(pillar);
  const next = PILLARS[(at + 1) % PILLARS.length];
  const multi = pillar.caps.length > 1;

  return (
    <MotionConfig reducedMotion="user">
      <main id="main" className={`ft ft-page ft-${pillar.slug}`}>
        <section className="ft-hero" aria-labelledby="pillar-heading">
          <Link className="ft-back hero-in" to="/features">
            <ArrowLeft aria-hidden="true" /> All features
          </Link>
          <p className="ft-hero-kicker hero-in">
            <span className="ft-kicker-num">{pillar.index}</span>
            {pillar.name}
          </p>
          <h1 id="pillar-heading">
            {pillar.headline.map((line, i) => (
              <span key={line} className={`headline-line${i ? ' ft-soft' : ''}`}>
                {line}
              </span>
            ))}
          </h1>
          <div className="ft-hero-foot">
            <div className="ft-hero-copy hero-in">
              <p className="ft-lead">{pillar.lead}</p>
              <p>{pillar.body}</p>
            </div>
            <div className="ft-hero-side hero-in">
              <p className="ft-flow" aria-label={`Flow: ${pillar.flow.join(', then ')}`}>
                {pillar.flow.map((f, i) => (
                  <span key={f}>
                    {i > 0 && (
                      <span className="ft-flow-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                    {f}
                  </span>
                ))}
              </p>
              <Link className="button primary" to="/demo">
                Book a walkthrough <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <div className="ft-caps-wrap">
          <div className="ft-caps-head reveal">
            <span className="ft-caps-label">{pillar.capsLabel}</span>
            {multi && (
              <ul className="ft-caps-index">
                {pillar.caps.map((c, i) => (
                  <li key={c.key}>
                    <a href={`#${c.key}`}>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {pillar.caps.map((cap, i) => (
            <Capability key={cap.key} pillar={pillar} cap={cap} i={i} />
          ))}
        </div>

        {pillar.statement && (
          <section className="ft-statement" aria-label="Supporting statement">
            <blockquote className="reveal">
              {pillar.statement.label && (
                <span className="ft-statement-label">{pillar.statement.label}</span>
              )}
              <p>{pillar.statement.text}</p>
            </blockquote>
          </section>
        )}

        <section className="ft-next" aria-label="Continue the patient journey">
          <Link className="ft-next-link reveal" to={`/features/${next.slug}`}>
            <span className="ft-next-label">
              {at === PILLARS.length - 1 ? 'Back to the start of the journey' : 'Next on the patient journey'}
            </span>
            <span className="ft-next-name">
              <span className="ft-kicker-num">{next.index}</span>
              {next.name}
              <ArrowRight aria-hidden="true" />
            </span>
            <span className="ft-next-card">{next.card}</span>
          </Link>
          <JourneyStrip current={pillar.slug} className="reveal" />
        </section>

        <CloseSection />
      </main>
    </MotionConfig>
  );
}

/** /features/:slug. Keyed by slug so page motion re-initialises on each pillar. */
export default function FeaturePillar() {
  const { slug } = useParams();
  const pillar = pillarBySlug(slug);
  if (!pillar) return <Navigate to="/features" replace />;
  return <Pillar key={pillar.slug} pillar={pillar} />;
}
