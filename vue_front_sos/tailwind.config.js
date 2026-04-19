/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sos: {
          midnight: '#000531',
          black: '#000000',
          primary: '#0048CA',
          secondary: '#001EAA',
          white: '#FFFFFF'
        }
      },
      boxShadow: {
        panel: '0 10px 30px rgba(0, 0, 0, 0.22)'
      },
      backgroundImage: {
        'sos-gradient': 'linear-gradient(135deg, rgba(0,5,49,0.98), rgba(0,30,170,0.9), rgba(0,72,202,0.8))'
      }
    }
  },
  plugins: []
};
