const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    fontFamily: {
      sans: ["Akshar", ...defaultTheme.fontFamily.sans],
      body: ["Lora", ...defaultTheme.fontFamily.sans],
      ligatures: ["JetBrains Mono", ...defaultTheme.fontFamily.sans],
      thin: ["Inconsolata"]
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mateo: {
          primary: "#3ABFF8",

          secondary: "#828DF8",

          accent: "#F471B5",

          neutral: "#1D283A",

          "base-100": "#0F1729",

          info: "#0CA6E9",

          success: "#2BD4BD",

          warning: "#F4C152",

          error: "#FB6F84",
        },
      },
      "cupcake"
    ],
  },
};
