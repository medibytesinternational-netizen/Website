import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Icon } from './icons';
import BackgroundVideo from './BackgroundVideo';
import '../module-showcase.css';
import { CONTACT_EMAIL } from '../config/site';
import { enquiriesEnabled, saveEnquiry } from '../lib/enquiries';

/* ---------- Page hero (same .page-hero layout everywhere) ---------- */
export function PageHero({ eyebrow, lines, sub, actions, id }) {
  return (
    <section className="page-hero container" aria-labelledby={id}>
      <div className="eyebrow hero-in">{eyebrow}</div>
      <h1 id={id}>
        {lines.map((l) => (
          <span key={l.text} className={`headline-line${l.green ? ' green' : ''}`}>
            {l.text}
          </span>
        ))}
      </h1>
      {sub && <p className="hero-in">{sub}</p>}
      {actions && <div className="hero-actions hero-in">{actions}</div>}
    </section>
  );
}

/* ---------- Metric strip: continuous left-to-right marquee ---------- */
export function StatsBar({ label, stats }) {
  const group = (key) => (
    <div className="marquee-group" key={key} aria-hidden={key !== 0}>
      {stats.map(([icon, text]) => (
        <span className="marquee-item" key={`${key}-${text}`}>
          <Icon name={icon} /> {text}
        </span>
      ))}
    </div>
  );
  return (
    <div className="capability-strip marquee" role="region" aria-label={label}>
      <div className="marquee-track">
        {group(0)}
        {group(1)}
        {group(2)}
        {group(3)}
      </div>
    </div>
  );
}

/* ---------- Intro + animated checklist rows (numbered, icon chips) ---------- */
export function ChecklistSection({ id, eyebrow, title, copy, items, caption }) {
  return (
    <section className="deployment container section" id={id}>
      <div className="section-intro reveal">
        <div className="eyebrow">{eyebrow}</div>
        <div className="intro-row">
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
      </div>
      <div className="check-list">
        {items.map(([icon, lead, rest], i) => (
          <article className="check-row" key={lead}>
            <span className="check-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="check-ico" aria-hidden="true">
              <Icon name={icon} />
            </span>
            <span className="check-text">
              <strong>{lead}</strong>
              <span>{rest}</span>
            </span>
            <span className="check-tick" aria-hidden="true">
              <Icon name="check" />
            </span>
          </article>
        ))}
      </div>
      {caption && <p className="deployment-caption">{caption}</p>}
    </section>
  );
}

/* ---------- Module grid (same teaser-grid cards) ---------- */
export function ModuleGrid({ eyebrow, title, copy, modules }) {
  return (
    <section className="platform-teaser container section">
      <div className="section-intro reveal">
        <div className="eyebrow">{eyebrow}</div>
        <div className="intro-row">
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
      </div>
      <div className="teaser-grid">
        {modules.map((m) => (
          <div className="teaser-card reveal" key={m.title}>
            <div className="card-top">
              <Icon name={m.icon} />
              <span>{m.kicker}</span>
            </div>
            <h3>{m.title}</h3>
            <p>{m.copy}</p>
            <div className="teaser-cta">
              <Link className="text-button" to={m.to}>
                {m.cta} <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Module showcase (rail of modules + swapping detail panel) ---------- */
export function ModuleStack({ eyebrow, title, copy, modules }) {
  const [active, setActive] = useState(0);
  const current = modules[active];

  return (
    <section className="platform-teaser container section ms">
      <div className="section-intro reveal">
        <div className="eyebrow">{eyebrow}</div>
        <div className="intro-row">
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
      </div>

      <div className="ms-shell reveal">
        <div className="ms-rail" role="tablist" aria-label="Platform modules">
          {modules.map((m, i) => (
            <button
              key={m.title}
              type="button"
              role="tab"
              id={`ms-tab-${i}`}
              aria-selected={i === active}
              aria-controls="ms-panel"
              tabIndex={i === active ? 0 : -1}
              className="ms-tab"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e) => {
                const next =
                  e.key === 'ArrowDown' || e.key === 'ArrowRight'
                    ? (active + 1) % modules.length
                    : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
                      ? (active - 1 + modules.length) % modules.length
                      : null;
                if (next === null) return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`ms-tab-${next}`)?.focus();
              }}
            >
              <span className="ms-tab-icon">
                <Icon name={m.icon} />
              </span>
              <span className="ms-tab-text">
                <span className="ms-tab-kicker">{m.kicker}</span>
                <span className="ms-tab-title">{m.title}</span>
              </span>
              <span className="ms-tab-mark" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div
          className="ms-panel"
          id="ms-panel"
          role="tabpanel"
          aria-labelledby={`ms-tab-${active}`}
        >
          <div className="ms-panel-body" key={current.title}>
            <div className="ms-panel-top">
              <Icon name={current.icon} />
              <span>{current.kicker}</span>
            </div>
            <h3>{current.title}</h3>
            <p>{current.copy}</p>
            <div className="ms-panel-count">
              <Link className="text-button" to={current.to}>
                {current.cta} <ArrowRight aria-hidden="true" />
              </Link>
              <span className="ms-panel-index">
                {String(active + 1).padStart(2, '0')} / {String(modules.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Founder profile card ---------- */
export function FounderCard({ name, role, paragraphs, imageAlt, signature }) {
  return (
    <article className="deployment-card reveal">
      <div className="deploy-symbol" aria-hidden="true">
        <Icon name="stethoscope" />
      </div>
      <span className="deploy-label">{role}</span>
      <h3>{name}</h3>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ marginTop: i ? 14 : 0 }}>
          {p}
        </p>
      ))}
      <ul>
        <li>
          <Icon name="check" /> {imageAlt}
        </li>
        <li>
          <Icon name="pencil" /> Signed, {signature}
        </li>
      </ul>
    </article>
  );
}

/* ---------- Closing CTA band (contact-section language) ---------- */
export function ClosingCta({ eyebrow, title, copy, button, to = '/demo' }) {
  const external = /^(mailto:|https?:)/.test(to);
  const Cta = external ? (
    <a className="button primary reveal" href={to} style={{ marginTop: 29, position: 'relative' }}>
      {button} <ArrowUpRight aria-hidden="true" />
    </a>
  ) : (
    <Link className="button primary reveal" to={to} style={{ marginTop: 29, position: 'relative' }}>
      {button} <ArrowUpRight aria-hidden="true" />
    </Link>
  );
  return (
    <section className="contact-section container" id="demo-cta">
      <BackgroundVideo className="cta-bg-video" base="/cta-blend" poster="/cta-blend-poster.jpg" />
      <div className="contact-glow" aria-hidden="true"></div>
      <div className="eyebrow reveal">{eyebrow}</div>
      <h2 className="reveal">{title}</h2>
      <p className="reveal">{copy}</p>
      {Cta}
    </section>
  );
}

/* ---------- Enquiry form: saves to Firestore, falls back to email ----------
 *
 * Submissions are stored in the Firestore `enquiries` collection (tagged with
 * idPrefix as the form name). If Firebase isn't configured or the write fails,
 * submitting opens a prefilled mail draft to CONTACT_EMAIL instead, and the
 * confirmation only claims what actually happened — so no enquiry is lost.
 */
export function MiniForm({ fields, button, subject, idPrefix }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.keys(fields).map((k) => [k, '']))
  );
  const [error, setError] = useState('');
  const [handedOff, setHandedOff] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | saved

  const onChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setError('');
  };

  const buildMailto = () => {
    const body = Object.entries(fields)
      .map(([key, cfg]) => `${cfg.label}: ${values[key].trim()}`)
      .join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const send = async (e) => {
    e.preventDefault();
    const emptyKey = Object.keys(fields).find((k) => !values[k].trim());
    if (emptyKey) {
      setError(`Please complete “${fields[emptyKey].label}” before sending.`);
      document.querySelector(`#${idPrefix}-${emptyKey}`)?.focus();
      return;
    }
    const emailKey = Object.keys(fields).find((k) => /email/i.test(k));
    if (emailKey && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[emailKey])) {
      setError('That email doesn’t look right — please check it.');
      return;
    }
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v.trim()])
    );
    if (enquiriesEnabled) {
      setStatus('sending');
      try {
        await saveEnquiry(idPrefix, trimmed);
        setStatus('saved');
        setValues(Object.fromEntries(Object.keys(fields).map((k) => [k, ''])));
        return;
      } catch (err) {
        console.error('Enquiry could not be saved, falling back to email', err);
        setStatus('idle');
      }
    }
    window.location.href = buildMailto();
    setHandedOff(true);
  };

  return (
    <form onSubmit={send} noValidate>
      {Object.entries(fields).map(([key, cfg]) => (
        <div className="note-field" key={key}>
          <label htmlFor={`${idPrefix}-${key}`}>
            {cfg.label} <span>{cfg.hint}</span>
          </label>
          {cfg.multiline ? (
            <textarea
              id={`${idPrefix}-${key}`}
              name={key}
              value={values[key]}
              onChange={onChange(key)}
              rows={4}
              autoComplete={cfg.autoComplete}
              placeholder={cfg.placeholder}
            />
          ) : (
            <input
              id={`${idPrefix}-${key}`}
              name={key}
              type={cfg.type ?? 'text'}
              inputMode={cfg.inputMode}
              autoComplete={cfg.autoComplete}
              value={values[key]}
              onChange={onChange(key)}
              placeholder={cfg.placeholder}
            />
          )}
        </div>
      ))}
      {error && (
        <p role="alert" style={{ fontSize: 12, color: '#8A2A1B', margin: '0 0 12px' }}>
          {error}
        </p>
      )}
      <button type="submit" className="button primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : button} <ArrowRight aria-hidden="true" />
      </button>
      <p role="status" className="form-note">
        {status === 'saved'
          ? 'Thanks — we’ve received your message and a real person will reply soon. '
          : handedOff
            ? 'Your email app should now hold a draft addressed to us — press send there and it reaches a real person. '
            : enquiriesEnabled
              ? 'Prefer email? Write to us directly: '
              : 'This opens a prefilled draft in your email app so you can review it before sending. '}
        <a className="text-button" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
    </form>
  );
}
