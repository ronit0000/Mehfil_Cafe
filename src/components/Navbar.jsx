// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
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
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const focusable = drawerRef.current.querySelectorAll('button, a[href]');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      desktop.removeEventListener('change', closeOnDesktop);
      window.removeEventListener('keydown', onKey);
      if (!desktop.matches) toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header
        className={`navbar-enter fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow] duration-500 ${
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
              className="hidden lg:block btn-primary text-xs py-3 px-6"
              style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
            >
              Book a Table
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              ref={toggleRef}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className={`block h-0.5 bg-mehfil-cream transition-all duration-300 ${open ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`block h-0.5 bg-mehfil-cream transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-0.5 bg-mehfil-cream transition-all duration-300 ${open ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
            </button>
          </div>
        </div>
      </header>

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
              ref={drawerRef}
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
                    onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="relative overflow-hidden mt-6 py-3.5 px-5 rounded-2xl border border-mehfil-gold/40 flex items-center justify-center gap-2.5 shadow-card group transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(232,120,42,0.12) 100%)',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-mehfil-gold animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-mehfil-cream group-hover:text-mehfil-gold transition-colors">
                  Reserve a Table
                </span>
                <svg className="w-4 h-4 text-mehfil-gold transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              {/* Mobile quick action buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href="tel:+917789922251"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-mehfil-cream/80 hover:text-mehfil-gold transition-colors active:scale-95"
                >
                  <svg className="w-4 h-4 text-mehfil-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href="https://wa.me/917789922251?text=Hi%20Mehfil%20Rooftop%20Cafe%2C%20I%20would%20like%20to%20reserve%20a%20table"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-green-500/10 border border-green-500/25 text-xs font-medium text-green-400 hover:text-green-300 transition-colors active:scale-95"
                >
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
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
