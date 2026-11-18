// src/components/About.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: '50+',  label: 'Signature Dishes'  },
  { number: '500+', label: 'Happy Guests / Week' },
  { number: '4.8★', label: 'Average Rating'     },
  { number: '11 PM', label: 'Open Till Late'    },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
});

const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function CounterStat({ number, label, delay }) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="text-center"
    >
      <p
        className="font-serif text-3xl sm:text-4xl font-semibold mb-1"
        style={{
          background: 'linear-gradient(135deg, #D4A843, #E8782A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {number}
      </p>
      <p className="text-xs sm:text-sm text-mehfil-cream/50 tracking-wider uppercase font-medium">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden section-bg"
      aria-label="About Mehfil"
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #D4A843, transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #E8782A, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <p className="section-subheading mb-2">Our Story</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            More Than a Meal,{' '}
            <span className="font-serif italic text-mehfil-gold">a Gathering</span>
          </h2>
          <p className="mt-5 text-mehfil-cream/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Mehfil — an Urdu word for a gathering of kindred souls — was born from a vision to bring
            Berhampur its first true rooftop dining experience: open sky, warm lights, and unforgettable food.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Left – image stack */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card">
              <img
                src="/images/hero2.jpg"
                alt="Mehfil rooftop dining area at night"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 glass px-5 py-3 rounded-2xl">
                <p className="font-script text-2xl text-mehfil-gold leading-none">Open Since 2023</p>
                <p className="text-xs text-mehfil-cream/60 mt-0.5 tracking-wider uppercase">Berhampur's Finest Rooftop</p>
              </div>
            </div>

            {/* Floating secondary image */}
            <div
              className="absolute -bottom-6 right-2 sm:-bottom-8 sm:-right-6 w-36 sm:w-56 rounded-2xl overflow-hidden shadow-card border-2 border-mehfil-stone"
              style={{ animation: 'float 7s ease-in-out infinite' }}
            >
              <img
                src="/images/hero3.jpg"
                alt="Mehfil neon signage"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Gold ring accent */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-mehfil-gold/20"
              style={{ animation: 'rotateSlow 20s linear infinite' }}
            />
          </motion.div>

          {/* Right – text */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="font-serif italic text-xl text-mehfil-gold/80 mb-4 leading-relaxed">
                "Every meal should feel like a celebration."
              </p>
              <p className="text-mehfil-cream/65 leading-relaxed mb-4">
                Nestled on a rooftop in the heart of Berhampur, Mehfil offers a curated experience where 
                handcrafted cuisine meets an ambiance that whispers elegance. From the moment you step in, 
                the neon glow of our signature mandala, the rustling of palms in the breeze, and the aroma 
                of live charcoal grills set the stage.
              </p>
              <p className="text-mehfil-cream/65 leading-relaxed">
                Our chefs blend traditional Indian techniques with modern plating, ensuring that each dish 
                is a conversation — between flavour, texture and memory. Whether it's a quiet dinner for two 
                or a lively gathering, Mehfil makes every moment a mehfil.
              </p>
            </div>

            {/* Features list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Live Charcoal Grill',
                'Rooftop Open Sky',
                'Curated Cocktail Menu',
                'Private Dining Available',
                'Live Music Evenings',
                'Pet-Friendly Seating',
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-sm text-mehfil-cream/70">
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #D4A843, #E8782A)' }}>
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {feat}
                </li>
              ))}
            </ul>

            <button
              onClick={() => document.querySelector('#reservation').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary self-start"
            >
              Make a Reservation
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 glass rounded-3xl px-8 py-10">
          {stats.map((s, i) => (
            <CounterStat key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
