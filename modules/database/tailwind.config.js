/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'd4-gold': '#c9922a',
        'd4-dark': '#0d0d0d',
        'd4-card': '#0a0a0a',
        'd4-border': '#2a2018',
        'd4-text': '#ffffff',
        'd4-text-secondary': '#888888',
        'rarity-common': '#888888',
        'rarity-magic': '#1eff00',
        'rarity-rare': '#0070dd',
        'rarity-legendary': '#ff8000',
        'rarity-unique': '#e6cc80',
      },
    },
  },
  plugins: [],
}
