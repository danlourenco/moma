/** @type {import('tailwindcss').Config} */
export default {
  content: ["formkit.theme.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [],
    darkTheme: false,
  },
  plugins: [require("daisyui")],
};
