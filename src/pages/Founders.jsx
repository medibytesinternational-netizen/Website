import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { ClosingCta } from '../components/content';
import { useMotionOK } from '../components/features/motion';
import { useSiteMotion } from '../hooks/useSiteMotion';
import { useSeo } from '../hooks/useSeo';
import '../founders.css';

const FOUNDERS = [
  {
    id: 'adhwaith',
    name: 'Dr. Adhwaith Sathish Kumar',
    role: 'Founder & CEO',
    photo: '/founders/adhwaith',
    size: [640, 800],
    quote: 'MediBytes is more than a company.',
    paragraphs: [
      'A doctor by training and an entrepreneur by instinct, Dr. Adhwaith Sathish Kumar founded MediBytes after witnessing how outdated systems consume the time and energy of those entrusted with saving lives.',
      'Raised around a successful family business, Adhwaith began learning entrepreneurship alongside his father at fifteen. But when he set out to build MediBytes, he made a defining choice: to build it independently — without relying on his family’s business, influence, or resources.',
      'His vision extends far beyond better hospital software. He aims to build a healthcare ecosystem where technology works quietly in the background, giving doctors and nurses more time to think, care, and heal.',
      'MediBytes is more than a company. It is his attempt to build something entirely his own — and transform healthcare while doing it.',
    ],
  },
  {
    id: 'vaibhav',
    name: 'Mr. Vaibhav Govindan',
    role: 'Founder & Angel Investor',
    photo: '/founders/vaibhav',
    size: [440, 550],
    quote: 'But who’s thinking about them?',
    paragraphs: [
      'I can go on and on about my background — an MBBS doctor who from his own experience of being in a healthcare setting can see a gap in the system, and that we’re creating this app and stepping towards success. But that is not the only thing I’m aiming for: I want people to truly understand why I’ve invested in Medibytes, and how we as a team will have a positive impact in the healthcare industry, helping people’s lives become more balanced and better.',
      'From a construction worker to an entrepreneur, everyone knows how hard in today’s reality it is to not just make it in life, but to just have a little balance in it. In India we know that everyone is overworked and burnt out — and yet these people wake up every morning to make sure that the nation runs smoothly.',
      'And one such segment of people are the ones in healthcare. Nurses, doctors, and various medical professionals work round the clock to give their all to treating patients. But who’s thinking about them?',
      'Medibytes is an AI-integrated app which in very basic terms is going to be used in hospitals — not only to provide a better ecosystem, but to ease the burden of such people in their working environment. We may not be changing the world as of now, but we can change the world a little for the better for someone out there through Medibytes.',
    ],
  },
  {
    id: 'giridharan',
    name: 'Giridharan M.S.',
    role: 'Founder & CPO',
    photo: '/founders/giridharan',
    size: [800, 1000],
    quote: 'Healthcare became a natural extension of that journey.',
    paragraphs: [
      'Giridharan M.S. is a technology entrepreneur with hands-on experience in B2B SaaS, digital products, software development, and digital marketing.',
      'Through his entrepreneurial journey, he has worked with businesses across industries, building websites, applications, automation systems, CRMs, and custom SaaS solutions while helping businesses strengthen their digital presence and growth.',
      'Working closely with businesses gave him a deeper understanding of how technology can transform complex, everyday operations. Healthcare became a natural extension of that journey — an industry where operational complexity, fragmented systems, and manual workflows create an even greater need for better technology.',
      'This experience became the foundation for MediBytes. Bringing together his background in technology, product, business, and growth with a multidisciplinary healthcare and AI team, he is now focused on building smarter, connected, and AI-powered infrastructure for modern hospitals.',
    ],
  },
];

// Hero portrait order, left to right: the CEO takes the centre frame.
const HERO_ORDER = ['vaibhav', 'adhwaith', 'giridharan'];

/** Adds `is-in` once the element scrolls into view (immediately when motion is off). */
function useInViewOnce() {
  const ref = useRef(null);
  const motionOK = useMotionOK();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!motionOK || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOK, inView]);
  return [ref, inView];
}

function Portrait({ founder, eager = false, className = '' }) {
  const [w, h] = founder.size;
  return (
    <picture className={`fd-photo ${className}`}>
      <source type="image/webp" srcSet={`${founder.photo}.webp`} />
      <img
        src={`${founder.photo}.jpg`}
        width={w}
        height={h}
        alt={`Portrait of ${founder.name}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}

function HeroPortrait({ founder, i }) {
  const [ref, inView] = useInViewOnce();
  return (
    <li ref={ref} className={`fd-trio-item${inView ? ' is-in' : ''}`} style={{ '--i': i }}>
      <a href={`#${founder.id}`} className="fd-trio-link">
        <span className="fd-frame">
          <Portrait founder={founder} eager />
        </span>
        <span className="fd-trio-meta">
          <span className="fd-trio-name">{founder.name}</span>
          <span className="fd-trio-role">{founder.role}</span>
        </span>
      </a>
    </li>
  );
}

function FounderChapter({ founder, i }) {
  const [ref, inView] = useInViewOnce();
  const num = String(i + 1).padStart(2, '0');
  return (
    <article
      id={founder.id}
      className={`fd-chapter${i % 2 ? ' is-flip' : ''}`}
      aria-labelledby={`${founder.id}-name`}
    >
      <div className="fd-side">
        <figure ref={ref} className={`fd-portrait${inView ? ' is-in' : ''}`}>
          <span className="fd-frame">
            <Portrait founder={founder} />
          </span>
          <figcaption>
            <span className="fd-num">{num}</span>
            <span className="fd-role">{founder.role}</span>
          </figcaption>
        </figure>
      </div>

      <div className="fd-story">
        <h2 id={`${founder.id}-name`} className="fd-name reveal">
          {founder.name}
        </h2>
        <p className="fd-quote reveal" aria-hidden="true">
          “{founder.quote}”
        </p>
        <div className="fd-body">
          {founder.paragraphs.map((p, n) => (
            <p key={n} className={`reveal${n === 0 ? ' fd-first' : ''}`}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Founders() {
  useSeo(
    "The Founders' Story | Medibytes AI Healthcare Assistant",
    'Read the unfiltered stories behind Medibytes. Discover why Dr. Adhwaith, Mr. Vaibhav, and Giridharan came together to fix the healthcare ecosystem.'
  );
  useSiteMotion({ pinWorkflow: false, scrubVision: false, heroIntro: true });

  return (
    <main id="main" className="fd">
      <section className="fd-hero" aria-labelledby="founders-heading">
        <div className="fd-hero-head">
          <p className="fd-kicker hero-in">The Founders’ Story</p>
          <h1 id="founders-heading">
            <span className="headline-line">The Story Behind</span>
            <span className="headline-line fd-accent">Medibytes.</span>
          </h1>
          <div className="fd-hero-foot">
            <p className="hero-in">
              In our own words: why we chose to build an invisible intelligence layer for the
              modern clinical floor.
            </p>
            <a className="fd-down hero-in" href="#adhwaith">
              Read their stories <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>

        <ol className="fd-trio" aria-label="The founders">
          {HERO_ORDER.map((id, i) => (
            <HeroPortrait key={id} founder={FOUNDERS.find((f) => f.id === id)} i={i} />
          ))}
        </ol>
      </section>

      <div className="fd-chapters">
        {FOUNDERS.map((f, i) => (
          <FounderChapter key={f.id} founder={f} i={i} />
        ))}
      </div>

      <ClosingCta
        eyebrow="MEET THE TEAM"
        title="Want to build this future with us?"
        copy="Whether you run a hospital floor or write the software that powers one — let's talk."
        button="Book a walkthrough"
      />
    </main>
  );
}
