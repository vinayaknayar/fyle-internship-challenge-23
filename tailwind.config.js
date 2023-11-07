/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
        '272': '68rem',
        '288': '72rem',
      },
      maxWidth: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
        '272': '68rem',
        '288': '72rem',
      },
    },
  },
  plugins: [],
}

