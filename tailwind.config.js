/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      red: "#f43f5e",
      gray: "#6b7280",
      "gray-200": "#d1d5db",
      "blue-300": "#93c5fd",
      "blue-400": "#60a5fa",
      "blue-500": "#3b82f6",
      "blue-600": "#2563e",
      "sky-200": "#bae6fd",
      "sky-300": "#7dd3fc",
      "sky-400": "#38bdf8",
      "sky-500": "#0ea5e9",
      "sky-600": "#0284c7",
      'black': '#000000'
    },
    extend: {},
  },
  plugins: [],
};
