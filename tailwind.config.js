/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Tailwind 3.4+ defaults to :is(.dark *), which breaks class-on-<html> toggles.
  darkMode: ['selector', '.dark'],
  theme: {
    extend: {},
  },
  plugins: [],
};
