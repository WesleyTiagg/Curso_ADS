/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quiz-purple': '#7C3AED',
        'quiz-yellow': '#FACC15',
        'quiz-dark': '#111827',
      },
      borderRadius: {
        quiz: '32px'
      }
    },
  },
  plugins: [],
}