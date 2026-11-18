// src/components/Menu.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { menuCategories, menuPages } from '../data/menuData';

function VegBadge({ veg }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-3 h-3 rounded-xs border shrink-0 mt-0.5 ${
        veg ? 'border-emerald-600 bg-emerald-50' : 'border-rose-600 bg-rose-50'
      }`}
      title={veg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <span
        className={`w-1 h-1 rounded-full ${
          veg ? 'bg-emerald-600' : 'bg-rose-600'
        }`}
      />
    </span>
  );
}

function RoyalBadge({ text }) {
  if (!text) return null;
  return (
    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded-full font-semibold bg-[#D4A843]/15 text-[#8C5E14] border border-[#D4A843]/35 shrink-0">
      {text}
    </span>
  );
}

export default function Menu() {
  const [currentPage, setCurrentPage] = useState(0); // Desktop: 0 to 5 (each is a 2-page spread)
  const [mobilePage, setMobilePage] = useState(0);   // Mobile: 0 to 11 (each is 3-4 items max)
  const [flipDirection, setFlipDirection] = useState(1);
  const totalDesktopPages = menuPages.length;
  const totalMobilePages = totalDesktopPages * 2;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const touchStartX = useRef(0);

  // Sync mobile page when desktop category page changes
  const jumpToCategory = (catIndex) => {
    setFlipDirection(catIndex >= currentPage ? 1 : -1);
    setCurrentPage(catIndex);
    setMobilePage(catIndex * 2);
  };

  // Mobile navigation
  const turnMobileNext = () => {
    if (mobilePage < totalMobilePages - 1) {
      setFlipDirection(1);
      const next = mobilePage + 1;
      setMobilePage(next);
      setCurrentPage(Math.floor(next / 2));
    }
  };

  const turnMobilePrev = () => {
    if (mobilePage > 0) {
      setFlipDirection(-1);
      const prev = mobilePage - 1;
      setMobilePage(prev);
      setCurrentPage(Math.floor(prev / 2));
    }
  };

  // Desktop navigation
  const turnDesktopNext = () => {
    if (currentPage < totalDesktopPages - 1) {
      setFlipDirection(1);
      const next = currentPage + 1;
      setCurrentPage(next);
      setMobilePage(next * 2);
    }
  };

  const turnDesktopPrev = () => {
    if (currentPage > 0) {
      setFlipDirection(-1);
      const prev = currentPage - 1;
      setCurrentPage(prev);
      setMobilePage(prev * 2);
    }
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      turnMobileNext(); // Swipe left -> Next mobile page
    } else if (diff < -40) {
      turnMobilePrev(); // Swipe right -> Previous mobile page
    }
  };

  // Active category data
  const activeCategoryData = menuPages[currentPage];
  const items = activeCategoryData.items;
  const halfLength = Math.ceil(items.length / 2);
  const leftPageItems = items.slice(0, halfLength);
  const rightPageItems = items.slice(halfLength);

  // Mobile page items: exactly 3 or 4 items per mobile page!
  const isSecondHalfOnMobile = mobilePage % 2 === 1;
  const currentMobileItems = isSecondHalfOnMobile ? rightPageItems : leftPageItems;

  // 3D Page turn variants
  const pageFlipVariants = {
    initial: (dir) => ({
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? 'right center' : 'left center',
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        duration: 0.38,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #120E09 50%, #0A0A0A 100%)' }}
      aria-label="Royal Dastarkhwan Menu"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4A843]/5 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-7 sm:mb-12"
        >
          <p className="section-subheading mb-2">The Royal Dastarkhwan</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            An Imperial <span className="font-serif italic text-mehfil-gold">Culinary Anthology</span>
          </h2>
          <p className="mt-3 text-mehfil-cream/65 text-xs sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Turn the gilded parchment pages to discover artisanal slow-cooked recipes, heritage tandoor roasts, and royal elixirs.
          </p>
        </motion.div>

        {/* Category Ribbon Bookmarks (Interactive Royal Tabs) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar mb-5 sm:mb-8 px-2 pb-2">
          {menuCategories.map((cat, idx) => {
            const isActive = currentPage === idx;
            return (
              <button
                key={cat.id}
                onClick={() => jumpToCategory(idx)}
                className={`group shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:rounded-t-xl transition-all duration-300 text-xs sm:text-sm font-medium flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FBF7EE] text-[#1F1B16] shadow-md border border-[#D4A843]/40 sm:border-b-0 -translate-y-0.5'
                    : 'bg-white/5 text-mehfil-cream/60 hover:text-mehfil-gold hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D BOOK CASING & PAGES */}
        <div
          className="relative max-w-5xl mx-auto"
          style={{ perspective: '1800px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Outer Royal Hardcover Backplate with Gilded Corners */}
          <div
            className="rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(212,168,67,0.12)] relative border border-[#D4A843]/30"
            style={{
              background: 'linear-gradient(145deg, #1A1510 0%, #291F14 40%, #15110D 100%)',
            }}
          >
            {/* Gilded Embossed Corner Accents on Book Cover */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-l-2 border-[#D4A843]/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-r-2 border-[#D4A843]/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-l-2 border-[#D4A843]/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-r-2 border-[#D4A843]/60 rounded-br-lg pointer-events-none" />

            {/* Book Spine Center Highlight (Desktop Spread) */}
            <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-[#D4A843]/15 to-black/40 pointer-events-none hidden md:block rounded-full blur-[1px]" />

            {/* Animated Parchment Folio Spread */}
            <AnimatePresence mode="wait" custom={flipDirection}>
              <motion.div
                key={`page-${currentPage}-${mobilePage}`}
                custom={flipDirection}
                variants={pageFlipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-[#FAF6EC] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl relative border border-[#E3D9C3] min-h-[420px] sm:min-h-[480px]"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Vintage Parchment Texture & Subtle Radial Depth */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(225,212,185,0.4) 100%)',
                  }}
                />

                {/* Central Book Spine Shadow on Desktop Spread */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-20"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(30,22,12,0.18) 0%, rgba(30,22,12,0.02) 25%, transparent 50%, rgba(30,22,12,0.02) 75%, rgba(30,22,12,0.18) 100%)',
                  }}
                />

                {/* Inner Gilded Filigree Border Frame */}
                <div className="absolute inset-1.5 sm:inset-3 border border-[#D4A843]/40 rounded-lg sm:rounded-xl pointer-events-none z-10">
                  <span className="absolute top-1 left-1.5 text-[9px] text-[#C8862A]/60">❖</span>
                  <span className="absolute top-1 right-1.5 text-[9px] text-[#C8862A]/60">❖</span>
                  <span className="absolute bottom-1 left-1.5 text-[9px] text-[#C8862A]/60">❖</span>
                  <span className="absolute bottom-1 right-1.5 text-[9px] text-[#C8862A]/60">❖</span>
                </div>

                {/* Folio Header (Category & Title) */}
                <div className="pt-4 sm:pt-7 pb-2 text-center px-4 relative z-10">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#9E6D18] font-semibold mb-0.5">
                    {activeCategoryData.ornament}
                  </p>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#8C5E14] tracking-tight">
                    {activeCategoryData.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#54483A] italic font-light mt-0.5 max-w-md mx-auto">
                    {activeCategoryData.subtitle}
                  </p>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C8862A]/60 to-transparent mx-auto mt-2" />
                </div>

                {/* DESKTOP: Dual-Page Spread Layout (Shown on md+ screens) */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 p-7 pt-2 pb-10 relative z-10">
                  {/* Left Page Column */}
                  <div className="space-y-4 pr-3">
                    {leftPageItems.map((item) => (
                      <div
                        key={item.id}
                        className="group transition-all duration-300 pb-2.5 border-b border-[#EADECA]/70 last:border-b-0"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-start gap-1.5">
                            <VegBadge veg={item.veg} />
                            <h4 className="font-serif text-base font-bold text-[#9E6D18] group-hover:text-[#6D4708] transition-colors leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          {item.badge && <RoyalBadge text={item.badge} />}
                        </div>
                        <p className="text-xs text-[#453A2D] leading-relaxed font-light pl-4.5 text-justify">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Right Page Column */}
                  <div className="space-y-4 pl-3 border-l border-[#EADECA]/40">
                    {rightPageItems.map((item) => (
                      <div
                        key={item.id}
                        className="group transition-all duration-300 pb-2.5 border-b border-[#EADECA]/70 last:border-b-0"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-start gap-1.5">
                            <VegBadge veg={item.veg} />
                            <h4 className="font-serif text-base font-bold text-[#9E6D18] group-hover:text-[#6D4708] transition-colors leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          {item.badge && <RoyalBadge text={item.badge} />}
                        </div>
                        <p className="text-xs text-[#453A2D] leading-relaxed font-light pl-4.5 text-justify">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MOBILE: Compact Single-Page Folio (Exactly 3 to 4 items max - Fits Phone Screen Perfectly) */}
                <div className="md:hidden px-4 py-3 space-y-3 relative z-10">
                  {currentMobileItems.map((item) => (
                    <div
                      key={item.id}
                      className="group pb-2.5 border-b border-[#EADECA]/80 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-start gap-1.5 flex-1 min-w-0">
                          <VegBadge veg={item.veg} />
                          <h4 className="font-serif text-sm font-bold text-[#8C5E14] leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        {item.badge && <RoyalBadge text={item.badge} />}
                      </div>
                      <p className="text-[11px] text-[#4A3F31] leading-relaxed font-light pl-4.5 text-justify">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Page Footer (Folio Numbers) */}
                <div className="px-5 pb-3 pt-2 flex items-center justify-between text-[11px] font-mono text-[#8C6D23] border-t border-[#EADECA]/60 relative z-10">
                  <span className="uppercase tracking-wider text-[#735818]">
                    {isSecondHalfOnMobile ? 'Part II' : 'Part I'}
                  </span>
                  <span className="font-serif font-bold tracking-widest text-[#8C5E14]">
                    <span className="md:hidden">
                      Page {mobilePage + 1} of {totalMobilePages}
                    </span>
                    <span className="hidden md:inline">
                      Folio {currentPage + 1} of {totalDesktopPages}
                    </span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#735818]">
                    Swipe ➔
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DESKTOP SIDE TURNING HANDLES (Outside the book, never overlaps text) */}
          <button
            onClick={turnDesktopPrev}
            disabled={currentPage === 0}
            aria-label="Previous menu folio"
            className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 z-30 w-12 h-12 rounded-full border border-[#D4A843]/40 bg-[#1A1510]/95 backdrop-blur-md items-center justify-center text-[#D4A843] hover:bg-[#D4A843] hover:text-black transition-all shadow-xl active:scale-95 ${
              currentPage === 0 ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={turnDesktopNext}
            disabled={currentPage === totalDesktopPages - 1}
            aria-label="Next menu folio"
            className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -right-6 z-30 w-12 h-12 rounded-full border border-[#D4A843]/40 bg-[#1A1510]/95 backdrop-blur-md items-center justify-center text-[#D4A843] hover:bg-[#D4A843] hover:text-black transition-all shadow-xl active:scale-95 ${
              currentPage === totalDesktopPages - 1 ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* MOBILE NAVIGATION BAR (Cleanly below the book, never covers text) */}
          <div className="flex md:hidden items-center justify-between gap-3 mt-4 px-2">
            <button
              onClick={turnMobilePrev}
              disabled={mobilePage === 0}
              className={`px-4 py-2 rounded-full border border-[#D4A843]/40 bg-[#1A1510] text-[#D4A843] text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 ${
                mobilePage === 0 ? 'opacity-25 pointer-events-none' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <span>←</span>
              <span>Prev</span>
            </button>

            <span className="text-[11px] font-mono text-mehfil-cream/60 tracking-wider">
              {mobilePage + 1} / {totalMobilePages}
            </span>

            <button
              onClick={turnMobileNext}
              disabled={mobilePage === totalMobilePages - 1}
              className={`px-4 py-2 rounded-full border border-[#D4A843]/40 bg-[#1A1510] text-[#D4A843] text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 ${
                mobilePage === totalMobilePages - 1 ? 'opacity-25 pointer-events-none' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Bottom Reservation Call to Action */}
        <div className="mt-8 sm:mt-14 text-center">
          <p className="text-mehfil-cream/50 text-xs sm:text-sm mb-3">
            Ready to experience these royal flavors under the open Berhampur sky?
          </p>
          <a
            href="#reservation"
            className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm py-3 px-7 shadow-glow-sm"
          >
            <span>Reserve a Table</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
