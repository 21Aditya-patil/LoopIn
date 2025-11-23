/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '10px 10px 20px -10px rgba(0,0,0,0.2)'
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}