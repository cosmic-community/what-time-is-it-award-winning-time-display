/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'Helvetica Neue', 'sans-serif'],
        'bebas': ['Bebas Neue', 'Impact', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'orbitron': ['Orbitron', 'Courier New', 'monospace'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'roboto': ['Roboto Condensed', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'dynamic': 'var(--primary-color, #000000)',
        'dynamic-secondary': 'var(--secondary-color, #666666)',
        'dynamic-accent': 'var(--accent-color, #ff0000)',
        'dynamic-bg': 'var(--background-color, #ffffff)',
        'dynamic-text': 'var(--text-color, #333333)',
      },
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
        'bold-impact': 'bold-impact 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s 1',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}