import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, hover } from 'motion';

gsap.registerPlugin(ScrollTrigger);

const motionPreference =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

let paused = motionPreference?.matches ?? false;
export const isPaused = () => paused;

const GRID_SELECTORS = '.teaser-grid,.bento-grid,.deployment-grid,.cta-grid,.feature-grid';
const inGrid = (el) =>
  el.parentElement && typeof el.parentElement.matches === 'function'
    ? el.parentElement.matches(GRID_SELECTORS)
    : false;

/** Site-wide animation system: hero intro, scroll reveals, grid staggers,
 *  hero parallax, count-ups, progress bar, hovers, FAQ/partnership. */
export function useSiteMotion({ pinWorkflow = false, scrubVision = false, heroIntro = true } = {}) {
  const ctxRef = useRef(null);
  const stopHoverRef = useRef(() => {});
  const stopCardHoverRef = useRef(() => {});

  useEffect(() => {
    const motionToggle = document.querySelector('#motion-toggle');
    const applyPausedLabel = () => {
      if (!motionToggle) return;
      motionToggle.textContent = paused ? 'Enable animations' : 'Pause animations';
      motionToggle.setAttribute('aria-pressed', String(paused));
    };

    const setupAnimations = () => {
      ctxRef.current?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.documentElement.classList.toggle('motion-paused', paused);
      applyPausedLabel();

      // Scroll progress bar — user-driven, always on.
      let bar = document.querySelector('.scroll-progress');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.prepend(bar);
      }
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } }
      );

      if (paused) {
        // Freeze counters at final values when motion is off.
        document.querySelectorAll('[data-count]').forEach((el) => {
          el.textContent = el.getAttribute('data-count');
        });
        return;
      }

      ctxRef.current = gsap.context(() => {
        // 1. Hero entrance: masked headline lines, copy, CTAs, product card.
        if (heroIntro && document.querySelector('.headline-line')) {
          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from('.headline-line', { y: 45, opacity: 0, duration: 1.1, stagger: 0.14 })
            .from('.hero-in', { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, 0.2)
            .from('.product-shell', { y: 65, opacity: 0, duration: 1.1 }, 0.45);
        }

        // 2. Hero parallax: copy drifts up, sky video eases down on scroll.
        if (document.querySelector('.hero-full')) {
          gsap.to('.hero-full .hero-inner', {
            y: -70,
            ease: 'none',
            scrollTrigger: { trigger: '.hero-full', start: 'top top', end: 'bottom top', scrub: true },
          });
          gsap.to('.hero-sky-video', {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: '.hero-full', start: 'top top', end: 'bottom top', scrub: true },
          });
        }

        // 3. Generic reveals (everything NOT handled as a grid child).
        gsap.utils
          .toArray('.reveal')
          .filter((el) => !inGrid(el))
          .forEach((el) =>
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 94%', once: true },
            })
          );

        // 4. Grid staggers: cards cascade as their grid enters.
        gsap.utils.toArray(GRID_SELECTORS).forEach((grid) => {
          const kids = grid.querySelectorAll(':scope > *');
          if (!kids.length) return;
          gsap.from(kids, {
            y: 36,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.09,
            scrollTrigger: { trigger: grid, start: 'top 88%', once: true },
          });
        });

        // 4b. Checklist rows: slide in from the left, one after another.
        gsap.utils.toArray('.check-list').forEach((list) => {
          gsap.from(list.querySelectorAll(':scope > *'), {
            x: -32,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: { trigger: list, start: 'top 88%', once: true },
          });
        });

        // 5. Count-up stats.
        document.querySelectorAll('[data-count]').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-count'));
          if (Number.isNaN(target)) return;
          const obj = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () =>
              gsap.to(obj, {
                v: target,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = String(Math.round(obj.v));
                },
              }),
          });
        });

        if (pinWorkflow && document.querySelector('.workflow-heading')) {
          const mm = gsap.matchMedia();
          mm.add('(min-width: 1000px)', () => {
            ScrollTrigger.create({
              trigger: '.workflow-heading',
              start: 'top 150px',
              endTrigger: '.workflow-steps',
              end: 'bottom 600px',
              pin: true,
              pinSpacing: false,
            });
            gsap.fromTo(
              '.workflow-progress span',
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.workflow-steps',
                  start: 'top 60%',
                  end: 'bottom 70%',
                  scrub: 0.6,
                },
              }
            );
          });
          gsap.utils.toArray('.workflow-step').forEach((el) =>
            gsap.from(el, {
              opacity: 0.25,
              y: 25,
              duration: 0.7,
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 48%', scrub: 0.5 },
            })
          );
        }
        if (scrubVision && document.querySelector('.vision-statement')) {
          gsap.fromTo(
            '.vision-statement',
            { opacity: 0.35 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.vision-statement',
                start: 'top 90%',
                end: 'center 60%',
                scrub: 0.7,
              },
            }
          );
        }
      }, document.querySelector('#root'));
    };

    setupAnimations();

    const onToggle = () => {
      paused = !paused;
      setupAnimations();
      window.dispatchEvent(new CustomEvent('medibytes:motion', { detail: { paused } }));
    };
    const onPrefChange = (e) => {
      paused = e.matches;
      setupAnimations();
    };

    motionToggle?.addEventListener('click', onToggle);
    motionPreference?.addEventListener('change', onPrefChange);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    stopHoverRef.current = hover('.button', (element) => {
      if (paused) return;
      animate(element, { y: -2 }, { duration: 0.2, ease: 'easeOut' });
      return () => animate(element, { y: 0 }, { duration: 0.2, ease: 'easeOut' });
    });
    stopCardHoverRef.current = hover(
      '.teaser-card,.cta-card,.deployment-card,.feature-card',
      (element) => {
        if (paused) return;
        animate(element, { y: -5 }, { duration: 0.25, ease: 'easeOut' });
        return () => animate(element, { y: 0 }, { duration: 0.25, ease: 'easeOut' });
      }
    );

    // FAQ + partnership panel (vanilla behaviour, React DOM)
    const refresh = () => ScrollTrigger.refresh();
    const details = [...document.querySelectorAll('details')];
    details.forEach((d) => d.addEventListener('toggle', refresh));
    const partnershipButton = document.querySelector('#partnership-button');
    const onPartner = (e) => {
      const button = e.currentTarget;
      const panel = document.querySelector('#partnership-info');
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      if (panel) panel.hidden = !open;
      if (open && !paused) animate(panel, { opacity: [0, 1], y: [10, 0] }, { duration: 0.3 });
      ScrollTrigger.refresh();
    };
    partnershipButton?.addEventListener('click', onPartner);

    return () => {
      motionToggle?.removeEventListener('click', onToggle);
      motionPreference?.removeEventListener('change', onPrefChange);
      details.forEach((d) => d.removeEventListener('toggle', refresh));
      partnershipButton?.removeEventListener('click', onPartner);
      stopHoverRef.current?.();
      stopCardHoverRef.current?.();
      ctxRef.current?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pinWorkflow, scrubVision, heroIntro]);
}
