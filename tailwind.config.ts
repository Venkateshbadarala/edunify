import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        
        "background": "linear-gradient(139deg, rgba(0,0,0,1) 15%, rgba(0,27,124,10) 100%, rgba(0,27,124,10) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
