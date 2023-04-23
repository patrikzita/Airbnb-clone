import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#e01660",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },

  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
