import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero, MiniForm, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, OFFICE_ADDRESS } from '../config/site';

export default function Contact() {
  useSeo(
    'Contact Medibytes | Your AI Healthcare Assistant',
    'Talk to the team building Medibytes. Tell us what is slowing your floor down, and we will tell you honestly whether what we are building can help.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main">
      <PageHero
        id="contact-heading"
        eyebrow="CONTACT MEDIBYTES"
        lines={[
          { text: "Let's Talk About Your" },
          { text: 'AI Healthcare Assistant.', green: true },
        ]}
        sub="We know hospital administration is exhausting. But the paperwork problem is completely fixable. If you want to hand your doctors their time back, you are in the exact right place."
        actions={
          <a className="button primary" href="#message-form">
            Jump to the Form <ArrowRight aria-hidden="true" />
          </a>
        }
      />

      <section className="deployment container section">
        <div className="section-intro reveal">
          <div className="eyebrow">DIRECT LINES</div>
          <div className="intro-row">
            <h2>
              Reach our team
              <br />
              directly.
            </h2>
            <p>
              Dealing with clunky hospital software is stressful enough. Reaching out for a solution
              should be easy.
            </p>
          </div>
        </div>
        <div className="deployment-grid">
          <article className="deployment-card reveal">
            <span className="deploy-label">DEMOS &amp; GENERAL QUESTIONS</span>
            <h3>Say hello.</h3>
            <p>
              Want a walkthrough? Have a technical question?{' '}
              <a className="text-button" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <div className="teaser-cta">
              <Link className="text-button" to="/how-it-works">
                Peek at the Features First <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
          <article className="deployment-card local reveal">
            <span className="deploy-label">SUPPORT</span>
            <h3>Fast replies.</h3>
            <p>
              {CONTACT_PHONE ? (
                <>
                  For quick updates and support chats:{' '}
                  <a className="text-button" href={CONTACT_PHONE_HREF}>
                    {CONTACT_PHONE}
                  </a>
                </>
              ) : (
                <>
                  Our support line is being set up. Until it is live, email reaches the same team
                  just as quickly.
                </>
              )}
            </p>
            <div className="teaser-cta">
              <Link className="text-button" to="/demo">
                Book a walkthrough <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="faq container section" id="message-form">
        <div className="faq-heading reveal">
          <div className="eyebrow">QUICK MESSAGE</div>
          <h2>
            Send a quick
            <br />
            message.
          </h2>
        </div>
        <div className="faq-list reveal">
          <p style={{ maxWidth: 560, marginBottom: 22 }}>
            Curious how this actually layers over your current HMIS? Just fill out this short form.
            A real human reads these messages, so you will not be waiting long for an answer.
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
      </section>

      <section className="platform-teaser container section" style={{ paddingTop: 0 }}>
        <div className="section-intro reveal">
          <div className="eyebrow">OUR HOME BASE</div>
          <div className="intro-row">
            <h2>
              Built in
              <br />
              Chennai.
            </h2>
            <p>
              {OFFICE_ADDRESS.name}
              {OFFICE_ADDRESS.lines.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
        <p className="reveal" style={{ maxWidth: 720 }}>
          We are building the next wave of clinical technology right out of Chennai.
        </p>
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
