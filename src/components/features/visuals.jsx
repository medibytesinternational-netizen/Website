import { useRef, useState } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import { useLoop, at } from './motion';

/*
 * Illustrative product visuals for the /features chapters. Every value shown
 * is sample data for explanation, not output from a real patient or pilot.
 * Each visual steps through a short build (useLoop) and rests on its final
 * state when motion is off.
 */

function StageBar({ title }) {
  return (
    <div className="ft-stage-bar">
      <span className="ft-stage-title">{title}</span>
      <span className="ft-stage-tag">Illustrative</span>
    </div>
  );
}

function ReviewChip({ on, children = 'Draft · awaiting clinician review' }) {
  return (
    <div className={`ft-review${on ? ' is-on' : ''}`}>
      <span className="ft-review-dot" />
      {children}
    </div>
  );
}

function Flag({ children }) {
  return (
    <span className="ft-flag">
      <CircleAlert aria-hidden="true" />
      {children}
    </span>
  );
}

function Ok({ children = 'Consistent' }) {
  return (
    <span className="ft-ok">
      <Check aria-hidden="true" />
      {children}
    </span>
  );
}

/* A field that shows a skeleton bar until its value "arrives". */
function Field({ label, value, on }) {
  return (
    <div className={`ft-field${on ? ' is-on' : ''}`}>
      <span className="ft-field-label">{label}</span>
      <span className="ft-field-value">
        <span className="ft-skel" />
        <span className="ft-val">{value}</span>
      </span>
    </div>
  );
}

/* The thin "layer" MediBytes lives in: a line with a travelling pulse. */
function Layer({ on, label = 'MediBytes' }) {
  return (
    <div className={`ft-layer${on ? ' is-live' : ''}`}>
      <span className="ft-layer-line" />
      <span className="ft-layer-label">{label}</span>
      <span className="ft-layer-line" />
    </div>
  );
}

/* ───────────────────────── 01 OPD ───────────────────────── */

const OPD_TALK = [
  ['Doctor', 'How long have you had the fever?'],
  ['Patient', 'Three days. And a dry cough since yesterday.'],
  ['Doctor', 'Any breathlessness or chest pain?'],
];

const OPD_NOTE = [
  ['Chief complaint', 'Fever for 3 days, dry cough for 1 day'],
  ['History', 'No breathlessness, no chest pain'],
  ['Examination', 'Temp 38.4 °C, chest clear'],
  ['Assessment', 'Likely viral upper respiratory infection'],
  ['Plan', 'Symptomatic care, review in 3 days'],
];

export function OpdVisual() {
  const ref = useRef(null);
  const step = useLoop(ref, OPD_TALK.length + OPD_NOTE.length + 2, { interval: 800 });
  const noteStart = OPD_TALK.length + 1;
  return (
    <div ref={ref} className="ft-v ft-v-opd">
      <StageBar title="Consultation · OPD room 3" />
      <div className="ft-talk">
        {OPD_TALK.map(([who, line], i) => (
          <div key={line} className={at(step, i, `ft-bubble ${who === 'Doctor' ? 'is-dr' : 'is-pt'}`)}>
            <span className="ft-who">{who}</span>
            {line}
          </div>
        ))}
      </div>
      <Layer on={step >= OPD_TALK.length} />
      <div className="ft-note">
        <div className="ft-note-head">Structured consultation note</div>
        {OPD_NOTE.map(([label, value], i) => (
          <Field key={label} label={label} value={value} on={step >= noteStart + i} />
        ))}
      </div>
      <ReviewChip on={step >= noteStart + OPD_NOTE.length} />
    </div>
  );
}

/* ───────────────────────── 02 IPD ───────────────────────── */

const STAY = ['Admission', 'Rounds', 'Nursing', 'Handover', 'ICU', 'Discharge'];

const IPD_OUTPUT = {
  progress: {
    stage: 1,
    title: 'Progress note · Day 2 rounds',
    fields: [
      ['Condition', 'Afebrile overnight, improving'],
      ['Investigations', 'CBC repeated, WBC trending down'],
      ['Decision', 'Continue IV antibiotics'],
      ['Plan', 'Switch to oral if afebrile for 24 h'],
    ],
  },
  handover: {
    stage: 3,
    title: 'Handover · Ward 4B',
    fields: [
      ['What happened', 'Admitted with pneumonia, now day 2'],
      ['What matters now', 'SpO₂ 94% on 2 L oxygen'],
      ['What happens next', 'Repeat chest X-ray at 08:00'],
    ],
  },
  nursing: {
    stage: 2,
    title: 'Nursing assessment & care plan',
    fields: [
      ['Mobility', 'Needs assistance, moderate fall risk'],
      ['Skin', 'Intact, repositioning every 2 h'],
      ['Nutrition', 'Soft diet, about 60% intake'],
      ['Care plan', 'Fall precautions, oxygen weaning'],
    ],
  },
  discharge: {
    stage: 'all',
    title: 'Discharge summary · building through the stay',
    fields: [
      ['Diagnosis', 'Community-acquired pneumonia'],
      ['Investigations', 'Chest X-ray, CBC, blood cultures'],
      ['Procedures', 'None'],
      ['Medications', 'Oral amoxicillin-clavulanate'],
      ['Clinical events', 'Oxygen weaned on day 3'],
    ],
  },
  erx: {
    stage: 1,
    title: 'E-prescription',
    fields: [
      ['Amoxicillin-clavulanate 625 mg', '1-0-1 · 5 days · after food'],
      ['Paracetamol 650 mg', 'When needed · max 3 a day'],
      ['Advice', 'Review in OPD after 1 week'],
    ],
  },
  shift: {
    stage: 3,
    title: 'Shift summary · 20:00',
    fields: [
      ['What changed', 'Oxygen reduced to 1 L'],
      ['Treatment', 'Antibiotic switched to oral'],
      ['Pending', 'Blood culture report awaited'],
    ],
  },
};

const ICU_SOURCES = ['Doctor', 'Nurse', 'Monitor', 'Medication'];
const ICU_FIELDS = [
  ['Vitals', 'HR 96 · BP 118/72'],
  ['Ventilator', 'PEEP 6 · FiO₂ 40%'],
  ['I/O', '+420 mL'],
  ['Drugs', 'Noradrenaline 0.05'],
  ['Events', 'Suctioned 14:10'],
  ['Notes', 'Sedation lightened'],
];

function IcuFlow() {
  const ref = useRef(null);
  const step = useLoop(ref, ICU_FIELDS.length + 3, { interval: 650, resetKey: 'icu' });
  return (
    <div ref={ref} className="ft-icu">
      <div className="ft-icu-sources">
        {ICU_SOURCES.map((s, i) => (
          <span key={s} className={at(step, 0, 'ft-src')} style={{ transitionDelay: `${i * 70}ms` }}>
            {s}
          </span>
        ))}
      </div>
      <svg className="ft-icu-lines" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
        {[50, 150, 250, 350].map((x) => (
          <path key={x} d={`M${x} 0 C ${x} 30, 200 30, 200 60`} className={step >= 1 ? 'is-on' : ''} />
        ))}
      </svg>
      <div className={at(step, 1, 'ft-icu-core')}>MediBytes</div>
      <div className="ft-icu-grid">
        {ICU_FIELDS.map(([k, v], i) => (
          <div key={k} className={at(step, 2 + i, 'ft-icu-cell')}>
            <span>{k}</span>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IpdVisual({ active }) {
  const ref = useRef(null);
  const out = IPD_OUTPUT[active];
  const count = out ? out.fields.length : 0;
  const step = useLoop(ref, count + 2, { interval: 750, resetKey: active });
  const lit = (i) => {
    if (active === 'icu') return i === 4;
    if (out.stage === 'all') return i <= Math.min(step, STAY.length - 1);
    return i === out.stage;
  };
  return (
    <div ref={ref} className="ft-v ft-v-ipd">
      <StageBar title={active === 'icu' ? 'ICU flow sheet · Bed 6' : out.title} />
      <ol className="ft-stay" aria-hidden="true">
        {STAY.map((s, i) => (
          <li key={s} className={lit(i) ? 'is-lit' : ''}>
            <span className="ft-stay-dot" />
            <span className="ft-stay-name">{s}</span>
          </li>
        ))}
      </ol>
      {active === 'icu' ? (
        <IcuFlow />
      ) : (
        <>
          <div className="ft-note">
            {out.fields.map(([label, value], i) => (
              <Field key={label} label={label} value={value} on={step >= i} />
            ))}
          </div>
          <ReviewChip on={step >= count} />
        </>
      )}
    </div>
  );
}

/* ───────────────────────── 03 Clinical ───────────────────────── */

function DrugDrug() {
  const ref = useRef(null);
  const step = useLoop(ref, 4, { interval: 900, resetKey: 'dd' });
  return (
    <div ref={ref} className="ft-dd">
      <div className="ft-meds">
        <div className={at(step, 0, 'ft-med')}>
          <span>Medication</span>
          <strong>Warfarin 5 mg</strong>
        </div>
        <svg className="ft-link" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 10 H100" className={step >= 1 ? 'is-on' : ''} />
        </svg>
        <div className={at(step, 0, 'ft-med')}>
          <span>Medication</span>
          <strong>Aspirin 75 mg</strong>
        </div>
      </div>
      <div className={at(step, 2, 'ft-signal')}>
        <Flag>Potential interaction</Flag>
        <p>Combined use may increase bleeding risk.</p>
        <span className="ft-signal-foot">Surfaced for clinician review</span>
      </div>
    </div>
  );
}

function DrugLab() {
  const ref = useRef(null);
  const step = useLoop(ref, 4, { interval: 900, resetKey: 'dl' });
  return (
    <div ref={ref} className="ft-chain">
      <div className={at(step, 0, 'ft-chain-row')}>
        <span>Medication</span>
        <strong>Metformin 1 g twice daily</strong>
      </div>
      <span className={at(step, 1, 'ft-chain-arrow')} aria-hidden="true" />
      <div className={at(step, 1, 'ft-chain-row')}>
        <span>Relevant laboratory result</span>
        <strong>
          eGFR 28 <em className="ft-down">↓</em>
        </strong>
      </div>
      <span className={at(step, 2, 'ft-chain-arrow')} aria-hidden="true" />
      <div className={at(step, 2, 'ft-chain-row is-flag')}>
        <Flag>Clinical review suggested</Flag>
      </div>
    </div>
  );
}

const PAIRS = [
  ['Diagnosis', 'Medication', true],
  ['Medication', 'Laboratory result', false],
  ['Treatment', 'Patient condition', true],
  ['Investigation', 'Clinical documentation', true],
];

function Consistency() {
  const ref = useRef(null);
  const step = useLoop(ref, PAIRS.length + 1, { interval: 800, resetKey: 'cc' });
  return (
    <div ref={ref} className="ft-pairs">
      {PAIRS.map(([a, b, fine], i) => (
        <div
          key={a + b}
          className={`ft-pair${step === i ? ' is-scan' : ''}${step > i || step === PAIRS.length ? ' is-done' : ''}`}
        >
          <span>{a}</span>
          <span className="ft-pair-link" aria-hidden="true">↔</span>
          <span>{b}</span>
          <span className="ft-pair-state">{fine ? <Ok /> : <Flag>Review</Flag>}</span>
        </div>
      ))}
    </div>
  );
}

const STREAM = [
  'BP 128/80', 'Na 138', 'HR 88', 'SpO₂ 97%', 'Hb 12.1', 'Temp 37.2', 'Urea 34',
  'K 6.1 ↑', 'RR 18', 'Glucose 142', 'Cl 101', 'WBC 8.4', 'ALT 32', 'Pain 2/10',
  'Plt 240', 'Troponin ↑', 'Ca 9.2', 'Mg 2.0', 'INR 1.1', 'CRP 12', 'Bili 0.8',
  'Albumin 3.9', 'New chest pain', 'LDH 190', 'pH 7.39', 'Lactate 1.2', 'HCO₃ 24',
];
const SIGNALS = new Set(['K 6.1 ↑', 'Troponin ↑', 'New chest pain']);

function Signals() {
  const ref = useRef(null);
  const step = useLoop(ref, 3, { interval: 1300, resetKey: 'sg' });
  return (
    <div ref={ref} className={`ft-stream is-step-${step}`}>
      {STREAM.map((t) => (
        <span key={t} className={SIGNALS.has(t) ? 'ft-tok is-sig' : 'ft-tok'}>
          {t}
        </span>
      ))}
    </div>
  );
}

const CLINICAL = {
  dd: ['Medication review', DrugDrug],
  dl: ['Medication in lab context', DrugLab],
  cc: ['Record cross-check', Consistency],
  sg: ['Patient information · last 24 h', Signals],
};

export function ClinicalVisual({ active }) {
  const [title, View] = CLINICAL[active];
  return (
    <div className="ft-v ft-v-clin">
      <StageBar title={title} />
      <View key={active} />
    </div>
  );
}

/* ───────────────────────── 04 Documents ───────────────────────── */

const DOCS = [
  {
    type: 'Lab report',
    fields: [
      ['Test', 'Serum creatinine'],
      ['Result', '1.9 mg/dL (high)'],
      ['Collected', '12 Sep 2026'],
      ['Source', 'External laboratory'],
    ],
  },
  {
    type: 'Prescription',
    fields: [
      ['Medication', 'Amlodipine 5 mg'],
      ['Dose', 'Once daily'],
      ['Prescriber', 'Outside clinic'],
      ['Date', '03 Aug 2026'],
    ],
  },
  {
    type: 'Referral letter',
    fields: [
      ['Referred for', 'Cardiology opinion'],
      ['Reason', 'Exertional chest discomfort'],
      ['From', 'General practitioner'],
      ['Date', '20 Sep 2026'],
    ],
  },
  {
    type: 'Discharge summary',
    fields: [
      ['Diagnosis', 'Type 2 diabetes, hypertension'],
      ['Admitted', '02 to 06 Jun 2026'],
      ['Medications', '3 continued, 1 stopped'],
      ['Follow-up', 'Endocrinology in 4 weeks'],
    ],
  },
  {
    type: 'External record',
    fields: [
      ['Allergies', 'Sulfonamides'],
      ['Past surgery', 'Appendicectomy, 2014'],
      ['Imaging', 'Chest X-ray, normal'],
      ['Source', 'Scanned paper file'],
    ],
  },
];

export function DocumentVisual() {
  const ref = useRef(null);
  const [doc, setDoc] = useState(0);
  const d = DOCS[doc];
  const step = useLoop(ref, d.fields.length + 3, { interval: 700, hold: 2200, resetKey: doc });
  const done = step >= d.fields.length + 2;
  return (
    <div ref={ref} className="ft-v ft-v-doc">
      <StageBar title={`${d.type} · scanned upload`} />
      <div className="ft-doc-flow">
        <div className={`ft-paper${step < 2 ? ' is-scanning' : ''}`} aria-hidden="true">
          <span className="ft-paper-head" />
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="ft-paper-line" style={{ width: `${92 - ((i * 23) % 40)}%` }} />
          ))}
          <span className="ft-beam" />
        </div>
        <span className={at(step, 1, 'ft-doc-arrow')} aria-hidden="true">→</span>
        <div className="ft-extract">
          <div className="ft-note-head">Structured patient information</div>
          {d.fields.map(([k, v], i) => (
            <Field key={k} label={k} value={v} on={step >= 2 + i} />
          ))}
        </div>
      </div>
      <div className="ft-doc-types" role="group" aria-label="Document examples">
        {DOCS.map((x, i) => (
          <button
            key={x.type}
            type="button"
            className={i === doc ? 'is-on' : ''}
            aria-pressed={i === doc}
            onClick={() => setDoc(i)}
          >
            {x.type}
          </button>
        ))}
        {done && (
          <button
            type="button"
            className="ft-doc-next"
            onClick={() => setDoc((doc + 1) % DOCS.length)}
          >
            Next document →
          </button>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── 05 Insurance ───────────────────────── */

const CLAIM_DOCS = [
  ['Discharge summary', true],
  ['Investigation reports', true],
  ['Operative note', true],
  ['Pre-authorisation', true],
  ['Implant invoice', false],
];

function Completeness() {
  const ref = useRef(null);
  const step = useLoop(ref, CLAIM_DOCS.length + 2, { interval: 700, resetKey: 'cp' });
  return (
    <div ref={ref} className="ft-checks">
      {CLAIM_DOCS.map(([name, present], i) => (
        <div key={name} className={`ft-check${step > i ? ' is-done' : ''}${present ? '' : ' is-gap'}`}>
          <span className="ft-box" aria-hidden="true">
            {present && <Check />}
          </span>
          <span>{name}</span>
          <span className="ft-check-state">{present ? 'Present' : <Flag>Missing</Flag>}</span>
        </div>
      ))}
      <div className={at(step, CLAIM_DOCS.length + 1, 'ft-sum')}>
        4 of 5 present · 1 item to resolve before submission
      </div>
    </div>
  );
}

const CLAIM_ROWS = [
  ['Diagnosis', 'Acute cholecystitis', 'Acute cholecystitis', 'Acute cholecystitis'],
  ['Procedure', 'Lap. cholecystectomy', 'Lap. cholecystectomy', 'Open cholecystectomy'],
  ['Length of stay', '3 days', '3 days', '3 days'],
];

function ClaimConsistency() {
  const ref = useRef(null);
  const step = useLoop(ref, CLAIM_ROWS.length + 2, { interval: 900, resetKey: 'cl' });
  return (
    <div ref={ref} className="ft-claim">
      <div className="ft-claim-row is-head">
        <span />
        <span>Clinical note</span>
        <span>Procedure record</span>
        <span>Billing</span>
      </div>
      {CLAIM_ROWS.map(([k, ...vals], i) => {
        const odd = new Set(vals).size > 1;
        return (
          <div key={k} className={`${at(step, i, 'ft-claim-row')}${odd && step > CLAIM_ROWS.length ? ' is-odd' : ''}`}>
            <span className="ft-claim-key">{k}</span>
            {vals.map((v, j) => (
              <span key={j} className={odd && j === 2 ? 'ft-claim-diff' : ''}>
                {v}
              </span>
            ))}
          </div>
        );
      })}
      <div className={at(step, CLAIM_ROWS.length + 1, 'ft-sum')}>
        <Flag>Procedure differs in billing</Flag> Sent to the billing team for review
      </div>
    </div>
  );
}

function Assistance() {
  const ref = useRef(null);
  const step = useLoop(ref, 4, { interval: 1100, resetKey: 'as' });
  return (
    <div ref={ref} className="ft-assist">
      <div className={at(step, 0, 'ft-assist-step')}>
        <span className="ft-assist-k">Gap found</span>
        <p>Discharge summary does not state the indication for the ICU stay.</p>
      </div>
      <div className={at(step, 1, 'ft-assist-step')}>
        <span className="ft-assist-k">Suggested next step</span>
        <p>Ask the treating clinician to add the clinical indication.</p>
      </div>
      <div className={at(step, 2, 'ft-assist-step is-good')}>
        <span className="ft-assist-k">Resolved</span>
        <p>Updated by the clinician. Claim file ready for review.</p>
      </div>
    </div>
  );
}

const INSURANCE = {
  cp: ['Claim file · pre-submission check', Completeness],
  cl: ['One patient, three records', ClaimConsistency],
  as: ['Documentation gap', Assistance],
};

export function InsuranceVisual({ active }) {
  const [title, View] = INSURANCE[active];
  return (
    <div className="ft-v ft-v-ins">
      <StageBar title={title} />
      <View key={active} />
    </div>
  );
}
