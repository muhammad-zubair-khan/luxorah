/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        darkblue: '#232E34',
        blackPearl: '#1A2127'
      },
      colors: {
        primary : '#286806',
        lightGreen: 'rgba(0, 79, 0, 0.08)',
        smallButton: "#FCB954",
        smallButtonLight: "#fff5e6",
        button: "#359602",
        dimGreen: "rgba(53, 150, 2, 0.03)",
      }
    },
  },
  screens: {
    xs: "300px",
    ss: "620px",
    sm: "800px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  plugins: [],
}

