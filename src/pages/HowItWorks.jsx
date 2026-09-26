import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/Chrome';
import { PlatformSection, WorkflowSection, CtaBand } from '../components/sections';
import { useSiteMotion } from '../hooks/useSiteMotion';

export default function HowItWorks() {
  useSiteMotion({ pinWorkflow: true, scrubVision: false, heroIntro: true });
  return (
    <>
      <Header active="how" />
      <main id="main">
        <section className="page-hero container" aria-labelledby="how-heading">
          <div className="eyebrow hero-in">PLATFORM &amp; WORKFLOW</div>
          <h1 id="how-heading">
            <span className="headline-line">Care is personal.</span>
            <span className="headline-line green">Your workflow should be, too.</span>
          </h1>
          <p className="hero-in">
            Multilingual voice, template-aware structure, and mandatory clinician review. Designed
            to take repetition out of documentation while keeping judgment where it belongs.
          </p>
          <div className="hero-actions hero-in">
            <a className="button primary" href="#platform">
              Explore the platform
            </a>
            <a className="text-button" href="#workflow">
              See the workflow
            </a>
          </div>
        </section>
        <PlatformSection />
        <WorkflowSection />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
