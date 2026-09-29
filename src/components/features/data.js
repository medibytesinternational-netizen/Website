import {
  OpdVisual,
  IpdVisual,
  ClinicalVisual,
  DocumentVisual,
  InsuranceVisual,
} from './visuals';

/*
 * Copy for /features and /features/:slug, taken from
 * public/Medibytes_Website_Features_Content_Guide.md. Keep the wording in step
 * with that document; outcome statements stay labelled as aims (PRODUCT.md).
 */

export const PLATFORM = {
  kicker: 'The MediBytes Intelligence Platform',
  headline: ['One intelligent layer across', 'the entire patient journey.'],
  lead: 'From consultation to discharge and reimbursement, MediBytes transforms clinical information into structured documentation, actionable intelligence, and cleaner hospital workflows.',
  closing: {
    headline: ['One patient.', 'One continuous intelligence layer.'],
    body: 'From the first consultation to inpatient care, clinical review, medical documents, and insurance workflows, MediBytes connects fragmented information into a more structured and usable clinical journey.',
    tagline: 'Built to work with the hospital. Not around it.',
  },
};

export const PILLARS = [
  {
    slug: 'opd',
    index: '01',
    name: 'OPD Intelligence',
    short: 'OPD',
    summary: 'Outpatient clinical documentation.',
    card: 'Turn consultations into structured clinical documentation while clinicians stay focused on the patient.',
    flow: ['Consultation', 'Structured Documentation'],
    headline: ['Less typing.', 'More medicine.'],
    lead: 'MediBytes helps clinicians convert consultations into structured clinical documentation while they focus on the patient.',
    body: 'The platform can capture relevant clinical information from consultations and assist in generating structured notes that fit into the hospital’s existing workflow.',
    Visual: OpdVisual,
    capsLabel: 'Core capability',
    caps: [
      {
        key: 'opd',
        title: 'AI-Assisted OPD Documentation',
        headline: 'Turn clinical conversations and inputs into structured documentation.',
        body: 'Designed for faster, more consistent outpatient workflows. The generated note populates the fields a consultation needs: chief complaint, history, examination, assessment and plan.',
        pointsLabel: 'Key capabilities',
        points: [
          'Structured consultation notes',
          'Clinical information capture',
          'Documentation assistance within existing workflows',
        ],
      },
    ],
    statement: {
      text: 'An invisible intelligence layer working behind the clinical workflow.',
    },
  },
  {
    slug: 'ipd',
    index: '02',
    name: 'IPD Intelligence',
    short: 'IPD',
    summary: 'Continuous inpatient documentation.',
    card: 'Connect rounds, nursing, handovers, ICU workflows, and discharge into one continuous documentation journey.',
    flow: ['Admission', 'Continuous Documentation', 'Discharge'],
    headline: ['Documentation that follows', 'the patient, not the paperwork.'],
    lead: 'MediBytes connects the documentation generated throughout an inpatient stay, from admission and rounds to nursing, ICU care, handovers, and discharge.',
    body: 'Instead of healthcare teams repeatedly recreating information, MediBytes helps transform existing clinical inputs into structured documentation throughout the patient’s hospital journey.',
    Visual: IpdVisual,
    capsLabel: 'Seven capabilities across the stay',
    caps: [
      {
        key: 'progress',
        title: 'Progress Notes',
        headline: 'Turn clinical rounds into structured progress documentation.',
        body: 'MediBytes can assist in capturing changes in the patient’s condition, investigations, treatment decisions, and clinical plans during rounds.',
      },
      {
        key: 'handover',
        title: 'Handover Notes',
        headline: 'Make every transition of care clearer.',
        body: 'Automatically structure important patient information for clinical handovers, helping teams understand what happened, what matters now, and what needs to happen next.',
      },
      {
        key: 'nursing',
        title: 'Nursing Assessment & Care Plans',
        headline: 'Structured nursing documentation without starting from scratch.',
        body: 'Assist nursing teams in converting patient assessments and clinical information into organised nursing documentation and care plans.',
      },
      {
        key: 'discharge',
        title: 'Discharge Summary',
        headline: 'Build the discharge summary throughout the admission.',
        body: 'Instead of reconstructing an entire hospital stay at discharge, MediBytes can consolidate relevant diagnoses, investigations, procedures, medications, and clinical events into a structured draft.',
        note: 'A continuous documentation workflow, not simply an “AI discharge summary”.',
      },
      {
        key: 'erx',
        title: 'E-Prescription',
        headline: 'From clinical decisions to structured prescriptions.',
        body: 'Assist clinicians in generating clear, structured electronic prescriptions from documented treatment plans.',
      },
      {
        key: 'shift',
        title: 'Shift Summary',
        headline: 'Know what changed during the shift.',
        body: 'MediBytes can consolidate clinically relevant events, treatment changes, and pending actions into concise shift summaries for the incoming team.',
      },
      {
        key: 'icu',
        title: 'ICU Flow Sheet Mapping',
        headline: 'From bedside activity to structured ICU data.',
        body: 'MediBytes helps map clinical information generated during ICU care into structured flow-sheet fields, reducing repetitive documentation across high-intensity environments.',
        points: ['Vitals', 'Ventilator', 'I/O', 'Drugs', 'Events', 'Notes'],
        pointsLabel: 'Doctor, nurse, monitor and medication inputs mapped to',
        inline: true,
      },
    ],
  },
  {
    slug: 'clinical',
    index: '03',
    name: 'Clinical Intelligence',
    short: 'Clinical',
    summary: 'Contextual clinical information analysis.',
    card: 'Connect medications, investigations, and clinical information to surface signals and inconsistencies that may require attention.',
    flow: ['Patient Data', 'Context', 'Signals'],
    headline: ['Intelligence that looks', 'across the patient’s record.'],
    lead: 'MediBytes connects medications, investigations, and clinical documentation to surface information that may require attention.',
    body: 'Every signal is surfaced for clinician review. The clinical decision stays with the clinician.',
    Visual: ClinicalVisual,
    capsLabel: 'Four layers of clinical intelligence',
    caps: [
      {
        key: 'dd',
        title: 'Drug–Drug Intelligence',
        headline: 'Identify clinically relevant medication interactions.',
        body: 'MediBytes can evaluate medications together and surface potential interactions for clinician review.',
        highlight: 'Helps clinicians identify potential medication conflicts earlier.',
      },
      {
        key: 'dl',
        title: 'Drug–Lab Intelligence',
        headline: 'Medication decisions in clinical context.',
        body: 'Connect medication orders with relevant laboratory values to surface potential inconsistencies for clinician review.',
      },
      {
        key: 'cc',
        title: 'Clinical Consistency Engine',
        headline: 'A second layer of clinical reasoning across the record.',
        body: 'MediBytes cross-checks clinical information across medications, investigations, documented diagnoses, observations, and treatment plans to surface potential inconsistencies.',
        points: [
          'Diagnosis ↔ Medication',
          'Medication ↔ Laboratory Result',
          'Treatment ↔ Patient Condition',
          'Investigation ↔ Clinical Documentation',
        ],
        pointsLabel: 'Relationships checked continuously',
      },
      {
        key: 'sg',
        title: 'Clinical Signal Highlighting',
        headline: 'See what matters first.',
        body: 'MediBytes helps surface clinically significant findings, symptoms, and investigation results from large amounts of patient information, giving clinicians a faster view of what may require attention.',
      },
    ],
    statement: {
      text: 'Not another alert system. A contextual intelligence layer across the clinical record.',
    },
  },
  {
    slug: 'documents',
    index: '04',
    name: 'Document Intelligence',
    short: 'Documents',
    summary: 'Clinical document extraction and structuring.',
    card: 'Transform external clinical documents and paper records into structured, usable patient information.',
    flow: ['Unstructured Documents', 'Structured Clinical Information'],
    headline: ['Turn hospital paperwork', 'into usable data.'],
    lead: 'MediBytes can extract and structure information from external clinical documents, helping bring information from paper records, reports, and uploaded files into the digital patient workflow.',
    body: 'OCR is an enabling technology. The value to hospitals is Document Intelligence.',
    Visual: DocumentVisual,
    capsLabel: 'How it works',
    caps: [
      {
        key: 'doc',
        title: 'Scan / Upload → Document Intelligence → Structured Patient Information',
        headline: 'From paper records to the digital patient workflow.',
        body: 'Documents are scanned or uploaded, MediBytes Document Intelligence reads and structures their clinical content, and the result arrives as structured patient information.',
        pointsLabel: 'Supported document examples',
        points: [
          'Lab reports',
          'Prescriptions',
          'Referral letters',
          'Discharge summaries',
          'External medical records',
        ],
      },
    ],
    statement: {
      text: 'From document → data → clinical context.',
    },
  },
  {
    slug: 'insurance',
    index: '05',
    name: 'Insurance Intelligence',
    short: 'Insurance',
    summary: 'Documentation and claim-readiness intelligence.',
    card: 'Identify documentation gaps and inconsistencies before they become claim queries, delays, or denials.',
    flow: ['Clinical Documentation', 'Documentation Review', 'Claim Readiness'],
    headline: ['Better documentation before', 'the claim leaves the hospital.'],
    lead: 'MediBytes helps hospitals identify documentation gaps and inconsistencies that may contribute to claim queries, delays, or denials.',
    body: 'A connection between clinical documentation and hospital revenue workflows, rather than another administrative module.',
    Visual: InsuranceVisual,
    capsLabel: 'Three checks before the claim',
    caps: [
      {
        key: 'cp',
        title: 'Documentation Completeness',
        headline: 'Check before submission.',
        body: 'MediBytes can review relevant claim documentation and identify potentially missing information before submission.',
      },
      {
        key: 'cl',
        title: 'Claim Consistency',
        headline: 'One patient. One consistent clinical story.',
        body: 'MediBytes can compare information across clinical documentation, investigations, procedures, medications, and billing-related records to surface inconsistencies for review.',
      },
      {
        key: 'as',
        title: 'Documentation Assistance',
        headline: 'Find the gap. Fix it earlier.',
        body: 'When required information appears incomplete, MediBytes can guide hospital teams toward the documentation that may need clarification or completion.',
      },
    ],
    statement: {
      label: 'What we’re designing for',
      text: 'Cleaner documentation. Fewer avoidable queries. Faster revenue cycles.',
    },
  },
];

export const pillarBySlug = (slug) => PILLARS.find((p) => p.slug === slug);
