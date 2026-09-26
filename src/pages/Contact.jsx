import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '../components/Chrome';
import { PageHero, MiniForm, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

export default function Contact() {
  useSeo(
    'Contact Medibytes | Your AI Healthcare Assistant',
    'Ready to clear out the paperwork bottleneck? Send the Medibytes team a message. We are here to help your hospital run smoothly. Reach out to us today.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <>
      <Header active="contact" />
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
                Dealing with clunky hospital software is stressful enough. Reaching out for a
                solution should be easy.
              </p>
            </div>
          </div>
          <div className="deployment-grid">
            <article className="deployment-card reveal">
              <span className="deploy-label">DEMOS &amp; GENERAL QUESTIONS</span>
              <h3>Say hello.</h3>
              <p>
                Need to book a live demo? Have a technical question?{' '}
                <a className="text-button" href="mailto:hello@medibytes.in">
                  hello@medibytes.in
                </a>
              </p>
              <div className="teaser-cta">
                <Link className="text-button" to="/how-it-works">
                  Peek at the Features First <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article className="deployment-card local reveal">
              <span className="deploy-label">SUPPORT &amp; WHATSAPP</span>
              <h3>Fast replies.</h3>
              <p>
                For quick updates and support chats:{' '}
                <a className="text-button" href="tel:+914400000000">
                  +91 44 0000 0000
                </a>
              </p>
              <div className="teaser-cta">
                <Link className="text-button" to="/demo">
                  Or Book a Demo <ArrowRight aria-hidden="true" />
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
              Curious how this actually layers over your current HMIS? Just fill out this short
              form. A real human reads these messages, so you will not be waiting long for an
              answer.
            </p>
            <MiniForm
              idPrefix="contact"
              button="Send Message"
              successMsg="Message noted — a real human will reply shortly. For anything urgent, reach us at hello@medibytes.in."
              fields={{
                name: { label: 'Name', hint: 'Who are we talking to?' },
                email: { label: 'Email', hint: 'Where should we send our reply?' },
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
                Medibytes
                <br />
                No 3/8 Annaji Nagar, 2nd Cross Street West,
                <br />
                KK Nagar, Chennai 600078
              </p>
            </div>
          </div>
          <p className="reveal" style={{ maxWidth: 720 }}>
            We are building the next wave of clinical technology right out of Chennai.
          </p>
        </section>

        <ClosingCta
          eyebrow="EXECUTIVE DEMO"
          title="Time to fix the bottlenecks."
          copy="Stop watching your clinical staff drown in data entry. It is time for a better workflow."
          button="Book Your Executive Demo Now"
        />
      </main>
      <Footer />
    </>
  );
}
