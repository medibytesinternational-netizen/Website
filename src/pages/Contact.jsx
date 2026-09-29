import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import { MiniForm, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, OFFICE_ADDRESS } from '../config/site';
import '../form-panel.css';
import '../contact.css';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  [OFFICE_ADDRESS.name, ...OFFICE_ADDRESS.lines].join(', ')
)}`;

/** Copies the address to the clipboard; the label confirms for two seconds. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  if (typeof navigator === 'undefined' || !navigator.clipboard) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard refused: the mailto link beside it still works. */
    }
  };

  return (
    <button type="button" className={`ct-copy${copied ? ' is-copied' : ''}`} onClick={copy}>
      <span className="ct-copy-icon" aria-hidden="true">
        <Copy />
        <Check />
      </span>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}

export default function Contact() {
  useSeo(
    'Contact Medibytes | Your AI Healthcare Assistant',
    'Talk to the team building Medibytes. Tell us what is slowing your floor down, and we will tell you honestly whether what we are building can help.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main" className="ct">
      <section className="ct-hero" aria-labelledby="contact-heading">
        <p className="ct-kicker hero-in">Contact Medibytes</p>
        <h1 id="contact-heading">
          <span className="headline-line">Let's Talk About Your</span>
          <span className="headline-line ct-accent">AI Healthcare Assistant.</span>
        </h1>
        <div className="ct-hero-foot">
          <p className="hero-in">
            We know hospital administration is exhausting. But the paperwork problem is completely
            fixable. If you want to hand your doctors their time back, you are in the exact right
            place.
          </p>
          <a className="ct-jump hero-in" href="#message-form">
            Jump to the Form <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="ct-desk" aria-label="Ways to reach us">
        <div className="ct-lines">
          <header className="ct-lines-head reveal">
            <p className="ct-label">Direct lines</p>
            <h2>Reach our team directly.</h2>
            <p>
              Dealing with clunky hospital software is stressful enough. Reaching out for a solution
              should be easy.
            </p>
          </header>

          <ul className="ct-channels">
            <li className="ct-channel reveal">
              <span className="ct-label">Demos &amp; general questions</span>
              <h3>Say hello.</h3>
              <p>Want a walkthrough? Have a technical question?</p>
              <div className="ct-channel-actions">
                <a className="ct-email" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                <CopyEmail />
              </div>
              <Link className="ct-link" to="/features">
                Peek at the Features First <ArrowRight aria-hidden="true" />
              </Link>
            </li>

            <li className="ct-channel reveal">
              <span className="ct-label">Support</span>
              <h3>Fast replies.</h3>
              {CONTACT_PHONE ? (
                <>
                  <p>For quick updates and support chats:</p>
                  <div className="ct-channel-actions">
                    <a className="ct-email" href={CONTACT_PHONE_HREF}>
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </>
              ) : (
                <p>
                  Our support line is being set up. Until it is live, email reaches the same team
                  just as quickly.
                </p>
              )}
              <Link className="ct-link" to="/demo">
                Book a walkthrough <ArrowRight aria-hidden="true" />
              </Link>
            </li>

            <li className="ct-channel reveal">
              <span className="ct-label">Our home base</span>
              <h3>Built in Chennai.</h3>
              <address>
                {OFFICE_ADDRESS.name}
                {OFFICE_ADDRESS.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p>We are building the next wave of clinical technology right out of Chennai.</p>
              <a className="ct-link" href={MAPS_URL} target="_blank" rel="noreferrer">
                Open in Maps <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="ct-form-col">
          <div className="fp reveal" id="message-form">
            <p className="ct-label">Quick message</p>
            <h2>Send a quick message.</h2>
            <p className="fp-intro">
              Curious how this actually layers over your current HMIS? Just fill out this short
              form. A real human reads these messages, so you will not be waiting long for an
              answer.
            </p>
            <MiniForm
              idPrefix="contact"
              button="Send Message"
              subject="Website enquiry — Medibytes"
              fields={{
                name: {
                  label: 'Name',
                  hint: 'Who are we talking to?',
                  autoComplete: 'name',
                },
                email: {
                  label: 'Email',
                  hint: 'Where should we send our reply?',
                  type: 'email',
                  inputMode: 'email',
                  autoComplete: 'email',
                },
                message: {
                  label: 'Message',
                  hint: 'What exactly is slowing your facility down today?',
                  multiline: true,
                },
              }}
            />
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="WALKTHROUGH"
        title="Time to fix the bottlenecks."
        copy="Stop watching your clinical staff drown in data entry. Show us the bottleneck and we will show you what we have built."
        button="Book a walkthrough"
      />
    </main>
  );
}
