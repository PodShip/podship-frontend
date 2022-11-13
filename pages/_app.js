import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import Head from "next/head";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.thegraph.com/subgraphs/name/norvirae/podship",
});
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>PodShip</title>
                <meta name="description" content="podship" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Component {...pageProps} />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </>
    );
}

export default MyApp;
