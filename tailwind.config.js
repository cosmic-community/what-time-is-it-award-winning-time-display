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
        border: 'hsl(214.3 31.8% 91.4%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 84% 4.9%)',
      },
    },
  },
  plugins: [],
}