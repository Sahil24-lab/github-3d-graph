// theme.ts
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 50,
  },
});

export default darkTheme;
