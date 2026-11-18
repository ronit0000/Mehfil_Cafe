// src/components/Menu.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { menuPages } from '../data/menuData';

function DietaryBadge({ type }) {
  if (type === 'both') {
    return (
      <span
        className="inline-flex items-center gap-1 shrink-0 mt-0.5"
        title="Available in Vegetarian & Non-Vegetarian"
      >
        <span className="inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border border-emerald-600 bg-emerald-50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        </span>
        <span className="inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border border-rose-600 bg-rose-50">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
        </span>
      </span>
    );
  }

  if (type === 'non-veg') {
    return (
      <span
        className="inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border border-rose-600 bg-rose-50 shrink-0 mt-0.5"
        title="Non-Vegetarian"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border border-emerald-600 bg-emerald-50 shrink-0 mt-0.5"
      title="Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
    </span>
  );
}

function RoyalBadge({ text }) {
  if (!text) return null;
  return (
    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold bg-[#D4A843]/15 text-[#9E6D18] border border-[#D4A843]/40 shrink-0">
      {text}
    </span>
  );
}

export default function Menu() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  // 1-to-1 page presentation: one by one royal folio for both PC and Mobile
  const totalPages = menuPages.length; // 16 categories
  const [currentPage, setCurrentPage] = useState(0); // 0 to 15
  const [flipDirection, setFlipDirection] = useState(1);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Turn forward (swipe left / drag left)
  const turnNext = () => {
    if (currentPage < totalPages - 1) {
      setFlipDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Turn backward (swipe right / drag right)
  const turnPrev = () => {
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

  // Current Category Data
  const currentCategory = menuPages[currentPage];
  const allCategoryItems = currentCategory.items;

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[800px] bg-[#D4A843]/7 blur-[180px] rounded-full pointer-events-none"
      />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 h-full min-h-0">
        {/* Section Heading */}
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

        {/* 3D ROYAL FOLIO CASING (Scaled large for PC and perfectly responsive, single page flip) */}
        <div
          className="relative w-full max-w-2xl lg:max-w-3xl mx-auto cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ perspective: '2000px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Leather Hardcover Frame */}
          <div
            className="rounded-2xl sm:rounded-3xl p-2 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(212,168,67,0.15)] relative border border-[#D4A843]/35 w-full"
            style={{
              background: 'linear-gradient(145deg, #18130E 0%, #241A10 40%, #140F0B 100%)',
            }}
          >
            {/* Gilded Embossed Corner Accents */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-l-2 border-[#D4A843]/60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 sm:w-7 h-5 sm:h-7 border-t-2 border-r-2 border-[#D4A843]/60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-l-2 border-[#D4A843]/60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-5 sm:w-7 h-5 sm:h-7 border-b-2 border-r-2 border-[#D4A843]/60 rounded-br-lg pointer-events-none" />

            {/* Animated Royal Folio Page (Single large page on PC & mobile) */}
            <AnimatePresence mode="wait" custom={flipDirection}>
              <motion.div
                key={`page-${currentPage}`}
                custom={flipDirection}
                variants={pageFlipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                /* Large commanding height for PC (76vh / max 720px), perfectly proportioned */
                className="bg-[#FAF6EC] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative border border-[#E3D9C3] flex flex-col justify-between h-[calc(100dvh-135px)] min-h-[500px] max-h-[720px] md:h-[76vh]"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Vintage Parchment Texture & Depth */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(225,212,185,0.4) 100%)',
                  }}
                />

                {/* Inner Gold Filigree Frame */}
                <div className="absolute inset-1.5 sm:inset-3 border border-[#D4A843]/35 rounded-lg sm:rounded-xl pointer-events-none z-10">
                  <span className="absolute top-1 left-1.5 text-[9px] text-[#9E6D18]/60">❖</span>
                  <span className="absolute top-1 right-1.5 text-[9px] text-[#9E6D18]/60">❖</span>
                  <span className="absolute bottom-1 left-1.5 text-[9px] text-[#9E6D18]/60">❖</span>
                  <span className="absolute bottom-1 right-1.5 text-[9px] text-[#9E6D18]/60">❖</span>
                </div>

                {/* Grand Folio Header */}
                <div className="pt-4 sm:pt-6 pb-2 text-center px-4 sm:px-8 relative z-10 shrink-0 border-b border-[#EADECA]/80">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9E6D18] font-semibold">
                    Section {currentPage + 1} of {totalPages}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8C5E14] tracking-tight mt-0.5">
                    {currentCategory.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#54483A] italic font-light mt-1 max-w-xl mx-auto leading-relaxed">
                    {currentCategory.subtitle}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#9E6D18]/60" />
                    <span className="text-[9px] text-[#9E6D18]/70">❖</span>
                    <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#9E6D18]/60" />
                  </div>
                </div>

                {/* Folio Items (Smooth scroll, large generous typography for PC and clean on mobile) */}
                <div className="px-4 sm:px-8 py-3 space-y-2.5 sm:space-y-3.5 relative z-10 flex-1 overflow-y-auto no-scrollbar flex flex-col justify-start">
                  {allCategoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="group pb-2 sm:pb-2.5 border-b border-[#EADECA]/70 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-start gap-1.5 sm:gap-2 flex-1 min-w-0">
                          <DietaryBadge type={item.dietaryType} />
                          <h4 className="font-serif text-[14px] sm:text-[16px] font-bold text-[#8C5E14] leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        {item.badge && <RoyalBadge text={item.badge} />}
                      </div>
                      <p className="text-[11px] sm:text-[13px] text-[#453A2D] leading-relaxed font-light pl-4.5 sm:pl-5 text-justify">
                        {item.desc}
                      </p>
                    </div>
                  ))}

                  {/* Decorative insignia for shorter categories */}
                  {allCategoryItems.length <= 4 && (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-30 py-4">
                      <span className="text-xs sm:text-sm tracking-widest text-[#9E6D18]">❖ ❖ ❖</span>
                      <p className="font-serif italic text-[11px] text-[#54483A] mt-1">
                        Mehfil Rooftop Culinary Archive
                      </p>
                    </div>
                  )}
                </div>

                {/* Folio Footer with Instruction & Page Navigation */}
                <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#EADECA]/80 relative z-10 bg-[#F5EFE0]/80 flex items-center justify-between shrink-0">
                  <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-[#735818]">
                    Page {currentPage + 1} of {totalPages}
                  </span>

                  {/* Clear Swipe/Drag Instruction */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#8C5E14] font-medium tracking-wide">
                    <span className="animate-pulse">←</span>
                    <span className="font-serif italic text-[11px] sm:text-xs">
                      Swipe or drag to turn page
                    </span>
                    <span className="animate-pulse">→</span>
                  </div>

                  <span className="text-[9px] sm:text-[11px] font-mono text-[#735818] hidden sm:inline">
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
