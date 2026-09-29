import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PILLARS, PLATFORM } from './data';

/** OPD → IPD → Clinical → Documents → Insurance, with the current page marked. */
export function JourneyStrip({ current, className = '' }) {
  return (
    <div role="navigation" className={`ft-journey ${className}`} aria-label="Patient journey">
      <span className="ft-journey-line" aria-hidden="true">
        {!current && (
          <span className="ft-journey-runner">
            <span className="ft-journey-dot" />
          </span>
        )}
      </span>
      <ol>
        {PILLARS.map((p) => {
          const here = p.slug === current;
          return (
            <li key={p.slug}>
              <Link
                to={`/features/${p.slug}`}
                className={here ? 'is-here' : ''}
                aria-current={here ? 'page' : undefined}
              >
                <span className="ft-journey-stop" aria-hidden="true" />
                <span className="ft-journey-num">{p.index}</span>
                <span className="ft-journey-name">{p.name}</span>
                <span className="ft-journey-flow">{p.flow.join(' → ')}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function CloseSection() {
  const { closing } = PLATFORM;
  return (
    <section className="ft-close" aria-labelledby="features-close">
      <div className="ft-close-inner reveal">
        <h2 id="features-close">
          <span className="ft-line">{closing.headline[0]}</span>
          <span className="ft-line ft-soft">{closing.headline[1]}</span>
        </h2>
        <div className="ft-close-copy">
          <p>{closing.body}</p>
          <p className="ft-close-tag">{closing.tagline}</p>
          <p className="ft-status">
            MediBytes is in development and recruiting its first hospital partners. Product
            examples on these pages are illustrative.
          </p>
          <Link className="button primary" to="/demo">
            Book a walkthrough <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
