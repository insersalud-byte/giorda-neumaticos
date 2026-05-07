import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        giorda: {
          blue: {
            DEFAULT: "#0B3D91",
            50: "#E6EEF9",
            100: "#C2D3EF",
            200: "#85A6DF",
            300: "#4779CE",
            400: "#1E55B5",
            500: "#0B3D91",
            600: "#093174",
            700: "#072557",
            800: "#04193A",
            900: "#020D1E"
          },
          yellow: {
            DEFAULT: "#FFCB05",
            50: "#FFF8DB",
            100: "#FFEEAD",
            200: "#FFE17A",
            300: "#FFD442",
            400: "#FFCB05",
            500: "#E0B100",
            600: "#B08B00",
            700: "#806400",
            800: "#503F00",
            900: "#201900"
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"]
      },
      boxShadow: {
        "giorda": "0 10px 30px -10px rgba(11, 61, 145, 0.3)",
        "giorda-yellow": "0 10px 30px -10px rgba(255, 203, 5, 0.4)"
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out"
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } }
      }
    }
  },
  plugins: []
};

export default config;
