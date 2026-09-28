import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Icon } from './icons';

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
      <video
        className="cta-bg-video"
        src="/cta-blend.mp4"
        poster="/cards-bg.svg"
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={(e) => {
          e.currentTarget.muted = true;
          e.currentTarget.classList.add('ready');
          e.currentTarget.play().catch(() => {});
        }}
      />
      <div className="contact-glow" aria-hidden="true"></div>
      <div className="eyebrow reveal">{eyebrow}</div>
      <h2 className="reveal">{title}</h2>
      <p className="reveal">{copy}</p>
      {Cta}
    </section>
  );
}

/* ---------- Frontend-only form (note-field styling, success state) ---------- */
export function MiniForm({ fields, button, successMsg, idPrefix }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.keys(fields).map((k) => [k, '']))
  );
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setError('');
  };

  const send = (e) => {
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
    setSent(true);
  };

  if (sent) {
    return (
      <p className="deployment-caption" role="status" style={{ textAlign: 'left' }}>
        {successMsg}
      </p>
    );
  }

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
              value={values[key]}
              onChange={onChange(key)}
              rows={4}
              aria-label={cfg.label}
              style={{
                fontSize: 11,
                color: '#0F2A4D',
                background: '#F0F7FF',
                border: '1px solid var(--line)',
                borderRadius: 4,
                padding: 9,
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          ) : (
            <input
              id={`${idPrefix}-${key}`}
              value={values[key]}
              onChange={onChange(key)}
              aria-label={cfg.label}
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
      <button type="submit" className="button primary">
        {button} <ArrowRight aria-hidden="true" />
      </button>
    </form>
  );
}
