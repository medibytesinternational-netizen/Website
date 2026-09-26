import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '../components/Chrome';
import { PageHero, ChecklistSection, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

export default function About() {
  useSeo(
    'About Us | Medibytes AI Healthcare Assistant',
    'We built Medibytes to tackle doctor burnout. Discover how our AI healthcare assistant helps hospitals cut manual data entry and focus on patient care.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: true, heroIntro: true });

  return (
    <>
      <Header active="about" />
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
                Building an effective AI healthcare assistant is not just about shipping clever
                code. It is about clearing the path for physicians.
              </p>
            </div>
          </div>
          <p className="reveal" style={{ maxWidth: 720 }}>
            Right now, administrative bloat slows down clinical floors. We exist to drastically
            reduce the endless typing, the mismatched lab reports, and the messy department logs.
            Our goal is not some magical, completely paperless fantasy. It is practical, everyday
            efficiency — cutting manual data entry so your doctors can spend their shifts actually
            practicing medicine.
          </p>
          <div className="teaser-cta reveal">
            <Link className="button primary" to="/contact">
              Partner With Us <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="platform-teaser container section" style={{ paddingTop: 0 }}>
          <div className="section-intro reveal">
            <div className="eyebrow">OUR VISION</div>
            <div className="intro-row">
              <h2>
                The national benchmark
                <br />
                for efficiency.
              </h2>
              <p>
                We look at the future of healthcare and see measurable clarity — a practical,
                achievable bar for operational excellence nationwide.
              </p>
            </div>
          </div>
          <p className="reveal" style={{ maxWidth: 720 }}>
            Our ultimate goal is to become the definitive performance index for hospitals across
            the country. When Medibytes is fully deployed, hospitals manage patient surges with
            confidence. Medical errors drop. Claim denials shrink drastically. The focus shifts
            back to the bedside.
          </p>
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
              "A doctor's time is incredibly valuable. Every feature we launch has to shave minutes off their daily workload. The technology serves the medical staff, period.",
            ],
            [
              'shield-check',
              'Absolute Truth in Data',
              'We do not guess. We never let AI hallucinate. If our intelligence layer cannot trace a medical fact back to the exact source audio, it gets rejected. Accuracy comes first.',
            ],
            [
              'layers',
              'Non-Invasive Innovation',
              "Upgrading tech shouldn't cause operational chaos. We refuse to force hospitals into painful software migrations. We build smart tools that adapt to your existing HMIS.",
            ],
          ]}
          caption="Hospital executives reviewing practical efficiency metrics."
        />
        <div className="container reveal" style={{ marginTop: -60, paddingBottom: 60 }}>
          <Link className="text-button" to="/hospitals#deployment">
            See How We Protect Data <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <ClosingCta
          eyebrow="PARTNER WITH US"
          title="Ready to rethink your hospital operations?"
          copy="You do not have to accept physician burnout as a normal part of the job. We have a better way. Let's talk about upgrading your facility today."
          button="Schedule Your Executive Demo Today"
        />
      </main>
      <Footer />
    </>
  );
}
