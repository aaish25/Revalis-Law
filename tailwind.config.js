/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e',
          light: '#2d3748',
          dark: '#0f1419',
        },
        accent: {
          DEFAULT: '#d4af37',
          dark: '#b8941f',
          light: '#f0e6d2',
        },
        gray: {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e8ecf0',
          600: '#4a5568',
          700: '#2d3748',
          900: '#0f1419',
        },
        danger: '#e74c3c',
        success: '#27ae60',
      },
      fontFamily: {
        sans: ["'Inter'", 'sans-serif'],
        serif: ["'Cormorant Garamond'", 'serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2.25rem',
        '4xl': '3rem',
      },
    },
  },
  plugins: [],
}

