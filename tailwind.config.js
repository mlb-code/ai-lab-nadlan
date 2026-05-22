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
          DEFAULT: '#0F0F12',
          elev: '#17171C',
          card: '#1F1F26',
          side: '#08080A',
          ink: '#3A3530'
        },
        ink: {
          100: '#EAE6DC',
          300: '#C5C0B5',
          500: '#908A80',
          700: '#5C5650',
          900: '#3A3530'
        },
        brand: {
          DEFAULT: '#8B5E3C',
          glow: '#B5784A',
          dim: 'rgba(139,94,60,0.10)',
          dim2: 'rgba(139,94,60,0.20)'
        },
        cream: {
          DEFAULT: '#F5F1EB'
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.18)'
        },
        warn: '#B5784A',
        gold: '#B98A4A'
      },
      boxShadow: {
        'brand': '0 8px 24px rgba(139,94,60,0.30)',
        'brand-lg': '0 12px 32px rgba(139,94,60,0.45)'
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
