import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Icon, Waveform } from './icons';

export default function ProductPreview() {
  const [audioTime] = useState('00:12');
  const [playLabel, setPlayLabel] = useState('Play visual demo');
  const [reviewStage, setReviewStage] = useState('unreviewed');
  const [reviewStatus, setReviewStatus] = useState('Every field is yours to edit.');
  const [fields, setFields] = useState({
    complaint: 'Fever for 3 days',
    symptoms: 'Fatigue',
    allergies: 'None reported',
    followup: 'Review in 1 week',
  });
  const [verified, setVerified] = useState(false);
  const waveRef = useRef(null);
  const tlRef = useRef(null);
  const defaults = useRef(fields);

  useEffect(
    () => () => {
      tlRef.current?.kill();
      if (waveRef.current)
        gsap.set(waveRef.current.querySelectorAll('span'), { clearProps: 'transform' });
    },
    []
  );

  const toggleDemo = () => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
      gsap.set(waveRef.current.querySelectorAll('span'), { clearProps: 'transform' });
      setPlayLabel('Play visual demo');
      return;
    }
    if (document.documentElement.classList.contains('motion-paused')) {
      setPlayLabel('Sample transcript shown below');
      return;
    }
    setPlayLabel('Visualizing sample…');
    tlRef.current = gsap.timeline({
      onComplete: () => {
        tlRef.current = null;
        gsap.set(waveRef.current.querySelectorAll('span'), { clearProps: 'transform' });
        setPlayLabel('Play visual demo');
      },
    });
    tlRef.current.to(waveRef.current.querySelectorAll('span'), {
      scaleY: () => 0.3 + Math.random() * 0.8,
      duration: 0.3,
      stagger: { each: 0.015, repeat: 5, yoyo: true },
      ease: 'sine.inOut',
    });
  };

  const onField = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setReviewStage('unreviewed');
    setReviewStatus('Sample edited. Review before confirming.');
    setVerified(false);
  };

  const reviewLabel =
    reviewStage === 'unreviewed'
      ? 'Review sample'
      : reviewStage === 'reviewing'
        ? 'Confirm review ✓'
        : 'Reset sample ↺';

  const onReview = () => {
    if (Object.values(fields).some((v) => !v.trim())) {
      setReviewStatus('Complete every sample field before reviewing.');
      return;
    }
    if (reviewStage === 'unreviewed') {
      setReviewStage('reviewing');
      setReviewStatus('Check each field against the sample transcript.');
    } else if (reviewStage === 'reviewing') {
      setReviewStage('verified');
      setReviewStatus('Sample verified. No clinical document is created.');
      setVerified(true);
    } else {
      setFields({ ...defaults.current });
      setReviewStage('unreviewed');
      setReviewStatus('Every field is yours to edit.');
      setVerified(false);
    }
  };

  return (
    <>
      <div className="product-shell" id="product-preview">
        <div className="product-topbar">
          <div className="mini-brand">
            <Icon name="activity" /> MediBytes <span>/</span> Workspace
          </div>
          <span className="concept-tag">Interactive concept</span>
          <div className="avatar">DR</div>
        </div>
        <div className="product-layout">
          <aside className="product-sidebar">
            <div className="sidebar-title">WORKSPACE</div>
            <span className="sidebar-link active">
              <Icon name="audio-lines" /> New session
            </span>
            <span className="sidebar-link">
              <Icon name="file-text" /> My documents
            </span>
            <span className="sidebar-link">
              <Icon name="layers" /> Templates
            </span>
            <div className="sidebar-bottom">
              <Icon name="shield-check" /> Clinician in control
            </div>
          </aside>
          <div className="session-panel">
            <div className="panel-heading">
              <span className="section-marker">01</span>
              <h2>Your conversation</h2>
              <span className="sample-label">SAMPLE</span>
            </div>
            <div className="session-meta">
              <span>
                <Icon name="stethoscope" /> OPD consultation
              </span>
              <span>English + Hindi</span>
            </div>
            <div className="audio-box">
              <div className="audio-top">
                <span>
                  <Icon name="mic" /> Clinical dictation
                </span>
                <span>{audioTime}</span>
              </div>
              <div ref={waveRef}>
                <Waveform />
              </div>
              <div className="audio-bottom">
                <button
                  className="play-button"
                  onClick={toggleDemo}
                  aria-label="Play visual dictation demo"
                >
                  <Icon name="play" />
                </button>
                <span>{playLabel}</span>
                <span className="sound-note">No patient audio</span>
              </div>
            </div>
            <div className="transcript-label">
              TRANSCRIPT <span>Auto-detected language</span>
            </div>
            <p className="transcript">
              “Patient ko <mark>fever</mark> hai for the last <mark>three days</mark>. Reports
              fatigue. No known allergies. Advise follow-up in <mark>one week</mark>.”
            </p>
            <div className="sample-note">
              Illustrative content only. No audio is recorded or uploaded.
            </div>
          </div>
          <div className={`document-panel${verified ? ' verified' : ''}`}>
            <div className="panel-heading">
              <span className="section-marker">02</span>
              <h2>Structured note</h2>
              <span className="review-badge">
                <Icon name="scan-line" /> Review
              </span>
            </div>
            <div className="document-title">
              <span>OPD consultation note</span>
              <Icon name="file-text" />
            </div>
            <div className="note-field">
              <label htmlFor="complaint">
                Chief complaint <span>Extracted</span>
              </label>
              <input
                id="complaint"
                value={fields.complaint}
                onChange={onField('complaint')}
                aria-label="Sample chief complaint"
              />
            </div>
            <div className="note-row">
              <div className="note-field">
                <label htmlFor="symptoms">Associated symptoms</label>
                <input id="symptoms" value={fields.symptoms} onChange={onField('symptoms')} />
              </div>
              <div className="note-field">
                <label htmlFor="allergies">Allergies</label>
                <input id="allergies" value={fields.allergies} onChange={onField('allergies')} />
              </div>
            </div>
            <div className="note-field followup">
              <label htmlFor="followup">
                Follow-up{' '}
                <span className="check-label">
                  <Icon name="check" /> Source linked
                </span>
              </label>
              <input id="followup" value={fields.followup} onChange={onField('followup')} />
            </div>
            <div className="review-footer">
              <span role="status">
                <Icon name="pencil" /> {reviewStatus}
              </span>
              <button onClick={onReview} className="button small primary">
                {reviewLabel} <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="under-preview">
        <span>A clearer path from conversation to documentation.</span>
        <span>
          Voice in. Clarity out. <ArrowDownRight aria-hidden="true" />
        </span>
      </div>
    </>
  );
}
