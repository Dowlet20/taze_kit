/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-2': '0px 0px 2px 1px rgba(0,0,0, 0.2)',
        'custom': '0px 0px 5px 4px rgba(0,0,0, 0.1)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'custom-sans': ['Poppins', 'Nunito', 'Lato', 'sans-serif'],
        'custom-serif': ['Playfair Display', 'Libre Baskerville', 'Merriweather', 'serif'],
        'custom-mono': ['Inconsolata', 'Fira Code', 'Source Code Pro', 'monospace'],
        'cursive': ['Satisfy', 'Dancing Script', 'Parisienne', 'cursive'],
        'display': ['Abril Fatface', 'Bebas Neue', 'Anton', 'sans-serif'],
        'handwriting': ['Reenie Beanie', 'Caveat', 'Shadows Into Light', 'cursive']
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
