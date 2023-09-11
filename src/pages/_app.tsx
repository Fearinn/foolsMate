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
import { Analytics } from "@vercel/analytics/react";

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
                <meta
                  property="og:url"
                  content="https://foolsmate.vercel.app"
                />
                <meta name="application-name" content="PWA App" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                  name="apple-mobile-web-app-status-bar-style"
                  content="default"
                />
                <meta name="apple-mobile-web-app-title" content="Fool's Mate" />
                <meta
                  name="description"
                  content="Track Wolvesville battle pass season, items, players stats and more!"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                  name="msapplication-config"
                  content="/icons/browserconfig.xml"
                />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#fe6ab4" />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/favicon.svg"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/favicon.svg"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                  rel="mask-icon"
                  href="?favicon.svg"
                  color="#5bbad5"
                />
                <link rel="shortcut icon" href="/favicon.svg" />
              </Head>
              <Component {...pageProps} className={roboto.className} />
              <Analytics />
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
