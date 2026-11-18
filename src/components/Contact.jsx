// src/components/Contact.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Mehfil+Berhampur/@19.2800601,84.7841316,822m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a3d5b004d6e8d1b:0x44f2d5dc61db0c4a!8m2!3d19.2800601!4d84.7867065!16s%2Fg%2F11z0pdj8vk?entry=ttu&g_ep=EgoyMDI2MTExNS4wIKXMDSoASAFQAw%3D%3D';

const contactCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Visit Us',
    lines: ['Mehfil Berhampur', 'Near NH Side, Berhampur, Odisha'],
    action: { label: 'Get Directions', href: GOOGLE_MAPS_URL },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Call Us',
    lines: ['+91 98765 43210', 'Direct Line for Bookings'],
    action: { label: 'Call Now', href: 'tel:+919876543210' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    title: 'Instagram',
    lines: ['@_mehfil_berhampur', 'Tag us in your stories!'],
    action: { label: 'Follow on Instagram', href: 'https://www.instagram.com/_mehfil_berhampur/' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Opening Hours',
    lines: ['Open Daily', '11:00 AM – 11:00 PM', 'Late Night Rooftop Dining'],
    action: null,
  },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 overflow-hidden section-bg"
      aria-label="Contact Information"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-subheading mb-2">Find Us</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            Get in <span className="font-serif italic text-mehfil-gold">Touch</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass rounded-3xl p-6 flex flex-col gap-4 group hover:border-mehfil-gold/30 transition-colors duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-black"
                style={{ background: 'linear-gradient(135deg, #D4A843, #E8782A)' }}
              >
                {card.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg text-mehfil-cream font-medium mb-2">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-mehfil-cream/55 text-sm leading-relaxed">{line}</p>
                ))}
              </div>
              {card.action && (
                <a
                  href={card.action.href}
                  target={card.action.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="mt-auto text-sm font-medium text-mehfil-gold hover:text-mehfil-amber transition-colors duration-300 flex items-center gap-1 group-hover:gap-2"
                >
                  {card.action.label}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ height: '340px' }}
        >
          {/* Styled map placeholder */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #111 0%, #1A1A1A 100%)', border: '1px solid rgba(212,168,67,0.15)' }}
          >
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.2), rgba(232,120,42,0.1))' }}
              >
                <svg className="w-8 h-8 text-mehfil-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-serif text-xl text-mehfil-cream mb-1">Mehfil Berhampur</p>
              <p className="text-mehfil-cream/50 text-sm mb-5">Near NH Side, Berhampur, Odisha</p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm py-3 px-6 inline-flex items-center gap-2"
              >
                <span>Open in Google Maps</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
