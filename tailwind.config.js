/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        lobester: ['Lobster', 'cursive'],
        sans: ["Proxima Nova"],
        fantasy: ['fantasy'],
        merinda: ["Merienda", 'serif'],
        josefin: ["Josefin Sans", "serif"],
      },
      backgroundColor: {
        'fav': '#4C7766',
        'fav2': '#EBE6E0'
      },
      borderRadius: {
        'roun' : '50%',
      },
      

      colors:{
        'fav': '#4C7766',
        'fav2': '#f5f5f4',
        'fav3': '#93c5fd',
        'fav4' :'#f9a8d4',
        'fav5' :'#d9f99d',
      },
      screens: {
        'xs': '480px',            // Extra small devices
        '3xl': '1600px',          // Larger than 2xl
        'hover-hover': {          // Custom media query for hover-capable devices
          raw: '(hover: hover)',
        },
      },

      screens: {
        'xs': '480px',        // Extra small
        'sm': '640px',        // Small (default)
        'md': '768px',        // Medium (default)
        'lg': '1024px',       // Large (default)
        'xl': '1280px',       // Extra large (default)
        '2xl': '1536px',      // 2x Extra large (default)
        '3xl': '1600px',      // Custom extra-large breakpoint
        'portrait': {         // Custom portrait orientation
          raw: '(orientation: portrait)',
        },
        'retina': {           // Custom retina display query
          raw: '(-webkit-min-device-pixel-ratio: 2)',
        },
      }
      
    },
  },
  plugins: [],
};

