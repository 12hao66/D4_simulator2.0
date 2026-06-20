/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'd4-dark': '#0a0a0f',
        'd4-panel': '#1a1a1f',
        'd4-border': '#2a2a30',
        'd4-gold': '#c9a962',
        'd4-blue': '#0070dd',
        'd4-green': '#1eff00',
        'd4-red': '#ff4444',
        'd4-purple': '#a335ee',
        'd4-orange': '#ff8000',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
      }
    },
  },
  plugins: [],
}
