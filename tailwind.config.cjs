/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app.html", './src/**/*.{svelte,js,ts}',],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["corporate", "business"],
  },
}

