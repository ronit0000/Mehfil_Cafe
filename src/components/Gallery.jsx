// src/components/Gallery.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const galleryImages = [
  {
    src: '/images/hero1.jpg',
    title: 'The Iconic Neon Mandala Wall',
    desc: 'Signature warm glowing backdrop framed with lush living greenery',
    tag: 'Photo Spot',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/hero2.jpg',
    title: 'Open Sky Umbrella Seating',
    desc: 'Spacious dining under the Berhampur night sky',
    tag: 'Outdoor Dining',
  },
  {
    src: '/images/hero3.jpg',
    title: 'Rooftop Chill Evenings',
    desc: 'Warm ambient fairy lights with open breezeway',
    tag: 'Ambiance',
  },
  {
    src: '/images/hero2.jpg',
    title: 'Intimate Table Settings',
    desc: 'Perfect for cozy dates and candid conversations',
    tag: 'Date Spot',
  },
  {
    src: '/images/hero1.jpg',
    title: 'Nightfall at Mehfil',
    desc: 'Where the rooftop comes alive as twilight settles',
    tag: 'Evening Glow',
  },
  {
    src: '/images/hero3.jpg',
    title: 'Memorable Gatherings',
    desc: 'Quality time with friends, family and great food',
    tag: 'Celebrations',
  },
];

function GalleryItem({ image, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group shadow-card border border-white/5 ${image.span || ''}`}
      style={{ aspectRatio: image.span ? '1/1' : '4/3' }}
    >
      {/* Photo */}
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Top subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Tag badge (always visible) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-mehfil-gold/30 text-mehfil-gold font-medium">
          {image.tag}
        </span>
      </div>

      {/* Automatic Scroll-Triggered Description Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
        transition={{
          duration: 0.65,
          delay: 0.25 + (index % 3) * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-10 sm:pt-14 z-10"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-mehfil-gold" />
          <h3 className="font-serif text-sm sm:text-base lg:text-lg text-white font-medium leading-snug group-hover:text-mehfil-gold transition-colors">
            {image.title}
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs text-mehfil-cream/70 font-light leading-relaxed line-clamp-2">
          {image.desc}
        </p>
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
          className="text-center mb-12 sm:mb-16"
        >
          <p className="section-subheading mb-2">Through the Lens</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            The <span className="font-serif italic text-mehfil-gold">Mehfil</span> Experience
          </h2>
          <p className="mt-4 text-mehfil-cream/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            A visual walkthrough of our rooftop sanctuary in Berhampur. As you scroll, explore each intimate corner and night vista.
          </p>
        </motion.div>

        {/* Gallery grid with automatic scroll reveal */}
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
