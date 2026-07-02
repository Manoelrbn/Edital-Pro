/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        veraNavy: '#0A2540',
        veraNavyLight: '#11355A',
        veraCyan: '#00D4B2',
        veraOrange: '#FF922B',
        veraDarkBg: '#091522',
        veraBgLight: '#F8FAFC'
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glowCyan: '0 0 20px rgba(0, 212, 178, 0.25)',
        glowOrange: '0 0 20px rgba(255, 146, 43, 0.25)',
      }
    }
  },
  plugins: [],
}