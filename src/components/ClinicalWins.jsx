import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, WifiOff } from 'lucide-react';
import { useMotionOK } from './features/motion';
import '../clinical-wins.css';

/*
 * Home: "Skip the IT chaos. Focus on clinical wins."
 * Five design principles, each with a small drawing of the idea. The drawings
 * are illustrative and carry no figures: "Results we'll measure together"
 * deliberately shows an empty chart.
 */

function useInViewOnce(threshold = 0.4) {
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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOK, inView, threshold]);
  return [ref, inView];
}

function LayerSketch() {
  return (
    <div className="cw-sk cw-sk-layer">
      <span className="cw-layer">MediBytes</span>
      <span className="cw-hmis">
        Your HMIS
        <span className="cw-hmis-rows">
          <i />
          <i />
          <i />
        </span>
      </span>
    </div>
  );
}

function MeasureSketch() {
  return (
    <div className="cw-sk cw-sk-measure">
      <span className="cw-axis-y" />
      <span className="cw-axis-x" />
      <span className="cw-start">Day 1</span>
      <span className="cw-empty">Your floor’s pilot data</span>
    </div>
  );
}

const WAVE = [4, 9, 6, 13, 8, 15, 11, 6, 12, 16, 9, 5, 10, 7, 12, 5];

function TraceSketch() {
  return (
    <div className="cw-sk cw-sk-trace">
      <span className="cw-wave">
        {WAVE.map((h, i) => (
          <i key={i} style={{ height: h * 1.8, '--d': `${i * 30}ms` }} className={i >= 3 && i <= 7 ? 'is-hit' : ''} />
        ))}
      </span>
      <span className="cw-field">
        <em>Traced to audio</em>
        Fever for 3 days
      </span>
      <span className="cw-field is-blank">
        <em>Not said</em>
        Left blank for the clinician
      </span>
    </div>
  );
}

function PaperLines() {
  return (
    <>
      <i className="is-head" />
      <i />
      <i />
      <i className="is-short" />
      <i />
    </>
  );
}

function DocsSketch() {
  return (
    <div className="cw-sk cw-sk-docs">
      <span className="cw-paper is-src">
        <PaperLines />
        <b>Your form</b>
      </span>
      <span className="cw-paper is-copy">
        <PaperLines />
        <b>Printed replica</b>
      </span>
    </div>
  );
}

function OfflineSketch() {
  return (
    <div className="cw-sk cw-sk-offline">
      <span className="cw-status">
        <WifiOff aria-hidden="true" /> Offline
      </span>
      <span className="cw-queue">
        <i style={{ '--d': '0ms' }}>Progress</i>
        <i style={{ '--d': '180ms' }}>Handover</i>
        <i style={{ '--d': '360ms' }}>Discharge</i>
      </span>
      <span className="cw-held">Held locally · four-hour queue</span>
    </div>
  );
}

const ITEMS = [
  {
    title: 'Work with what you have',
    copy: 'Keep your incumbent HMIS. Medibytes is designed to attach to it without a migration project or a vendor negotiation.',
    Sketch: LayerSketch,
  },
  {
    title: "Results we'll measure together",
    copy: 'We are not going to quote you someone else’s numbers. We instrument the workflow from day one of a pilot, and you see the real figures for your own floor.',
    Sketch: MeasureSketch,
  },
  {
    title: 'Absolute traceability',
    copy: 'Every generated field links back to the doctor’s original audio. If a detail can’t be traced to something that was actually said, the field stays blank for the clinician to fill. We’d rather leave a gap than invent one.',
    Sketch: TraceSketch,
  },
  {
    title: 'Documents that match yours',
    copy: 'Need physical forms? The system is designed to print replicas of your existing paperwork, without an API integration project first.',
    Sketch: DocsSketch,
  },
  {
    title: 'Built for bad internet',
    copy: 'Outages happen. A four-hour offline queue holds work locally, so your medical teams never hit a wall mid-shift.',
    Sketch: OfflineSketch,
  },
];

function Principle({ item, i }) {
  const [ref, inView] = useInViewOnce();
  const { Sketch } = item;
  return (
    <li ref={ref} className={`cw-item${inView ? ' is-in' : ''}`}>
      <span className="cw-num" aria-hidden="true">
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="cw-text">
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </div>
      <div className="cw-visual" aria-hidden="true">
        <Sketch />
      </div>
    </li>
  );
}

export default function ClinicalWins() {
  return (
    <section className="cw" id="clinical-wins" aria-labelledby="clinical-wins-heading">
      <div className="cw-inner">
        <header className="cw-head">
          <div className="cw-head-sticky reveal">
            <p className="cw-kicker">Zero IT chaos</p>
            <h2 id="clinical-wins-heading">
              <span>Skip the IT chaos.</span>
              <span className="cw-accent">Focus on clinical wins.</span>
            </h2>
            <p className="cw-copy">
              Bringing in new enterprise software usually means months of disruption. We designed
              around that from the start.
            </p>
            <p className="cw-caption">
              A non-invasive AI layer designed to integrate with the hospital HMIS you already run.
            </p>
            <Link className="cw-link-cta" to="/hospitals#deployment">
              Explore the tech <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </header>
        <ol className="cw-list">
          {ITEMS.map((item, i) => (
            <Principle key={item.title} item={item} i={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
