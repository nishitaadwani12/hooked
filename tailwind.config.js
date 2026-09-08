/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // "Playful Pastel" palette for Hooked.
      colors: {
        cream: '#FFF6F0',
        blush: '#FFD1DC',
        mint: '#B5D8CC',
        butter: '#FCE38A',
        peri: '#A6C1EE',
        cocoa: '#5B4B57',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(91, 75, 87, 0.35)',
        lift: '0 24px 50px -18px rgba(91, 75, 87, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
