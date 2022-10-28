import { useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import GET_ACTIVE_ITEM from "../constants/subgraphQueries";
const networkMapping = require("../constants/networkMapping.json");
import { useQuery } from "@apollo/client";
import Header from "../components/header";
import FirstPart from "../components/firstPart-landingPage";
import SecondPart from "../components/secondPart-landingPage";
import ThirdPart from "../components/thirdPart-landingPage";
import FourthPart from "../components/fourthPart-landingPage";

export default function Home() {
    // const { isWeb3Enabled, chainId } = useMoralis();
    // const chainString = chainId ? parseInt(chainId).toString() : 31337;
    // console.log({ chainId, chainString }, networkMapping[chainString]);
    // const markeplaceAddress = networkMapping[chainString].NftMarketPlace;
    // const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEM);

    return (
        <>
            <Header />
            <FirstPart />
            <SecondPart />
            <ThirdPart />
            <FourthPart />
        </>
    );
}
