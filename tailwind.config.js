/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0C0C0C",
        brown: "#481E14",
        brick: "#9B3922",
        orange: "#F2613F",
      },
    },
  },
  plugins: [],
}

