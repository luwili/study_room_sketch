import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sketch: {
          paper: '#FAF8F3',
          'paper-dark': '#0D121D',
          card: '#FFFFFF',
          'card-dark': '#151C2C',
          ink: '#12161A',
          'ink-muted': '#5C6577',
          'ink-light': '#8F9CAE',
          indigo: '#2563EB',
          'indigo-dark': '#1D4ED8',
          'indigo-light': '#EEF4FF',
          'indigo-border': '#3B82F6',
          lime: '#84CC16',
          'lime-dark': '#65A30D',
          'lime-light': '#F7FEE7',
          'lime-glow': '#BEF264',
          amber: '#F59E0B',
          rose: '#F43F5E',
          cyan: '#06B6D4',
        },
        brand: {
          50: '#f0f4f9',
          100: '#dbe6f3',
          200: '#bdd1e7',
          300: '#8fb4d7',
          400: '#5a91c3',
          500: '#3572af',
          600: '#245892',
          700: '#1d4677',
          800: '#1a3b63',
          900: '#0f2b48',
          950: '#081728',
        },
        slate: {
          850: '#151e2e',
          950: '#0b111c',
        }
      },
      boxShadow: {
        'sketch': '3px 3px 0px 0px #12161A',
        'sketch-sm': '2px 2px 0px 0px #12161A',
        'sketch-lg': '5px 5px 0px 0px #12161A',
        'sketch-indigo': '3px 3px 0px 0px #2563EB',
        'sketch-lime': '3px 3px 0px 0px #84CC16',
        'sketch-dark': '3px 3px 0px 0px rgba(255, 255, 255, 0.25)',
        'sketch-dark-sm': '2px 2px 0px 0px rgba(255, 255, 255, 0.25)',
        'sketch-dark-lg': '5px 5px 0px 0px rgba(255, 255, 255, 0.25)',
      },
      borderRadius: {
        'sketch': '255px 15px 225px 15px/15px 225px 15px 255px',
        'sketch-sm': '180px 8px 170px 8px/8px 170px 8px 180px',
        'sketch-lg': '255px 25px 225px 25px/25px 225px 25px 255px',
      },
      fontFamily: {
        sans: [
          '"Anthropic Serif Web"',
          '"Anthropic Serif"',
          '"Source Serif 4"',
          '"Newsreader"',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
        ],
        serif: [
          '"Anthropic Serif Web"',
          '"Anthropic Serif"',
          '"Source Serif 4"',
          '"Newsreader"',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ]
      }
    },
  },
  plugins: [typography],
}

