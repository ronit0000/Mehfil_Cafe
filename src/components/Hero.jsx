// src/components/Hero.jsx
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

const slides = [
  { src: '/images/hero1.jpg', alt: 'Mehfil neon sign on green wall at night' },
  { src: '/images/hero2.jpg', alt: 'Rooftop dining area with umbrellas at night' },
  { src: '/images/hero3.jpg', alt: 'Ambiance view of Mehfil rooftop' },
];

// Stagger variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [current, setCurrent]   = useState(0);
  const [parallax, setParallax] = useState(0);
  const heroRef = useRef(null);
  const ctaMagnetic = useMagneticEffect(0.4);
  const outlineMagnetic = useMagneticEffect(0.4);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setParallax(window.scrollY * 0.4);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] pt-28 pb-16 sm:py-0 flex items-center justify-center overflow-hidden"
      style={{
        /* 🔑 Section always dark — overscroll bounce never reveals white */
        backgroundColor: '#0A0A0A',
      }}
      aria-label="Hero section"
    >
      {/* Background slideshow with parallax */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1500"
            style={{ opacity: i === current ? 1 : 0, transitionDuration: '1500ms' }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full object-cover"
              style={{
                /*
                 * 🔑 Extend the image above and below the viewport so the
                 * parallax translateY never creates a gap at the top or bottom.
                 * position:absolute + top/bottom cover the full area.
                 */
                position: 'absolute',
                top: '-15%',
                left: 0,
                right: 0,
                bottom: '-15%',
                height: '130%',
                transform: `translateY(${parallax * 0.35}px)`,
                transformOrigin: 'center center',
                willChange: 'transform',
                /* 🔑 Own GPU layer for smooth compositing */
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        {/* Warm amber vignette from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-mehfil-dark via-transparent to-transparent" />
        {/* Top vignette — seamlessly connects with the navbar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Subtle warm light from center (neon ambiance) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212,168,67,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase text-mehfil-gold/90 font-medium border border-mehfil-gold/20">
              <span className="w-1.5 h-1.5 rounded-full bg-mehfil-gold animate-pulse" />
              Berhampur, Odisha
              <span className="w-1.5 h-1.5 rounded-full bg-mehfil-gold animate-pulse" />
            </span>
          </motion.div>

          {/* Script headline */}
          <motion.p
            variants={fadeUp}
            className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-mehfil-gold mb-2 leading-none"
            style={{ textShadow: '0 0 40px rgba(212,168,67,0.4)' }}
          >
            Mehfil
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-snug sm:leading-tight mb-3 sm:mb-4 px-2"
          >
            Rooftop Cafe &{' '}
            <span
              className="gradient-text"
              style={{
                background: 'linear-gradient(135deg, #D4A843 0%, #E8782A 50%, #D4A843 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              Restro
            </span>
          </motion.h1>

          {/* Sub-tagline */}
          <motion.p
            variants={fadeUp}
            className="text-mehfil-cream/70 text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8 sm:mb-10 font-light tracking-wide px-3"
          >
            Where every sunset is a celebration. Dine under the open sky with the finest flavours, 
            crafted with love in the heart of Berhampur.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto max-w-xs sm:max-w-none">
            <div
              className="w-full sm:w-auto"
              onMouseMove={ctaMagnetic.handleMouseMove}
              onMouseLeave={ctaMagnetic.handleMouseLeave}
            >
              <button
                ref={ctaMagnetic.ref}
                onClick={() => scrollTo('#reservation')}
                className="btn-primary text-xs sm:text-sm w-full sm:w-auto py-3.5 sm:py-4 justify-center"
                style={{ animation: 'pulseGlow 2.5s ease-in-out infinite, float 6s ease-in-out infinite' }}
              >
                Reserve Your Table
              </button>
            </div>
            <div
              className="w-full sm:w-auto"
              onMouseMove={outlineMagnetic.handleMouseMove}
              onMouseLeave={outlineMagnetic.handleMouseLeave}
            >
              <button
                ref={outlineMagnetic.ref}
                onClick={() => scrollTo('#menu')}
                className="btn-outline text-xs sm:text-sm w-full sm:w-auto py-3.5 sm:py-4 justify-center"
              >
                Explore Menu
              </button>
            </div>
          </motion.div>

          {/* Slide dots */}
          <motion.div
            variants={fadeIn}
            className="flex gap-2 mt-14"
            aria-label="Slideshow controls"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? 'w-8 h-1.5 bg-mehfil-gold'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - hide on very short screens to prevent collision */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/40 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <div className="scroll-indicator">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        aria-hidden="true"
        className="absolute top-24 left-6 w-16 h-16 border-t-2 border-l-2 border-mehfil-gold/20 rounded-tl-lg"
      />
      <div
        aria-hidden="true"
        className="absolute top-24 right-6 w-16 h-16 border-t-2 border-r-2 border-mehfil-gold/20 rounded-tr-lg"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-6 w-16 h-16 border-b-2 border-l-2 border-mehfil-gold/20 rounded-bl-lg"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-6 w-16 h-16 border-b-2 border-r-2 border-mehfil-gold/20 rounded-br-lg"
      />
    </section>
  );
}
