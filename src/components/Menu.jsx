// src/components/Menu.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { menuCategories, menuPages } from '../data/menuData';

function VegBadge({ veg }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm border shrink-0 mt-1 ${
        veg ? 'border-emerald-600 bg-emerald-50' : 'border-rose-600 bg-rose-50'
      }`}
      title={veg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          veg ? 'bg-emerald-600' : 'bg-rose-600'
        }`}
      />
    </span>
  );
}

function RoyalBadge({ text }) {
  if (!text) return null;
  return (
    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold bg-[#D4A843]/15 text-[#9E6D18] border border-[#D4A843]/40 shadow-xs shrink-0">
      {text}
    </span>
  );
}

export default function Menu() {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1); // 1 = forward (left swipe), -1 = backward (right swipe)
  const totalPages = menuPages.length;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const touchStartX = useRef(0);

  const turnNext = () => {
    if (currentPage < totalPages - 1) {
      setFlipDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const turnPrev = () => {
    if (currentPage > 0) {
      setFlipDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const jumpToPage = (index) => {
    if (index === currentPage) return;
    setFlipDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      turnNext(); // Swiped left -> next page
    } else if (diff < -45) {
      turnPrev(); // Swiped right -> prev page
    }
  };

  const activePageData = menuPages[currentPage];

  // For dual-page desktop spread: left half items, right half items
  const items = activePageData.items;
  const leftPageItems = items.slice(0, Math.ceil(items.length / 2));
  const rightPageItems = items.slice(Math.ceil(items.length / 2));

  // 3D Page turn variants simulating natural paper curl & flip
  const pageFlipVariants = {
    initial: (dir) => ({
      rotateY: dir > 0 ? 35 : -35,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? 'right center' : 'left center',
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -35 : 35,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #120E09 50%, #0A0A0A 100%)' }}
      aria-label="Royal Dastarkhwan Menu"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4A843]/5 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="section-subheading mb-2">The Royal Dastarkhwan</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            An Imperial <span className="font-serif italic text-mehfil-gold">Culinary Anthology</span>
          </h2>
          <p className="mt-4 text-mehfil-cream/65 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Turn the gilded parchment pages to discover artisanal slow-cooked recipes, heritage tandoor roasts, and royal elixirs. Swipe or tap page edges to browse.
          </p>
        </motion.div>

        {/* Category Ribbon Bookmarks (Interactive Royal Tabs) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap mb-8 sm:mb-10 px-2">
          {menuCategories.map((cat, idx) => {
            const isActive = currentPage === idx;
            return (
              <button
                key={cat.id}
                onClick={() => jumpToPage(idx)}
                className={`group relative px-3 sm:px-4 py-2 rounded-t-xl transition-all duration-300 text-xs sm:text-sm font-medium flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FBF7EE] text-[#1F1B16] shadow-md border-t-2 border-[#D4A843] -translate-y-1'
                    : 'bg-white/5 text-mehfil-cream/60 hover:text-mehfil-gold hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FBF7EE]" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3D BOOK CASING & PAGES */}
        <div
          className="relative max-w-5xl mx-auto"
          style={{ perspective: '2000px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Outer Royal Hardcover Backplate with Gilded Corners */}
          <div
            className="rounded-3xl p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,168,67,0.15)] relative border border-[#D4A843]/30"
            style={{
              background: 'linear-gradient(145deg, #1A1510 0%, #291F14 40%, #15110D 100%)',
            }}
          >
            {/* Gilded Embossed Corner Accents on Book Cover */}
            <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#D4A843]/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-[#D4A843]/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-[#D4A843]/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#D4A843]/60 rounded-br-lg pointer-events-none" />

            {/* Book Spine Center Highlight (Visible behind pages) */}
            <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-[#D4A843]/15 to-black/40 pointer-events-none hidden md:block rounded-full blur-[1px]" />

            {/* Animated Parchment Folio Spread */}
            <AnimatePresence mode="wait" custom={flipDirection}>
              <motion.div
                key={currentPage}
                custom={flipDirection}
                variants={pageFlipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-[#FAF6EC] rounded-2xl overflow-hidden shadow-2xl relative border border-[#E3D9C3]"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Vintage Parchment Texture & Center Spine Crease */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(225,212,185,0.4) 100%)',
                  }}
                />

                {/* Central Book Spine Shadow on Desktop */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-20"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(30,22,12,0.18) 0%, rgba(30,22,12,0.02) 25%, transparent 50%, rgba(30,22,12,0.02) 75%, rgba(30,22,12,0.18) 100%)',
                  }}
                />

                {/* Inner Gilded Filigree Border Frame */}
                <div className="absolute inset-2 sm:inset-4 border border-[#D4A843]/40 rounded-xl pointer-events-none z-10">
                  {/* Filigree Corner Flourishes */}
                  <span className="absolute top-1 left-1.5 text-[10px] text-[#C8862A]/60">❖</span>
                  <span className="absolute top-1 right-1.5 text-[10px] text-[#C8862A]/60">❖</span>
                  <span className="absolute bottom-1 left-1.5 text-[10px] text-[#C8862A]/60">❖</span>
                  <span className="absolute bottom-1 right-1.5 text-[10px] text-[#C8862A]/60">❖</span>
                </div>

                {/* Folio Header (Category & Ornament) */}
                <div className="pt-6 sm:pt-8 pb-4 text-center px-6 relative z-10">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#9E6D18] font-semibold mb-1">
                    {activePageData.ornament}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8C5E14] tracking-tight">
                    {activePageData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#54483A] italic font-light mt-1.5 max-w-lg mx-auto">
                    {activePageData.subtitle}
                  </p>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C8862A]/60 to-transparent mx-auto mt-3" />
                </div>

                {/* DESKTOP: Dual-Page Spread Layout */}
                <div className="hidden md:grid md:grid-cols-2 gap-10 p-8 pt-4 pb-12 relative z-10">
                  {/* Left Page Column */}
                  <div className="space-y-6 pr-4">
                    {leftPageItems.map((item) => (
                      <div
                        key={item.id}
                        className="group transition-all duration-300 pb-3 border-b border-[#EADECA]/70 last:border-b-0"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div className="flex items-start gap-2">
                            <VegBadge veg={item.veg} />
                            <h4 className="font-serif text-base lg:text-lg font-bold text-[#9E6D18] group-hover:text-[#6D4708] transition-colors leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          {item.badge && <RoyalBadge text={item.badge} />}
                        </div>
                        <p className="text-xs sm:text-sm text-[#453A2D] leading-relaxed font-light pl-5.5 text-justify">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Right Page Column */}
                  <div className="space-y-6 pl-4 border-l border-[#EADECA]/40">
                    {rightPageItems.map((item) => (
                      <div
                        key={item.id}
                        className="group transition-all duration-300 pb-3 border-b border-[#EADECA]/70 last:border-b-0"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <div className="flex items-start gap-2">
                            <VegBadge veg={item.veg} />
                            <h4 className="font-serif text-base lg:text-lg font-bold text-[#9E6D18] group-hover:text-[#6D4708] transition-colors leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          {item.badge && <RoyalBadge text={item.badge} />}
                        </div>
                        <p className="text-xs sm:text-sm text-[#453A2D] leading-relaxed font-light pl-5.5 text-justify">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MOBILE: Single Page Flow */}
                <div className="md:hidden p-5 sm:p-7 pt-2 pb-10 space-y-5 relative z-10">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group transition-all duration-300 pb-3.5 border-b border-[#EADECA]/80 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-2.5 mb-1.5">
                        <div className="flex items-start gap-2 flex-1">
                          <VegBadge veg={item.veg} />
                          <h4 className="font-serif text-base font-bold text-[#9E6D18] group-hover:text-[#6D4708] transition-colors leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        {item.badge && <RoyalBadge text={item.badge} />}
                      </div>
                      <p className="text-xs text-[#453A2D] leading-relaxed font-light pl-5 text-justify">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Page Footer (Folio Numbers & Navigation Hints) */}
                <div className="px-8 pb-5 pt-2 flex items-center justify-between text-xs font-mono text-[#8C6D23] border-t border-[#EADECA]/60 relative z-10">
                  <span className="text-[11px] uppercase tracking-wider text-[#735818]">
                    Mehfil Royal Archive
                  </span>
                  <span className="font-serif font-bold text-sm tracking-widest text-[#8C5E14]">
                    Folio {String(currentPage + 1).padStart(2, '0')} of {String(totalPages).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] hidden sm:inline-block uppercase tracking-wider text-[#735818]">
                    Swipe or Tap to Turn
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Realistic Page-Turning Handles (Left & Right Flaps) */}
          <button
            onClick={turnPrev}
            disabled={currentPage === 0}
            aria-label="Previous menu page"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4A843]/40 bg-[#1A1510]/90 backdrop-blur-md flex items-center justify-center text-[#D4A843] hover:bg-[#D4A843] hover:text-black transition-all shadow-xl active:scale-95 ${
              currentPage === 0 ? 'opacity-25 cursor-not-allowed pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={turnNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next menu page"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4A843]/40 bg-[#1A1510]/90 backdrop-blur-md flex items-center justify-center text-[#D4A843] hover:bg-[#D4A843] hover:text-black transition-all shadow-xl active:scale-95 ${
              currentPage === totalPages - 1 ? 'opacity-25 cursor-not-allowed pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom Reservation Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-mehfil-cream/50 text-xs sm:text-sm mb-4">
            Craving these royal flavors under the open Berhampur sky?
          </p>
          <a
            href="#reservation"
            className="btn-primary inline-flex items-center gap-2.5 text-xs sm:text-sm py-3.5 px-8 shadow-glow-sm"
          >
            <span>Reserve Your Dastarkhwan Table</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
