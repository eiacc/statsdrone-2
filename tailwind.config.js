/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'purple-radial': 'radial-gradient(circle, #402689 0%, #21176d 100%)',
        'orange-gradient': 'linear-gradient(90deg, #f56612 0%, #f38443 100%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      }
    }
  }
}
