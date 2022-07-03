/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          450: '#0b79bf'
        },
        red: {
          450: '#f4697a'
        },
        green: {
          450: '#1c8644'
        },
        gray: {
          750: '#4d4d4f'
        }
      }
    },
  },
  plugins: [],
}
