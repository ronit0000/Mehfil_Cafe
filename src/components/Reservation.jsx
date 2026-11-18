// src/components/Reservation.jsx
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import toast from 'react-hot-toast';

const timeSlots = [
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '06:00 PM',
  '06:30 PM', '07:00 PM',
  '07:30 PM', '08:00 PM',
  '08:30 PM', '09:00 PM',
  '09:30 PM', '10:00 PM',
];

function FloatingInput({
  id, label, type = 'text', value, onChange, onBlur,
  error, children, as: Tag = 'input', ...rest
}) {
  const isTextarea = Tag === 'textarea';
  return (
    <div className="form-group">
      {children ? (
        // Select or custom child
        children
      ) : (
        <Tag
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          className={`form-input${error ? ' error' : ''} ${isTextarea ? 'resize-none h-28' : ''}`}
          {...rest}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      )}
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400 pl-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const initialForm = {
  name: '', email: '', phone: '', guests: '2', date: '', time: '', occasion: '', notes: '',
};
const initialErrors = { name: '', email: '', phone: '', date: '', time: '' };

export default function Reservation() {
  const [form,    setForm]    = useState(initialForm);
  const [errors,  setErrors]  = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const validate = () => {
    const e = { ...initialErrors };
    if (!form.name.trim())             e.name  = 'Please enter your full name.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address.';
    if (form.phone && !form.phone.match(/^\+?[\d\s-]{7,15}$/)) e.phone = 'Enter a valid phone number.';
    if (!form.date)                    e.date  = 'Please select a date.';
    if (!form.time)                    e.time  = 'Please select a time slot.';
    setErrors(e);
    return Object.values(e).every((v) => !v);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => () => {
    // Real-time validation on blur
    const e = { ...errors };
    if (field === 'name'  && !form.name.trim())  e.name  = 'Please enter your full name.';
    if (field === 'email' && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address.';
    if (field === 'phone' && form.phone && !form.phone.match(/^\+?[\d\s-]{7,15}$/)) e.phone = 'Enter a valid phone number.';
    if (field === 'date'  && !form.date)  e.date  = 'Please select a date.';
    if (field === 'time'  && !form.time)  e.time  = 'Please select a time slot.';
    setErrors(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    toast.success(
      `🎉 Table reserved for ${form.name}! We'll confirm via email shortly.`,
      { duration: 5000 }
    );
    setForm(initialForm);
    setTimeout(() => setSuccess(false), 4000);
  };

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0F0B05 100%)' }}
      aria-label="Reservation"
    >
      {/* Background hero image with strong overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero2.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
        />
        <div className="absolute inset-0 bg-black/82" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,168,67,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="section-subheading mb-2">Reserve Your Evening</p>
          <div className="gold-divider" />
          <h2 className="section-heading mt-4">
            Book a <span className="font-serif italic text-mehfil-gold">Table</span>
          </h2>
          <p className="mt-5 text-mehfil-cream/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
            Secure your rooftop experience. We recommend reserving in advance, especially for 
            weekend evenings and special occasions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 glass rounded-3xl p-7 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-serif text-xl text-mehfil-cream mb-1">Reservation Details</h3>
              <p className="text-mehfil-cream/50 text-sm leading-relaxed">
                Fill out the form and our team will confirm your booking within 2 hours.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: '🕐',
                  title: 'Opening Hours',
                  lines: [
                    'Mon – Thu: 11 AM – 11 PM',
                    'Fri – Sat: 11 AM – 12 AM',
                    'Sunday: 11 AM – 11 PM',
                  ],
                },
                {
                  icon: '📍',
                  title: 'Location',
                  lines: [
                    'Mehfil Rooftop Cafe & Restro',
                    'Near Mission Street,',
                    'Berhampur, Odisha – 760001',
                  ],
                },
                {
                  icon: '📞',
                  title: 'Reservations',
                  lines: ['+91 98765 43210', 'reservations@mehfil.in'],
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-mehfil-gold text-sm font-semibold mb-1">{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-mehfil-cream/55 text-xs leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Special offer */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(212,168,67,0.12), rgba(232,120,42,0.08))',
                border: '1px solid rgba(212,168,67,0.2)',
              }}
            >
              <p className="text-mehfil-gold text-xs font-semibold tracking-wide uppercase mb-1">🎁 Special Offer</p>
              <p className="text-mehfil-cream/70 text-xs leading-relaxed">
                Book for 4+ guests and get a complimentary welcome drink for the table!
              </p>
            </div>
          </motion.aside>

          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-light rounded-3xl p-6 sm:p-8 flex flex-col gap-5"
              aria-label="Table reservation form"
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput
                  id="name"
                  label="Full Name *"
                  value={form.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={errors.name}
                  autoComplete="name"
                />
                <FloatingInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>

              {/* Row 2: Phone + Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />
                {/* Guests select */}
                <div className="form-group relative">
                  <select
                    id="guests"
                    value={form.guests}
                    onChange={handleChange('guests')}
                    className="form-input appearance-none cursor-pointer"
                    aria-label="Number of guests"
                  >
                    {[1,2,3,4,5,6,7,8,'9+'].map((n) => (
                      <option key={n} value={n} className="bg-mehfil-stone text-mehfil-cream">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="guests" className="form-label" style={{ transform: 'translateY(-10px) scale(0.78)', color: '#D4A843', transformOrigin: 'left' }}>
                    Number of Guests
                  </label>
                  {/* Chevron */}
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mehfil-gold/60 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Row 3: Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput
                  id="date"
                  label="Date *"
                  type="date"
                  value={form.date}
                  onChange={handleChange('date')}
                  onBlur={handleBlur('date')}
                  error={errors.date}
                  min={today}
                />
                {/* Time select */}
                <div className="form-group relative">
                  <select
                    id="time"
                    value={form.time}
                    onChange={handleChange('time')}
                    onBlur={handleBlur('time')}
                    className={`form-input appearance-none cursor-pointer${errors.time ? ' error' : ''}`}
                    aria-label="Preferred time"
                    aria-describedby={errors.time ? 'time-error' : undefined}
                    aria-invalid={!!errors.time}
                  >
                    <option value="" className="bg-mehfil-stone"> </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-mehfil-stone text-mehfil-cream">{slot}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="time"
                    className="form-label"
                    style={form.time ? { transform: 'translateY(-10px) scale(0.78)', color: '#D4A843', transformOrigin: 'left' } : {}}
                  >
                    Preferred Time *
                  </label>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mehfil-gold/60 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {errors.time && <p id="time-error" className="mt-1 text-xs text-red-400 pl-1" role="alert">{errors.time}</p>}
                </div>
              </div>

              {/* Occasion */}
              <div className="form-group relative">
                <select
                  id="occasion"
                  value={form.occasion}
                  onChange={handleChange('occasion')}
                  className="form-input appearance-none cursor-pointer"
                >
                  <option value="" className="bg-mehfil-stone"> </option>
                  {['Birthday', 'Anniversary', 'Date Night', 'Business Dinner', 'Family Gathering', 'Other'].map((o) => (
                    <option key={o} value={o} className="bg-mehfil-stone text-mehfil-cream">{o}</option>
                  ))}
                </select>
                <label
                  htmlFor="occasion"
                  className="form-label"
                  style={form.occasion ? { transform: 'translateY(-10px) scale(0.78)', color: '#D4A843', transformOrigin: 'left' } : {}}
                >
                  Special Occasion (optional)
                </label>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mehfil-gold/60 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Notes */}
              <FloatingInput
                id="notes"
                label="Special Requests (optional)"
                as="textarea"
                value={form.notes}
                onChange={handleChange('notes')}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary w-full relative overflow-hidden mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-live="polite"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Securing Your Table…
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Reservation Confirmed!
                  </span>
                ) : (
                  'Confirm Reservation'
                )}
              </button>

              <p className="text-center text-xs text-mehfil-cream/35 mt-1">
                By submitting you agree to our cancellation policy. Reservations held for 15 minutes.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
