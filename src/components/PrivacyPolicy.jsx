// src/components/PrivacyPolicy.jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy({ onBack }) {
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
            Guest Trust & Transparency
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1B16] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#615749] leading-relaxed">
            Mehfil Rooftop Cafe & Restro · Near NH Side, Berhampur, Odisha
          </p>
          <p className="text-xs text-[#8C6D23] mt-1 font-mono">
            Effective Date: January 2026
          </p>
        </motion.header>

        {/* Policy Body */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 space-y-8 text-sm sm:text-base text-[#3D352B] leading-relaxed"
        >
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              1. Our Core Privacy Commitment
            </h2>
            <p>
              At Mehfil Rooftop Cafe & Restro (&quot;Mehfil&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we honor the time-tested tradition of warm hospitality and mutual respect. We respect your personal privacy as dearly as we treat every patron dining under our open-air terrace in Berhampur.
            </p>
            <div className="p-4 rounded-2xl bg-[#F6F0E4] border-l-4 border-[#D4A843] text-[#4A3F31]">
              <strong>Zero-Sale Promise:</strong> We never sell, rent, lease, or monetize your personal details to advertising networks, data aggregators, or unauthorized third parties.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              2. Information We Collect
            </h2>
            <p>
              When you interact with our website or reserve a rooftop table, we only collect the specific details you volunteer to ensure an exceptional dining experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#4A3F31]">
              <li>
                <strong>Reservation Particulars:</strong> Your full name, preferred contact phone number, email address, party size (number of guests), dining date, and selected time slot.
              </li>
              <li>
                <strong>Dining Preferences:</strong> Optional notes regarding birthday or anniversary celebrations, seating preferences, and dietary requirements.
              </li>
              <li>
                <strong>Direct Inquiries:</strong> Any questions or feedback you send directly to our team via WhatsApp or telephone.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              3. Purpose of Information Use
            </h2>
            <p>Your details are used strictly for legitimate restaurant operations:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-[#4A3F31]">
              <li>Confirming and managing your table reservations.</li>
              <li>Reaching out regarding schedule changes, terrace seating arrangements, or weather advisories.</li>
              <li>Assisting with pre-planned celebrations and special hospitality requests.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              4. WhatsApp Communications
            </h2>
            <p>
              When initiating table reservations through our website, booking details are sent directly to our official restaurant desk via WhatsApp (+91 77899 22251). Your conversation is protected under WhatsApp&apos;s end-to-end messaging infrastructure. We do not use your contact number to send automated promotional spam.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1B16]">
              5. Data Retention &amp; Rights
            </h2>
            <p>
              We retain reservation logs only as long as necessary for administrative and customer verification purposes. You may at any point request the deletion of your historical contact details by contacting our management.
            </p>
          </section>

          <section className="pt-6 border-t border-[#E6DEC8] space-y-2">
            <h2 className="font-serif text-lg font-semibold text-[#1F1B16]">
              Contact Our Desk
            </h2>
            <p className="text-sm text-[#615749]">
              For privacy inquiries, contact Mehfil Rooftop Cafe &amp; Restro at:
            </p>
            <p className="text-sm font-medium text-[#1F1B16]">
              Near NH Side, Berhampur, Odisha · Phone: +91 77899 22251 · Email: reservations@mehfil.in
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
