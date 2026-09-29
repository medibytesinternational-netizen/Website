import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaqList } from '../components/sections';
import { StatsBar, ChecklistSection, ModuleGrid, ClosingCta, TypingLine } from '../components/content';
import ProductPreview from '../components/ProductPreview';
import BackgroundVideo from '../components/BackgroundVideo';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

const MODULES = [
  {
    icon: 'stethoscope',
    kicker: '01 / OPD',
    title: 'OPD Documentation',
    copy: 'Keep busy outpatient clinics moving. Quick notes and patient histories captured by voice, between one patient and the next.',
    cta: 'Explore OPD',
    to: '/hospitals',
  },
  {
    icon: 'file-text',
    kicker: '02 / IPD',
    title: 'IPD Documentation',
    copy: 'Progress logs, care plans, shift handovers and discharge summaries — dictated once, structured into the template each one needs.',
    cta: 'Explore IPD',
    to: '/hospitals',
  },
  {
    icon: 'shield-check',
    kicker: '03 / CLINICAL AI',
    title: 'Clinical Intelligence',
    copy: 'Surfaces possible drug interactions and logical inconsistencies for the clinician to review. The call stays yours.',
    cta: 'Explore Clinical AI',
    to: '/how-it-works#platform',
  },
  {
    icon: 'scan-line',
    kicker: '04 / OCR',
    title: 'OCR & External Documents',
    copy: 'Stop retyping third-party lab results. Pull the text out of physical scans and uploaded PDFs and into the record.',
    cta: 'Explore OCR',
    to: '/how-it-works#platform',
  },
  {
    icon: 'lock-keyhole',
    kicker: '05 / INSURANCE',
    title: 'Insurance Intelligence',
    copy: 'Cross-field checks that flag mismatched or missing diagnostic codes before anything is submitted.',
    cta: 'Explore Insurance AI',
    to: '/how-it-works#platform',
  },
];

const EXEC_FAQ = [
  [
    'Can we use Medibytes today?',
    'Not yet. We are in development and recruiting our first hospital pilot partners. What we can do today is walk you through what is built, show you exactly where it stands, and be specific about what is not finished.',
  ],
  [
    'Do we need to replace our current EMR?',
    'No. Medibytes is built as a layer over the setup you already run — no data migration, no replacement system, no vendor negotiation to get started.',
  ],
  [
    'Will language barriers break the dictation?',
    'It is built for clinical terminology spoken in Indian-accented English and Tamil, including mixed English-Tamil speech. We evaluate quality separately for each language, and we will show you honestly where it holds up and where it does not yet.',
  ],
  [
    'What happens when the internet drops?',
    'Your doctors are not locked out. A local offline queue is designed to keep charting going for up to four hours, then sync once the connection returns.',
  ],
];

export default function Home() {
  useSeo(
    'AI Clinical Documentation Layer for Hospitals | Medibytes',
    'Medibytes is an AI documentation layer in development for Indian hospitals — dictation to structured, clinician-verified notes, layered over your existing HMIS. Book a walkthrough.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main">
      <section className="hero hero-full" aria-labelledby="hero-heading">
        <div className="hero-media" aria-hidden="true">
          <BackgroundVideo
            className="hero-sky-video"
            base="/blue-sky"
            poster="/blue-sky-poster.jpg"
          />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow hero-in">
              <span className="status-dot"></span> IN DEVELOPMENT · BUILDING WITH INDIAN HOSPITALS
            </div>
            <h1 id="hero-heading">
              <span className="headline-line">Speak. We document.</span>
              <span className="headline-line green">You always sign off.</span>
            </h1>
            <p className="hero-in">
              Medibytes is an AI documentation layer for Indian hospitals. It sits over the HMIS you
              already run — no migration, no new system to learn. Doctors dictate; structured,
              template-aware notes take shape, with every field traceable to the moment it was said.
              Nothing is filed until a clinician verifies it.
            </p>
            <div className="hero-actions hero-in">
              <Link className="button primary" to="/demo">
                Book a walkthrough <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-button" to="/how-it-works#platform">
                See how it works
              </Link>
            </div>
            <div className="hero-footnote hero-in">
              <span className="tiny-line"></span> Tamil &amp; Indian-accented English · Wraps your
              existing HMIS · Cloud or on-premise
            </div>
          </div>
          <ProductPreview />
        </div>
      </section>

      <StatsBar
        label="Targets we're designing against"
        stats={[
          ['file-text', 'Discharge summaries: 40 min → under 10'],
          ['activity', 'About an hour back per doctor, daily'],
          ['shield-check', 'No unverified field ever exported'],
        ]}
      />

      <section className="container section" aria-labelledby="burnout-heading">
        <div className="section-intro reveal">
          <div className="eyebrow">PHYSICIAN BURNOUT</div>
          <div className="intro-row">
              <h2 id="burnout-heading" aria-label="Let's talk about physician burnout.">
                Let&apos;s talk about
                <br />
                <TypingLine text="physician burnout." />
              </h2>
            <p>
              It almost always starts with data entry. Administrative overload is quietly destroying
              clinical focus on your floor.
            </p>
          </div>
        </div>
        <div className="bento-grid">
          <article className="teaser-card bento-main reveal">
            <div className="card-top">
              <span>THE PROBLEM</span>
            </div>
            <h3>Highly trained specialists, stuck typing.</h3>
            <p>
              Forcing specialists to type out repetitive notes is a waste of the scarcest resource a
              hospital has. Cross-referencing lab data pulls them away from the bedside. And when
              department records contradict each other, claims come back and staff redo work that
              should never have existed.
            </p>
            <div className="teaser-cta">
              <Link className="text-button" to="/contact">
                Let&apos;s look at your workflow <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
          <div className="teaser-card bento-tile reveal">
            <span className="bento-stat">
              <span data-count="40">40</span> min
            </span>
            <p>What clinicians tell us one discharge summary costs them today.</p>
          </div>
          <div className="teaser-card bento-tile reveal">
            <span className="bento-stat">Under 10</span>
            <p>The minutes we are designing that same summary down to.</p>
          </div>
          <div className="teaser-card bento-tile reveal">
            <span className="bento-stat">~1 hr</span>
            <p>The time we aim to hand back to every doctor, every day.</p>
          </div>
          <div className="teaser-card bento-tile reveal">
            <span className="bento-stat">Bedside</span>
            <p>Not keyboards. Lab cross-referencing stops pulling doctors away from patients.</p>
          </div>
        </div>
      </section>

      <section className="platform-teaser container section" style={{ paddingTop: 0 }}>
        <div className="section-intro reveal">
          <div className="eyebrow">THE INTELLIGENCE LAYER</div>
          <div className="intro-row">
            <h2>
              A central intelligence hub
              <br />
              for your facility.
            </h2>
            <p>
              Think of Medibytes as a layer that drapes over the hospital management software you
              already use, rather than another system to run alongside it.
            </p>
          </div>
        </div>
        <p className="reveal" style={{ maxWidth: 720 }}>
          There are no data migrations. Nothing legacy gets ripped out. We make your current
          infrastructure listen: the software captures physician dictation — built for
          Indian-accented English and Tamil, including the way clinicians switch between them — and
          maps it into structured medical files a clinician then reviews and signs.
        </p>
        <div className="teaser-cta reveal">
          <Link className="button primary" to="/how-it-works">
            See the architecture <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ChecklistSection
        id="clinical-wins"
        eyebrow="ZERO IT CHAOS"
        title="Skip the IT chaos. Focus on clinical wins."
        copy="Bringing in new enterprise software usually means months of disruption. We designed around that from the start."
        items={[
          [
            'server',
            'Work with what you have',
            'Keep your incumbent HMIS. Medibytes is designed to attach to it without a migration project or a vendor negotiation.',
          ],
          [
            'activity',
            "Results we'll measure together",
            'We are not going to quote you someone else’s numbers. We instrument the workflow from day one of a pilot, and you see the real figures for your own floor.',
          ],
          [
            'scan-line',
            'Absolute traceability',
            'Every generated field links back to the doctor’s original audio. If a detail can’t be traced to something that was actually said, the field stays blank for the clinician to fill. We’d rather leave a gap than invent one.',
          ],
          [
            'file-text',
            'Documents that match yours',
            'Need physical forms? The system is designed to print replicas of your existing paperwork, without an API integration project first.',
          ],
          [
            'shield-check',
            'Built for bad internet',
            'Outages happen. A four-hour offline queue holds work locally, so your medical teams never hit a wall mid-shift.',
          ],
        ]}
        caption="A non-invasive AI layer designed to integrate with the hospital HMIS you already run."
      />
      <div className="container reveal" style={{ marginTop: -60, paddingBottom: 60 }}>
        <Link className="text-button" to="/hospitals#deployment">
          Explore the tech <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <ModuleGrid
        eyebrow="MODULES FOR EVERY FLOOR"
        title="Smart tools tailored for every floor."
        copy="Here is how the modules are designed to clear bottlenecks across your hospital."
        modules={MODULES}
      />
      <div className="container reveal" style={{ marginTop: -40, paddingBottom: 60 }}>
        <p style={{ maxWidth: 640 }}>
          Modules are at different stages of build. We will tell you straight which is which on the
          call.
        </p>
      </div>

      <section className="faq container section">
        <div className="faq-heading reveal">
          <div className="eyebrow">EXECUTIVE FAQS</div>
          <h2>
            Quick answers
            <br />
            for leadership.
          </h2>
        </div>
        <div className="faq-list reveal">
          <FaqList items={EXEC_FAQ} />
        </div>
      </section>

      <ClosingCta
        eyebrow="WALKTHROUGH"
        title="Let's look at your documentation load."
        copy="Bring us the part of your documentation that hurts most. We will show you what we have built, where it already helps, and where it is not finished yet."
        button="Book a walkthrough"
      />
    </main>
  );
}
