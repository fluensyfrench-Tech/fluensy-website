import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        handlee: ["Handlee", "sans-serif"],
      },
      colors: {
        primary: "#181A25",
        "secondary-1": "#643BD8",
        "secondary-2": "#7DE5F2",
        "secondary-3": "#F76015",
        "grey-50": "#F1F1F1",
        "grey-100": "#E4E6EB",
        "grey-300": "#A1A4AD",
        "grey-200": "#C7CAD1",
        "grey-400": "#7A7D88",
        "grey-600": "#3A3D44",
      },
      boxShadow: {
        custom: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        custom: "1150px",
      },
    },
  },
  plugins: [
    function({ addVariant }: { addVariant: any }) {
      addVariant("child", "& > *");
      addVariant("child-button", "& > button");
    }
  ],
};

export default config;
