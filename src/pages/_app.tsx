import Layout from "@/components/layout";
import "@/styles/globals.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
