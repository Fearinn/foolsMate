import "@/styles/normalize.css";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import { Layout } from "../components/Layout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const theme = extendTheme({
  fonts: {
    body: roboto.style.fontFamily,
    heading: roboto.style.fontFamily,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Head>
                <meta
                  name="google-site-verification"
                  content="PSznuh4wUWHpWuqM2VuNrLpAtbxZxFBuBaoJianzqIs"
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
                <meta
                  name="description"
                  content="Track Wolvesville battle pass season, items, players stats and more!"
                />
                <meta property="og:type" content="website" />
                <meta
                  property="og:title"
                  content="Fool's Mate - Wolvesville Online Tracker"
                ></meta>
                <meta
                  property="og:description"
                  content="Track Wolvesville battle pass season, items, players stats and more!"
                />
                <meta property="og:image" content="/cover.png" />
              </Head>
              <Component {...pageProps} className={roboto.className} />
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
