import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, hover } from 'motion';
import { createIcons, Activity, ArrowUpRight, ArrowDownRight, ArrowRight, Mic, Play, Pause, FileText, Check, ChevronDown, Menu, X, ShieldCheck, Languages, Cloud, Server, AudioLines, ScanLine, CircleCheck, LockKeyhole, RotateCcw, Download, Stethoscope, Layers, Headphones, Pencil, Plus } from 'lucide';

const icon = (name, cls = '') => `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;
const arrow = icon('arrow-up-right');
const logo = `<span class="brand-symbol">${icon('activity')}</span><span>Medi<span class="brand-weight">Bytes</span><span class="brand-period">.</span></span>`;
const waveform = (count = 65) => Array.from({length:count}, (_,i) => `<span style="--bar:${12 + (Math.sin(i * 1.7) + 1) * 15 + (Math.sin(i * .43) + 1) * 17}px"></span>`).join('');

document.querySelector('#app').innerHTML = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="nav-wrap">
 <a class="brand" href="#" aria-label="MediBytes home">${logo}</a>
 <nav id="nav" aria-label="Main navigation"><a href="#platform">Platform</a><a href="#workflow">How it works</a><a href="#deployment">For hospitals</a><a href="#vision">Our vision</a></nav>
 <a class="button nav-cta" href="#connect">Let’s talk ${arrow}</a>
 <button class="menu-toggle" aria-label="Open navigation" aria-controls="nav" aria-expanded="false">${icon('menu')}</button>
</div></header>
<main id="main">
<section class="hero container" aria-labelledby="hero-heading">
 <div class="hero-grid" aria-hidden="true"></div><div class="hero-aura" aria-hidden="true"></div>
 <div class="hero-copy"><div class="eyebrow hero-in"><span class="status-dot"></span> CLINICAL DOCUMENTATION, REIMAGINED</div>
 <h1 id="hero-heading"><span class="headline-line">Less paperwork.</span><span class="headline-line green">More patient care.</span></h1>
 <p class="hero-in">Turn the way you speak into the documents you need.<br class="desktop-break"/> Clinical voice. Structured notes. Always reviewed by you.</p>
 <div class="hero-actions hero-in"><a class="button primary" href="#workflow">See how it works ${icon('arrow-right')}</a><a class="text-button" href="#connect">Meet MediBytes ${arrow}</a></div>
 <div class="hero-footnote hero-in"><span class="tiny-line"></span> In development. Built around the clinician.</div></div>
 <div class="voice-accent" aria-hidden="true"><div class="voice-rail"></div><div class="voice-orb">${icon('audio-lines')}</div><span>YOUR VOICE, STRUCTURED.</span></div>
 <div class="product-shell" id="product-preview">
  <div class="product-topbar"><div class="mini-brand">${icon('activity')} MediBytes <span>/</span> Workspace</div><span class="concept-tag">Interactive concept</span><div class="avatar">DR</div></div>
  <div class="product-layout">
   <aside class="product-sidebar"><div class="sidebar-title">WORKSPACE</div><span class="sidebar-link active">${icon('audio-lines')} New session</span><span class="sidebar-link">${icon('file-text')} My documents</span><span class="sidebar-link">${icon('layers')} Templates</span><div class="sidebar-bottom">${icon('shield-check')} Clinician in control</div></aside>
   <div class="session-panel"><div class="panel-heading"><span class="section-marker">01</span><h2>Your conversation</h2><span class="sample-label">SAMPLE</span></div>
    <div class="session-meta"><span>${icon('stethoscope')} OPD consultation</span><span>English + Hindi</span></div>
    <div class="audio-box"><div class="audio-top"><span>${icon('mic')} Clinical dictation</span><span id="audio-time">00:12</span></div><div class="waveform">${waveform()}</div><div class="audio-bottom"><button class="play-button" id="play-sample" aria-label="Play visual dictation demo">${icon('play')}</button><span id="play-label">Play visual demo</span><span class="sound-note">No patient audio</span></div></div>
    <div class="transcript-label">TRANSCRIPT <span>Auto-detected language</span></div><p class="transcript">“Patient ko <mark>fever</mark> hai for the last <mark>three days</mark>. Reports fatigue. No known allergies. Advise follow-up in <mark>one week</mark>.”</p>
    <div class="sample-note">Illustrative content only. No audio is recorded or uploaded.</div>
   </div>
   <div class="document-panel"><div class="panel-heading"><span class="section-marker">02</span><h2>Structured note</h2><span class="review-badge">${icon('scan-line')} Review</span></div>
    <div class="document-title"><span>OPD consultation note</span>${icon('file-text')}</div>
    <div class="note-field"><label for="complaint">Chief complaint <span>Extracted</span></label><input id="complaint" value="Fever for 3 days" aria-label="Sample chief complaint"/></div>
    <div class="note-row"><div class="note-field"><label for="symptoms">Associated symptoms</label><input id="symptoms" value="Fatigue"/></div><div class="note-field"><label for="allergies">Allergies</label><input id="allergies" value="None reported"/></div></div>
    <div class="note-field followup"><label for="followup">Follow-up <span class="check-label">${icon('check')} Source linked</span></label><input id="followup" value="Review in 1 week"/></div>
    <div class="review-footer"><span id="review-status" role="status">${icon('pencil')} Every field is yours to edit.</span><button id="review-button" class="button small primary">Review sample ${icon('arrow-right')}</button></div>
   </div>
  </div>
 </div>
 <div class="under-preview"><span>A clearer path from conversation to documentation.</span><span>Voice in. Clarity out. ${icon('arrow-down-right')}</span></div>
</section>
<div class="capability-strip"><div class="container"><span>Built for the way care happens</span><div>${icon('stethoscope')} OPD consultations</div><div>${icon('activity')} ER discharge</div><div>${icon('file-text')} Admission notes</div><div>${icon('layers')} Surgical notes</div></div></div>
<section class="platform container section" id="platform">
 <div class="section-intro reveal"><div class="eyebrow">A LITTLE LESS ADMIN. A LOT MORE HUMAN.</div><div class="intro-row"><h2>Care is personal.<br/>Your workflow should be, too.</h2><p>We’re building documentation that fits into clinical practice, so the conversation stays with your patient.</p></div></div>
 <div class="feature-grid">
  <article class="feature-card language-card reveal"><div><div class="card-top">${icon('languages')}<span>01 / SPEAK NATURALLY</span></div><h3>Many languages.<br/>One clear record.</h3><p>Designed for English, Hindi, Tamil, and the way you naturally switch between them.</p></div><div class="language-visual"><span class="language-word word-en">Hello</span><span class="language-word word-hi" lang="hi">नमस्ते</span><span class="language-word word-ta" lang="ta">வணக்கம்</span><div class="language-bottom"><span>English</span><span>हिन्दी</span><span>தமிழ்</span><span>+ Mixed speech</span></div></div></article>
  <article class="feature-card review-card reveal"><div class="card-top">${icon('shield-check')}<span>02 / STAY IN CONTROL</span></div><h3>AI assists.<br/>You have the final word.</h3><p>Editable fields, source-linked context, and a mandatory human review before any document leaves your workspace.</p><div class="confidence-row"><div><span class="confidence-dot"></span> Chief complaint</div><span>Ready to review ${icon('check')}</span></div><div class="confidence-row amber"><div><span class="confidence-dot"></span> Follow-up detail</div><span>Needs your review ${icon('pencil')}</span></div><div class="review-note">${icon('lock-keyhole')} No verification. No export.</div></article>
  <article class="feature-card template-card reveal"><div class="template-copy"><div class="card-top">${icon('layers')}<span>03 / MAKE IT YOURS</span></div><h3>Your templates.<br/>Already part of the plan.</h3><p>From OPD notes to ER discharge summaries. Template-aware extraction is designed to structure the fields each document actually needs.</p><div class="format-tags"><span>DOCX</span><span>PDF</span><span>JSON</span><span class="muted">Planned exports</span></div></div><div class="template-visual"><div class="paper back-paper"></div><div class="paper front-paper"><div class="paper-brand">${icon('activity')} MediBytes</div><span class="paper-label">CLINICAL DOCUMENT</span><h4>ER discharge summary</h4><div class="paper-rule"></div><div class="paper-item"><span>Presenting complaint</span><div></div><div class="short"></div></div><div class="paper-item"><span>Clinical assessment</span><div></div><div></div></div><div class="paper-stamp">${icon('shield-check')} Clinician-reviewed</div></div></div></article>
 </div>
</section>
<section class="workflow-section" id="workflow"><div class="container workflow-layout">
 <div class="workflow-heading"><div class="eyebrow">FROM SPOKEN TO STRUCTURED</div><h2>A natural flow.<br/>At every step.</h2><p>Designed to take the repetition out of documentation, while keeping clinical judgment exactly where it belongs.</p><div class="workflow-progress" aria-hidden="true"><span></span></div><a class="text-button" href="#product-preview">Explore the concept ${icon('arrow-up-right')}</a></div>
 <div class="workflow-steps">
 <article class="workflow-step"><span class="step-number">01</span><div><div class="step-icon">${icon('mic')}</div><h3>Speak in your own words.</h3><p>Select a clinical template, then record or upload your dictation. No rigid script. No change to the way you speak.</p><div class="mini-wave" aria-hidden="true">${waveform(38)}</div></div></article>
 <article class="workflow-step"><span class="step-number">02</span><div><div class="step-icon">${icon('scan-line')}</div><h3>Let the structure take shape.</h3><p>MediBytes is designed to transcribe, identify clinical details, and map them into the right template fields.</p><div class="extraction"><span>“fever for three days”</span>${icon('arrow-right')}<strong>Chief complaint</strong></div></div></article>
 <article class="workflow-step"><span class="step-number">03</span><div><div class="step-icon">${icon('shield-check')}</div><h3>Review. Refine. Make it yours.</h3><p>Check the source, correct any field, and confirm the details. Clinician verification is a required step, not an optional extra.</p><div class="step-detail">${icon('check')} Editable fields <span>·</span> Source context <span>·</span> Review flags</div></div></article>
 <article class="workflow-step"><span class="step-number">04</span><div><div class="step-icon">${icon('file-text')}</div><h3>A document, ready for care.</h3><p>Export the reviewed note to DOCX or PDF. Structured JSON output is planned for integration with existing hospital systems.</p><div class="export-chips"><span>${icon('file-text')} Consultation.docx</span><span>${icon('check')} Verified</span></div></div></article>
 </div>
</div></section>
<section class="deployment container section" id="deployment"><div class="section-intro reveal"><div class="eyebrow">YOUR HOSPITAL. YOUR ENVIRONMENT.</div><div class="intro-row"><h2>Built to fit your care.<br/>And your infrastructure.</h2><p>Two planned deployment paths. The same commitment to clinician-led documentation.</p></div></div>
 <div class="deployment-grid"><article class="deployment-card reveal"><div class="deploy-symbol">${icon('cloud')}</div><span class="deploy-label">CONNECTED CARE</span><h3>In the cloud.</h3><p>A centrally managed experience for connected teams, with an API-first approach to hospital system integration.</p><ul><li>${icon('check')} Centralized updates and operations</li><li>${icon('check')} Designed for multi-team access</li><li>${icon('check')} Planned HIS / EHR integration</li></ul></article><article class="deployment-card local reveal"><div class="deploy-symbol">${icon('server')}</div><span class="deploy-label">LOCAL CONTROL</span><h3>Within your walls.</h3><p>A local deployment path for hospitals that need clinical processing to stay inside their own environment.</p><ul><li>${icon('check')} On-premise processing by design</li><li>${icon('check')} Planned air-gapped operation</li><li>${icon('check')} Infrastructure under your control</li></ul></article></div><p class="deployment-caption">Deployment options are in development. Availability and requirements will be established through pilot validation.</p>
</section>
<section class="vision-section" id="vision"><div class="container"><div class="vision-top reveal"><span class="eyebrow">THE MEDIBYTES VISION</span><span class="outlined-tag">Currently in development</span></div><h2 class="vision-statement">The next chapter of healthcare should have <span>more human connection.</span> Not more paperwork.</h2><div class="vision-bottom reveal"><p>We’re building a future where clinical documentation begins with a conversation, and ends with clarity. Starting with multilingual voice, meaningful review, and workflows that respect the clinician.</p><a class="text-button" href="#connect">Build that future with us ${arrow}</a></div><div class="roadmap reveal"><div><span class="roadmap-dot current"></span><strong>Build</strong><span>Core voice-to-template workflow</span><small>In progress</small></div><div><span class="roadmap-dot"></span><strong>Validate</strong><span>Clinician feedback and pilot evaluation</span><small>Planned</small></div><div><span class="roadmap-dot"></span><strong>Scale</strong><span>Hospital integrations and deployment</span><small>Planned</small></div></div></div></section>
<section class="faq container section"><div class="faq-heading reveal"><div class="eyebrow">A LITTLE MORE CLARITY</div><h2>Good questions.<br/>Clear answers.</h2></div><div class="faq-list reveal">
 ${[
 ['Is MediBytes available to use today?', 'MediBytes is currently in development. This website presents the product direction and an interactive concept, not a live clinical documentation service. Pilot availability will follow product validation.'],
 ['Which languages are planned?', 'We are designing for English, Hindi, Tamil, Hinglish, and Tanglish. Support and quality will be evaluated separately for each language and mixed-language workflow during development.'],
 ['Does AI replace the clinician’s review?', 'No. Mandatory human verification is central to the product design. Every extracted field is intended to be editable, with source context and review flags to support the clinician’s final decision.'],
 ['Can MediBytes work with our existing templates?', 'Template-aware extraction is planned for OPD, ER discharge, admission, and surgical documentation. Hospital-specific templates and integration requirements will be explored during pilot discussions.'],
 ['Will clinical data have to leave our hospital?', 'The product plan includes both cloud and local deployment. The local path is designed for processing within the hospital environment, including a planned air-gapped option. These capabilities are still being developed and validated.']
 ].map(([q,a])=>`<details><summary>${q}<span>${icon('plus')}</span></summary><p>${a}</p></details>`).join('')}
 </div></section>
<section class="contact-section container" id="connect"><div class="contact-glow" aria-hidden="true"></div><div class="eyebrow reveal">FOR CLINICIANS, HOSPITALS & PEOPLE WHO SEE WHAT’S NEXT</div><h2 class="reveal">Better documentation.<br/><span class="green">Begins with a conversation.</span></h2><p class="reveal">Help shape the future of clinical workflows.<br/>We’re looking ahead to clinical pilots and strategic partnerships.</p><button class="button primary reveal" id="partnership-button" aria-expanded="false" aria-controls="partnership-info">Explore a partnership ${arrow}</button><div id="partnership-info" class="partnership-info" hidden><h3>Let’s shape MediBytes together.</h3><p>Clinical pilot and investor conversations are planned as the product develops. Meeting bookings are not open on this site yet.</p><a class="text-button" href="#workflow">Explore the planned workflow ${icon('arrow-right')}</a></div></section>
</main>
<footer class="container"><div class="footer-top"><a class="brand" href="#" aria-label="MediBytes home">${logo}</a><span>Designed around care.</span><a href="#main">Back to top ↑</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} MediBytes. All rights reserved.</span><span>Product in development · Concept demonstration only</span><button id="motion-toggle" aria-pressed="false">Pause animations</button></div></footer>
`;

createIcons({icons:{Activity,ArrowUpRight,ArrowDownRight,ArrowRight,Mic,Play,Pause,FileText,Check,ChevronDown,Menu,X,ShieldCheck,Languages,Cloud,Server,AudioLines,ScanLine,CircleCheck,LockKeyhole,RotateCcw,Download,Stethoscope,Layers,Headphones,Pencil,Plus}});

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionPreference.matches;
let animationContext;
let demoTimeline;
let demoRunning = false;
let reviewStage = 'unreviewed';
const motionToggle = document.querySelector('#motion-toggle');
gsap.registerPlugin(ScrollTrigger);

function setupAnimations(){
 animationContext?.revert();
 document.documentElement.classList.toggle('motion-paused',paused);
 motionToggle.textContent=paused?'Enable animations':'Pause animations';
 motionToggle.setAttribute('aria-pressed',String(paused));
 if(paused)return;
 animationContext=gsap.context(()=>{
  gsap.timeline({defaults:{ease:'power3.out'}}).from('.headline-line',{y:45,opacity:0,duration:1.1,stagger:.14}).from('.hero-in',{y:18,opacity:0,duration:.75,stagger:.1},.2).from('.product-shell',{y:65,opacity:0,duration:1.1},.45).from('.voice-accent',{opacity:0,duration:1.4},.4);
  gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:30,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
  const mm=gsap.matchMedia();
  mm.add('(min-width: 1000px)',()=>{
   ScrollTrigger.create({trigger:'.workflow-heading',start:'top 150px',endTrigger:'.workflow-steps',end:'bottom 600px',pin:true,pinSpacing:false});
   gsap.fromTo('.workflow-progress span',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:'.workflow-steps',start:'top 60%',end:'bottom 70%',scrub:.6}});
  });
  gsap.utils.toArray('.workflow-step').forEach(el=>gsap.from(el,{opacity:.25,y:25,duration:.7,scrollTrigger:{trigger:el,start:'top 85%',end:'top 48%',scrub:.5}}));
  gsap.fromTo('.vision-statement',{opacity:.35},{opacity:1,ease:'none',scrollTrigger:{trigger:'.vision-statement',start:'top 90%',end:'center 60%',scrub:.7}});
  return ()=>mm.revert();
 },document.querySelector('#app'));
}
setupAnimations();
motionToggle.addEventListener('click',()=>{paused=!paused;stopDemo();setupAnimations();});
motionPreference.addEventListener('change',e=>{paused=e.matches;stopDemo();setupAnimations();});
document.fonts.ready.then(()=>ScrollTrigger.refresh());

const stopHover = hover('.button',element=>{
 if(paused)return;
 animate(element,{y:-2},{duration:.2,ease:'easeOut'});
 return ()=>animate(element,{y:0},{duration:.2,ease:'easeOut'});
});

function stopDemo(){demoTimeline?.kill();demoRunning=false;gsap.set('.waveform span',{clearProps:'transform'});document.querySelector('#play-label').textContent='Play visual demo';document.querySelector('#play-sample').setAttribute('aria-label','Play visual dictation demo');document.querySelector('#audio-time').textContent='00:12';}
document.querySelector('#play-sample').addEventListener('click',()=>{
 if(demoRunning){stopDemo();return;}
 demoRunning=true;
 document.querySelector('#play-label').textContent='Visualizing sample…';
 document.querySelector('#play-sample').setAttribute('aria-label','Stop visual dictation demo');
 if(paused){document.querySelector('#play-label').textContent='Sample transcript shown below';demoRunning=false;return;}
 demoTimeline=gsap.timeline({onComplete:stopDemo});
 demoTimeline.to('.waveform span',{scaleY:()=>.3+Math.random()*.8,duration:.3,stagger:{each:.015,repeat:5,yoyo:true},ease:'sine.inOut'});
});

const reviewButton=document.querySelector('#review-button');
const reviewStatus=document.querySelector('#review-status');
const fields=[...document.querySelectorAll('.document-panel input')];
function setReview(label){reviewButton.textContent=label;}
fields.forEach(input=>input.addEventListener('input',()=>{reviewStage='unreviewed';setReview('Review sample →');reviewStatus.textContent='Sample edited. Review before confirming.';document.querySelector('.document-panel').classList.remove('verified');}));
reviewButton.addEventListener('click',()=>{
 if(fields.some(f=>!f.value.trim())){reviewStatus.textContent='Complete every sample field before reviewing.';fields.find(f=>!f.value.trim()).focus();return;}
 if(reviewStage==='unreviewed'){reviewStage='reviewing';reviewStatus.textContent='Check each field against the sample transcript.';setReview('Confirm review ✓');fields[0].focus();}
 else if(reviewStage==='reviewing'){reviewStage='verified';reviewStatus.textContent='Sample verified. No clinical document is created.';setReview('Reset sample ↺');document.querySelector('.document-panel').classList.add('verified');}
 else{fields.forEach(f=>f.value=f.defaultValue);reviewStage='unreviewed';reviewStatus.textContent='Every field is yours to edit.';setReview('Review sample →');document.querySelector('.document-panel').classList.remove('verified');}
});
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>ScrollTrigger.refresh()));
document.querySelector('#partnership-button').addEventListener('click',e=>{const button=e.currentTarget;const panel=document.querySelector('#partnership-info');const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));panel.hidden=!open;if(open&&!paused)animate(panel,{opacity:[0,1],y:[10,0]},{duration:.3});ScrollTrigger.refresh();});
window.addEventListener('pagehide',()=>{stopHover();stopDemo();animationContext?.revert();});
