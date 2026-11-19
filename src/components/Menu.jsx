// src/components/Menu.jsx
import { useState, useRef, useMemo, useEffect } from 'react';
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

// Curated button labels for the quick-jump ribbon
const categoryButtons = [
  { title: 'Soup',                      label: 'Soup' },
  { title: 'Starters And Appetizers',   label: 'Starters' },
  { title: 'Salads',                    label: 'Salads' },
  { title: 'Main Course Indian',        label: 'Main Course' },
  { title: 'Chinese Rice And Noodles',  label: 'Chinese' },
  { title: 'Grilled',                   label: 'Grilled' },
  { title: 'Rice And Biriyani',         label: 'Biryani & Rice' },
  { title: 'Dal',                       label: 'Dal' },
  { title: 'Burgers',                   label: 'Burgers' },
  { title: 'Pizza',                     label: 'Pizza' },
  { title: 'Sandwich',                  label: 'Sandwich' },
  { title: 'Pasta',                     label: 'Pasta' },
  { title: 'Dessert',                   label: 'Dessert' },
  { title: 'BEVERAGES',                 label: 'Beverages' },
  { title: 'Indian Breads',             label: 'Breads' },
  { title: 'Sides',                     label: 'Sides' },
];

export default function Menu() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const categoryBarRef = useRef(null);

  // Chunk items into clean folios of at most 5 items per page.
  // This completely eliminates internal vertical scrolling, ensuring the user is NEVER trapped
  // and can freely scroll the entire website vertically on their phone!
  const folios = useMemo(() => {
    const list = [];
    menuPages.forEach((cat) => {
      const items = cat.items;
      const maxItems = 5;
      const totalParts = Math.ceil(items.length / maxItems);
      for (let i = 0; i < items.length; i += maxItems) {
        list.push({
          categoryTitle: cat.title,
          categorySubtitle: cat.subtitle,
          items: items.slice(i, i + maxItems),
          part: Math.floor(i / maxItems) + 1,
          totalParts,
        });
      }
    });
    return list;
  }, []);

  // Precompute the starting folio index for each category
  const categoryStartIndices = useMemo(() => {
    const map = {};
    folios.forEach((folio, idx) => {
      if (map[folio.categoryTitle] === undefined) {
        map[folio.categoryTitle] = idx;
      }
    });
    return map;
  }, [folios]);

  const totalPages = folios.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Mouse & touch drag tracking for the category ribbon (seamless finger swipe & mouse slide)
  const isCatDragging = useRef(false);
  const catStartX = useRef(0);
  const catScrollLeft = useRef(0);
  const catHasMoved = useRef(false);

  const handleCatMouseDown = (e) => {
    isCatDragging.current = true;
    catHasMoved.current = false;
    catStartX.current = e.pageX - (categoryBarRef.current?.offsetLeft || 0);
    catScrollLeft.current = categoryBarRef.current?.scrollLeft || 0;
  };

  const handleCatMouseMove = (e) => {
    if (!isCatDragging.current || !categoryBarRef.current) return;
    const x = e.pageX - (categoryBarRef.current.offsetLeft || 0);
    const walk = (x - catStartX.current) * 1.4;
    if (Math.abs(x - catStartX.current) > 5) {
      catHasMoved.current = true;
    }
    categoryBarRef.current.scrollLeft = catScrollLeft.current - walk;
  };

  const handleCatMouseUp = () => {
    isCatDragging.current = false;
  };

  const handleCatTouchStart = (e) => {
    catHasMoved.current = false;
    if (e.touches && e.touches[0]) {
      catStartX.current = e.touches[0].pageX;
    }
  };

  const handleCatTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      if (Math.abs(e.touches[0].pageX - catStartX.current) > 6) {
        catHasMoved.current = true;
      }
    }
  };

  // Active category title for styling the buttons
  const activeCategoryTitle = folios[currentPage]?.categoryTitle;

  // Jump directly to the first page of any category
  const jumpToCategory = (catTitle) => {
    const targetIndex = categoryStartIndices[catTitle];
    if (targetIndex !== undefined && targetIndex !== currentPage) {
      setFlipDirection(targetIndex > currentPage ? 1 : -1);
      setCurrentPage(targetIndex);
    }
  };

  // Guard to prevent scrolling on page load
  const isInitialMount = useRef(true);

  // Keep active button scrolled into center of the ribbon (purely container scroll, NEVER window scroll)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!activeCategoryTitle || !categoryBarRef.current) return;
    const btnId = `cat-btn-${activeCategoryTitle.replace(/\s+/g, '-')}`;
    const btnEl = document.getElementById(btnId);
    const container = categoryBarRef.current;
    if (btnEl && container) {
      const targetScroll = btnEl.offsetLeft - (container.offsetWidth / 2) + (btnEl.offsetWidth / 2);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [activeCategoryTitle]);

  // Turn forward (swipe left / drag left)
  const turnNext = () => {
    if (currentPage < totalPages - 1) {
      setFlipDirection(1);
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    }
  };

  // Turn backward (swipe right / drag right)
  const turnPrev = () => {
    if (currentPage > 0) {
      setFlipDirection(-1);
      setCurrentPage((prev) => Math.max(prev - 1, 0));
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

    // Detect horizontal swipe gesture:
    // Only turn pages if the swipe is predominantly horizontal
    if (Math.abs(diffX) > Math.abs(diffY) * 1.4 && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        turnNext();
      } else {
        turnPrev();
      }
    }
  };

  // Drag handler for desktop mouse drag
  const handleDragEnd = (event, info) => {
    if (event.pointerType === 'touch' || 'changedTouches' in event) return;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    if (offsetX < -40 || velocityX < -200) {
      turnNext();
    } else if (offsetX > 40 || velocityX > 200) {
      turnPrev();
    }
  };

  // Current Folio Data
  const currentFolio = folios[currentPage];

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
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-8 sm:py-14 px-3 sm:px-6 select-none"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #130E09 50%, #0A0A0A 100%)',
      }}
      aria-label="Our Menu"
    >
      {/* Royal Ambient Glow (safely sized for mobile & desktop to prevent horizontal blowout) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[600px] h-72 sm:h-[600px] bg-[#D4A843]/7 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none"
      />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 h-full">
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

        {/* ATTRACTIVE BLENDED ROYAL CATEGORY QUICK-JUMP RIBBON */}
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto mb-3 sm:mb-4.5 px-1 relative shrink-0">
          <div
            ref={categoryBarRef}
            onMouseDown={handleCatMouseDown}
            onMouseMove={handleCatMouseMove}
            onMouseUp={handleCatMouseUp}
            onMouseLeave={handleCatMouseUp}
            onTouchStart={handleCatTouchStart}
            onTouchMove={handleCatTouchMove}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 select-none cursor-grab active:cursor-grabbing"
            style={{
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {categoryButtons.map((cat) => {
              const isActive = activeCategoryTitle === cat.title;
              return (
                <button
                  key={cat.title}
                  id={`cat-btn-${cat.title.replace(/\s+/g, '-')}`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={(e) => {
                    if (e.detail !== 0 && catHasMoved.current) {
                      e.preventDefault();
                      return;
                    }
                    jumpToCategory(cat.title);
                  }}
                  className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-serif tracking-wide transition-all duration-300 shrink-0 flex items-center gap-1.5 cursor-pointer backdrop-blur-md select-none ${
                    isActive
                      ? 'bg-[#D4A843]/20 text-[#FAF6EC] border border-[#D4A843] shadow-[0_0_15px_rgba(212,168,67,0.35)] font-semibold scale-[1.03]'
                      : 'bg-[#18130E]/70 text-[#D4C4A8]/70 border border-[#D4A843]/20 hover:border-[#D4A843]/50 hover:text-[#FAF6EC] hover:bg-[#221A12]'
                  }`}
                >
                  {isActive && <span className="text-[9px] text-[#D4A843] animate-pulse">❖</span>}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D ROYAL FOLIO CASING
            touch-action: pan-y enables smooth native browser window scrolling on mobile vertical drag! */}
        <div
          className="relative w-full max-w-2xl lg:max-w-3xl mx-auto cursor-grab active:cursor-grabbing"
          style={{ perspective: '2000px', touchAction: 'pan-y' }}
          role="group"
          aria-label="Menu flipbook. Use the left and right arrow keys to turn pages."
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              turnPrev();
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              turnNext();
            }
          }}
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

            {/* Animated Royal Folio Page */}
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
                className="bg-[#FAF6EC] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative border border-[#E3D9C3] flex flex-col justify-between h-[510px] sm:h-[570px] md:h-[620px]"
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
                <div className="pt-3.5 sm:pt-6 pb-2 text-center px-4 sm:px-8 relative z-10 shrink-0 border-b border-[#EADECA]/80">
                  <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-[#8C5E14] tracking-tight">
                    {currentFolio.categoryTitle}
                  </h3>
                  <p className="text-[10.5px] sm:text-xs text-[#54483A] italic font-light mt-0.5 max-w-xl mx-auto line-clamp-1">
                    {currentFolio.categorySubtitle}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#9E6D18]/60" />
                    <span className="text-[9px] text-[#9E6D18]/70">❖</span>
                    <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#9E6D18]/60" />
                  </div>
                </div>

                {/* Folio Items (Fixed items per folio, zero internal vertical scroll, zero scroll trap!) */}
                <div className="px-4 sm:px-8 py-2 sm:py-3 space-y-2 sm:space-y-3 relative z-10 flex-1 overflow-hidden flex flex-col justify-start">
                  {currentFolio.items.map((item) => (
                    <div
                      key={item.id}
                      className="group pb-1.5 sm:pb-2 border-b border-[#EADECA]/70 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <div className="flex items-start gap-1.5 sm:gap-2 flex-1 min-w-0">
                          <DietaryBadge type={item.dietaryType} />
                          <h4 className="font-serif text-[13.5px] sm:text-[15.5px] font-bold text-[#8C5E14] leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        {item.badge && <RoyalBadge text={item.badge} />}
                      </div>
                      <p className="text-[10.5px] sm:text-[12.5px] text-[#453A2D] leading-relaxed font-light pl-4.5 sm:pl-5 text-justify line-clamp-2 sm:line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  ))}

                  {/* Decorative insignia for shorter folios */}
                  {currentFolio.items.length <= 3 && (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-30 py-3">
                      <span className="text-xs sm:text-sm tracking-widest text-[#9E6D18]">❖ ❖ ❖</span>
                      <p className="font-serif italic text-[10px] sm:text-[11px] text-[#54483A] mt-1">
                        Mehfil Rooftop Culinary Archive
                      </p>
                    </div>
                  )}
                </div>

                {/* Folio Footer with Instruction & Page Navigation */}
                <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#EADECA]/80 relative z-10 bg-[#F5EFE0]/80 flex items-center justify-between shrink-0">
                  <span aria-live="polite" className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-[#735818]">
                    Folio {currentPage + 1} of {totalPages}
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#8C5E14] font-medium tracking-wide">
                    <span className="animate-pulse" aria-hidden="true">←</span>
                    <span className="font-serif italic text-[11px] sm:text-xs">
                      Swipe left / right to turn page
                    </span>
                    <span className="animate-pulse" aria-hidden="true">→</span>
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
