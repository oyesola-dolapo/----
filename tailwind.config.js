/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "430px",
      md: "836px",
      lg: "976px",
      xl: "1200px",
      xxl: "1440px",
    },
    extend: {
    },
  },
  plugins: [],
};

