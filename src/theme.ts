import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#e2765a",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Helvetica Neue, sans-serif",
  },
});

export default theme;
