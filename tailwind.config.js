/** @type {import('tailwindcss').Config} */
export default {
  content: [".index.html", "./src/**/*.{jsx,ts,js,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
