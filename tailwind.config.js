/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'impact': ['Impact', 'sans-serif'],
        'sans': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': 'white' },
        }
      },
      animation: {
        typing: 'typing 3.5s steps(30, end) 1s 1 normal both',
        blink: 'blink 0.75s step-end infinite',
      },
    },
    
    },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3fb3e0",
          "secondary": "#FFD700",
          "accent": "#FFF9DB",
          "neutral": "#EEEEEE",
          "base-100": "#ffffff",
          "info": "#00274D",
          "success": "#ffc122",
          "warning": "#ed3419",
          "error": "#ff0000",
        },
      },
    ],
  },
  plugins: [daisyui],
}
