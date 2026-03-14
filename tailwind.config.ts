import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05080F',
          900: '#080C18',
          800: '#0B0F1E',
          700: '#111827',
          600: '#1C2333',
        },
        gold: {
          300: '#F5D580',
          400: '#E5B84F',
          500: '#C8922A',
          600: '#A67320',
          700: '#7A5118',
        },
        warm: {
          50: '#FBF8F1',
          100: '#F2EBD9',
          200: '#E0D3BB',
          300: '#C8B898',
          400: '#9D8D74',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        heading: ['"Fjalla One"', 'Arial Narrow', 'sans-serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'stripe-subtle': "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 0, transparent 50%)",
      },
    },
  },
  plugins: [],
}

export default config
