/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 使用 class 模式以支持 next-themes
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        success: "#0070f3",
        cyan: "#79FFE1",
        primary: "#6366f1",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
