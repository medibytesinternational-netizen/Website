import { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/Layout';
import Home from './pages/Home';

// Home ships in the main bundle because it is the entry point for almost every
// visit; the rest are fetched on navigation so the first paint stays small.
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Hospitals = lazy(() => import('./pages/Hospitals'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Demo = lazy(() => import('./pages/Demo'));
const Founders = lazy(() => import('./pages/Founders'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const tweenRef = useRef(null);
  const firstRender = useRef(true);

  // Take full control of restoration: the browser must never drop the user
  // back at the previous scroll position on route changes.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  // Instant jump — bypasses the CSS smooth-scroll so the jump can't stall
  // midway when lazy chunks/images land and shift the layout.
  const jumpToTop = () => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  };

  useEffect(() => {
    if (hash) {
      // The target may not exist yet: route components are lazy, so a direct
      // hit on /page#anchor renders the fallback first. Keep looking for a
      // few frames instead of giving up after one fixed delay.
      // scroll-margin-top in CSS handles the fixed-header offset.
      let frame = 0;
      let raf = 0;
      const tryScroll = () => {
        let el = null;
        try {
          const id = decodeURIComponent(hash.slice(1));
          el = document.getElementById(id) || document.querySelector(hash);
        } catch {
          el = null;
        }
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          ScrollTrigger.refresh();
          return;
        }
        // ~2s at 60fps, then give up and show the top of the page.
        if (frame++ < 120) {
          raf = requestAnimationFrame(tryScroll);
          return;
        }
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      };
      raf = requestAnimationFrame(tryScroll);
      return () => cancelAnimationFrame(raf);
    }
    // No hash: hard reset to top. Repeated because lazy routes first render
    // a short Suspense fallback and then swap in the full (tall) page —
    // without the repeats the view can end up mid/bottom of the new page.
    jumpToTop();
    const raf = requestAnimationFrame(jumpToTop);
    const t = setTimeout(jumpToTop, 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname, hash]);

  // Soft page transition on route change only — skipped on first load
  // so it doesn't double up with the hero intro animation.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (document.documentElement.classList.contains('motion-paused')) return;
    tweenRef.current?.kill();
    tweenRef.current = gsap.fromTo(
      '#root main',
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: () => ScrollTrigger.refresh(),
      }
    );
    return () => tweenRef.current?.kill();
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <main
      id="main"
      className="container"
      style={{ paddingTop: 150, paddingBottom: 80, textAlign: 'center' }}
    >
      <h1>Page not found</h1>
      <p>The page you asked for does not exist.</p>
      <Link className="button primary" to="/" style={{ marginTop: 24 }}>
        Back to home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={<main id="main" style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/founders" element={<Founders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
