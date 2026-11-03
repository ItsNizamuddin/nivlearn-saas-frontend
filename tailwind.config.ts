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
        prime: "#2AA4B7",
        prime1: "#0099FF",
        "sec-prime": "#F4F6F8",
        "prime-dark": "#082D45",
        "prime-yellow": "#FF9E0A",
        "prime-outline": "#19809A",
        "prime-light": "#F3F4F6",
        light: "#F0F4F9",
        "prime-gray": "#F2F2F2",
        textblack: "#030303",
        bluebutton: "#47BDCD",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #1d8dab, #073f57)",
        "custom-blue-schedule": "radial-gradient(ellipse 645.41% 133.94% at 100% 0%, #83DAE2 0%, #D9F6F7 31%, #F1F4F7 65%, #83DAE2 100%)",
        "custom-gradient-blue": "linear-gradient(to bottom, #1d8dab, #073f57)",
        "custom-orange": "linear-gradient(53deg, #FF9E0A 11.33%, rgba(255, 158, 10, 0.41) 68.25%, rgba(255, 158, 10, 0.00) 95.21%)",
        "custom-blue": "linear-gradient(53deg, #47BDCD 11.33%, rgba(71, 189, 205, 0.41) 68.25%, rgba(42, 164, 183, 0.00) 95.21%)",
        "light-blue-gradient": "linear-gradient(90deg, rgba(3, 18, 111, .2), rgba(23, 111, 177, .2) 51.84%, rgba(38, 185, 230, .2) 75.52%, rgba(45, 218, 255, .2))",
        "topright-blue": "radial-gradient(217.31% 129.23% at 100% 0%, #83DAE2 0%, #D9F6F7 30.92%, #F1F4F7 65.03%)",
        "cricle": "conic-gradient(#FF9E0A 0% 95%, white 85% 100%)",
        "radial-gradient": "radial-gradient(circle, #83DAE2, #D9F6F7, #F1F4F7)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        bounceSlow: "bounce 2s infinite",
        shake: "shake 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;