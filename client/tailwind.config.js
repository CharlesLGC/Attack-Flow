/** @type {import('tailwindcss').Config} */
const tailwindForms = require('@tailwindcss/forms');

export default {
  darkMode: false,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0D184F',
        'primary-yellow': '#F3C61F',
      },
    },
  },
  plugins: [tailwindForms],
};
