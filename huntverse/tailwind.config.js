/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        void: {
          950: '#05070d',
          900: '#0a0e17',
          850: '#0d1220',
          800: '#111827',
          700: '#1a2235',
          600: '#252f47'
        },
        signal: {
          green: '#39FF88',
          purple: '#9B5CFF',
          blue: '#3AB4FF',
          gold: '#FBBF3C',
          red: '#FF4D5E'
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(57,255,136,0.35)',
        'glow-purple': '0 0 20px rgba(155,92,255,0.35)',
        'glow-blue': '0 0 20px rgba(58,180,255,0.35)',
        'glow-gold': '0 0 20px rgba(251,191,60,0.35)',
        'glow-red': '0 0 20px rgba(255,77,94,0.35)'
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(57,255,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,136,0.06) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(circle at 50% 0%, rgba(155,92,255,0.15), transparent 60%)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'ping-slow': 'ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite'
      },
      keyframes: {
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: 0.7 },
          '75%, 100%': { transform: 'scale(2.4)', opacity: 0 }
        }
      }
    }
  },
  plugins: []
}
