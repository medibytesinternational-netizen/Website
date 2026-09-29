import { useLayoutEffect, useRef, useCallback } from 'react';

/**
 * ScrollStack (React Bits) — ported to JSX and adapted for this site:
 * - Window-scroll mode is driven by a native passive scroll listener instead
 *   of Lenis, so the page keeps its normal scroll and GSAP ScrollTriggers
 *   stay in sync (Lenis would hijack window scrolling).
 * - When motion is paused / reduced-motion is preferred, cards render static
 *   with no transforms applied.
 */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const motionAllowed = () => {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('motion-paused'))
    return false;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return true;
};

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  // scaleDuration / scaleEndPosition are part of the React Bits API; scale here
  // is driven by the next card's approach, so neither is needed.
  void scaleDuration;
  void scaleEndPosition;
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  // Untransformed layout offsets, measured once per layout change. Reading
  // positions every frame via getBoundingClientRect would include the
  // translateY we just applied, feeding back into the math and causing jitter.
  const offsetsRef = useRef({ tops: [], heights: [], hold: 0 });
  const rafRef = useRef(0);
  // Gap between cards = scroll distance each card stays fully visible before
  // the next one starts covering it. Numbers are px; strings are CSS lengths.
  const gap = typeof itemDistance === 'number' ? `${itemDistance}px` : itemDistance;

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : 0,
      scrollContainer: scroller
    };
  }, [useWindowScroll]);

  // offsetTop ignores CSS transforms, so this is the card's natural position.
  const getElementOffset = useCallback(
    element => {
      if (!useWindowScroll) return element.offsetTop;
      let top = 0;
      let el = element;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent;
      }
      return top;
    },
    [useWindowScroll]
  );

  const measure = useCallback(() => {
    const cards = cardsRef.current;
    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end');
    offsetsRef.current = {
      tops: cards.map(card => (card ? getElementOffset(card) : 0)),
      heights: cards.map(card => (card ? card.offsetHeight : 0)),
      hold: endElement ? endElement.offsetHeight : 0
    };
  }, [getElementOffset]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    if (!motionAllowed()) {
      cardsRef.current.forEach(card => {
        if (!card) return;
        card.style.transform = '';
        card.style.filter = '';
      });
      lastTransformsRef.current.clear();
      return;
    }

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    const { tops: offsets, heights, hold } = offsetsRef.current;
    const count = cardsRef.current.length;
    const pinStartOf = j => offsets[j] - stackPositionPx - itemStackDistance * j;
    // Scroll position where card j+1 reaches the bottom edge of pinned card j.
    // Between pinStartOf(j) and this point card j is fully visible (the
    // itemDistance gap is that reading pause).
    const coverStartOf = j => offsets[j + 1] - stackPositionPx - itemStackDistance * j - heights[j];

    // Release every card together once the last card has settled and had its
    // own reading pause (the end spacer), so the stack leaves as one unit.
    const pinEnd = pinStartOf(count - 1) + hold;

    let topCardIndex = 0;
    for (let j = 0; j < count; j++) {
      if (scrollTop >= pinStartOf(j)) topCardIndex = j;
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const pinStart = pinStartOf(i);
      const isLast = i === count - 1;

      // A card shrinks while the next card slides over it, and freezes once
      // the stack releases so it doesn't keep changing off-screen.
      const scaleProgress = isLast
        ? 0
        : calculateProgress(
            Math.min(scrollTop, pinEnd),
            coverStartOf(i),
            Math.max(pinStartOf(i + 1), coverStartOf(i) + 1)
          );
      const targetScale = Math.min(1, baseScale + i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      const blur = blurAmount && i < topCardIndex ? (topCardIndex - i) * blurAmount : 0;

      const pinnedScroll = Math.min(Math.max(scrollTop, pinStart), pinEnd);
      const translateY = Math.max(0, pinnedScroll - pinStart);

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

    });

    const isComplete = scrollTop >= pinEnd;
    if (isComplete && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (!isComplete && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [
    itemStackDistance,
    stackPosition,
    itemScale,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData
  ]);

  // Coalesce scroll events into one update per frame.
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const handleLayoutChange = useCallback(() => {
    measure();
    handleScroll();
  }, [measure, handleScroll]);

  const setupScroll = useCallback(() => {
    const target = useWindowScroll ? window : scrollerRef.current;
    if (!target) return () => {};
    target.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleLayoutChange);
    // Images/fonts loading above the stack shift its position; re-measure.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleLayoutChange) : null;
    ro?.observe(document.body);
    return () => {
      target.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleLayoutChange);
      ro?.disconnect();
    };
  }, [handleScroll, handleLayoutChange, useWindowScroll]);

  useLayoutEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      card.style.marginBottom = i < cards.length - 1 ? gap : '';
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });
    transformsCache.clear();

    measure();
    const teardownScroll = setupScroll();
    updateCardTransforms();

    return () => {
      teardownScroll?.();
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
    };
  }, [gap, useWindowScroll, measure, setupScroll, updateCardTransforms]);

  if (useWindowScroll) {
    return (
      <div className={`relative w-full ${className}`.trim()} ref={scrollerRef}>
        <div className="scroll-stack-inner">
          {children}
          {/* Spacer so the last pin can release cleanly */}
          <div className="scroll-stack-end w-full" style={{ height: gap }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full" style={{ height: gap }} />
      </div>
    </div>
  );
};

export default ScrollStack;
