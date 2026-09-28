import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Hospitals from './pages/Hospitals';
import Vision from './pages/Vision';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Founders from './pages/Founders';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const tweenRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (hash) {
      // Let the route render first, then jump to the anchor.
      // scroll-margin-top in CSS handles the fixed-header offset.
      const t = setTimeout(() => {
        try {
          const id = decodeURIComponent(hash.slice(1));
          const el = document.getElementById(id) || document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
          else window.scrollTo(0, 0);
        } catch {
          window.scrollTo(0, 0);
        }
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
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
    <main id="main" className="container" style={{ paddingTop: 150, paddingBottom: 80, textAlign: 'center' }}>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/founders" element={<Founders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
