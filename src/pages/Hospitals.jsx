import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  DeploymentSection,
  CapabilityStrip,
  ContactSection,
  FaqList,
} from '../components/sections';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

const hospitalFaq = [
  [
    'Can MediBytes work with our existing templates?',
    'Template-aware extraction is planned for OPD, ER discharge, admission, and surgical documentation. Hospital-specific templates and integration requirements will be explored during pilot discussions.',
  ],
  [
    'Will clinical data have to leave our hospital?',
    'The product plan includes both cloud and local deployment. The local path is designed for processing within the hospital environment, including a planned air-gapped option. These capabilities are still being developed and validated.',
  ],
];

export default function Hospitals() {
  useSeo(
    'Hospital Deployment & Security | Medibytes',
    'Run Medibytes in the cloud or inside your own walls. See the planned deployment paths, offline queue and security approach for hospital IT teams.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });
  return (
    <main id="main">
      <section className="page-hero container" aria-labelledby="hospitals-heading">
        <div className="eyebrow hero-in">YOUR HOSPITAL. YOUR ENVIRONMENT.</div>
        <h1 id="hospitals-heading">
          <span className="headline-line">Built to fit your care.</span>
          <span className="headline-line green">And your infrastructure.</span>
        </h1>
        <p className="hero-in">
          Two planned deployment paths. The same commitment to clinician-led documentation.
          Availability and requirements will be established through pilot validation.
        </p>
        <div className="hero-actions hero-in">
          <a className="button primary" href="#deployment">
            See deployment options <ArrowRight aria-hidden="true" />
          </a>
          <Link className="text-button" to="/demo">
            Talk about a pilot
          </Link>
        </div>
      </section>
      <DeploymentSection />
      <CapabilityStrip />
      <section className="faq container section">
        <div className="faq-heading reveal">
          <div className="eyebrow">FOR HOSPITAL TEAMS</div>
          <h2>
            Deployment
            <br />
            questions.
          </h2>
        </div>
        <div className="faq-list reveal">
          <FaqList items={hospitalFaq} />
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
