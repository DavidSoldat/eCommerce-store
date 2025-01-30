module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        20: "20px",
        60: "60px",
        13: "13px",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
