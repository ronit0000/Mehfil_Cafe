// src/components/Reservation.jsx
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import toast from 'react-hot-toast';

const WHATSAPP_PHONE = '917789922251'; // +91 77899 22251

const timeSlots = [
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM',
  '09:00 PM', '09:30 PM',
  '10:00 PM', '10:30 PM',
];

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// FloatingInput with reserved message slot for Zero Cumulative Layout Shift (Zero CLS)
function FloatingInput({
  id, label, type = 'text', value, onChange, onBlur,
  error, helperText, children, as: Tag = 'input', ...rest
}) {
  const isTextarea = Tag === 'textarea';
  return (
    <div className="form-group flex flex-col">
      <div className="relative">
        {children ? (
          children
        ) : (
          <Tag
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder=" "
            className={`form-input${error ? ' error' : ''} ${isTextarea ? 'resize-none h-18 sm:h-24' : ''}`}
            {...rest}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
          />
        )}
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      </div>

      {/* Reserved message height slot prevents screen jumps / layout shift */}
      <div className="min-h-[14px] sm:min-h-[18px] mt-0.5 pl-1 text-[11px] sm:text-xs flex items-center">
        {error ? (
          <p id={`${id}-error`} className="text-red-400" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-mehfil-cream/40 text-[10px] sm:text-[11px]">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
}

const initialForm = {
  name: '', email: '', phone: '', guests: '2', date: '', time: '', occasion: '', notes: '',
};
const initialErrors = { name: '', email: '', phone: '', guests: '', date: '', time: '' };

export default function Reservation() {
  const [form,    setForm]    = useState(initialForm);
  const [errors,  setErrors]  = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const today = getLocalDateString();
  const isToday = form.date === today;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // If today is chosen, dynamically display ONLY future time slots (slots strictly after current time)
  const availableSlots = isToday
    ? timeSlots.filter((slot) => parseTimeToMinutes(slot) > currentMinutes)
    : timeSlots;

  const validate = () => {
    const e = { ...initialErrors };
    if (!form.name.trim()) e.name = 'Please enter your full name.';
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      e.email = 'Enter a valid email address.';
    }
    if (form.phone && !form.phone.match(/^\+?[\d\s-]{7,15}$/)) {
      e.phone = 'Enter a valid phone number.';
    }
    if (!form.guests || Number(form.guests) < 1) {
      e.guests = 'Please enter the number of guests (min 1).';
    }
    if (!form.date) {
      e.date = 'Please select a date.';
    }
    if (isToday && availableSlots.length === 0) {
      e.time = 'No more slots available today. Please select tomorrow.';
    } else if (!form.time) {
      e.time = 'Please select a time slot.';
    } else if (isToday && parseTimeToMinutes(form.time) <= currentMinutes) {
      e.time = 'This time has already passed. Please pick an upcoming slot.';
    }

    setErrors(e);
    return Object.values(e).every((v) => !v);
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    if (field === 'date') {
      const isSelectedToday = val === today;
      const nextAvailable = isSelectedToday
        ? timeSlots.filter((slot) => parseTimeToMinutes(slot) > currentMinutes)
        : timeSlots;

      let newTime = form.time;
      // If switching to today and current chosen time has passed, clear it smoothly
      if (isSelectedToday && (!newTime || !nextAvailable.includes(newTime))) {
        newTime = '';
      }
      setForm((prev) => ({ ...prev, date: val, time: newTime }));
    } else {
      setForm((prev) => ({ ...prev, [field]: val }));
    }

    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => () => {
    const e = { ...errors };
    if (field === 'name' && !form.name.trim()) e.name = 'Please enter your full name.';
    if (field === 'email' && form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      e.email = 'Enter a valid email address.';
    }
    if (field === 'phone' && form.phone && !form.phone.match(/^\+?[\d\s-]{7,15}$/)) {
      e.phone = 'Enter a valid phone number.';
    }
    if (field === 'guests' && (!form.guests || Number(form.guests) < 1)) {
      e.guests = 'Please enter number of guests (min 1).';
    }
    if (field === 'date' && !form.date) e.date = 'Please select a date.';
    if (field === 'time') {
      if (!form.time) e.time = 'Please select a time slot.';
      else if (isToday && parseTimeToMinutes(form.time) <= currentMinutes) {
        e.time = 'This time has passed. Please select an upcoming slot.';
      }
    }
    setErrors(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);

    // Format date in clean readable format
    let formattedDate = form.date;
    try {
      if (form.date) {
        const [year, month, day] = form.date.split('-');
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        formattedDate = dateObj.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch {
      formattedDate = form.date;
    }

    // Build clean WhatsApp message (no asterisks at line beginnings)
    const lines = [
      'MEHFIL ROOFTOP CAFE & RESTRO',
      'Table Reservation Request',
      '--------------------------------',
      `Name: ${form.name.trim()}`,
      `Number of Guests: ${form.guests}`,
      `Date: ${formattedDate}`,
      `Time Slot: ${form.time}`,
    ];

    if (form.phone.trim()) {
      lines.push(`Contact: ${form.phone.trim()}`);
    }
    if (form.email.trim()) {
      lines.push(`Email: ${form.email.trim()}`);
    }
    if (form.occasion) {
      lines.push(`Occasion: ${form.occasion}`);
    }
    if (form.notes.trim()) {
      lines.push(`Special Requests: ${form.notes.trim()}`);
    }

    lines.push('--------------------------------');
    lines.push('Hi Mehfil team, please confirm this rooftop table reservation for us. Thank you!');

    const message = lines.join('\n');
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp directly with prefilled details
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setLoading(false);
    setSuccess(true);
    toast.success(
      `🎉 Opening WhatsApp with your reservation details for ${form.name}!`,
      { duration: 5000 }
    );

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative py-12 sm:py-20 lg:py-24 overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-12"
        >
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-mehfil-gold">Reserve Your Evening</p>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-mehfil-gold to-transparent mx-auto my-2 sm:my-4" />
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-mehfil-cream leading-tight">
            Book a <span className="font-serif italic text-mehfil-gold">Table</span>
          </h2>
          <p className="mt-2 sm:mt-4 text-mehfil-cream/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light px-2">
            Secure your rooftop experience. Confirming your reservation sends your filled details directly to our team via WhatsApp for instant confirmation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-8 items-start">
          {/* Info sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 flex flex-col gap-3.5 sm:gap-6"
          >
            <div>
              <h3 className="font-serif text-base sm:text-xl text-mehfil-cream mb-0.5">Reservation Details</h3>
              <p className="text-mehfil-cream/50 text-xs sm:text-sm leading-relaxed">
                Fill out the form below. Clicking confirm opens WhatsApp with your prefilled details to connect directly with our desk.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-5">
              {[
                {
                  icon: '🕐',
                  title: 'Opening Hours',
                  lines: [
                    'Monday – Sunday (Open Daily)',
                    '11:00 AM – 11:00 PM',
                    'Open late till 11:00 PM every night',
                  ],
                },
                {
                  icon: '📍',
                  title: 'Location',
                  lines: [
                    'Mehfil Berhampur',
                    'Near NH Side, Berhampur, Odisha',
                  ],
                  link: 'https://www.google.com/maps/place/Mehfil+Berhampur/@19.2800601,84.7841316,822m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a3d5b004d6e8d1b:0x44f2d5dc61db0c4a!8m2!3d19.2800601!4d84.7867065!16s%2Fg%2F11z0pdj8vk?entry=ttu&g_ep=EgoyMDI2MTExNS4wIKXMDSoASAFQAw%3D%3D',
                  linkText: 'View on Maps →',
                },
                {
                  icon: '📞',
                  title: 'Direct WhatsApp & Call',
                  lines: ['+91 77899 22251', 'reservations@mehfil.in'],
                  link: 'https://wa.me/917789922251?text=Hi%20Mehfil%20Rooftop%20Cafe%2C%20I%20would%20like%20to%20reserve%20a%20table',
                  linkText: 'Chat on WhatsApp →',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 sm:gap-4">
                  <span className="text-lg sm:text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-mehfil-gold text-xs sm:text-sm font-semibold mb-0.5">{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-mehfil-cream/55 text-[11px] sm:text-xs leading-normal sm:leading-relaxed">{line}</p>
                    ))}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] sm:text-xs text-mehfil-gold hover:underline mt-0.5 inline-block"
                      >
                        {item.linkText}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-light rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col gap-1 sm:gap-1.5"
              aria-label="Table reservation form"
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-start">
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
                  label="Email Address (optional)"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>

              {/* Row 2: Phone + Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-start">
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
                <FloatingInput
                  id="guests"
                  label="Guests (e.g. 2, 8, 25) *"
                  type="number"
                  min="1"
                  max="1000"
                  value={form.guests}
                  onChange={handleChange('guests')}
                  onBlur={handleBlur('guests')}
                  error={errors.guests}
                />
              </div>

              {/* Row 3: Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-start">
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

                {/* Dynamic Time select */}
                <div className="form-group flex flex-col">
                  <div className="relative">
                    <select
                      id="time"
                      value={form.time}
                      onChange={handleChange('time')}
                      onBlur={handleBlur('time')}
                      disabled={isToday && availableSlots.length === 0}
                      className={`form-input appearance-none cursor-pointer transition-colors duration-200 ${
                        errors.time ? 'error' : ''
                      } ${isToday && availableSlots.length === 0 ? 'text-mehfil-cream/50 bg-white/[0.02]' : ''}`}
                      aria-label="Preferred time"
                      aria-describedby={errors.time ? 'time-error' : undefined}
                      aria-invalid={!!errors.time}
                    >
                      <option value="" className="bg-mehfil-stone text-mehfil-cream/60">
                        {isToday && availableSlots.length === 0
                          ? 'No slots available today'
                          : 'Select Time Slot'}
                      </option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-mehfil-stone text-mehfil-cream">
                          {slot}
                        </option>
                      ))}
                    </select>

                    <label
                      htmlFor="time"
                      className="form-label"
                      style={{
                        transform: 'translateY(-7px) scale(0.75)',
                        color: form.time ? '#D4A843' : 'rgba(245, 237, 214, 0.45)',
                        transformOrigin: 'left',
                      }}
                    >
                      Preferred Time *
                    </label>

                    <svg
                      className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-mehfil-gold/60 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Reserved height message slot */}
                  <div className="min-h-[14px] sm:min-h-[18px] mt-0.5 pl-1 text-[11px] sm:text-xs flex items-center">
                    {errors.time ? (
                      <p id="time-error" className="text-red-400" role="alert">
                        {errors.time}
                      </p>
                    ) : isToday && availableSlots.length === 0 ? (
                      <p className="text-amber-400/90 text-[10px] sm:text-[11px] truncate">
                        Hours ended for today · Choose tomorrow
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Occasion */}
              <div className="form-group flex flex-col">
                <div className="relative">
                  <select
                    id="occasion"
                    value={form.occasion}
                    onChange={handleChange('occasion')}
                    className="form-input appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-mehfil-stone">Select Occasion (optional)</option>
                    {['Birthday Party', 'Anniversary', 'Date Night', 'Business Dinner', 'Friends Gathering', 'Family Celebration', 'Other'].map((o) => (
                      <option key={o} value={o} className="bg-mehfil-stone text-mehfil-cream">{o}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="occasion"
                    className="form-label"
                    style={{
                      transform: 'translateY(-7px) scale(0.75)',
                      color: form.occasion ? '#D4A843' : 'rgba(245, 237, 214, 0.45)',
                      transformOrigin: 'left',
                    }}
                  >
                    Special Occasion (optional)
                  </label>
                  <svg className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-mehfil-gold/60 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="min-h-[14px] sm:min-h-[18px] mt-0.5" />
              </div>

              {/* Notes */}
              <FloatingInput
                id="notes"
                label="Special Requests (e.g. rooftop view, cake)"
                as="textarea"
                value={form.notes}
                onChange={handleChange('notes')}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden mt-1 sm:mt-2.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#D4A843] via-[#E8782A] to-[#D4A843] bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_4px_20px_rgba(212,168,67,0.35)] cursor-pointer"
                aria-live="polite"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Opening WhatsApp…</span>
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2 text-green-950 font-semibold">
                    <svg className="w-4 h-4 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Opening WhatsApp with Details!</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {/* WhatsApp Icon */}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0A0A] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Confirm Reservation via WhatsApp</span>
                  </span>
                )}
              </button>

              <p className="text-center text-[10px] sm:text-xs text-mehfil-cream/50 mt-1 max-w-xs sm:max-w-md mx-auto leading-normal">
                Your prefilled reservation details will open in WhatsApp to chat with Mehfil Berhampur (+91 77899 22251).
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
