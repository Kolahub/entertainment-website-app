/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Outfit", 'sans-serif'],
      },
      colors: {
        customRed: 'rgb(252, 71, 71)',
        darkBlue: 'rgb(16, 20, 30)',
        greyishBlue: 'rgb(90, 105, 143)',
        semiDarkBlue: 'rgb(22, 29, 47)'
      },

      spacing: {
        'calc-custom': 'calc(100% - 2rem)'
      }
    },
  },
  plugins: [],
}