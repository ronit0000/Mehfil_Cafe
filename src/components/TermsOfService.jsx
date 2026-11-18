// src/components/TermsOfService.jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F1B16] font-sans selection:bg-[#D4A843]/20">
      {/* Decorative Nawabi Golden Header Border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4A843] via-[#E8782A] to-[#D4A843]" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8C6D23] hover:text-[#1F1B16] transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-[#D4A843]/40 flex items-center justify-center group-hover:border-[#8C6D23] group-hover:-translate-x-0.5 transition-all">
              ←
            </span>
            <span>Return to Mehfil Rooftop</span>
          </button>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-8 border-b border-[#E6DEC8]"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#F3ECE0] text-[#8C6D23] text-xs font-semibold tracking-widest uppercase mb-3 border border-[#D4A843]/30">
            Dining &amp; Hospitality Guidelines
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1B16] tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#615749] leading-relaxed">
            Mehfil Rooftop Cafe &amp; Restro · Berhampur, Odisha
          </p>
          <p className="text-xs text-[#8C6D23] mt-1 font-mono">
            Last Updated: January 2026
          </p>
        </motion.header>

        {/* Terms Body */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 space-y-8 text-sm sm:text-base text-[#3D352B] leading-relaxed"
        >
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              1. Welcome to Mehfil
            </h2>
            <p>
              By accessing this digital platform, reviewing our culinary offerings, or requesting rooftop reservations at Mehfil Rooftop Cafe &amp; Restro, you agree to these dining terms. Our goal is to provide every patron with an ambiance of serenity, peace, and culinary excellence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              2. Table Reservations &amp; Seating Policies
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#4A3F31]">
              <li>
                <strong>Availability:</strong> All digital reservation submissions are subject to table availability and manual confirmation by our restaurant desk via WhatsApp or phone.
              </li>
              <li>
                <strong>Holding Window:</strong> Confirmed reservation slots are held for up to 15 minutes past the scheduled arrival time before the table may be released to waiting guests.
              </li>
              <li>
                <strong>Open-Air Weather Conditions:</strong> As a premier open-sky rooftop venue, seating in specific terrace sections may be re-allocated in the event of inclement weather or heavy seasonal rains.
              </li>
              <li>
                <strong>Large Parties:</strong> For parties of 15 guests or more, custom arrangements or advance notice may be requested to ensure seamless preparation.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              3. Menu Offerings, Ingredients &amp; Pricing
            </h2>
            <p>
              We pride ourselves on using fresh, seasonal, and locally sourced ingredients. Accordingly:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#4A3F31]">
              <li>
                Dish availability, daily chef specials, and pricing (quoted in Indian Rupees ₹) may be adjusted without prior digital notice based on market availability.
              </li>
              <li>
                Guests with severe food allergies must notify our service team prior to placing dining orders.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              4. Intellectual Property &amp; Brand Rights
            </h2>
            <div className="p-4 rounded-2xl bg-[#F6F0E4] border-l-4 border-[#D4A843] text-[#4A3F31]">
              <p>
                <strong>Proprietary Assets:</strong> All visual identity assets, the signature coffee mandala insignia, &quot;Mehfil Rooftop Cafe &amp; Restro&quot; naming, photographic imagery of our physical premises, website UI layouts, and written literature are the exclusive intellectual property of Mehfil Rooftop Cafe &amp; Restro.
              </p>
            </div>
            <p className="text-sm text-[#615749]">
              Unauthorized commercial reproduction, scraping, or misuse of our brand assets is strictly prohibited without prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              5. Guest Conduct &amp; Atmosphere
            </h2>
            <p>
              Mehfil is a family-friendly gathering destination. We reserve the right to decline service to any party exhibiting disruptive, disorderly, or disrespectful behavior toward staff or fellow dining patrons.
            </p>
          </section>

          <section className="pt-6 border-t border-[#E6DEC8] space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#1F1B16]">
              Questions or Concerns
            </h2>
            <p className="text-sm text-[#615749]">
              For questions regarding reservations or venue terms, connect with us at:
            </p>
            <p className="text-sm font-medium text-[#1F1B16]">
              Mehfil Rooftop Cafe &amp; Restro · Near NH Side, Berhampur, Odisha · Tel: +91 77899 22251
            </p>
          </section>
        </motion.article>

        {/* Footer Back Action */}
        <div className="mt-12 pt-8 border-t border-[#E6DEC8] text-center">
          <button
            onClick={onBack}
            className="px-8 py-3.5 rounded-full bg-[#1F1B16] text-[#FDFBF7] hover:bg-[#8C6D23] font-semibold text-xs tracking-wider uppercase transition-colors shadow-md"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
