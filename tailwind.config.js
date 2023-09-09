/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Mono, monospace",
      },
      height: {
        screen: "100dvh",
      },
      width: {
        '56': '56%',
      },
      colors: {
        'bluish': '#25273D',
        'dark': 'rgb(22, 23, 34)',
        'dark-blue': 'rgb(72, 75, 106)',
        'light-blue': 'rgb(228, 229, 241)',
      },
    },
  },
  plugins: [],
};
