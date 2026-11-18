// src/components/Gallery.jsx
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { src: '/images/hero1.jpg', alt: 'Mehfil neon sign – the iconic mandala on the green wall', span: 'col-span-2 row-span-2' },
  { src: '/images/hero2.jpg', alt: 'Rooftop dining area with elegant umbrella seating at night' },
  { src: '/images/hero3.jpg', alt: 'Wide rooftop view with ambient lighting' },
  { src: '/images/hero2.jpg', alt: 'Intimate corner seating under the open sky' },
  { src: '/images/hero1.jpg', alt: 'Green wall with Mehfil branding after dusk' },
  { src: '/images/hero3.jpg', alt: 'Evening gathering at Mehfil Rooftop' },
];

function GalleryItem({ image, index }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${image.span || ''}`}
      style={{ aspectRatio: image.span ? '1/1' : '4/3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Mask reveal overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: inView ? 0 : 1 }}
        transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
        className="absolute inset-0 bg-mehfil-dark pointer-events-none"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Hover caption */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <p className="text-white text-sm font-medium leading-snug">{image.alt}</p>
            <div className="mt-1.5 w-8 h-0.5 bg-mehfil-gold" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-mehfil-gold/0 group-hover:border-mehfil-gold/60 transition-all duration-500 rounded-tr-lg" />
    </motion.div>
  );
}

export default function Gallery() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-28 overflow-hidden section-bg"
      aria-label="Photo Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="section-subheading mb-2">Through the Lens</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            The <span className="font-serif italic text-mehfil-gold">Mehfil</span> Experience
          </h2>
          <p className="mt-5 text-mehfil-cream/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
            A visual journey through our rooftop haven — where every frame tells a story of warmth, 
            elegance, and unforgettable evenings.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {galleryImages.map((image, i) => (
            <GalleryItem key={i} image={image} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-mehfil-cream/50 text-sm mb-5">
            Follow us for daily stories from the rooftop
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @mehfil_rooftop
          </a>
        </motion.div>
      </div>
    </section>
  );
}
