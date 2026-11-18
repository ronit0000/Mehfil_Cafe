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
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0">
              <img
                src="/images/logo_circle.jpg"
                alt="Mehfil mandala icon"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-full drop-shadow-[0_0_10px_rgba(212,168,67,0.55)] transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Full text logo (Mehfil script + ROOFTOP CAFE & RESTRO) */}
            <div className="relative h-11 sm:h-14 md:h-16 w-40 sm:w-52 md:w-64 flex-shrink-0 overflow-visible">
              <img
                src="/images/logo_text.png"
                alt="Mehfil Rooftop Cafe & Restro"
                className="h-full w-auto object-contain object-left drop-shadow-[0_0_6px_rgba(212,168,67,0.3)] transition-opacity duration-300 group-hover:opacity-90"
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
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs sm:w-80 glass-light lg:hidden flex flex-col pt-16 pb-8 px-6 overflow-y-auto no-scrollbar shadow-2xl"
              style={{ height: '100dvh' }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo_circle.jpg"
                    alt="Mehfil"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-serif text-base text-mehfil-gold font-semibold tracking-wide">Mehfil</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-mehfil-cream/70 hover:text-mehfil-gold hover:bg-white/5 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-1 mt-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="py-3.5 text-base font-medium text-mehfil-cream/80 hover:text-mehfil-gold active:text-mehfil-gold transition-colors duration-200 border-b border-white/5 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <svg className="w-4 h-4 text-mehfil-gold/40 group-hover:text-mehfil-gold group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="#reservation"
                onClick={(e) => { e.preventDefault(); scrollTo('#reservation'); }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="btn-primary text-center mt-6 py-3.5 text-xs font-semibold tracking-wider"
              >
                Book a Table
              </motion.a>

              {/* Mobile quick action buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-mehfil-cream/80 hover:text-mehfil-gold transition-colors"
                >
                  <svg className="w-4 h-4 text-mehfil-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href="https://www.instagram.com/_mehfil_berhampur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-mehfil-cream/80 hover:text-mehfil-gold transition-colors"
                >
                  <svg className="w-4 h-4 text-mehfil-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
              </div>

              <div className="mt-auto pt-6 text-center flex flex-col items-center gap-1.5 opacity-60">
                <p className="text-[10px] uppercase tracking-widest text-mehfil-gold">Open Daily</p>
                <p className="text-xs text-mehfil-cream/70 font-medium">11:00 AM – 11:00 PM</p>
                <p className="text-[11px] text-mehfil-cream/40">Near NH Side, Berhampur</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
