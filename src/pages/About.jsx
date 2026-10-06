import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero, ChecklistSection, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

export default function About() {
  useSeo(
    'About Us | Medibytes AI Healthcare Assistant',
    'We are building Medibytes to tackle doctor burnout — an AI documentation layer designed to cut manual data entry in Indian hospitals and put the focus back on patient care.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: true, heroIntro: true });

  return (
    <main id="main">
      <PageHero
        id="about-heading"
        eyebrow="ABOUT MEDIBYTES"
        lines={[
          { text: 'The Team Building a Smarter' },
          { text: 'AI Healthcare Assistant for Hospitals.', green: true },
        ]}
        sub="We are engineers, problem-solvers, and system builders. We watched brilliant doctors waste hours on repetitive data entry. So, we decided to fix the workflow."
        actions={
          <Link className="button primary" to="/how-it-works">
            See Our Technology <ArrowRight aria-hidden="true" />
          </Link>
        }
      />

      <section className="platform-teaser container section">
        <div className="section-intro reveal">
          <div className="eyebrow">OUR MISSION</div>
          <div className="intro-row">
            <h2>
              Tackling the administrative
              <br />
              load in healthcare.
            </h2>
            <p>
              Building an effective AI healthcare assistant is not just about shipping clever code.
              It is about clearing the path for physicians.
            </p>
          </div>
        </div>
        <p className="reveal" style={{ maxWidth: 720 }}>
          Right now, administrative bloat slows down clinical floors. We exist to drastically reduce
          the endless typing, the mismatched lab reports, and the messy department logs. Our goal is
          not some magical, completely paperless fantasy. It is practical, everyday efficiency —
          cutting manual data entry so your doctors can spend their shifts actually practicing
          medicine.
        </p>
        <div className="teaser-cta reveal">
          <Link className="button primary" to="/contact">
            Partner With Us <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="vision-section" id="about-vision">
        <div className="container">
          <div className="vision-top reveal">
            <span className="eyebrow">OUR VISION</span>
            <span className="outlined-tag">Measured in pilots</span>
          </div>
          <h2 className="vision-statement">
            The national benchmark <span>for efficiency.</span>
          </h2>
          <div className="vision-bottom reveal">
            <p>
              Our ambition is to become a genuine performance benchmark for hospitals across
              the country — less friction during surges, records that agree, fewer claim
              comebacks, and the focus back at the bedside. We would rather prove it in a
              pilot than assert it on a website.
            </p>
            <Link className="text-button" to="/contact">
              Start the conversation <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="roadmap reveal">
            <div>
              <span className="roadmap-dot current"></span>
              <strong>Attach</strong>
              <span>Wraps your existing HMIS</span>
              <small>Live in pilots</small>
            </div>
            <div>
              <span className="roadmap-dot"></span>
              <strong>Prove</strong>
              <span>Measured results, floor by floor</span>
              <small>In progress</small>
            </div>
            <div>
              <span className="roadmap-dot"></span>
              <strong>Benchmark</strong>
              <span>The efficiency bar, nationwide</span>
              <small>Planned</small>
            </div>
          </div>
        </div>
      </section>

      <ChecklistSection
        id="principles"
        eyebrow="CORE PRINCIPLES"
        title="The core principles that drive us."
        copy="We don't just write software and hope for the best. Every tool we engineer follows strict, non-negotiable rules."
        items={[
          [
            'stethoscope',
            'Respect the Provider',
            "A doctor's time is incredibly valuable. Every feature we launch has to save minutes off their daily workload. The technology serves the medical staff, period.",
          ],
          [
            'shield-check',
            'Absolute Truth in Data',
            'We would rather leave a blank than fill it with a guess. Every generated field links back to the exact moment in the dictation. If we cannot trace it, we do not write it — the clinician does.',
          ],
          [
            'layers',
            'Non-Invasive Innovation',
            "Upgrading tech shouldn't cause operational chaos. We refuse to force hospitals into painful software migrations. We build smart tools that adapt to your existing HMIS.",
          ],
        ]}
        caption="Hospital executives reviewing practical efficiency metrics."
      />
      <ClosingCta
        eyebrow="PARTNER WITH US"
        title="Ready to rethink your hospital operations?"
        copy="You do not have to accept physician burnout as a normal part of the job. We are looking for hospital partners to build the first pilots with. Let's talk."
        button="Book a walkthrough"
      />
    </main>
  );
}
