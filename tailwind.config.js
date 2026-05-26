/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-ink': '#0f1012',
        'ghost-white': '#f2f2f4',
        'canvas': '#fdfdfd',
        'skyline-gray': '#868788',
        'slate-comment': '#8f8f8f',
        'deep-graphite': '#020201',
        'future-blue': '#0071e3',
      },
      fontFamily: {
        'neue-montreal': ['PP Neue Montreal', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'caption': ['10px', { lineHeight: '1.2', letterSpacing: '-0.2px' }],
        'heading-lg': ['18px', { lineHeight: '1.2', letterSpacing: '-0.36px' }],
        'display': ['27px', { lineHeight: '1.2', letterSpacing: '-0.54px' }],
      },
      spacing: {
        '4': '4px',
        '6': '6px',
        '10': '10px',
        '11': '11px',
        '22': '22px',
        '30': '30px',
        '34': '34px',
        '35': '35px',
        '50': '50px',
        '69': '69px',
        '94': '94px',
        '113': '113px',
        '130': '130px',
        '144': '144px',
        '220': '220px',
      },
      borderRadius: {
        'sm': '1.8px',
        'lg': '10px',
        '3xl': '26px',
        'full': '54px',
      },
      fontWeight: {
        'w350': '350',
        'regular': '400',
      },
    },
  },
  plugins: [],
}
