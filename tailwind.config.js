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
          DEFAULT: '#16181c',
          elev: '#1e2126',
          card: '#24272d',
          side: '#131519',
          ink: '#2a2e35'
        },
        ink: {
          100: '#f4f3f1',
          300: '#c9c7c2',
          500: '#8b8a86',
          700: '#56565a',
          900: '#34343a'
        },
        brand: {
          DEFAULT: '#d08856',
          glow: '#e0a87e',
          dim: 'rgba(208,136,86,0.08)',
          dim2: 'rgba(208,136,86,0.16)'
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.16)'
        },
        warn: '#e5484d',
        gold: '#d6a35c'
      },
      boxShadow: {
        'brand': '0 8px 24px rgba(208,136,86,0.25)',
        'brand-lg': '0 12px 32px rgba(208,136,86,0.38)'
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
