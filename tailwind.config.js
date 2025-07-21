/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'bebas': ['Bebas Neue', 'impact', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'orbitron': ['Orbitron', 'Courier New', 'monospace'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'roboto': ['Roboto Condensed', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'cosmic-dark': '#11171A',
        'cosmic-dark-hover': '#1a2326',
      },
    },
  },
  plugins: [],
}