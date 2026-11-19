// src/components/Footer.jsx
import { motion } from 'framer-motion';
import { addressLabel, site } from '../data/site';

const socialLinks = [
  {
    label: 'Instagram',
    href: site.instagramUrl,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917789922251?text=Hi%20Mehfil%20Rooftop%20Cafe%2C%20I%20would%20like%20to%20reserve%20a%20table',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Our Menu', href: '#menu' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Google Reviews', href: '#testimonials' },
    ],
  },
  {
    heading: 'Visit',
    links: [
      { label: 'Make a Reservation', href: '#reservation' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Find Us on Google Maps', href: site.mapsUrl },
      { label: 'Follow @_mehfil_berhampur', href: site.instagramUrl },
      { label: 'Private Gatherings', href: '#reservation' },
    ],
  },
  {
    heading: 'Hours',
    custom: (
      <div className="space-y-2 text-sm text-mehfil-cream/60">
        <div className="flex justify-between gap-4 font-medium text-mehfil-cream/90">
          <span>Monday – Sunday</span>
          <span className="text-mehfil-gold">Open Daily</span>
        </div>
        <p className="text-xs text-mehfil-cream/50">{site.hours.label}</p>
        <p className="text-[11px] text-mehfil-gold/80 pt-1">★ Open till late night rooftop dining</p>
      </div>
    ),
  },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer({ onNavigate }) {
  const handleLegalClick = (target) => (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target === 'privacy' ? '#privacy-policy' : '#terms-of-service';
    }
  };

  return (
    <footer
      className="relative overflow-hidden pt-20 pb-10"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #050505 100%)' }}
      aria-label="Site footer"
    >
      {/* Top gold line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.4) 30%, rgba(232,120,42,0.4) 70%, transparent 100%)' }}
      />

      {/* Background watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none"
        style={{ transform: 'translate(20%, 20%)' }}
      >
        <img src="/images/logo_circle.jpg" alt="" className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/5">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
              className="flex items-center gap-3 sm:gap-4 group w-fit"
              aria-label="Mehfil Rooftop Cafe & Restro – Go to top"
            >
              {/* Circle icon */}
              <img
                src="/images/logo_circle.jpg"
                alt="Mehfil mandala icon"
                width={72}
                height={72}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover drop-shadow-[0_0_14px_rgba(212,168,67,0.5)] transition-transform duration-500 group-hover:scale-110 flex-shrink-0"
              />
              {/* Text logo */}
              <div className="h-12 sm:h-16 w-44 sm:w-60 overflow-visible">
                <img
                  src="/images/logo_text.png"
                  alt="Mehfil Rooftop Cafe & Restro"
                  className="h-full w-auto object-contain object-left drop-shadow-[0_0_6px_rgba(212,168,67,0.3)] transition-opacity duration-300 group-hover:opacity-85"
                />
              </div>
            </a>

            <p className="text-mehfil-cream/50 text-xs sm:text-sm leading-relaxed max-w-xs">
              A gathering of flavours, ambiance, and memories — crafted for souls who seek more than just a meal. 
              Join us on the rooftop and let the evening unfold.
            </p>

            {/* Address */}
            <address className="not-italic text-xs sm:text-sm text-mehfil-cream/60 leading-relaxed">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-start hover:text-mehfil-gold transition-colors group/addr"
              >
                <svg className="w-4 h-4 text-mehfil-gold mt-0.5 flex-shrink-0 group-hover/addr:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Mehfil Berhampur<br />
                  {addressLabel}
                </span>
              </a>
            </address>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-mehfil-cream/50 hover:text-mehfil-gold transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,168,67,0.4)';
                    e.currentTarget.style.background = 'rgba(212,168,67,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-semibold text-mehfil-cream tracking-wider uppercase">
                {col.heading}
              </h3>
              <div
                className="w-8 h-px"
                style={{ background: 'linear-gradient(90deg, #D4A843, transparent)' }}
              />
              {col.custom ? (
                col.custom
              ) : (
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={
                          link.href.startsWith('#')
                            ? (e) => { e.preventDefault(); scrollTo(link.href); }
                            : undefined
                        }
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-mehfil-cream/50 hover:text-mehfil-gold transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mehfil-cream/30">
          <p>
            &copy; Mehfil Rooftop Cafe &amp; Restro. All rights reserved.
          </p>

          {/* Developer credit */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center gap-1.5"
          >
            Designed with
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #E8782A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ♥
            </span>
            by{' '}
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(135deg, #D4A843, #E8782A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ronit
            </span>
          </motion.p>

          <div className="flex gap-4">
            <a
              href="#privacy-policy"
              onClick={handleLegalClick('privacy')}
              className="hover:text-mehfil-gold transition-colors duration-300 cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#terms-of-service"
              onClick={handleLegalClick('terms')}
              className="hover:text-mehfil-gold transition-colors duration-300 cursor-pointer"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
