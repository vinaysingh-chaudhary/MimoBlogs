/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundColor:{
        "mimogray" : "#010101",
        "card" : "#1818188e"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

