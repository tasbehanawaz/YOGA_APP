/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

// eslint-disable-next-line no-undef
export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGrey: 'rgb(220, 219, 205)',
        coral: '#FF7F50',
      },
      animation: {
        vibrate: 'vibrate 0.9s linear infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
});
