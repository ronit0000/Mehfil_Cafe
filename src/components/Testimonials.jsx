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
      {/* Decorative top edge */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="section-subheading mb-2">Guest Love</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            Google Reviews of <span className="font-serif italic text-mehfil-gold">Mehfil</span>
          </h2>
          <p className="mt-4 text-mehfil-cream/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Real feedback from verified diners visiting our rooftop in Berhampur.
          </p>
        </motion.div>

        {/* Google AI / Overview Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-10 rounded-3xl p-5 sm:p-7 glass border border-mehfil-gold/25 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-serif text-2xl font-bold text-black flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #D4A843, #E8782A)' }}
              >
                4.8★
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-mehfil-cream">Mehfil Berhampur</h3>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-mehfil-gold/15 text-mehfil-gold font-medium border border-mehfil-gold/30">
                    Google Maps
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating count={4.8} />
                  <span className="text-xs text-mehfil-cream/50">(47+ reviews)</span>
                </div>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs py-2.5 px-4 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
            >
              <span>View on Google Maps</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-xs sm:text-sm text-mehfil-cream/70 leading-relaxed italic">
              "Diners like this cafe's delicious food, especially the mutton biryani, and appreciate the wide variety of options available. They also highlight the beautiful ambiance, with open-air seating and warm fairy lights, creating a perfect spot for chill evenings. Guests mention the excellent service and affordable prices, making it a great place for quality time with friends and family."
            </p>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Reviews (9)' },
            { id: '5', label: '5.0★ (6)' },
            { id: 'mixed', label: '4.0★ & 4.5★ (3)' },
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

        {/* Testimonial card */}
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
