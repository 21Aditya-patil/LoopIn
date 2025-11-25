/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 10px 20px -10px rgba(0,0,0,0.2)',
        'xsoft': '0 5px 10px -8px rgba(0,0,0,0.2)'
      }
    },
  },
  plugins: [],
}