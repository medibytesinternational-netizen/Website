import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Activity, ArrowUpRight, ChevronDown, Menu } from 'lucide-react';
import { SOCIAL_URLS } from '../config/site';

export function Logo() {
  return (
    <>
      <span className="brand-symbol">
        <Activity aria-hidden="true" />
      </span>
      <span>
        Medi<span className="brand-weight">Bytes</span>
        <span className="brand-period">.</span>
      </span>
    </>
  );
}

const PRODUCT_LINKS = [
  ['OPD Intelligence', '/features/opd'],
  ['IPD Intelligence', '/features/ipd'],
  ['Clinical Intelligence', '/features/clinical'],
  ['Document Intelligence', '/features/documents'],
  ['Insurance Intelligence', '/features/insurance'],
];

const COMPANY_LINKS = [
  ['About us', '/about'],
  ["Founder's story", '/founders'],
  ['Contact us', '/contact'],
];

function Drop({ id, label, links, extra, openDrop, setOpenDrop, closeMobile }) {
  const open = openDrop === id;
  return (
    <details
      className="nav-drop"
      open={open}
      onToggle={(e) => {
        // Single-open: opening one closes the other.
        if (e.target.open) setOpenDrop(id);
        else if (openDrop === id) setOpenDrop(null);
      }}
    >
      <summary aria-expanded={open} aria-haspopup="true">
        {label} <ChevronDown aria-hidden="true" />
      </summary>
      <div className="nav-panel">
        {links.map(([text, to]) => (
          <NavLink
            key={text}
            to={to}
            onClick={closeMobile}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            {text}
          </NavLink>
        ))}
        {extra}
      </div>
    </details>
  );
}

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDrop(null);
  };

  // Close on route change.
  useEffect(() => {
    closeMobile();
  }, [location.pathname, location.hash]);

  // Escape / outside-click / resize handling.
  useEffect(() => {
    if (!mobileOpen && !openDrop) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeMobile();
        menuRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        closeMobile();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 700) setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen, openDrop]);

  const navLinkClass = ({ isActive }) => (isActive ? 'active' : undefined);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-wrap">
          <Link className="brand" to="/" aria-label="MediBytes home" onClick={closeMobile}>
            <Logo />
          </Link>
          <nav
            id="nav"
            aria-label="Main navigation"
            ref={navRef}
            className={mobileOpen ? 'open' : undefined}
          >
            <NavLink to="/" className={navLinkClass} end onClick={closeMobile}>
              Home
            </NavLink>
            <Drop
              id="products"
              label="Products"
              links={PRODUCT_LINKS}
              openDrop={openDrop}
              setOpenDrop={setOpenDrop}
              closeMobile={closeMobile}
              extra={
                <>
                  <span className="nav-sep">Overview</span>
                  <NavLink to="/features" end className={navLinkClass} onClick={closeMobile}>
                    All features
                  </NavLink>
                  <NavLink to="/how-it-works" className={navLinkClass} onClick={closeMobile}>
                    How it works
                  </NavLink>
                  <NavLink to="/hospitals" className={navLinkClass} onClick={closeMobile}>
                    For hospitals
                  </NavLink>
                </>
              }
            />
            <Drop
              id="company"
              label="Company"
              links={COMPANY_LINKS}
              openDrop={openDrop}
              setOpenDrop={setOpenDrop}
              closeMobile={closeMobile}
            />
            <Link
              className="button nav-cta nav-cta-menu"
              to="/demo"
              onClick={closeMobile}
            >
              Book a walkthrough <ArrowUpRight aria-hidden="true" />
            </Link>
          </nav>
          <Link className="button nav-cta" to="/demo" onClick={closeMobile}>
            Book a walkthrough <ArrowUpRight aria-hidden="true" />
          </Link>
          <button
            ref={menuRef}
            className="menu-toggle"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="nav"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
    </>
  );
}

import { Suspense, lazy } from 'react';

const FlutedGlass = lazy(() =>
  import('@paper-design/shaders-react').then((m) => ({ default: m.FlutedGlass }))
);

function FooterShader() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [allowMotion, setAllowMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !document.documentElement.classList.contains('motion-paused')
  );

  useEffect(() => {
    const el = ref.current;
    const onMotion = (e) => setAllowMotion(!e.detail?.paused);
    window.addEventListener('medibytes:motion', onMotion);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPref = (e) => setAllowMotion(!e.matches);
    mq.addEventListener?.('change', onPref);
    let io = null;
    if (el && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io?.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      io.observe(el);
    } else {
      setVisible(true);
    }
    return () => {
      window.removeEventListener('medibytes:motion', onMotion);
      mq.removeEventListener?.('change', onPref);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      {visible && allowMotion && (
        <Suspense fallback={null}>
          <FlutedGlass
            size={0.89}
            shape="lines"
            angle={0}
            distortionShape="prism"
            distortion={0.5}
            shift={0}
            blur={0}
            edges={0.25}
            stretch={0}
            scale={1.11}
            fit="cover"
            highlights={0.1}
            shadows={0.2}
            grainMixer={0.1}
            grainOverlay={0.1}
            colorBack="#00000000"
            colorHighlight="#FFFFFF"
            colorShadow="#000000"
            className="w-full h-full bg-transparent"
          />
        </Suspense>
      )}
    </div>
  );
}

const FOOT_LINKS = [
  {
    title: 'Product',
    links: [
      ['Features', '/features'],
      ['How it works', '/how-it-works'],
      ['For hospitals', '/hospitals'],
      ['Book a walkthrough', '/demo'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About us', '/about'],
      ["Founder's story", '/founders'],
      ['Contact us', '/contact'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['FAQs', '/demo#faqs'],
      ['Technology & deployment', '/hospitals#deployment'],
      ['Workflow', '/how-it-works#workflow'],
      ['Contact', '/contact'],
    ],
  },
];

export function Footer() {
  return (
    <footer id="footer" className="w-full bg-[#E6F2FF] relative overflow-hidden antialiased">
      {/* Giant outline wordmark */}
      <div className="relative w-full flex justify-center items-end pt-24 md:pt-32 pb-0 z-0">
        <span
          aria-hidden="true"
          className="text-[110px] sm:text-[150px] md:text-[200px] font-semibold text-transparent leading-[0.75] select-none -mb-4 md:-mb-6 opacity-60"
          style={{ WebkitTextStroke: '1px rgba(15,42,77,0.45)' }}
        >
          MediBytes
        </span>
      </div>

      {/* Blue panel */}
      <div className="relative w-full bg-[#2F5AA8] z-10 min-h-[400px]">
        <FooterShader />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          <div className="flex flex-col justify-between max-w-sm w-full">
            <div className="flex flex-col">
              <Link
                className="brand mb-2"
                to="/"
                aria-label="MediBytes home"
                style={{ color: '#fff' }}
              >
                <Logo />
              </Link>
              <h2 className="text-white text-xl md:text-[22px] font-medium leading-tight">
                Less paperwork.
                <br />
                More patient care.
              </h2>
            </div>

            <div className="flex flex-col gap-3 mt-12 lg:mt-auto pt-8">
<div className="social-links flex items-center gap-6" aria-label="MediBytes on social media">
              <a href={SOCIAL_URLS.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                <svg width="18" height="20" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12.673 20.703L18.427 28.375H26.885L17.39 15.714L25.29 6.625H22.088L15.905 13.737L10.573 6.625H2.115L11.189 18.727L2.803 28.375H6.005L12.673 20.703ZM19.635 25.958L6.948 9.042H9.364L22.052 25.958H19.635Z" fill="#FFFFFF" />
                </svg>
              </a>
              <a href={SOCIAL_URLS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg width="16" height="20" viewBox="46 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M68.75 5.75C69.413 5.75 70.049 6.013 70.518 6.482C70.987 6.951 71.25 7.587 71.25 8.25V25.75C71.25 26.413 70.987 27.049 70.518 27.518C70.049 27.987 69.413 28.25 68.75 28.25H51.25C50.587 28.25 49.951 27.987 49.482 27.518C49.013 27.049 48.75 26.413 48.75 25.75V8.25C48.75 7.587 49.013 6.951 49.482 6.482C49.951 6.013 50.587 5.75 51.25 5.75H68.75ZM68.125 25.125V18.5C68.125 17.419 67.696 16.383 66.931 15.618C66.167 14.854 65.131 14.425 64.05 14.425C62.987 14.425 61.75 15.075 61.15 16.05V14.662H57.663V25.125H61.15V18.962C61.15 18 61.925 17.212 62.888 17.212C63.352 17.212 63.797 17.397 64.125 17.725C64.453 18.053 64.638 18.498 64.638 18.962V25.125H68.125ZM53.6 12.7C54.157 12.7 54.691 12.479 55.085 12.085C55.479 11.691 55.7 11.157 55.7 10.6C55.7 9.438 54.763 8.488 53.6 8.488C53.04 8.488 52.502 8.71 52.106 9.106C51.71 9.502 51.487 10.04 51.487 10.6C51.487 11.762 52.438 12.7 53.6 12.7ZM55.337 25.125V14.662H51.875V25.125H55.337Z" fill="#FFFFFF" />
                </svg>
              </a>
              <a href={SOCIAL_URLS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="93 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M124.167 17C124.167 9.18 117.82 2.833 110 2.833C102.18 2.833 95.833 9.18 95.833 17C95.833 23.857 100.707 29.566 107.167 30.883V21.25H104.333V17H107.167V13.458C107.167 10.724 109.391 8.5 112.125 8.5H115.667V12.75H112.833C112.054 12.75 111.417 13.387 111.417 14.167V17H115.667V21.25H111.417V31.096C118.571 30.387 124.167 24.352 124.167 17Z" fill="#FFFFFF" />
                </svg>
              </a>
              <a href={SOCIAL_URLS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="16" height="20" viewBox="191 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M200.1 6.333H209.9C213.633 6.333 216.667 9.367 216.667 13.1V22.9C216.667 24.695 215.954 26.416 214.685 27.685C213.416 28.954 211.695 29.667 209.9 29.667H200.1C196.367 29.667 193.333 26.633 193.333 22.9V13.1C193.333 11.305 194.046 9.584 195.315 8.315C196.584 7.046 198.305 6.333 200.1 6.333ZM205 12.167C206.547 12.167 208.031 12.781 209.125 13.875C210.219 14.969 210.833 16.453 210.833 18C210.833 19.547 210.219 21.031 209.125 22.125C208.031 23.219 206.547 23.833 205 23.833C203.453 23.833 201.969 23.219 200.875 22.125C199.781 21.031 199.167 19.547 199.167 18C199.167 16.453 199.781 14.969 200.875 13.875C201.969 12.781 203.453 12.167 205 12.167Z" fill="#FFFFFF" />
                </svg>
              </a>
              <a href={SOCIAL_URLS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg width="19" height="20" viewBox="281 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M311.209 8.588C310.88 7.356 309.909 6.385 308.677 6.055C306.443 5.457 297.484 5.457 297.484 5.457C297.484 5.457 288.525 5.457 286.291 6.055C285.059 6.385 284.088 7.356 283.758 8.588C283.159 10.822 283.159 15.484 283.159 15.484C283.159 15.484 283.159 20.145 283.758 22.379C284.088 23.612 285.059 24.583 286.291 24.912C288.525 25.511 297.484 25.511 297.484 25.511C297.484 25.511 306.443 25.511 308.677 24.912C309.909 24.583 310.88 23.612 311.209 22.379C311.808 20.145 311.808 15.484 311.808 15.484C311.808 15.484 311.808 10.822 311.209 8.588ZM294.619 19.781V11.186L302.062 15.484L294.619 19.781Z" fill="#FFFFFF" />
                </svg>
              </a>
            </div>
              <p className="font-light text-white text-xs md:text-[13px] mt-1">
                © {new Date().getFullYear()} MediBytes, All rights reserved
              </p>
              <p className="font-light text-white text-xs">
                Product in development · The interactive preview is illustrative
              </p>
              <button
                id="motion-toggle"
                aria-pressed="false"
                className="text-white/80 text-xs underline underline-offset-4 text-left w-fit"
              >
                Pause animations
              </button>
            </div>
          </div>

          <div className="flex gap-12 md:gap-20 flex-wrap lg:flex-nowrap">
            {FOOT_LINKS.map((section) => (
              <div key={section.title} className="flex flex-col gap-5">
                <h3 className="text-white font-semibold text-lg md:text-xl">{section.title}</h3>
                <ul className="flex flex-col gap-3 md:gap-4">
                  {section.links.map(([name, to]) => (
                    <li key={name}>
                      <Link
                        to={to}
                        className="text-white/70 hover:text-white transition-colors text-sm md:text-[15px] font-medium"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
