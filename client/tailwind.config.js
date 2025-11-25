/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // VERY IMPORTANT
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 4px 10px rgba(0,0,0,0.10)",
        xsoft: "0 2px 20px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
