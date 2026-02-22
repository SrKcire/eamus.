/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1E1E1E', // Cor de fundo oficial Eamus
          surface: '#FFFDFD',
          border: 'rgba(255, 255, 255, 0.5)',
        },
        primary: {
          white: '#FFFFFF',
          gray: '#FFFEFE',
        },
      },
      fontFamily: {
        // Define K2D como a fonte padrão (sans) para todo o projeto
        sans: ['K2D', 'sans-serif'],
        k2d: ['K2D', 'sans-serif'],
      },
      borderRadius: {
        post: '10px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Glow animado para a Splash Screen
        glow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in': 'slide-in-bottom 0.5s ease-out forwards',
        glow: 'glow 4s infinite ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
