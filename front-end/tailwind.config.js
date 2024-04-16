/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'unifae-green-1': '#38A69B',
        'unifae-green-2': '#32736C',
        'unifae-green-3': '#25403D',
        'unifae-green-4': '#3BBFA7',
        'unifae-green-5': '#E5F4F3',
        'unifae-white-1': '#FEFEFE',
      }
    },
  },
  plugins: [],
}