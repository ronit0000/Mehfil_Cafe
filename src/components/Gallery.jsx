// src/components/Gallery.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const galleryImages = [
  {
    src: '/images/hero1.jpg',
    title: 'Neon Mandala Wall',
    desc: 'Signature warm glowing backdrop framed with living greenery',
    tag: 'Photo Spot',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/hero2.jpg',
    title: 'Umbrella Seating',
    desc: 'Open sky dining under the Berhampur night breeze',
    tag: 'Outdoor Dining',
  },
  {
    src: '/images/hero3.jpg',
    title: 'Fairy Light Ambiance',
    desc: 'Warm ambient lighting with open city view',
    tag: 'Ambiance',
  },
  {
    src: '/images/hero2.jpg',
    title: 'Intimate Table Corner',
    desc: 'Cozy candlelit setup for dates and deep talks',
    tag: 'Date Spot',
  },
  {
    src: '/images/hero1.jpg',
    title: 'Twilight Glow',
    desc: 'Where the rooftop shines as dusk settles',
    tag: 'Evening Vibe',
  },
  {
    src: '/images/hero3.jpg',
    title: 'Rooftop Chill Zone',
    desc: 'Unwind with friends, family and signature food',
    tag: 'Celebrations',
  },
];

function GalleryItem({ image, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group shadow-card border border-white/10 ${image.span || ''}`}
      style={{ aspectRatio: image.span ? '1/1' : '4/3' }}
    >
      {/* Full Photo - 90%+ visible without dark overlays obscuring it */}
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        loading="lazy"
      />

      {/* Gentle bottom shadow only for contrast behind the label */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Top Tag Pill */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
        <span className="text-[10px] sm:text-xs tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-mehfil-gold/30 text-mehfil-gold font-medium shadow-md">
          {image.tag}
        </span>
      </div>

      {/* Sleek Floating Glass Bottom Capsule - compact, useful, does not cover the photo */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{
          duration: 0.5,
          delay: 0.15 + (index % 3) * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 z-10 pointer-events-none"
      >
        <div className="glass px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-between gap-2 shadow-lg group-hover:border-mehfil-gold/40 transition-colors">
          <div className="min-w-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-mehfil-gold flex-shrink-0 animate-pulse" />
            <p className="text-xs sm:text-sm font-serif text-white font-medium truncate group-hover:text-mehfil-gold transition-colors">
              {image.title}
            </p>
          </div>
          <span className="text-[10px] text-mehfil-cream/50 truncate hidden sm:inline-block font-light">
            {image.desc}
          </span>
        </div>
      </motion.div>

      {/* Golden Corner Accent */}
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-mehfil-gold/30 group-hover:border-mehfil-gold transition-colors duration-300 rounded-tr-lg pointer-events-none" />
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden section-bg"
      aria-label="Photo Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="section-subheading mb-2">Through the Lens</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            The <span className="font-serif italic text-mehfil-gold">Mehfil</span> Experience
          </h2>
          <p className="mt-4 text-mehfil-cream/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            A visual walkthrough of our rooftop sanctuary in Berhampur. Beautiful seating, ambient night lights, and open skies.
          </p>
        </motion.div>

        {/* Gallery grid with clean, unobtrusive floating capsules */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[240px]">
          {galleryImages.map((image, i) => (
            <GalleryItem key={i} image={image} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12 sm:mt-14"
        >
          <p className="text-mehfil-cream/50 text-xs sm:text-sm mb-4">
            Follow us for daily evening stories and live rooftop updates
          </p>
          <a
            href="https://www.instagram.com/_mehfil_berhampur/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2.5 text-xs sm:text-sm py-3.5 px-6"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @_mehfil_berhampur
          </a>
        </motion.div>
      </div>
    </section>
  );
}
