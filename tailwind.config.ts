import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: "#4A90E2", // Warna biru untuk tulisan utama
        textSecondary: "#4A90E2", // Warna abu-abu untuk tulisan sekunder
      },
    },
  },
  
  plugins: [],
} satisfies Config;

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          700: "#6B4226",
          800: "#5A3720",
        },
      },
    },
  },
  plugins: [],
};

