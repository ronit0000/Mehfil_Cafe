/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        mehfil: {
          gold:    '#D4A843',
          amber:   '#C8862A',
          orange:  '#E8782A',
          dark:    '#0A0A0A',
          charcoal:'#111111',
          stone:   '#1A1A1A',
          slate:   '#222222',
          cream:   '#F5EDD6',
          warm:    '#2A2015',
        },
      },
      fontFamily: {
        serif:  ['Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'spin-slow':    'spin 20s linear infinite',
        'fade-up':      'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,168,67,0.3), 0 0 40px rgba(212,168,67,0.1)' },
          '50%':      { boxShadow: '0 0 30px rgba(212,168,67,0.6), 0 0 60px rgba(212,168,67,0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(212,168,67,0.4), 0 0 60px rgba(212,168,67,0.1)',
        'glow-sm':    '0 0 10px rgba(212,168,67,0.3)',
        'card':       '0 8px 32px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
