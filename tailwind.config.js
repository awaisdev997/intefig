/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: { 50: '#EBF5DD', 100: '#D3E0C9', 300: '#9AB395', 500: '#88A286', 700: '#7A957E', 800: '#56705C' },
        ink: { DEFAULT: '#3B3F42', deep: '#232628' },
        accent: { DEFAULT: '#C8401B', hover: '#A83315' },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        depth: '0 24px 60px -24px rgba(35,38,40,.25)',
        card: '0 12px 40px -12px rgba(35,38,40,.18)',
        glow: '0 0 60px -12px rgba(200,64,27,.35)',
      },
    },
  },
  plugins: [],
}
