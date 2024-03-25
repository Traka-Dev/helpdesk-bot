import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        md: "768px",
        xl: "1280px",
      },
      container: {
        screens: {
          DEFAULT: "896px",
          xl: "1216px",
        },
        center: true,
      },
    },
  },
  plugins: [],
};
export default config;
