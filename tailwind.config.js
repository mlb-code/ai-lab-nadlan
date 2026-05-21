/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
        display: ['Heebo', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace']
      },
      colors: {
        bg: {
          DEFAULT: '#A8A39E',
          elev: '#B6B1AC',
          card: '#BFB9B3',
          side: '#9D9893',
          ink: '#8F8A85'
        },
        ink: {
          100: '#1F1D1B',
          300: '#2E2B28',
          500: '#4A453F',
          700: '#6F6A63',
          900: '#8F8A85'
        },
        brand: {
          DEFAULT: '#C2410C',
          glow: '#D2521E',
          dim: 'rgba(194,65,12,0.08)',
          dim2: 'rgba(194,65,12,0.16)'
        },
        cream: {
          DEFAULT: '#F5F1EB'
        },
        line: {
          DEFAULT: 'rgba(31,29,27,0.14)',
          strong: 'rgba(31,29,27,0.28)'
        },
        warn: '#C2410C',
        gold: '#B98A4A'
      },
      boxShadow: {
        'brand': '0 8px 24px rgba(194,65,12,0.22)',
        'brand-lg': '0 12px 32px rgba(194,65,12,0.36)'
      },
      letterSpacing: {
        'kicker': '0.22em',
        'mono': '0.06em'
      },
      maxWidth: {
        'slide': '960px'
      }
    }
  },
  plugins: []
}
