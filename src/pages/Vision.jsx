import { Header, Footer } from '../components/Chrome';
import { VisionSection, FaqSection, ContactSection } from '../components/sections';
import { useSiteMotion } from '../hooks/useSiteMotion';

export default function Vision() {
  useSiteMotion({ pinWorkflow: false, scrubVision: true, heroIntro: true });
  return (
    <>
      <Header active="vision" />
      <main id="main">
        <section className="page-hero container" aria-labelledby="vision-heading">
          <div className="eyebrow hero-in">THE MEDIBYTES VISION</div>
          <h1 id="vision-heading">
            <span className="headline-line">More human connection.</span>
            <span className="headline-line green">Not more paperwork.</span>
          </h1>
          <p className="hero-in">
            Clinical documentation that begins with a conversation and ends with clarity — starting
            with multilingual voice, meaningful review, and workflows that respect the clinician.
          </p>
        </section>
        <VisionSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
