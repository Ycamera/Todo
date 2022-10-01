import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
			</Head>

			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}

export default MyApp;
