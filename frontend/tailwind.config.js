/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

=======
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
>>>>>>> 3cea4dc7541391e0c69c45239c85049e7fe0a12f
