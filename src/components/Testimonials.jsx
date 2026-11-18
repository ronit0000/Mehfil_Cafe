// src/components/Testimonials.jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Priya Mohanty',
    location: 'Berhampur',
    rating: 5,
    text: 'The most magical dining experience in Odisha! The rooftop ambiance, the neon Mehfil sign glowing against the green wall — it felt like we were in another world. The Butter Chicken and Biryani were absolutely divine.',
    avatar: 'P',
    date: 'November 2026',
  },
  {
    id: 2,
    name: 'Rahul Sahoo',
    location: 'Bhubaneswar',
    rating: 5,
    text: 'Came for a birthday dinner and left completely blown away. The service is impeccable, the cocktails are creative, and the Chocolate Lava Cake deserves its own award. Will be back every weekend!',
    avatar: 'R',
    date: 'October 2026',
  },
  {
    id: 3,
    name: 'Ananya Das',
    location: 'Berhampur',
    rating: 5,
    text: 'Finally Berhampur has a rooftop that matches the best of Bhubaneswar! The ambiance is immaculate — dim lights, cool breeze, and flavours that linger for days. The Paneer Tikka is 10/10.',
    avatar: 'A',
    date: 'November 2026',
  },
  {
    id: 4,
    name: 'Deepak Panda',
    location: 'Brahmapur',
    rating: 5,
    text: 'Perfect date spot! The staff is extremely attentive. We celebrated our anniversary here and they surprised us with a complimentary dessert. The view of the city lights from the rooftop is breathtaking.',
    avatar: 'D',
    date: 'September 2026',
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-mehfil-gold' : 'text-white/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0B05 0%, #0A0A0A 100%)' }}
      aria-label="Guest testimonials"
    >
      {/* Warm background glow */}
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
          className="text-center mb-14"
        >
          <p className="section-subheading mb-2">Guest Love</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            What Our <span className="font-serif italic text-mehfil-gold">Guests</span> Say
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 sm:p-10"
            >
              {/* Quote mark */}
              <div
                className="font-serif text-7xl leading-none mb-4 -mt-2 -ml-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,67,0.4), rgba(232,120,42,0.2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                aria-hidden="true"
              >
                "
              </div>

              <StarRating count={reviews[current].rating} />

              <p className="text-mehfil-cream/75 text-base sm:text-lg leading-relaxed mt-5 mb-8 font-light italic">
                "{reviews[current].text}"
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl font-semibold text-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #D4A843, #E8782A)' }}
                  aria-hidden="true"
                >
                  {reviews[current].avatar}
                </div>
                <div>
                  <p className="font-semibold text-mehfil-cream text-sm">{reviews[current].name}</p>
                  <p className="text-xs text-mehfil-cream/45 mt-0.5">
                    {reviews[current].location} · {reviews[current].date}
                  </p>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-mehfil-gold/70 text-xs">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    Verified Diner
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-11 h-11 rounded-full border border-mehfil-gold/30 flex items-center justify-center text-mehfil-gold hover:bg-mehfil-gold/10 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`transition-all duration-400 rounded-full ${
                    i === current
                      ? 'w-6 h-1.5 bg-mehfil-gold'
                      : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="w-11 h-11 rounded-full border border-mehfil-gold/30 flex items-center justify-center text-mehfil-gold hover:bg-mehfil-gold/10 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Overall rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          {[
            { platform: 'Google', rating: '4.8', reviews: '240+' },
            { platform: 'Zomato', rating: '4.6', reviews: '180+' },
            { platform: 'Swiggy', rating: '4.7', reviews: '95+'  },
          ].map((p) => (
            <div
              key={p.platform}
              className="flex items-center gap-3 glass px-6 py-3 rounded-2xl"
            >
              <div>
                <p className="text-xs text-mehfil-cream/45 tracking-wider uppercase">{p.platform}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="font-serif text-2xl font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #D4A843, #E8782A)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {p.rating}★
                  </span>
                  <span className="text-xs text-mehfil-cream/40">({p.reviews} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
