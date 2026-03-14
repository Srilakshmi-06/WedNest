/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a37c6e',
          600: '#8c6b5d',
          700: '#75594d',
          800: '#5e483e',
          900: '#47362f',
        },
      }
    },
  },
  plugins: [],
}
