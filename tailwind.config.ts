import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        handlee: ["Handlee", "sans-serif"],
      },
      boxShadow: {
        custom: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        custom: "1150px",
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
theme: {
  extend: {
    fontFamily: {
      grotesk: ['"Space Grotesk"', 'sans-serif'],
    },
  },
},
  plugins: [],
};

