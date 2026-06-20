/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'd4-gold': '#c9a962',
        'd4-gold-dark': '#8b7355',
        'd4-border': '#3a2a1a',
        'd4-bg': '#0a0a0f',
        'd4-text': '#d4c4a8',
        'd4-text-secondary': '#8b7355',
      }
    },
  },
  plugins: [],
}
