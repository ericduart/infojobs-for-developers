/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      height: {
        'screen/2': '50vh'
      }
    },
    colors: {
      infojobs: '#167DB7',
      infojobs2: '#8a51fc',
      infojobsOrange: '#FF6340',
      infojobsOrangeSecundary: '#e05c3e',
      white: '#FFFFFF',
      gray: '#9c9c9c',
      secundarytd: '#dbeaff',
      red: '#ff3b62'
    }
  },
  plugins: []
}
