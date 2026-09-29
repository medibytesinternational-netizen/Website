import { useEffect, useState } from 'react';
import { useInView } from 'motion/react';

const reducedQuery = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)');

/** True unless the visitor prefers reduced motion or used the footer's "Pause animations". */
export function useMotionOK() {
  const [ok, setOk] = useState(() => {
    const mq = reducedQuery();
    return !!mq && !mq.matches && !document.documentElement.classList.contains('motion-paused');
  });

  useEffect(() => {
    const mq = reducedQuery();
    if (!mq) return;
    let paused = document.documentElement.classList.contains('motion-paused');
    const update = () => setOk(!mq.matches && !paused);
    const onMotion = (e) => {
      paused = !!e.detail?.paused;
      update();
    };
    mq.addEventListener?.('change', update);
    window.addEventListener('medibytes:motion', onMotion);
    update();
    return () => {
      mq.removeEventListener?.('change', update);
      window.removeEventListener('medibytes:motion', onMotion);
    };
  }, []);

  return ok;
}

/**
 * Steps a visual through `steps` states while it is on screen, holding on the
 * last state before starting over. With motion off it sits on the final,
 * fully-built state so nothing is hidden from the reader.
 */
export function useLoop(ref, steps, { interval = 850, hold = 2800, resetKey } = {}) {
  const ok = useMotionOK();
  const inView = useInView(ref, { amount: 0.35 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [resetKey]);

  useEffect(() => {
    if (!ok || !inView) return;
    const last = step >= steps - 1;
    const t = setTimeout(() => setStep(last ? 0 : step + 1), last ? hold : interval);
    return () => clearTimeout(t);
  }, [ok, inView, step, steps, interval, hold]);

  return ok ? Math.min(step, steps - 1) : steps - 1;
}

/** Class for an element that appears once the loop reaches step `n`. */
export const at = (step, n, extra = '') => `ft-in${step >= n ? ' is-on' : ''}${extra ? ` ${extra}` : ''}`;
