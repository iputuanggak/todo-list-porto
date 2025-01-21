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
        primary: "var(--foreground)",
        secondary: "var(--background)",
        "primary-subdued": "#343A40",
        "secondary-subdued": "#E9ECEF",
        "secondary-disabled": "#CED4DA"
      },
      fontFamily: {
        sans: ["var(--noto_sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
