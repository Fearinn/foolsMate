import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Layout>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
                <meta name="description" content="Track Wolvesville battle pass season, items, players stats and more"/>
              </Head>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
