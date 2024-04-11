/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#FF6347",
        secondary: "#FFA07A",
        dark: "#333",
        light: "#f4f4f4",
        buff: "#dda77b",
        khaki: "#a99f96",
      },
    },
  },
  plugins: [],
};
