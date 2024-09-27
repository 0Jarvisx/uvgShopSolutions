/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '0.575': '0.575rem',  
        '0.175': '0.175rem', 
      },
    },
  },
  plugins: [],
}