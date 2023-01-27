/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./source/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CUSTOM
        // https://www.tailwindshades.com/#color=0%2C0%2C11.76470588235294&step-up=8&step-down=2&hue-shift=0&name=cod-gray&base-stop=5&overrides=e30%3D
        gray: {
          DEFAULT: '#1E1E1E',
          50: '#7A7A7A',
          100: '#707070',
          200: '#5B5B5B',
          300: '#474747',
          400: '#323232',
          500: '#1E1E1E',
          600: '#191919',
          700: '#141414',
          800: '#0F0F0F',
          900: '#0A0A0A',
        },
        green: {
          DEFAULT: '#30A35F',
          50: '#A6E5C0',
          100: '#96E0B4',
          200: '#77D79E',
          300: '#57CE87',
          400: '#39C371',
          500: '#30A35F',
          600: '#237846',
          700: '#164C2C',
          800: '#0A2113',
          900: '#000000',
        },
      },
    },
  },
  plugins: [],
};
