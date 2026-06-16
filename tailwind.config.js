module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // National green of the Togolese Republic (Pantone 3425 C, #006A4E) used
        // as the anchor (600) of the institutional green ramp, so every existing
        // `emerald-*` utility renders in the official color.
        emerald: {
          50: "#e8f3ef",
          100: "#c6e2d9",
          200: "#98c9bb",
          300: "#62ae98",
          400: "#2d9476",
          500: "#0f7e60",
          600: "#006a4e",
          700: "#005941",
          800: "#004734",
          900: "#003a2b",
          950: "#00241b"
        },
        // Official national accents (used sparingly, institutional).
        "tg-yellow": "#ffce00", // Pantone 116 C
        "tg-red": "#d21034" // Pantone 186 C
      }
    }
  },
  plugins: []
};
