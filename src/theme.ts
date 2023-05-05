import { createTheme } from "@mui/material/styles";
import { Palette, PaletteOptions } from "@mui/material/styles";
import { Theme, ThemeOptions } from "@mui/material/styles";


interface CustomPaletteOptions extends PaletteOptions {
  customGray?: {
    main: string;
  };
}

interface CustomThemeOptions extends ThemeOptions {
  palette?: CustomPaletteOptions;
}


const theme = createTheme({
  palette: {
    primary: {
      main: "#e01660",
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
    customGray: {
      main: "#717171",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
} as CustomThemeOptions);

export default theme;
