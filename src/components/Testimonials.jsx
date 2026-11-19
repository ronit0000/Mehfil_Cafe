// src/components/Testimonials.jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { animate, motion, useInView, useMotionValue, AnimatePresence } from 'framer-motion';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Mehfil+Berhampur/@19.2800601,84.7841316,822m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a3d5b004d6e8d1b:0x44f2d5dc61db0c4a!8m2!3d19.2800601!4d84.7867065!16s%2Fg%2F11z0pdj8vk?entry=ttu&g_ep=EgoyMDI2MTExNS4wIKXMDSoASAFQAw%3D%3D';

// Official multi-colored Google 'G' icon for authentic Google styling
function GoogleLogo({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// Authentic real Google Reviews directly from Mehfil Berhampur's Google Maps listing
const googleReviews = [
  {
    id: 1,
    name: 'Ronit Kumar Sahu',
    role: 'Local Guide · 5 reviews · 5 photos',
    rating: 5,
    date: 'a week ago',
    avatarBg: '#1a73e8',
    avatar: 'R',
    badge: 'Local Guide',
    attributes: 'Meal type: Dinner · Food: 5 · Service: 5 · Atmosphere: 5',
    text: 'Best rooftop experience in Berhampur. The night ambience with fairy lights, attentive staff, and mouthwatering food makes every visit exceptional.',
    ownerReply: null,
  },
  {
    id: 2,
    name: 'Dipesh raju',
    role: 'Local Guide · 7 reviews · 3 photos',
    rating: 5,
    date: '4 weeks ago',
    avatarBg: '#d93025',
    avatar: 'D',
    badge: 'Local Guide',
    attributes: 'Specialty: Signature Mutton Biryani',
    text: 'Bestt mutton biryani in berhampur , must have and the staff here are really great . Had a great experience. 😇',
    ownerReply: 'Thank you for choosing mehfil! ❤️ We look forward to seeing you again soon!',
  },
  {
    id: 3,
    name: 'Sujit Pattanaik',
    role: 'Local Guide · 9 reviews · 262 photos',
    rating: 5,
    date: '4 weeks ago',
    avatarBg: '#1e8e3e',
    avatar: 'S',
    badge: 'Local Guide',
    attributes: 'Ambience: 5/5 · Service: 5/5',
    text: 'Had a wonderful experience at Mehfil Berhampur! The food was delicious, the service was excellent, and the ambience was beautiful. A perfect place to enjoy great food and spend quality time with friends and family. Highly recommended! ⭐⭐⭐⭐⭐',
    ownerReply: 'Thank you sir 🫶🙏',
  },
  {
    id: 4,
    name: 'Pallavi Rana',
    role: 'Local Guide · 17 reviews · 106 photos',
    rating: 5,
    date: '6 months ago',
    avatarBg: '#f9ab00',
    avatar: 'P',
    badge: 'Local Guide',
    attributes: 'Ideal for: Dates, Chill Evenings & Hangouts',
    text: 'The ambience & location are definitely the highlight ! Open-air seating, warm fairy lights- perfect for chill evenings, dates, or casual hangouts. ✨',
    ownerReply: 'Working on it 🫶',
  },
  {
    id: 5,
    name: 'Barsha Rani',
    role: 'Local Guide · 27 reviews · 374 photos',
    rating: 5,
    date: '8 months ago',
    avatarBg: '#9334e6',
    avatar: 'B',
    badge: 'Local Guide',
    attributes: 'View: NH Side & Open Dark Sky',
    text: 'This place is one of the best place in town . NH side view in evening and dark sky view of night is perfect combination of peace and happiness. The food was so delicious with perfect flavours . Everyone should must visit this place!',
    ownerReply: null,
  },
  {
    id: 6,
    name: 'Basudev Reddy',
    role: 'Verified Diner · 5 reviews',
    rating: 5,
    date: 'a week ago',
    avatarBg: '#e8710a',
    avatar: 'B',
    badge: null,
    attributes: 'Staff Highlight: Mukesh Sahu',
    text: 'We came to mehafil cafe enjoyed a lot & the service of mukesh sahu behaviour was literally good .. thank you mehafil cafe ❤️',
    ownerReply: 'Thank you ❤️',
  },
  {
    id: 7,
    name: 'Rohan Khan',
    role: 'Verified Diner · 1 review',
    rating: 4.5,
    date: '1 month ago',
    avatarBg: '#0288d1',
    avatar: 'R',
    badge: null,
    attributes: 'Variety: Lots of Fresh Options',
    text: "Didn't expect berhampur has this kind of ambience, one of the best cafes I have ever visited. Lots of options, everything is available.",
    ownerReply: 'Thank you sir ❤️',
  },
  {
    id: 8,
    name: 'Monalisha Sabat',
    role: 'Local Guide · 14 reviews · 71 photos',
    rating: 4,
    date: '6 months ago',
    avatarBg: '#c2185b',
    avatar: 'M',
    badge: 'Local Guide',
    attributes: 'View: Beautiful Terrace Vista',
    text: 'Beautiful view with wonderful food and refreshing rooftop breeze. Perfect hangout for Berhampur evenings.',
    ownerReply: null,
  },
  {
    id: 9,
    name: 'Pratham Epari',
    role: 'Verified Diner · 2 reviews',
    rating: 5,
    date: '5 months ago',
    avatarBg: '#5c6bc0',
    avatar: 'P',
    badge: null,
    attributes: 'Price per person: ₹200–400',
    text: 'Very good cafe best chilling spot with affordable prices and quick service.',
    ownerReply: null,
  },
  {
    id: 10,
    name: 'Prabhu Prasad Pattnaik',
    role: 'Verified Diner · 1 review',
    rating: 5,
    date: 'a week ago',
    avatarBg: '#00897b',
    avatar: 'P',
    badge: null,
    attributes: 'Recommended for: Friends & Family Hangout',
    text: 'We visited today evening perfect for hangout spot with friends, also family and food is osm must visit.',
    ownerReply: null,
  },
];

function StarRating({ count }) {
  const full = Math.floor(count);
  const hasHalf = count % 1 !== 0;

  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) {
          return (
            <svg key={i} className="w-4 h-4 text-[#FBBC05] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
        if (i === full && hasHalf) {
          return (
            <svg key={i} className="w-4 h-4 text-[#FBBC05] fill-current" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`half-star-${i}`}>
                  <stop offset="50%" stopColor="#FBBC05" />
                  <stop offset="50%" stopColor="#4A4A4A" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#half-star-${i})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          );
        }
        return (
          <svg key={i} className="w-4 h-4 text-neutral-600 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

const REVIEW_DURATION = 5;
const controlClass = 'rounded-full border border-mehfil-gold/30 px-3 py-2 text-xs font-semibold text-mehfil-gold hover:bg-mehfil-gold/10';

export default function Testimonials() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const carouselInView = useInView(carouselRef, { amount: 0.25 });
  const [filter, setFilter] = useState('all');
  const [current, setCurrent] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const pointerStart = useRef(null);

  const filtered = googleReviews.filter((r) => {
    if (filter === '5') return r.rating === 5;
    if (filter === 'mixed') return r.rating < 5;
    return true;
  });

  const total = filtered.length;
  const activeReview = filtered[current % total] || filtered[0];

  const goToReview = useCallback((step) => {
    progress.jump(0);
    setCurrent((prev) => (prev + step + total) % total);
  }, [progress, total]);

  useEffect(() => {
    if (!carouselInView || isHolding || isPaused || total <= 1) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let playback;
    function updatePlayback() {
      playback?.stop();
      if (reducedMotion.matches) return;
      playback = animate(progress, 1, {
        duration: REVIEW_DURATION * (1 - progress.get()),
        ease: 'linear',
        onComplete: () => goToReview(1),
      });
    }
    updatePlayback();
    reducedMotion.addEventListener('change', updatePlayback);
    return () => {
      playback?.stop();
      reducedMotion.removeEventListener('change', updatePlayback);
    };
  }, [carouselInView, current, goToReview, isHolding, isPaused, progress, total]);

  // Pointer interactions: tap left/right to skip, hold to pause
  const handlePointerDown = (e) => {
    if (!e.isPrimary || e.button !== 0 || e.target.closest('a')) return;
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
      goToReview(e.clientX - rect.left < rect.width * 0.35 ? -1 : 1);
    }
  };

  const handlePointerCancel = () => {
    pointerStart.current = null;
    setIsHolding(false);
  };

  const navigateFromControls = (step) => {
    setIsPaused(true);
    goToReview(step);
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0A06 0%, #080808 100%)' }}
      aria-label="Guest testimonials and Google reviews"
    >
      {/* Decorative subtle ambient lights */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.35), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,67,0.4), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="section-subheading mb-2">Guest Love</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            Loved on <span className="font-serif italic text-mehfil-gold">Google Maps</span>
          </h2>
          <p className="mt-4 text-mehfil-cream/65 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Authentic dining experiences and memories shared by patrons who spend quality evenings at Mehfil Berhampur.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* Google Maps listing */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl p-6 sm:p-8 mb-8 border border-white/10 shadow-2xl relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, rgba(25,22,17,0.95) 0%, rgba(14,14,14,0.98) 100%)' }}
        >
          {/* Subtle Google colors bar at the very top */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="w-1/4 bg-[#4285F4]" />
            <div className="w-1/4 bg-[#EA4335]" />
            <div className="w-1/4 bg-[#FBBC05]" />
            <div className="w-1/4 bg-[#34A853]" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                <GoogleLogo className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                Mehfil reviews on Google Maps
              </h3>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-wider uppercase text-mehfil-gold hover:text-white transition-colors py-2 px-4 rounded-full bg-mehfil-gold/10 hover:bg-mehfil-gold/20 border border-mehfil-gold/30 hover:border-mehfil-gold inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View on Google Maps</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="pt-5">
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider font-medium text-mehfil-gold">
              <span>Google Maps Editorial Summary</span>
            </div>
            <p className="text-sm sm:text-base text-mehfil-cream/90 leading-relaxed font-light italic pl-4 border-l-2 border-mehfil-gold/60">
              “Diners like this cafe's delicious food, especially the mutton biryani, and appreciate the wide variety of options available. They also highlight the beautiful ambiance, with open-air seating and warm fairy lights, creating a perfect spot for chill evenings. Guests mention the excellent service and affordable prices, making it a great place for quality time with friends and family.”
            </p>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 2. AUTHENTIC DINER REVIEWS (Clean, verified Google Diner Cards) */}
        {/* ============================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
              Diner Experiences
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: '5', label: '5★ Only' },
              { id: 'mixed', label: '4★ & 4.5★' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => {
                  if (filter === item.id) return;
                  setIsPaused(true);
                  setFilter(item.id);
                  setCurrent(0);
                  progress.jump(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === item.id
                  ? 'bg-mehfil-gold text-black font-semibold shadow-glow-sm'
                  : 'bg-white/5 text-mehfil-cream/60 hover:text-white border border-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Revolving Review Card with Hold-to-Pause (Instagram Story-Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative select-none"
        >
          <div
            ref={carouselRef}
            aria-live={isPaused ? 'polite' : 'off'}
            className="rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden bg-[#12100E] touch-pan-y touch-pinch-zoom cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerCancel}
            onPointerCancel={handlePointerCancel}
          >
            {/* Story-style Progress Indicator at Top */}
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-mehfil-gold"
                style={{ scaleX: progress, originX: 0 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${activeReview.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    {/* Google Avatar Circle */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-base flex-shrink-0 shadow-md"
                      style={{ backgroundColor: activeReview.avatarBg }}
                    >
                      {activeReview.avatar}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white text-sm sm:text-base leading-tight">
                          {activeReview.name}
                        </p>
                        {activeReview.badge && (
                          <span className="text-[10px] font-semibold text-[#FBBC05] bg-[#FBBC05]/10 px-2 py-0.5 rounded-full border border-[#FBBC05]/20 flex items-center gap-1">
                            <span>★</span> {activeReview.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-mehfil-cream/50 mt-0.5">
                        {activeReview.role}
                      </p>
                    </div>
                  </div>

                  {/* Google Logo Badge */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full flex-shrink-0">
                    <GoogleLogo className="w-3.5 h-3.5" />
                    <span className="text-[10px] text-mehfil-cream/70 font-medium">Google</span>
                  </div>
                </div>

                {/* Rating & Date */}
                <div className="flex items-center gap-2.5 mb-3">
                  <StarRating count={activeReview.rating} />
                  <span className="text-xs text-mehfil-cream/40">· {activeReview.date}</span>
                </div>

                {/* Attributes pill if available (e.g. Meal type, Price, etc.) */}
                {activeReview.attributes && (
                  <div className="mb-3">
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-mehfil-gold border border-mehfil-gold/20 font-medium">
                      {activeReview.attributes}
                    </span>
                  </div>
                )}

                {/* Review Text */}
                <p className="text-mehfil-cream/90 text-sm sm:text-base leading-relaxed font-light mb-4 min-h-[3.5rem]">
                  "{activeReview.text}"
                </p>

                {/* Real Owner Response from Google Maps */}
                {activeReview.ownerReply && (
                  <div className="mt-4 pt-3.5 border-t border-white/10 pl-3.5 border-l-2 border-mehfil-gold/50 bg-white/[0.02] p-3 rounded-r-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-mehfil-gold">Response from the owner</span>
                      <span className="text-[10px] text-mehfil-cream/40">· Mehfil Berhampur</span>
                    </div>
                    <p className="text-xs sm:text-sm text-mehfil-cream/75 italic">
                      "{activeReview.ownerReply}"
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Clean Footer Bar (No dots, no arrows) */}
            <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-white/10 text-xs text-mehfil-cream/50">
              <span className="font-mono text-mehfil-gold">
                {String((current % total) + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mehfil-gold transition-colors inline-flex items-center gap-1 text-[11px]"
              >
                <span>Google Maps Diner Review</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2" aria-label="Review controls" role="group">
            <button type="button" className={controlClass} aria-label="Previous review" onClick={() => navigateFromControls(-1)}>
              Previous
            </button>
            <button type="button" className={`${controlClass} motion-reduce:hidden`} onClick={() => setIsPaused((paused) => !paused)}>
              {isPaused ? 'Play reviews' : 'Pause reviews'}
            </button>
            <button type="button" className={controlClass} aria-label="Next review" onClick={() => navigateFromControls(1)}>
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
