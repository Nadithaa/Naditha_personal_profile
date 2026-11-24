/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pjs: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Geist', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      colors: {
        surface: {
          950: '#000000',
          900: '#131209',
          850: '#181818',
          800: '#1F1F1F',
          700: '#272727',
          600: '#313131',
        },
        border: {
          subtle: '#272727',
          strong: '#313131',
        },
      },
      spacing: {
        '0': '0px',
        '25': '2px',
        '50': '4px',
        '75': '8px',
        '100': '12px',
        '200': '16px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '700': '64px',
        '800': '80px',
        '900': '96px',
      },
      transitionTimingFunction: {
        'base-curve': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'e-reveal': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'e-soft': 'cubic-bezier(0.25, 0.8, 0.3, 1)',
      },
      transitionDuration: {
        '500': '500ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
