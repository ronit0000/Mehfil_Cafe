// src/components/Menu.jsx
import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { menuPages } from '../data/menuData';

function DietaryBadge({ type }) {
  if (type === 'both') {
    return (
      <span
        className="inline-flex items-center gap-1 shrink-0 mt-0.5"
        title="Available in Vegetarian & Non-Vegetarian"
      >
        <span className="inline-flex items-center justify-center w-3 h-3 rounded-xs border border-emerald-600 bg-emerald-50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        </span>
        <span className="inline-flex items-center justify-center w-3 h-3 rounded-xs border border-rose-600 bg-rose-50">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
        </span>
      </span>
    );
  }

  if (type === 'non-veg') {
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 rounded-xs border border-rose-600 bg-rose-50 shrink-0 mt-0.5"
        title="Non-Vegetarian"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center w-3 h-3 rounded-xs border border-emerald-600 bg-emerald-50 shrink-0 mt-0.5"
      title="Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
    </span>
  );
}

function RoyalBadge({ text }) {
  if (!text) return null;
  return (
    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded-full font-semibold bg-[#D4A843]/15 text-[#9E6D18] border border-[#D4A843]/40 shrink-0">
      {text}
    </span>
  );
}

export default function Menu() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Dynamically generate mobile pages:
  // Categories with <= 6 items fit on 1 complete page (Soups, Chinese, Mains, Breads, Beverages, etc.)
  // Categories with > 6 items (Starters with 8 items) split into 2 balanced pages of 4 items each.
  const mobilePages = useMemo(() => {
    const pages = [];
    menuPages.forEach((cat) => {
      const totalItems = cat.items.length;
      if (totalItems <= 6) {
        pages.push({
          categoryTitle: cat.title,
          categorySubtitle: cat.subtitle,
          items: cat.items,
          part: 1,
          totalParts: 1,
        });
      } else {
        const chunkSize = Math.ceil(totalItems / 2); // 8 items -> 4 and 4
        const totalParts = Math.ceil(totalItems / chunkSize);
        for (let i = 0; i < totalItems; i += chunkSize) {
          pages.push({
            categoryTitle: cat.title,
            categorySubtitle: cat.subtitle,
            items: cat.items.slice(i, i + chunkSize),
            part: Math.floor(i / chunkSize) + 1,
            totalParts,
          });
        }
      }
    });
    return pages;
  }, []);

  const totalDesktopPages = menuPages.length;
  const totalMobilePages = mobilePages.length;

  const [currentPage, setCurrentPage] = useState(0); // Desktop folios: 0 to 14
  const [mobilePage, setMobilePage] = useState(0);   // Mobile pages: 0 to 15
  const [flipDirection, setFlipDirection] = useState(1);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Turn forward (swipe left)
  const turnNext = () => {
    // Mobile navigation
    if (mobilePage < totalMobilePages - 1) {
      setFlipDirection(1);
      setMobilePage((prev) => prev + 1);
    }
    // Desktop navigation
    if (currentPage < totalDesktopPages - 1) {
      setFlipDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Turn backward (swipe right)
  const turnPrev = () => {
    // Mobile navigation
    if (mobilePage > 0) {
      setFlipDirection(-1);
      setMobilePage((prev) => prev - 1);
    }
    // Desktop navigation
    if (currentPage > 0) {
      setFlipDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Detect horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) {
        turnNext();
      } else {
        turnPrev();
      }
    }
  };

  // Drag handler for desktop mouse drag
  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    if (offsetX < -40 || velocityX < -200) {
      turnNext();
    } else if (offsetX > 40 || velocityX > 200) {
      turnPrev();
    }
  };

  // Desktop Page Data
  const activeDesktopCategory = menuPages[currentPage];
  const desktopItems = activeDesktopCategory.items;
  const halfLength = Math.ceil(desktopItems.length / 2);
  const leftPageItems = desktopItems.slice(0, halfLength);
  const rightPageItems = desktopItems.slice(halfLength);

  // Mobile Page Data
  const currentMobilePage = mobilePages[mobilePage];

  // 3D Realistic Book Curl & Page Turn Animation
  const pageFlipVariants = {
    initial: (dir) => ({
      rotateY: dir > 0 ? 25 : -25,
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
      rotateY: dir > 0 ? -25 : 25,
      opacity: 0,
      scale: 0.98,
      transformOrigin: dir > 0 ? 'left center' : 'right center',
      transition: {
        duration: 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center py-4 sm:py-8 px-3 sm:px-6 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #130E09 50%, #0A0A0A 100%)',
      }}
      aria-label="Our Menu"
    >
      {/* Royal Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] sm:h-[700px] bg-[#D4A843]/6 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 h-full min-h-0">
        {/* Compact Header to ensure menu covers viewport completely */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-2.5 sm:mb-4 shrink-0"
        >
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#D4A843]">
            Culinary Heritage
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D4A843] to-transparent mx-auto my-0.5" />
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF6EC] font-bold tracking-tight">
            Our <span className="italic text-[#D4A843]">Menu</span>
          </h2>
        </motion.div>

        {/* 3D BOOK CASING (Zero navigation buttons, pure swipe control, responsive dimensions) */}
        <div
          className="relative w-full cursor-grab active:cursor-grabbing touch-pan-y max-w-5xl"
          style={{ perspective: '2000px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Leather Book Hardcover Frame */}
          <div
            className="rounded-2xl sm:rounded-3xl p-2 sm:p-3.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(212,168,67,0.12)] relative border border-[#D4A843]/30 w-full"
            style={{
              background: 'linear-gradient(145deg, #18130E 0%, #241A10 40%, #140F0B 100%)',
            }}
          >
            {/* Gilded Corner Brackets */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-[#D4A843]/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-[#D4A843]/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-[#D4A843]/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-[#D4A843]/60 rounded-br-lg pointer-events-none" />

            {/* Book Spine Highlight on Desktop */}
            <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/40 via-[#D4A843]/15 to-black/40 pointer-events-none hidden md:block rounded-full blur-[1px]" />

            {/* Animated Royal Parchment Page (Dynamically adapts to mobile screen and laptop) */}
            <AnimatePresence mode="wait" custom={flipDirection}>
              <motion.div
                key={`page-${currentPage}-${mobilePage}`}
                custom={flipDirection}
                variants={pageFlipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                /* Mobile: adapts to viewport height (max 600px). Desktop: generous luxury spread (530px). */
                className="bg-[#FAF6EC] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative border border-[#E3D9C3] flex flex-col justify-between h-[calc(100dvh-125px)] max-h-[600px] min-h-[460px] md:h-[530px] md:max-h-[530px]"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Parchment Depth Effect */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(225,212,185,0.4) 100%)',
                  }}
                />

                {/* Desktop Central Spine Shadow */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-20"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(30,22,12,0.18) 0%, rgba(30,22,12,0.02) 30%, transparent 50%, rgba(30,22,12,0.02) 70%, rgba(30,22,12,0.18) 100%)',
                  }}
                />

                {/* Inner Gold Inset Frame */}
                <div className="absolute inset-1.5 sm:inset-3 border border-[#D4A843]/35 rounded-lg sm:rounded-xl pointer-events-none z-10">
                  <span className="absolute top-1 left-1.5 text-[8px] text-[#9E6D18]/60">❖</span>
                  <span className="absolute top-1 right-1.5 text-[8px] text-[#9E6D18]/60">❖</span>
                  <span className="absolute bottom-1 left-1.5 text-[8px] text-[#9E6D18]/60">❖</span>
                  <span className="absolute bottom-1 right-1.5 text-[8px] text-[#9E6D18]/60">❖</span>
                </div>

                {/* MOBILE FOLIO HEADER (Category Title & Subtitle) */}
                <div className="md:hidden pt-3 pb-1 text-center px-4 relative z-10 shrink-0">
                  <h3 className="font-serif text-xl font-bold text-[#8C5E14] tracking-tight">
                    {currentMobilePage.categoryTitle}
                  </h3>
                  <p className="text-[10px] text-[#54483A] italic font-light mt-0.5 max-w-md mx-auto line-clamp-1">
                    {currentMobilePage.categorySubtitle}
                  </p>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#9E6D18]/50 to-transparent mx-auto mt-1" />
                </div>

                {/* DESKTOP VIEW: Authentic Two-Page Open Book Spread (No spine overlap, balanced fill) */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 p-7 pt-5 pb-3 relative z-10 flex-1 overflow-hidden">
                  {/* Left Page Column */}
                  <div className="pr-4 flex flex-col justify-between h-full border-r border-[#EADECA]/60">
                    <div>
                      {/* Left Page Header: Category Title */}
                      <div className="pb-3 mb-3 border-b border-[#EADECA]/80">
                        <span className="text-[10px] uppercase tracking-widest text-[#9E6D18] font-semibold">
                          Section {currentPage + 1} of {totalDesktopPages}
                        </span>
                        <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#8C5E14] leading-tight mt-0.5">
                          {activeDesktopCategory.title}
                        </h3>
                        <p className="text-xs text-[#54483A] italic font-light mt-1">
                          {activeDesktopCategory.subtitle}
                        </p>
                      </div>

                      {/* Left items */}
                      <div className="space-y-3.5">
                        {leftPageItems.map((item) => (
                          <div
                            key={item.id}
                            className="group pb-2 border-b border-[#EADECA]/60 last:border-b-0"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-start gap-1.5">
                                <DietaryBadge type={item.dietaryType} />
                                <h4 className="font-serif text-[15px] font-bold text-[#8C5E14] leading-snug">
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

                    <div className="pt-2 text-center text-[#9E6D18]/40 text-[9px] font-mono">
                      ❖ Mehfil Rooftop Culinary Archive ❖
                    </div>
                  </div>

                  {/* Right Page Column */}
                  <div className="pl-4 flex flex-col justify-between h-full">
                    <div>
                      {/* Right Page Header: Balanced counterpart to Left Header */}
                      <div className="pb-3 mb-3 border-b border-[#EADECA]/80 flex items-center justify-between">
                        <span className="font-serif italic text-xs text-[#8C5E14] font-medium tracking-wide">
                          Rooftop Courtly Fare
                        </span>
                        <span className="text-xs text-[#D4A843]">❖</span>
                      </div>

                      {/* Right items */}
                      <div className="space-y-3.5">
                        {rightPageItems.map((item) => (
                          <div
                            key={item.id}
                            className="group pb-2 border-b border-[#EADECA]/60 last:border-b-0"
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-start gap-1.5">
                                <DietaryBadge type={item.dietaryType} />
                                <h4 className="font-serif text-[15px] font-bold text-[#8C5E14] leading-snug">
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

                    {/* Royal Heritage Card to fill vertical space when category has few items */}
                    {desktopItems.length <= 4 && (
                      <div className="mt-3 p-3.5 rounded-xl border border-[#D4A843]/35 bg-[#F5EFE0]/80">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[#9E6D18] text-xs">❖</span>
                          <span className="font-serif italic font-semibold text-xs text-[#8C5E14]">
                            The Nawabi Craft
                          </span>
                        </div>
                        <p className="text-[11px] text-[#54483A] italic leading-relaxed">
                          Slow-simmered over smoldering embers, prepared fresh with hand-pounded spices and served under the open Berhampur night sky.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* MOBILE VIEW: Fits up to 6 items seamlessly, fully utilizing screen height without empty gaps */}
                <div className="md:hidden px-3.5 py-1.5 space-y-1.5 relative z-10 flex-1 overflow-y-auto no-scrollbar flex flex-col justify-start">
                  {currentMobilePage.items.map((item) => (
                    <div
                      key={item.id}
                      className="group pb-1 border-b border-[#EADECA]/70 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-1.5 mb-0.5">
                        <div className="flex items-start gap-1.5 flex-1 min-w-0">
                          <DietaryBadge type={item.dietaryType} />
                          <h4 className="font-serif text-[13px] font-bold text-[#8C5E14] leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        {item.badge && <RoyalBadge text={item.badge} />}
                      </div>
                      <p className="text-[10px] text-[#4A3F31] leading-relaxed font-light pl-4.5 text-justify line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  ))}

                  {/* If section has only 3 items, subtle decorative insignia */}
                  {currentMobilePage.items.length <= 3 && (
                    <div className="flex-1 flex items-center justify-center opacity-30 py-3">
                      <span className="text-xs tracking-widest text-[#9E6D18]">❖ ❖ ❖</span>
                    </div>
                  )}
                </div>

                {/* INSTRUCTION AT THE END OF THE PAGE TO SWIPE (Zero Next/Prev Buttons) */}
                <div className="px-4 py-2 sm:py-2.5 border-t border-[#EADECA]/80 relative z-10 bg-[#F5EFE0]/80 flex items-center justify-between shrink-0">
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#735818]">
                    <span className="md:hidden">
                      Page {mobilePage + 1} of {totalMobilePages}
                    </span>
                    <span className="hidden md:inline">
                      Folio {currentPage + 1} of {totalDesktopPages}
                    </span>
                  </span>

                  {/* Clear Swipe Instruction */}
                  <div className="flex items-center gap-1.5 text-xs text-[#8C5E14] font-medium tracking-wide">
                    <span className="animate-pulse">←</span>
                    <span className="font-serif italic text-[11px] sm:text-xs">
                      Swipe left or right to turn page
                    </span>
                    <span className="animate-pulse">→</span>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-mono text-[#735818] hidden sm:inline">
                    Mehfil Rooftop
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
