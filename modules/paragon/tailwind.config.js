/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'diablo': {
          'bg': '#0a0a0f',
          'bg-dark': '#12121a',
          'gold': '#c9a962',
          'gold-dark': '#8b4513',
          'text': '#d4c4a8',
          'text-muted': '#8b7355',
          'border': '#2a1a0a',
          'legendary': '#ff8c00',
          'rare': '#800080',
        }
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'sans': ['Noto Sans SC', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 0 10px rgba(201, 169, 98, 0.3)',
        'legendary': '0 0 15px rgba(255, 140, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
