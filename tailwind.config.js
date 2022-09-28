module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    screens: {
      xl: { max: "1399px" },

      lg: { max: "1199px" },

      md: { max: "991px" },

      sm: { max: "767px" },

      xs: { max: "576px" },
    },
    extend: {
      colors: {
        light: "#eee",
        dark: "#444",
        "dark-50": "#00000050",
        "light-50": "#ffffff50",
        main: "#26233e",
        second: "#ff0063",
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill,minmax(100px,1fr))",
      },
    },
  },
  plugins: [],
};
