const networkMapping = require("../constants/networkMapping.json");
import Head from "next/head";
import Header from "../components/header";
import FirstPart from "../components/firstPart-landingPage";
import SecondPart from "../components/secondPart-landingPage";
import ThirdPart from "../components/thirdPart-landingPage";
import FourthPart from "../components/fourthPart-landingPage";
import Footer from "../components/footer";

export default function Home() {
    return (
        <>
            <Head>
                <title>Podship - Web3</title>
                <link rel="shortcut icon" href="/logo.svg" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="keywords" content="podcast, nft, pods, web3, blockchain" />
                <meta
                    name="description"
                    content="buy and sell your podcast on a web3 based platform"
                />
                <meta property="og:locale" content="en_EN" />
                <meta property="og:site_name" content="Podship - Web3" />
                <meta
                    property="og:description"
                    content="buy and sell your podcast on a web3 based platform"
                />
                <meta property="og:type" content="portfolio" />
                <meta property="og:title" content="Podship - Web3" />
                <meta property="og:image" content="https://podship.s3.amazonaws.com/podship.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Podship - Web3" />
                <meta
                    property="twitter:description"
                    content="buy and sell your podcast on a web3 based platform"
                />
                <meta
                    property="twitter:image"
                    content="https://podship.s3.amazonaws.com/podship.png"
                />
            </Head>
            <Header />
            <FirstPart />
            <SecondPart />
            <ThirdPart />
            <FourthPart />
            <Footer />
        </>
    );
}
