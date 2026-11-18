// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollY } from '../hooks/useScrollY';

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Menu',        href: '#menu' },
  { label: 'Gallery',     href: '#gallery' },
  { label: 'Reservation', href: '#reservation' },
  { label: 'Contact',     href: '#contact' },
];

export default function Navbar() {
  const scrollY   = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled  = scrollY > 80;

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow] duration-500 ${
          scrolled ? 'py-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]' : 'py-5'
        }`}
        style={{
          /*
           * 🔑 Always keep a dark base — never fully transparent.
           * This prevents the white compositing-layer flash when backdrop-filter
           * kicks in. We smoothly interpolate the alpha via CSS transition.
           */
          backgroundColor: scrolled
            ? 'rgba(10, 10, 10, 0.80)'
            : 'rgba(10, 10, 10, 0.08)',
          backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(212, 168, 67, 0.12)'
            : '1px solid transparent',
          transition:
            'background-color 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, border-color 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease',
          /* 🔑 Own GPU layer — no jank during backdrop-filter transitions */
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          isolation: 'isolate',
          willChange: 'background-color, backdrop-filter',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center gap-3 group"
            aria-label="Mehfil Rooftop Cafe & Restro – Home"
          >
            {/* Circle icon logo */}
            <div className="relative w-11 h-11 flex-shrink-0">
              <img
                src="/images/logo_circle.jpg"
                alt="Mehfil mandala icon"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-full drop-shadow-[0_0_10px_rgba(212,168,67,0.55)] transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Full text logo (Mehfil script + ROOFTOP CAFE & RESTRO) */}
            <div className="relative h-16 w-64 flex-shrink-0 overflow-visible">
              <img
                src="/images/logo_text.png"
                alt="Mehfil Rooftop Cafe & Restro"
                className="h-full w-auto object-contain object-left drop-shadow-[0_0_6px_rgba(212,168,67,0.3)] transition-opacity duration-300 group-hover:opacity-90"
                style={{ maxWidth: '260px' }}
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="relative px-4 py-2 text-sm font-medium text-mehfil-cream/70 hover:text-mehfil-gold transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-mehfil-gold transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#reservation"
              onClick={(e) => { e.preventDefault(); scrollTo('#reservation'); }}
              className="hidden lg:block btn-primary text-xs py-3 px-6"
              style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
            >
              Book a Table
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus-visible:outline-none"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className={`block h-0.5 bg-mehfil-cream transition-all duration-300 ${open ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`block h-0.5 bg-mehfil-cream transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-0.5 bg-mehfil-cream transition-all duration-300 ${open ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-light lg:hidden flex flex-col pt-20 pb-10 px-8"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-mehfil-cream/60 hover:text-mehfil-gold transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                    className="py-4 text-lg font-medium text-mehfil-cream/70 hover:text-mehfil-gold transition-colors duration-300 border-b border-white/5"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="#reservation"
                onClick={(e) => { e.preventDefault(); scrollTo('#reservation'); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="btn-primary text-center mt-10"
              >
                Book a Table
              </motion.a>

              <div className="mt-auto text-center flex flex-col items-center gap-2">
                <img
                  src="/images/logo_circle.jpg"
                  alt="Mehfil"
                  className="w-14 h-14 object-cover rounded-full opacity-30"
                />
                <img
                  src="/images/logo_text.png"
                  alt="Mehfil Rooftop Cafe & Restro"
                  className="w-32 object-contain opacity-25"
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
