// src/components/Contact.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const contactCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Visit Us',
    lines: ['Near Mission Street,', 'Berhampur, Odisha – 760001'],
    action: { label: 'Get Directions', href: 'https://maps.google.com' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 87654 32109'],
    action: { label: 'Call Now', href: 'tel:+919876543210' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Us',
    lines: ['reservations@mehfil.in', 'hello@mehfil.in'],
    action: { label: 'Send Email', href: 'mailto:hello@mehfil.in' },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Opening Hours',
    lines: ['Mon – Thu: 11 AM – 11 PM', 'Fri – Sat: 11 AM – 12 AM', 'Sunday: 11 AM – 11 PM'],
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
              <p className="font-serif text-xl text-mehfil-cream mb-1">Mehfil Rooftop Cafe</p>
              <p className="text-mehfil-cream/50 text-sm mb-5">Near Mission Street, Berhampur, Odisha</p>
              <a
                href="https://maps.google.com/?q=Berhampur+Odisha"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm py-3 inline-block"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
