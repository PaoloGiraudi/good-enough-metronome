/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app.html", './src/**/*.{svelte,js,ts}',],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
        primary: "#8783D1",
        secondary: "#F58F29",
        'base-100': '#fffcfa',
        'base-content': '#0A0908',
        "--rounded-box": "0",
        "--rounded-btn": "0",
        '.btn-ghost:focus': {
          'background-color': 'transparent',
        },
        '.btn-ghost:disabled': {
          'background-color': 'transparent',
        },
        '.btn-ghost:hover': {
          'background-color': 'transparent',
        },
      }
    }],
  },
}

