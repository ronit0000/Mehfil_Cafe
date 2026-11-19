// src/components/Reservation.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import toast from 'react-hot-toast';

const WHATSAPP_PHONE = '917789922251'; // +91 77899 22251
const MAX_GUESTS = 1000;
const cafeClockFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
const bookingDateFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'UTC',
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

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

function getCafeClock(now = new Date()) {
  const parts = cafeClockFormatter.formatToParts(now).map(({ type, value }) => [type, value]);
  const { year, month, day, hour, minute } = Object.fromEntries(parts);
  return { date: `${year}-${month}-${day}`, minutes: Number(hour) * 60 + Number(minute) };
}

function getAvailableSlots(date, clock) {
  return clock && date === clock.date
    ? timeSlots.filter((slot) => parseTimeToMinutes(slot) > clock.minutes)
    : timeSlots;
}

function getFieldError(field, form, clock) {
  switch (field) {
    case 'name':
      return form.name.trim() ? '' : 'Please enter your full name.';
    case 'email': {
      const email = form.email.trim();
      return email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email address.' : '';
    }
    case 'phone': {
      const phone = form.phone.trim();
      const digits = phone.replace(/\D/g, '');
      const valid = /^\+?[\d\s().-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
      return phone && !valid ? 'Enter a valid phone number.' : '';
    }
    case 'guests': {
      const guests = Number(form.guests);
      return Number.isInteger(guests) && guests >= 1 && guests <= MAX_GUESTS
        ? ''
        : `Enter a whole number from 1 to ${MAX_GUESTS}.`;
    }
    case 'date': {
      if (!form.date) return 'Please select a date.';
      const requestedDate = new Date(`${form.date}T00:00:00Z`);
      if (Number.isNaN(requestedDate.getTime()) || requestedDate.toISOString().slice(0, 10) !== form.date) {
        return 'Enter a valid reservation date.';
      }
      return form.date < clock.date ? 'Select today or a later date in Berhampur.' : '';
    }
    case 'time': {
      const availableSlots = getAvailableSlots(form.date, clock);
      if (availableSlots.length === 0) return 'No slots remain today. Select a later date.';
      if (!timeSlots.includes(form.time)) return 'Please select a time slot.';
      return availableSlots.includes(form.time) ? '' : 'This time has passed. Select an upcoming slot.';
    }
    default:
      return '';
  }
}

// FloatingInput with reserved message slot for Zero Cumulative Layout Shift (Zero CLS)
function FloatingInput({
  id, label, type = 'text', value, onChange, onBlur,
  error, children, as: Tag = 'input', ...rest
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
        {error && (
          <p id={`${id}-error`} className="text-red-400" role="alert">
            {error}
          </p>
        )}
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
  const [clock, setClock] = useState(null);
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    let timer;
    function updateClock() {
      const now = new Date();
      setClock(getCafeClock(now));
      timer = setTimeout(updateClock, 60_000 - (now.getTime() % 60_000));
    }
    updateClock();
    return () => clearTimeout(timer);
  }, []);

  const availableSlots = getAvailableSlots(form.date, clock);
  const slotsClosed = availableSlots.length === 0;

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    if (field === 'date') {
      const nextAvailable = getAvailableSlots(val, getCafeClock());
      setForm((prev) => ({ ...prev, date: val, time: nextAvailable.includes(prev.time) ? prev.time : '' }));
      setErrors((prev) => ({ ...prev, date: '', time: '' }));
    } else {
      setForm((prev) => ({ ...prev, [field]: val }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => () => {
    const error = getFieldError(field, form, getCafeClock());
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitClock = getCafeClock();
    setClock(submitClock);
    const validation = Object.fromEntries(
      Object.keys(initialErrors).map((field) => [field, getFieldError(field, form, submitClock)]),
    );
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) {
      toast.error('Check the highlighted reservation details.');
      return;
    }

    const formattedDate = bookingDateFormatter.format(new Date(`${form.date}T00:00:00Z`));

    // Build clean WhatsApp message (no asterisks at line beginnings)
    const lines = [
      'MEHFIL ROOFTOP CAFE & RESTRO',
      'Table Reservation Request',
      '--------------------------------',
      `Name: ${form.name.trim()}`,
      `Number of Guests: ${Number(form.guests)}`,
      `Date: ${formattedDate}`,
      `Time Slot: ${form.time} IST`,
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

    window.location.assign(whatsappUrl);
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
          loading="lazy"
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
            Continue to WhatsApp and send the prefilled message to request a table. Our team will confirm availability.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto w-full">
          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-light rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 flex flex-col gap-1 sm:gap-1.5 shadow-2xl"
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
                  required
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
                  label="Phone Number (optional)"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <FloatingInput
                  id="guests"
                  label="Number of Guests *"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max={MAX_GUESTS}
                  step="1"
                  value={form.guests}
                  onChange={handleChange('guests')}
                  onBlur={handleBlur('guests')}
                  error={errors.guests}
                  required
                />
              </div>

              {/* Row 3: Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-start">
                <div className="form-group flex flex-col">
                  <div className="relative">
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange('date')}
                      onBlur={handleBlur('date')}
                      min={clock?.date}
                      required
                      className={`form-input${errors.date ? ' error' : ''}`}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                      aria-invalid={!!errors.date}
                    />
                    <label
                      htmlFor="date"
                      className="form-label"
                      style={{
                        transform: 'translateY(-8px) scale(0.78)',
                        color: form.date ? '#D4A843' : 'rgba(245, 237, 214, 0.45)',
                        transformOrigin: 'left',
                      }}
                    >
                      Date *
                    </label>
                  </div>
                  <div className="min-h-[14px] sm:min-h-[18px] mt-0.5 pl-1 text-[11px] sm:text-xs flex items-center">
                    {errors.date && (
                      <p id="date-error" className="text-red-400" role="alert">
                        {errors.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dynamic Time select */}
                <div className="form-group flex flex-col">
                  <div className="relative">
                    <select
                      id="time"
                      value={availableSlots.includes(form.time) ? form.time : ''}
                      onChange={handleChange('time')}
                      onBlur={handleBlur('time')}
                      disabled={slotsClosed}
                      required
                      className={`form-input appearance-none cursor-pointer transition-colors duration-200 ${
                        errors.time ? 'error' : ''
                      } ${slotsClosed ? 'text-mehfil-cream/50 bg-white/[0.02]' : ''}`}
                      aria-describedby={errors.time ? 'time-error' : 'time-help'}
                      aria-invalid={!!errors.time}
                    >
                      <option value="" className="bg-mehfil-stone text-mehfil-cream/60">
                        {slotsClosed
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
                        transform: 'translateY(-8px) scale(0.78)',
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
                    ) : (
                      <p id="time-help" className={`text-[10px] sm:text-[11px] ${slotsClosed ? 'text-amber-400/90' : 'text-mehfil-cream/55'}`}>
                        {slotsClosed ? 'No slots remain today. Select a later date.' : 'Times are shown in Indian Standard Time (IST).'}
                      </p>
                    )}
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
                      transform: 'translateY(-8px) scale(0.78)',
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
                disabled={!clock}
                className="w-full relative overflow-hidden mt-1 sm:mt-2.5 flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-semibold text-sm uppercase tracking-wider text-[#0A0A0A] bg-gradient-to-r from-[#D4A843] via-[#E8782A] to-[#D4A843] bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_4px_20px_rgba(212,168,67,0.35)] cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0A0A] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Continue to WhatsApp</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
