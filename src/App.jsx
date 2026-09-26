import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    if (hash) {
      // Let the route render first, then jump to the anchor.
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'auto' });
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  // Soft page transition on route change (container only — hero intro is separate).
  useEffect(() => {
    if (document.documentElement.classList.contains('motion-paused')) return;
    gsap.fromTo(
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
  }, [pathname]);

  return null;
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
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
