// src/components/Menu.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { menuCategories, menuItems } from '../data/menuData';

function BadgePill({ text }) {
  const colorMap = {
    "Chef's Pick": { bg: 'rgba(212,168,67,0.15)', border: 'rgba(212,168,67,0.4)', text: '#D4A843' },
    'Bestseller':  { bg: 'rgba(232,120,42,0.15)', border: 'rgba(232,120,42,0.4)', text: '#E8782A' },
    'Must Try':    { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.4)', text: '#10B981' },
    'Signature':   { bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.4)', text: '#8B5CF6' },
    'Favourite':   { bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.4)', text: '#EC4899' },
  };
  const c = colorMap[text] || colorMap["Chef's Pick"];
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide shrink-0"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      {text}
    </span>
  );
}

function MenuCard({ item, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="menu-card group"
    >
      {/* Top row: name + badge */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {/* Veg / Non-veg indicator */}
          <div
            className={`mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${
              item.veg
                ? 'border-green-500'
                : 'border-red-500'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <h4 className="font-serif text-base text-mehfil-cream font-medium leading-snug group-hover:text-mehfil-gold transition-colors duration-300">
            {item.name}
          </h4>
        </div>
        {item.badge && <BadgePill text={item.badge} />}
      </div>

      {/* Description */}
      <p className="text-mehfil-cream/50 text-xs sm:text-sm leading-relaxed mb-3 ml-5">{item.desc}</p>

      {/* Price */}
      <div className="ml-5 flex items-center justify-between">
        <span
          className="font-serif text-lg font-semibold"
          style={{
            background: 'linear-gradient(135deg, #D4A843, #E8782A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ₹{item.price}
        </span>
        <button
          className="opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-mehfil-gold/90 hover:text-mehfil-gold flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 sm:bg-transparent border border-white/10 sm:border-transparent active:scale-95"
          aria-label={`Add ${item.name} to order`}
        >
          + Add
        </button>
      </div>

      {/* Hover glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mehfil-gold/0 to-transparent group-hover:via-mehfil-gold/40 transition-all duration-500 rounded-full" />
    </motion.div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('soups');
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' });
  const tabsRef     = useRef(null);

  const scrollTabIntoView = (id) => {
    setActiveTab(id);
    if (tabsRef.current) {
      const btn = tabsRef.current.querySelector(`[data-tab="${id}"]`);
      if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0F0F0F 100%)' }}
      aria-label="Our Menu"
    >
      {/* Background mandala watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.03]"
        style={{ animation: 'rotateSlow 60s linear infinite' }}
      >
        <img src="/images/logo_circle.jpg" alt="" className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="section-subheading mb-2">Culinary Art</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            Our <span className="font-serif italic text-mehfil-gold">Menu</span>
          </h2>
          <p className="mt-5 text-mehfil-cream/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
            Every dish is a labour of love, crafted with the finest local ingredients 
            and techniques passed down through generations.
          </p>
        </motion.div>

        {/* Tabs - horizontal scrolling on mobile with touch physics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-10 justify-start lg:justify-center -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth touch-pan-x"
          role="tablist"
          aria-label="Menu categories"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              data-tab={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`tabpanel-${cat.id}`}
              onClick={() => scrollTabIntoView(cat.id)}
              className={`menu-tab flex items-center gap-2 ${activeTab === cat.id ? 'active' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Menu grid with crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-label={menuCategories.find(c => c.id === activeTab)?.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {(menuItems[activeTab] || []).map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Veg legend */}
        <div className="flex items-center justify-center gap-6 mt-10 text-xs text-mehfil-cream/40">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-sm border-2 border-green-500 inline-flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 block" />
            </span>
            Vegetarian
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-sm border-2 border-red-500 inline-flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 block" />
            </span>
            Non-Vegetarian
          </span>
          <span className="text-mehfil-cream/30">· All prices inclusive of taxes</span>
        </div>
      </div>
    </section>
  );
}
