/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Xblue: "#1a8cd8",
        XsecBlue: "#187aad",
        Xwhite: "#d7dbdc",
        Xicon: "#e7e9ea",
        Xgrey: "#71767b",
        Xhover: "rgba(148, 163, 184, 0.3)",
        XGraybutton: "#d7dbdc",
        XhashTag: "#1d9bf0",
        XSignIn : "#1C98ED",
        XhoverSignIn : "#1c98a2"

      },
      height: {
        avatar: "3rem",
      },
      width: {
        avatar: "3rem",
      },
    },
  },
  plugins: [],
};
