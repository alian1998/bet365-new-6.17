import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#23bd97", 
        primary2: "#003d2d",
        deepPrimary: "#23bd97",
        textColor: "#DEDEDE",

        secondary: "#f0b21f",
        white: "#FFFFFF",
        white1: "#FFFFFF",
        white2: "#DEDEDE",
        black1: "#0B0C0C",
        slate1: "#CED3D3",
        deepSlate: "#1B2020",
        yellow: "#e4b21d",
        deepslate1: "#2C3434",
        green: "#2A7E2E",
        slateFont: "#677372",
        transperant: "#00000042",
      },
      screens: {
        xxs: "375px",
        xs: "400px",
        sm: "440px",
      },
    },
  },
  plugins: [],
};
export default config;
