import { Link } from 'react-router-dom';
import { Icon, Waveform } from './icons';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const FAQ_ITEMS = [
  [
    'Is MediBytes available to use today?',
    'MediBytes is currently in development. This website presents the product direction and an interactive concept, not a live clinical documentation service. Pilot availability will follow product validation.',
  ],
  [
    'Which languages are planned?',
    'We are designing for English, Hindi, Tamil, Hinglish, and Tanglish. Support and quality will be evaluated separately for each language and mixed-language workflow during development.',
  ],
  [
    'Does AI replace the clinician’s review?',
    'No. Mandatory human verification is central to the product design. Every extracted field is intended to be editable, with source context and review flags to support the clinician’s final decision.',
  ],
  [
    'Can MediBytes work with our existing templates?',
    'Template-aware extraction is planned for OPD, ER discharge, admission, and surgical documentation. Hospital-specific templates and integration requirements will be explored during pilot discussions.',
  ],
  [
    'Will clinical data have to leave our hospital?',
    'The product plan includes both cloud and local deployment. The local path is designed for processing within the hospital environment, including a planned air-gapped option. These capabilities are still being developed and validated.',
  ],
];

export function FaqList({ items = FAQ_ITEMS }) {
  return (
    <>
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span>
              <Icon name="plus" />
            </span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </>
  );
}

export function CapabilityStrip() {
  return (
    <div className="capability-strip">
      <div className="container">
        <span>Built for the way care happens</span>
        <div>
          <Icon name="stethoscope" /> OPD consultations
        </div>
        <div>
          <Icon name="activity" /> ER discharge
        </div>
        <div>
          <Icon name="file-text" /> Admission notes
        </div>
        <div>
          <Icon name="layers" /> Surgical notes
        </div>
      </div>
    </div>
  );
}

export function PlatformSection() {
  return (
    <section className="platform container section" id="platform">
      <div className="section-intro reveal">
        <div className="eyebrow">A LITTLE LESS ADMIN. A LOT MORE HUMAN.</div>
        <div className="intro-row">
          <h2>
            Care is personal.
            <br />
            Your workflow should be, too.
          </h2>
          <p>
            We’re building documentation that fits into clinical practice, so the conversation stays
            with your patient.
          </p>
        </div>
      </div>
      <div className="feature-grid">
        <article className="feature-card language-card reveal">
          <div>
            <div className="card-top">
              <Icon name="languages" />
              <span>01 / SPEAK NATURALLY</span>
            </div>
            <h3>
              Many languages.
              <br />
              One clear record.
            </h3>
            <p>
              Designed for English, Hindi, Tamil, and the way you naturally switch between them.
            </p>
          </div>
          <div className="language-visual">
            <span className="language-word word-en">Hello</span>
            <span className="language-word word-hi" lang="hi">
              नमस्ते
            </span>
            <span className="language-word word-ta" lang="ta">
              வணக்கம்
            </span>
            <div className="language-bottom">
              <span>English</span>
              <span>हिन्दी</span>
              <span>தமிழ்</span>
              <span>+ Mixed speech</span>
            </div>
          </div>
        </article>
        <article className="feature-card review-card reveal">
          <div className="card-top">
            <Icon name="shield-check" />
            <span>02 / STAY IN CONTROL</span>
          </div>
          <h3>
            AI assists.
            <br />
            You have the final word.
          </h3>
          <p>
            Editable fields, source-linked context, and a mandatory human review before any document
            leaves your workspace.
          </p>
          <div className="confidence-row">
            <div>
              <span className="confidence-dot"></span> Chief complaint
            </div>
            <span>
              Ready to review <Icon name="check" />
            </span>
          </div>
          <div className="confidence-row amber">
            <div>
              <span className="confidence-dot"></span> Follow-up detail
            </div>
            <span>
              Needs your review <Icon name="pencil" />
            </span>
          </div>
          <div className="review-note">
            <Icon name="lock-keyhole" /> No verification. No export.
          </div>
        </article>
        <article className="feature-card template-card reveal">
          <div className="template-copy">
            <div className="card-top">
              <Icon name="layers" />
              <span>03 / MAKE IT YOURS</span>
            </div>
            <h3>
              Your templates.
              <br />
              Already part of the plan.
            </h3>
            <p>
              From OPD notes to ER discharge summaries. Template-aware extraction is designed to
              structure the fields each document actually needs.
            </p>
            <div className="format-tags">
              <span>DOCX</span>
              <span>PDF</span>
              <span>JSON</span>
              <span className="muted">Planned exports</span>
            </div>
          </div>
          <div className="template-visual">
            <div className="paper back-paper"></div>
            <div className="paper front-paper">
              <div className="paper-brand">
                <Icon name="activity" /> MediBytes
              </div>
              <span className="paper-label">CLINICAL DOCUMENT</span>
              <h4>ER discharge summary</h4>
              <div className="paper-rule"></div>
              <div className="paper-item">
                <span>Presenting complaint</span>
                <div></div>
                <div className="short"></div>
              </div>
              <div className="paper-item">
                <span>Clinical assessment</span>
                <div></div>
                <div></div>
              </div>
              <div className="paper-stamp">
                <Icon name="shield-check" /> Clinician-reviewed
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section className="workflow-section" id="workflow">
      <div className="container workflow-layout">
        <div className="workflow-heading">
          <div className="eyebrow">FROM SPOKEN TO STRUCTURED</div>
          <h2>
            A natural flow.
            <br />
            At every step.
          </h2>
          <p>
            Designed to take the repetition out of documentation, while keeping clinical judgment
            exactly where it belongs.
          </p>
          <div className="workflow-progress" aria-hidden="true">
            <span></span>
          </div>
          <Link className="text-button" to="/#product-preview">
            Explore the concept <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="workflow-steps">
          <article className="workflow-step">
            <span className="step-number">01</span>
            <div>
              <div className="step-icon">
                <Icon name="mic" />
              </div>
              <h3>Speak in your own words.</h3>
              <p>
                Select a clinical template, then record or upload your dictation. No rigid script.
                No change to the way you speak.
              </p>
              <Waveform count={38} className="mini-wave" />
            </div>
          </article>
          <article className="workflow-step">
            <span className="step-number">02</span>
            <div>
              <div className="step-icon">
                <Icon name="scan-line" />
              </div>
              <h3>Let the structure take shape.</h3>
              <p>
                MediBytes is designed to transcribe, identify clinical details, and map them into
                the right template fields.
              </p>
              <div className="extraction">
                <span>“fever for three days”</span>
                <Icon name="arrow-right" />
                <strong>Chief complaint</strong>
              </div>
            </div>
          </article>
          <article className="workflow-step">
            <span className="step-number">03</span>
            <div>
              <div className="step-icon">
                <Icon name="shield-check" />
              </div>
              <h3>Review. Refine. Make it yours.</h3>
              <p>
                Check the source, correct any field, and confirm the details. Clinician verification
                is a required step, not an optional extra.
              </p>
              <div className="step-detail">
                <Icon name="check" /> Editable fields <span>·</span> Source context <span>·</span>{' '}
                Review flags
              </div>
            </div>
          </article>
          <article className="workflow-step">
            <span className="step-number">04</span>
            <div>
              <div className="step-icon">
                <Icon name="file-text" />
              </div>
              <h3>A document, ready for care.</h3>
              <p>
                Export the reviewed note to DOCX or PDF. Structured JSON output is planned for
                integration with existing hospital systems.
              </p>
              <div className="export-chips">
                <span>
                  <Icon name="file-text" /> Consultation.docx
                </span>
                <span>
                  <Icon name="check" /> Verified
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function DeploymentSection() {
  return (
    <section className="deployment container section" id="deployment">
      <div className="section-intro reveal">
        <div className="eyebrow">YOUR HOSPITAL. YOUR ENVIRONMENT.</div>
        <div className="intro-row">
          <h2>
            Built to fit your care.
            <br />
            And your infrastructure.
          </h2>
          <p>
            Two planned deployment paths. The same commitment to clinician-led documentation.
          </p>
        </div>
      </div>
      <div className="deployment-grid">
        <article className="deployment-card reveal">
          <div className="deploy-symbol">
            <Icon name="cloud" />
          </div>
          <span className="deploy-label">CONNECTED CARE</span>
          <h3>In the cloud.</h3>
          <p>
            A centrally managed experience for connected teams, with an API-first approach to
            hospital system integration.
          </p>
          <ul>
            <li>
              <Icon name="check" /> Centralized updates and operations
            </li>
            <li>
              <Icon name="check" /> Designed for multi-team access
            </li>
            <li>
              <Icon name="check" /> Planned HIS / EHR integration
            </li>
          </ul>
        </article>
        <article className="deployment-card local reveal">
          <div className="deploy-symbol">
            <Icon name="server" />
          </div>
          <span className="deploy-label">LOCAL CONTROL</span>
          <h3>Within your walls.</h3>
          <p>
            A local deployment path for hospitals that need clinical processing to stay inside their
            own environment.
          </p>
          <ul>
            <li>
              <Icon name="check" /> On-premise processing by design
            </li>
            <li>
              <Icon name="check" /> Planned air-gapped operation
            </li>
            <li>
              <Icon name="check" /> Infrastructure under your control
            </li>
          </ul>
        </article>
      </div>
      <p className="deployment-caption">
        Deployment options are in development. Availability and requirements will be established
        through pilot validation.
      </p>
    </section>
  );
}

export function VisionSection() {
  return (
    <section className="vision-section" id="vision">
      <div className="container">
        <div className="vision-top reveal">
          <span className="eyebrow">THE MEDIBYTES VISION</span>
          <span className="outlined-tag">Currently in development</span>
        </div>
        <h2 className="vision-statement">
          The next chapter of healthcare should have <span>more human connection.</span> Not more
          paperwork.
        </h2>
        <div className="vision-bottom reveal">
          <p>
            We’re building a future where clinical documentation begins with a conversation, and
            ends with clarity. Starting with multilingual voice, meaningful review, and workflows
            that respect the clinician.
          </p>
          <Link className="text-button" to="/vision#connect">
            Build that future with us <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="roadmap reveal">
          <div>
            <span className="roadmap-dot current"></span>
            <strong>Build</strong>
            <span>Core voice-to-template workflow</span>
            <small>In progress</small>
          </div>
          <div>
            <span className="roadmap-dot"></span>
            <strong>Validate</strong>
            <span>Clinician feedback and pilot evaluation</span>
            <small>Planned</small>
          </div>
          <div>
            <span className="roadmap-dot"></span>
            <strong>Scale</strong>
            <span>Hospital integrations and deployment</span>
            <small>Planned</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ items = FAQ_ITEMS }) {
  return (
    <section className="faq container section">
      <div className="faq-heading reveal">
        <div className="eyebrow">A LITTLE MORE CLARITY</div>
        <h2>
          Good questions.
          <br />
          Clear answers.
        </h2>
      </div>
      <div className="faq-list reveal">
        <FaqList items={items} />
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section container" id="connect">
      <div className="contact-glow" aria-hidden="true"></div>
      <div className="eyebrow reveal">
        FOR CLINICIANS, HOSPITALS &amp; PEOPLE WHO SEE WHAT’S NEXT
      </div>
      <h2 className="reveal">
        Better documentation.
        <br />
        <span className="green">Begins with a conversation.</span>
      </h2>
      <p className="reveal">
        Help shape the future of clinical workflows.
        <br />
        We’re looking ahead to clinical pilots and strategic partnerships.
      </p>
      <button
        className="button primary reveal"
        id="partnership-button"
        aria-expanded="false"
        aria-controls="partnership-info"
      >
        Explore a partnership <ArrowUpRight aria-hidden="true" />
      </button>
      <div id="partnership-info" className="partnership-info" hidden>
        <h3>Let’s shape MediBytes together.</h3>
        <p>
          Clinical pilot and investor conversations are planned as the product develops. Meeting
          bookings are not open on this site yet.
        </p>
        <Link className="text-button" to="/how-it-works#workflow">
          Explore the planned workflow <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band container section">
      <div className="cta-grid">
        <Link className="cta-card reveal" to="/how-it-works">
          <span className="eyebrow">01 — How it works</span>
          <h3>From spoken to structured.</h3>
          <p>Multilingual voice, template-aware structure, mandatory review.</p>
          <span className="text-button">
            Explore the workflow <ArrowRight aria-hidden="true" />
          </span>
        </Link>
        <Link className="cta-card reveal" to="/hospitals">
          <span className="eyebrow">02 — For hospitals</span>
          <h3>Cloud or within your walls.</h3>
          <p>Two planned paths with the same clinician-led commitment.</p>
          <span className="text-button">
            See deployment <ArrowRight aria-hidden="true" />
          </span>
        </Link>
        <Link className="cta-card reveal" to="/vision">
          <span className="eyebrow">03 — Vision &amp; contact</span>
          <h3>More human connection.</h3>
          <p>Roadmap, FAQs, and partnership conversations.</p>
          <span className="text-button">
            Meet MediBytes <ArrowRight aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
