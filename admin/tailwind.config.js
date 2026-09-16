/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Website Light Theme Tokens ──
        paper: {
          DEFAULT: '#FAF8F5',
          card: '#FFFFFF',
          panel: '#F3EFEA',
          border: '#E6E1D7',
          muted: '#DCD5C9',
        },
        'paper-card': '#FFFFFF',
        'paper-panel': '#F3EFEA',
        'paper-border': '#E6E1D7',
        'paper-muted': '#DCD5C9',

        navy: {
          deep: '#FAF8F5',  // maps bg-navy-deep to paper background
          heading: '#091526',  // website text-navy-deep heading color (#091526)
          card: '#FFFFFF',  // sidebar & card surfaces
          panel: '#F3EFEA',  // elevated panel background
          border: '#E6E1D7',  // paper border
          muted: '#E2DDD3',  // hover fill
        },
        'navy-heading': '#091526',
        'navy-deep': '#FAF8F5',
        'navy-card': '#FFFFFF',
        'navy-panel': '#F3EFEA',
        'navy-border': '#E6E1D7',
        'navy-muted': '#E2DDD3',

        ink: {
          DEFAULT: '#1E293B',
          muted: '#475569',
          faint: '#94A3B8',
        },
        'ink-muted': '#475569',
        'ink-faint': '#94A3B8',

        brand: {
          orange: '#e07f2e',
          orangeHover: '#c96e20',
          gold: '#d97706',
          green: '#10B981',
          rose: '#f43f5e',
        },
        'brand-orange': '#e07f2e',
        'brand-orangeHover': '#c96e20',
        'brand-gold': '#d97706',
        'brand-green': '#10B981',
        'brand-rose': '#f43f5e',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
