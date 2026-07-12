/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F7F8F5",
          dark: "#101310",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#171B16",
        },
        "surface-secondary": {
          DEFAULT: "#F3F5F2",
          dark: "#1D211B",
        },
        "text-primary": {
          DEFAULT: "#1F2937",
          dark: "#F1F3EF",
        },
        "text-secondary": {
          DEFAULT: "#6B7280",
          dark: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#2E7D32",
          light: "#66BB6A",
          dark: "#66BB6A",
        },
        warning: "#F59E0B",
        error: "#DC2626",
        success: "#16A34A",
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#2A2E27",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out",
        slideUp: "slideUp 200ms ease-out",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgba(16, 19, 16, 0.04), 0 1px 6px -1px rgba(16, 19, 16, 0.06)",
        card: "0 2px 8px -2px rgba(16, 19, 16, 0.08), 0 1px 3px -1px rgba(16, 19, 16, 0.06)",
        elevated: "0 8px 24px -6px rgba(16, 19, 16, 0.12)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
