import "@/styles/globals.css";
import theme from "@/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
