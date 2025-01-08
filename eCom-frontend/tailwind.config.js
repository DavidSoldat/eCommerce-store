module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'IntegralCF', 'sans-serif'],
      },
      borderRadius: {
        20: '20px',
        60: '60px',
        13: '13px',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
