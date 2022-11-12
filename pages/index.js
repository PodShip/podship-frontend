const networkMapping = require("../constants/networkMapping.json");
import Header from "../components/header";
import FirstPart from "../components/firstPart-landingPage";
import SecondPart from "../components/secondPart-landingPage";
import ThirdPart from "../components/thirdPart-landingPage";
import FourthPart from "../components/fourthPart-landingPage";
import Footer from "../components/footer";

export default function Home() {
    // const { isWeb3Enabled, chainId } = useMoralis();
    // const chainString = chainId ? parseInt(chainId).toString() : 31337;
    // console.log({ chainId, chainString }, networkMapping[chainString]);
    // const markeplaceAddress = networkMapping[chainString].NftMarketPlace;

    return (
        <>
            <Header />
            <FirstPart />
            <SecondPart />
            <ThirdPart />
            <FourthPart />
            <Footer />
        </>
    );
}
