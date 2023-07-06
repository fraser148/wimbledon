import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          "wb": "#146633",
        },
        purple: {
          "wb": "#54098B",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
