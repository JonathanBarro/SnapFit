/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "morado-clarito": "#d5Bcfc",
      },
      screens: {
        "tlfn": "300px",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
