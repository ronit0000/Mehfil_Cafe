// src/components/Gallery.jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { animate, motion, useInView, useMotionValue, AnimatePresence } from 'framer-motion';

const storyMoments = [
  {
    id: 1,
    src: '/images/hero1.jpg',
    tag: 'Signature Photo Spot',
    title: 'The Illuminated Mandala Wall',
    location: 'Main Rooftop Deck',
    story:
      'The crown jewel of Mehfil’s evening identity: our radiant coffee-mandala emblem glowing in warm neon ambers against a lush botanical hedge. Framed by tropical umbrellas and warm ground uplighting, it is the favorite backdrop for friends and couples capturing their night in Berhampur.',
    highlight: 'Warm Amber Glow · Living Foliage Backdrop',
  },
  {
    id: 2,
    src: '/images/hero2.jpg',
    tag: 'Outdoor Dining Sanctuary',
    title: 'Dining Under the Open Sky',
    location: 'Central Terrace & Canopies',
    story:
      'Wide-span patio umbrellas shelter handcrafted tables with comfortable cushioned seating, offering an uninterrupted view of the Berhampur night sky. As the evening cools, gentle cross-breezes flow across the terrace, making every dinner leisurely and serene.',
    highlight: 'Open Terrace · Gentle Evening Breeze',
  },
  {
    id: 3,
    src: '/images/hero3.jpg',
    tag: 'Fairy Light Ambiance',
    title: 'Candlelit Evenings & Golden Lights',
    location: 'Perimeter Lounges',
    story:
      'Strands of warm fairy lights trace the rooftop balustrades, casting a soft, golden shimmer over every table. Designed for peaceful dates, soulful music, and unwinding after a long day with aromatic coffee and hot delicacies.',
    highlight: 'Starlit Ambiance · Romantic Mood',
  },
  {
    id: 4,
    src: '/images/hero2.jpg',
    tag: 'Celebrated Culinary Craft',
    title: 'Flavors That Define Berhampur Evenings',
    location: 'Chef’s Kitchen',
    story:
      'From our critically acclaimed tender Mutton Biryani—praised across Google Reviews—to sizzling tandoori platters and rich mocktails, each dish is prepared with fresh local ingredients and authentic artisanal spices.',
    highlight: 'Acclaimed Biryani · Artisan Spices',
  },
  {
    id: 5,
    src: '/images/hero3.jpg',
    tag: 'Social Gatherings & Warmth',
    title: 'Where Kindred Souls Gather',
    location: 'Group Tables & Chill Zone',
    story:
      'True to its name, Mehfil is a gathering space built for celebration. From joyful birthday surprises and college reunions to family dinners under the stars, our attentive team ensures every guest feels cherished.',
    highlight: 'Attentive Staff · Affordable Luxury',
  },
  {
    id: 6,
    src: '/images/hero1.jpg',
    tag: 'NH Side Twilight Vista',
    title: 'Twilight Above the City Hustle',
    location: 'Skyline Terrace',
    story:
      'Positioned along the NH corridor in Berhampur, the elevated terrace provides a tranquil vantage point as dusk falls into velvety night. Sip on signature coolers as the city lights shimmer in the distance.',
    highlight: 'Elevated Views · Night Sky Panorama',
  },
];

const STORY_DURATION = 4;
const controlClass = 'rounded-full border border-mehfil-gold/30 px-3 py-2 text-xs font-semibold text-mehfil-gold hover:bg-mehfil-gold/10';

export default function Gallery() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const carouselInView = useInView(carouselRef, { amount: 0.25 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHolding, setIsHolding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const pointerStart = useRef(null);

  const total = storyMoments.length;
  const activeStory = storyMoments[current];

  const goToSlide = useCallback((step) => {
    progress.jump(0);
    setDirection(step);
    setCurrent((prev) => (prev + step + total) % total);
  }, [progress, total]);

  useEffect(() => {
    if (!carouselInView || isHolding || isPaused) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let playback;
    function updatePlayback() {
      playback?.stop();
      if (reducedMotion.matches) return;
      playback = animate(progress, 1, {
        duration: STORY_DURATION * (1 - progress.get()),
        ease: 'linear',
        onComplete: () => goToSlide(1),
      });
    }
    updatePlayback();
    reducedMotion.addEventListener('change', updatePlayback);
    return () => {
      playback?.stop();
      reducedMotion.removeEventListener('change', updatePlayback);
    };
  }, [carouselInView, current, goToSlide, isHolding, isPaused, progress]);

  // Pointer interactions: tap left/right to skip, hold to pause
  const handlePointerDown = (e) => {
    if (!e.isPrimary || e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    setIsHolding(true);
  };

  const handlePointerUp = (e) => {
    if (!e.isPrimary || !pointerStart.current) return;
    const { x, y, time } = pointerStart.current;
    pointerStart.current = null;
    setIsHolding(false);
    if (Date.now() - time < 220 && Math.hypot(e.clientX - x, e.clientY - y) < 10) {
      const rect = e.currentTarget.getBoundingClientRect();
      goToSlide(e.clientX - rect.left < rect.width * 0.35 ? -1 : 1);
    }
  };

  const handlePointerCancel = () => {
    pointerStart.current = null;
    setIsHolding(false);
  };

  const navigateFromControls = (step) => {
    setIsPaused(true);
    goToSlide(step);
  };

  // Slide animation variants for right-to-left motion
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden section-bg select-none"
      aria-label="Through the Lens - The Mehfil Experience"
    >
      {/* Decorative ambient backdrop glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-mehfil-gold/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="section-subheading mb-2">Through the Lens</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            The <span className="font-serif italic text-mehfil-gold">Mehfil</span> Experience
          </h2>
          <p className="mt-4 text-mehfil-cream/65 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            A visual walkthrough across our open-sky terrace in Berhampur.
          </p>
        </motion.div>

        {/* Single-Image Showcase & Story Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main Visual Display Frame (Single Image at a time) */}
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-3xl border border-white/10 shadow-card bg-black/40 touch-pan-y touch-pinch-zoom cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerCancel}
            onPointerCancel={handlePointerCancel}
          >
            {/* Instagram Story Progress Segments at Top */}
            <div aria-hidden="true" className="absolute top-3 left-4 right-4 z-20 flex gap-1.5 pointer-events-none">
              {storyMoments.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm"
                >
                  <motion.div
                    className="h-full bg-mehfil-gold"
                    style={{
                      scaleX: idx < current ? 1 : idx === current ? progress : 0,
                      originX: 0,
                    }}
                  />
                </div>
              ))}
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeStory.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] max-h-[500px]"
              >
                {/* Full Unobstructed High-Res Image */}
                <img
                  src={activeStory.src}
                  alt={activeStory.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />

                {/* Subtle edge vignette for focus without obscuring the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge: Category & Counter */}
                <div className="absolute top-7 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-mehfil-gold/30 text-mehfil-gold shadow-md">
                    {activeStory.tag}
                  </span>

                  <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-mehfil-cream/80">
                    {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>

                {/* Golden Corner Accents */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-mehfil-gold/40 rounded-tr-md pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-mehfil-gold/40 rounded-bl-md pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex justify-center gap-2" aria-label="Gallery controls" role="group">
            <button type="button" className={controlClass} aria-label="Previous gallery photo" onClick={() => navigateFromControls(-1)}>
              Previous
            </button>
            <button type="button" className={`${controlClass} motion-reduce:hidden`} onClick={() => setIsPaused((paused) => !paused)}>
              {isPaused ? 'Play slideshow' : 'Pause slideshow'}
            </button>
            <button type="button" className={controlClass} aria-label="Next gallery photo" onClick={() => navigateFromControls(1)}>
              Next
            </button>
          </div>

          {/* Dedicated Story Card - Located directly UNDERNEATH the image */}
          <div aria-live={isPaused ? 'polite' : 'off'} className="mt-4 sm:mt-5 glass rounded-3xl p-6 sm:p-8 border border-mehfil-gold/20 shadow-card relative">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-mehfil-gold animate-pulse flex-shrink-0" />
              <span className="text-xs uppercase tracking-wider font-medium text-mehfil-gold">
                {activeStory.location}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`story-${activeStory.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-3">
                  {activeStory.title}
                </h3>
                <p className="text-sm sm:text-base text-mehfil-cream/75 leading-relaxed font-light">
                  {activeStory.story}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-mehfil-cream/50">
                  <div className="flex items-center gap-2">
                    <span className="text-mehfil-gold">✦</span>
                    <span>{activeStory.highlight}</span>
                  </div>
                  <span className="font-mono text-mehfil-cream/40">
                    {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Instagram Follow Callout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-mehfil-cream/50 text-xs sm:text-sm mb-3">
            Follow us for live rooftop stories and daily evening specials
          </p>
          <a
            href="https://www.instagram.com/_mehfil_berhampur/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2.5 text-xs sm:text-sm py-3 px-6 rounded-full hover:border-mehfil-gold"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-mehfil-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>Follow @_mehfil_berhampur</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
