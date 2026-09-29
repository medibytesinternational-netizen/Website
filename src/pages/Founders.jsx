import { PageHero, FounderCard, ClosingCta } from '../components/content';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';

export default function Founders() {
  useSeo(
    "The Founders' Story | Medibytes AI Healthcare Assistant",
    'Read the unfiltered stories behind Medibytes. Discover why Dr. Adhwaith, Mr. Vaibhav, and Giridharan came together to fix the healthcare ecosystem.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main">
      <PageHero
        id="founders-heading"
        eyebrow="THE FOUNDERS' STORY"
        lines={[{ text: 'The Story Behind' }, { text: 'Medibytes.', green: true }]}
        sub="In our own words: why we chose to build an invisible intelligence layer for the modern clinical floor."
      />

      <section className="deployment container section">
        <div className="deployment-grid" style={{ gridTemplateColumns: '1fr' }}>
          <FounderCard
            name="Dr. Adhwaith Sathish Kumar"
            role="FOUNDER & CEO"
            paragraphs={[
              'A doctor by training and an entrepreneur by instinct, Dr. Adhwaith Sathish Kumar founded MediBytes after witnessing how outdated systems consume the time and energy of those entrusted with saving lives.',
              'Raised around a successful family business, Adhwaith began learning entrepreneurship alongside his father at fifteen. But when he set out to build MediBytes, he made a defining choice: to build it independently — without relying on his family’s business, influence, or resources.',
              'His vision extends far beyond better hospital software. He aims to build a healthcare ecosystem where technology works quietly in the background, giving doctors and nurses more time to think, care, and heal.',
              'MediBytes is more than a company. It is his attempt to build something entirely his own — and transform healthcare while doing it.',
            ]}
            imageAlt="Portrait placeholder: Dr. Adhwaith Sathish Kumar"
            signature="Adhwaith"
          />
          <FounderCard
            name="Mr. Vaibhav Govindan"
            role="CO-FOUNDER & ANGEL INVESTOR"
            paragraphs={[
              'I can go on and on about my background — an MBBS doctor who from his own experience of being in a healthcare setting can see a gap in the system, and that we’re creating this app and stepping towards success. But that is not the only thing I’m aiming for: I want people to truly understand why I’ve invested in Medibytes, and how we as a team will have a positive impact in the healthcare industry, helping people’s lives become more balanced and better.',
              'From a construction worker to an entrepreneur, everyone knows how hard in today’s reality it is to not just make it in life, but to just have a little balance in it. In India we know that everyone is overworked and burnt out — and yet these people wake up every morning to make sure that the nation runs smoothly.',
              'And one such segment of people are the ones in healthcare. Nurses, doctors, and various medical professionals work round the clock to give their all to treating patients. But who’s thinking about them?',
              'Medibytes is an AI-integrated app which in very basic terms is going to be used in hospitals — not only to provide a better ecosystem, but to ease the burden of such people in their working environment. We may not be changing the world as of now, but we can change the world a little for the better for someone out there through Medibytes.',
            ]}
            imageAlt="Portrait placeholder: Mr. Vaibhav Govindan"
            signature="Vaibhav"
          />
          <FounderCard
            name="Giridharan M.S."
            role="FOUNDER & CPO"
            paragraphs={[
              'Giridharan M.S. is a technology entrepreneur with hands-on experience in B2B SaaS, digital products, software development, and digital marketing.',
              'Through his entrepreneurial journey, he has worked with businesses across industries, building websites, applications, automation systems, CRMs, and custom SaaS solutions while helping businesses strengthen their digital presence and growth.',
              'Working closely with businesses gave him a deeper understanding of how technology can transform complex, everyday operations. Healthcare became a natural extension of that journey — an industry where operational complexity, fragmented systems, and manual workflows create an even greater need for better technology.',
              'This experience became the foundation for MediBytes. Bringing together his background in technology, product, business, and growth with a multidisciplinary healthcare and AI team, he is now focused on building smarter, connected, and AI-powered infrastructure for modern hospitals.',
            ]}
            imageAlt="Portrait placeholder: Giridharan M.S."
            signature="Giridharan"
          />
        </div>
      </section>

      <ClosingCta
        eyebrow="MEET THE TEAM"
        title="Want to build this future with us?"
        copy="Whether you run a hospital floor or write the software that powers one — let's talk."
        button="Book a walkthrough"
      />
    </main>
  );
}
