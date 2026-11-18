// src/components/Testimonials.jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Mehfil+Berhampur/@19.2800601,84.7841316,822m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a3d5b004d6e8d1b:0x44f2d5dc61db0c4a!8m2!3d19.2800601!4d84.7867065!16s%2Fg%2F11z0pdj8vk?entry=ttu&g_ep=EgoyMDI2MTExNS4wIKXMDSoASAFQAw%3D%3D';

const reviews = [
  {
    id: 1,
    name: 'Dipesh raju',
    role: 'Local Guide · 7 reviews',
    rating: 5,
    tag: 'Mutton Biryani',
    text: 'Bestt mutton biryani in berhampur , must have and the staff here are really great . Had a great experience. 😇',
    avatar: 'D',
    date: '4 weeks ago',
  },
  {
    id: 2,
    name: 'Sujit Pattanaik',
    role: 'Local Guide · 9 reviews',
    rating: 5,
    tag: 'Food & Ambience',
    text: 'Had a wonderful experience at Mehfil Berhampur! The food was delicious, the service was excellent, and the ambience was beautiful. A perfect place to enjoy great food and spend quality time with friends and family. Highly recommended! ⭐⭐⭐⭐⭐',
    avatar: 'S',
    date: '4 weeks ago',
  },
  {
    id: 3,
    name: 'Pallavi Rana',
    role: 'Local Guide · 17 reviews',
    rating: 4.5,
    tag: 'Fairy Lights & Dates',
    text: 'The ambience & location are definitely the highlight ! Open-air seating, warm fairy lights - perfect for chill evenings, dates, or casual hangouts.',
    avatar: 'P',
    date: '6 months ago',
  },
  {
    id: 4,
    name: 'Barsha Rani',
    role: 'Local Guide · 27 reviews',
    rating: 5,
    tag: 'NH Side & Dark Sky',
    text: 'This place is one of the best place in town . NH side view in evening and dark sky view of night is perfect combination of peace and happiness. The food was so delicious with perfect flavours. Everyone should must visit this place!',
    avatar: 'B',
    date: '8 months ago',
  },
  {
    id: 5,
    name: 'Rohan Khan',
    role: 'Verified Diner · 1 review',
    rating: 4.5,
    tag: 'Lots of Options',
    text: "Didn't expect berhampur has this kind of ambience, one of the best cafes I have ever visited. Lots of options, everything is available and very fresh.",
    avatar: 'R',
    date: '1 month ago',
  },
  {
    id: 6,
    name: 'Basudev Reddy',
    role: 'Verified Diner · 5 reviews',
    rating: 5,
    tag: 'Friendly Staff',
    text: 'We came to mehafil cafe enjoyed a lot & the service of mukesh sahu behaviour was literally good .. thank you mehafil cafe ❤️',
    avatar: 'B',
    date: '1 week ago',
  },
  {
    id: 7,
    name: 'Monalisha Sabat',
    role: 'Local Guide · 14 reviews',
    rating: 4,
    tag: 'Rooftop View',
    text: 'Beautiful view with wonderful food and peaceful rooftop vibes. A refreshing change for dining out in Berhampur.',
    avatar: 'M',
    date: '6 months ago',
  },
  {
    id: 8,
    name: 'Prabhu Prasad Pattnaik',
    role: 'Verified Diner · 1 review',
    rating: 5,
    tag: 'Hangout Spot',
    text: 'We visited today evening perfect for hangout spot with friends, also family and food is osm must visit.',
    avatar: 'P',
    date: '1 week ago',
  },
  {
    id: 9,
    name: 'Priyanka Sahu',
    role: 'Verified Diner · 5 reviews',
    rating: 4.5,
    tag: 'Pocket Friendly',
    text: 'Everything was so on point 💗✨ Good food, reasonable prices between ₹200–400, and unmatched night vibes on the terrace.',
    avatar: 'P',
    date: '1 month ago',
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = count >= star;
        const isHalf = count === star - 0.5;

        return (
          <span key={star} className="relative inline-block w-4 h-4 text-mehfil-gold">
            {isFull ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : isHalf ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="#D4A843" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                  </linearGradient>
                </defs>
                <path fill={`url(#half-${star})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white/20 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </span>
        );
      })}
      <span className="ml-1 text-xs font-semibold text-mehfil-gold">{count.toFixed(1)}</span>
    </div>
  );
}

export default function Testimonials() {
  const [filter, setFilter] = useState('all');
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter((r) => (filter === '5' ? r.rating === 5 : r.rating === 4.5 || r.rating === 4));

  const activeIndex = current % (filteredReviews.length || 1);
  const activeReview = filteredReviews[activeIndex] || filteredReviews[0];

  const prev = () => setCurrent((c) => (c - 1 + filteredReviews.length) % filteredReviews.length);
  const next = () => setCurrent((c) => (c + 1) % filteredReviews.length);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0B05 0%, #0A0A0A 100%)' }}
      aria-label="Guest testimonials and Google reviews"
    >
      {/* Decorative top border */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.3), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,67,0.4), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="section-subheading mb-2">Guest Love</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            Loved on <span className="font-serif italic text-mehfil-gold">Google</span>
          </h2>
          <p className="mt-4 text-mehfil-cream/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Rated by patrons who dine, celebrate, and unwind under the open sky at Mehfil Berhampur.
          </p>
        </motion.div>

        {/* Redesigned Luxury Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl p-6 sm:p-8 mb-8 border border-mehfil-gold/20 shadow-card"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
            {/* Rating Metric */}
            <div className="flex items-center gap-4 text-left">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-mehfil-gold/30 shadow-glow-sm">
                <span className="font-serif text-3xl font-bold text-mehfil-gold leading-none">4.8</span>
                <span className="text-[10px] uppercase text-mehfil-cream/50 tracking-widest mt-1">out of 5</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <StarRating count={4.8} />
                  <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-mehfil-cream/60 mt-1">
                  Based on 47+ verified reviews on Google Maps
                </p>
              </div>
            </div>

            {/* Direct Link Button */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-mehfil-gold hover:text-mehfil-cream transition-colors py-2.5 px-4 rounded-full bg-mehfil-gold/10 border border-mehfil-gold/30 hover:border-mehfil-gold"
            >
              <span>Read on Google Maps</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Diners' Key Highlights Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
            {[
              {
                icon: '🍛',
                title: 'Mutton Biryani',
                subtitle: 'Most acclaimed dish in reviews',
              },
              {
                icon: '✨',
                title: 'Open-Air Fairy Lights',
                subtitle: 'Peaceful night ambiance & views',
              },
              {
                icon: '🤍',
                title: 'Courteous Staff',
                subtitle: 'Attentive service & fair prices',
              },
            ].map((highlight) => (
              <div
                key={highlight.title}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <span className="text-xl flex-shrink-0">{highlight.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-mehfil-cream truncate">{highlight.title}</p>
                  <p className="text-[10px] text-mehfil-cream/45 truncate">{highlight.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Reviews (9)' },
            { id: '5', label: '5.0★ Experiences (6)' },
            { id: 'mixed', label: '4.5★ & 4.0★ (3)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setFilter(item.id);
                setCurrent(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === item.id
                  ? 'bg-mehfil-gold text-black font-semibold shadow-glow-sm'
                  : 'bg-white/5 text-mehfil-cream/60 hover:text-mehfil-gold border border-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${activeIndex}`}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-6 sm:p-9 shadow-card relative border border-white/10"
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <StarRating count={activeReview.rating} />
                <span className="text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-white/5 border border-mehfil-gold/20 text-mehfil-gold font-medium">
                  {activeReview.tag}
                </span>
              </div>

              <p className="text-mehfil-cream/85 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-light italic">
                "{activeReview.text}"
              </p>

              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-lg font-semibold text-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #D4A843, #E8782A)' }}
                  aria-hidden="true"
                >
                  {activeReview.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-mehfil-cream text-sm truncate">{activeReview.name}</p>
                  <p className="text-xs text-mehfil-cream/50 mt-0.5 truncate">
                    {activeReview.role} · {activeReview.date}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-green-400 text-xs">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: min 44px tap targets for mobile */}
          <div className="flex items-center justify-between mt-6 px-1">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-12 h-12 rounded-full border border-mehfil-gold/30 flex items-center justify-center text-mehfil-gold hover:bg-mehfil-gold/10 active:scale-95 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
              {filteredReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    i === activeIndex ? 'w-6 bg-mehfil-gold' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="w-12 h-12 rounded-full border border-mehfil-gold/30 flex items-center justify-center text-mehfil-gold hover:bg-mehfil-gold/10 active:scale-95 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
