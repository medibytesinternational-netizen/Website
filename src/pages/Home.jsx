import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '../components/Chrome';
import { FaqList } from '../components/sections';
import { StatsBar, ChecklistSection, ModuleGrid, ClosingCta } from '../components/content';
import ProductPreview from '../components/ProductPreview';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

const MODULES = [
  {
    icon: 'stethoscope',
    kicker: '01 / OPD',
    title: 'OPD Documentation',
    copy: 'Keep busy outpatient clinics moving fast. Capture quick notes and patient histories on the fly.',
    cta: 'Explore OPD',
    to: '/hospitals',
  },
  {
    icon: 'file-text',
    kicker: '02 / IPD',
    title: 'IPD Documentation',
    copy: 'Say goodbye to manual progress logs. Wrap up care plans, shift handovers, and discharge summaries in just minutes.',
    cta: 'Explore IPD',
    to: '/hospitals',
  },
  {
    icon: 'shield-check',
    kicker: '03 / CLINICAL AI',
    title: 'Clinical Intelligence',
    copy: 'Stop medication errors before they happen. Run smart drug reconciliations and flag logical inconsistencies instantly.',
    cta: 'Explore Clinical AI',
    to: '/how-it-works#platform',
  },
  {
    icon: 'scan-line',
    kicker: '04 / OCR',
    title: 'OCR & External Documents',
    copy: 'Stop typing out third-party lab results. Instantly extract critical text from physical scans and uploaded PDFs.',
    cta: 'Explore OCR',
    to: '/how-it-works#platform',
  },
  {
    icon: 'lock-keyhole',
    kicker: '05 / INSURANCE',
    title: 'Insurance Intelligence',
    copy: 'Validate claims before hitting submit. Smart auto-fill and cross-field checks ensure diagnostic codes align perfectly.',
    cta: 'Explore Insurance AI',
    to: '/how-it-works#platform',
  },
];

const EXEC_FAQ = [
  [
    'Do we need to replace our current EMR?',
    'Absolutely not. Medibytes is engineered to act as a smart wrapper around the exact setup you use today.',
  ],
  [
    'Will language barriers break the dictation?',
    'No. It easily picks up complex medical terminology spoken in regional accents — including Indian-accented English and Tamil — and translates it accurately.',
  ],
  [
    'What happens when the internet drops?',
    "Your doctors won't be locked out. Our local offline queue lets them keep charting for up to four hours.",
  ],
];

export default function Home() {
  useSeo(
    'AI Healthcare Assistant Layer for Hospitals | Medibytes',
    'Stop losing hours to hospital paperwork. Our AI healthcare assistant layers over your current HMIS to speed up discharges and cut claim denials. Book a demo.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <>
      <Header active="home" />
      <main id="main">
        <section className="hero hero-full" aria-labelledby="hero-heading">
          <div className="hero-media" aria-hidden="true">
            <video
              className="hero-sky-video"
              src="/blue-sky.mp4"
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
          </div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow hero-in">
                <span className="status-dot"></span> THE AI LAYER FOR MODERN HOSPITALS
              </div>
              <h1 id="hero-heading">
                <span className="headline-line">Speak. We document.</span>
                <span className="headline-line green">Discharges in 7 minutes.</span>
              </h1>
              <p className="hero-in">
                Medibytes layers invisibly over your existing HMIS — no migrations, no new logins
                to learn. Doctors simply dictate; structured notes appear, claim-ready, with every
                field traced back to the original audio.
              </p>
              <div className="hero-actions hero-in">
                <Link className="button primary" to="/demo">
                  Book a Live Demo <ArrowRight aria-hidden="true" />
                </Link>
                <Link className="text-button" to="/how-it-works#platform">
                  See How It Works
                </Link>
              </div>
              <div className="hero-footnote hero-in">
                <span className="tiny-line"></span> 65 extra minutes per doctor daily · Tamil &amp;
                Indian-accented English · 4-hour offline queue
              </div>
            </div>
            <ProductPreview />
          </div>
        </section>

        <StatsBar
          label="Hard, measurable clinical wins"
          stats={[
            ['activity', '65 extra minutes per doctor daily'],
            ['file-text', 'Discharges: 40 → 7 minutes'],
            ['mic', 'Charting: 90 → 25 minutes'],
            ['shield-check', 'Claim rejections ≈ 5%'],
          ]}
        />

        <section className="container section" aria-labelledby="burnout-heading">
          <div className="section-intro reveal">
            <div className="eyebrow">PHYSICIAN BURNOUT</div>
            <div className="intro-row">
              <h2 id="burnout-heading">
                Let&apos;s talk about
                <br />
                physician burnout.
              </h2>
              <p>
                It almost always starts with data entry. Administrative overload is quietly
                destroying clinical focus on your floor.
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
                Forcing specialists to type out repetitive notes is a massive waste of resources.
                Cross-referencing lab data pulls them away from the bedside. When department
                records contradict each other, denial rates creep toward 8% — you bleed revenue,
                your staff burns out. The system is broken.
              </p>
              <div className="teaser-cta">
                <Link className="text-button" to="/contact">
                  Let&apos;s Fix Your Workflow <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
            <div className="teaser-card bento-tile reveal">
              <span className="bento-stat">
                <span data-count="8">8</span>%
              </span>
              <p>Claim denial rate when department records contradict each other.</p>
            </div>
            <div className="teaser-card bento-tile reveal">
              <span className="bento-stat">90 → 25</span>
              <p>Minutes of daily charting per doctor, after Medibytes.</p>
            </div>
            <div className="teaser-card bento-tile reveal">
              <span className="bento-stat">
                <span data-count="65">65</span> min
              </span>
              <p>Extra minutes handed back to every doctor, every single day.</p>
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
                Think of Medibytes as a smart safety net. It drapes seamlessly over the hospital
                management software you already use.
              </p>
            </div>
          </div>
          <p className="reveal" style={{ maxWidth: 720 }}>
            There are no painful data migrations. There is no ripping out legacy systems. We simply
            make your current infrastructure listen. The software captures physician dictations —
            easily handling Indian-accented English and Tamil — and translates them directly into
            structured medical files. It acts as an unbiased truth engine for your whole operation.
          </p>
          <div className="teaser-cta reveal">
            <Link className="button primary" to="/how-it-works">
              See the Architecture <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <ChecklistSection
          id="clinical-wins"
          eyebrow="ZERO IT CHAOS"
          title="Skip the IT chaos. Focus on clinical wins."
          copy="Bringing in new enterprise software usually means months of disruption. We bypassed that entirely."
          items={[
            [
              'server',
              'Work with what you have',
              'Keep your incumbent HMIS. We attach to it seamlessly without begging vendors for access.',
            ],
            [
              'activity',
              'Hard, measurable results',
              'Watch daily charting time plummet from 90 to 25 minutes per doctor. Watch claim rejections shrink to roughly 5%.',
            ],
            [
              'scan-line',
              'Absolute traceability',
              "Every single generated field links directly back to the doctor's original audio. If a claim cannot be verified, it gets rejected and left blank.",
            ],
            [
              'file-text',
              'Flawless document matching',
              'Need physical forms? The system prints exact replicas of your legacy paperwork without complex API configurations.',
            ],
            [
              'shield-check',
              'Built for bad internet',
              'Server outages happen. Our four-hour offline queue stores data locally, so your medical teams never hit a wall.',
            ],
          ]}
          caption="Non-invasive AI wrapper integrating directly with existing hospital HMIS."
        />
        <div className="container reveal" style={{ marginTop: -60, paddingBottom: 60 }}>
          <Link className="text-button" to="/hospitals#deployment">
            Explore the Tech <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <ModuleGrid
          eyebrow="MODULES FOR EVERY FLOOR"
          title="Smart tools tailored for every floor."
          copy="Look at how our specific modules clear out bottlenecks across your hospital."
          modules={MODULES}
        />

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
          eyebrow="EXECUTIVE DEMO"
          title="Time to transform your clinical operations."
          copy="Stop letting bad documentation habits punish your best doctors. You will see claim denials drop. You will see morale improve. Let's bring the focus back to practicing medicine."
          button="Schedule Your Executive Demo Today"
        />
      </main>
      <Footer />
    </>
  );
}
