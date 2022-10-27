import { useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import GET_ACTIVE_ITEM from "../constants/subgraphQueries";
const networkMapping = require("../constants/networkMapping.json");
import { useQuery } from "@apollo/client";
import Header from "../components/header";

export default function Home() {
    // const { isWeb3Enabled, chainId } = useMoralis();
    // const chainString = chainId ? parseInt(chainId).toString() : 31337;
    // console.log({ chainId, chainString }, networkMapping[chainString]);
    // const markeplaceAddress = networkMapping[chainString].NftMarketPlace;
    // const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEM);

    return (
        <div className="bg-right-top" style={{ backgroundImage: "url(background.svg)" }}>
            <Header />
            <div className="h-screen w-screen">
                <h1 className="landingPage-main">THE NEW PODCAST 3.0</h1>
                <br />
                <h5 className="landingPage-sub">
                    Join us in the new journey where we decentralize the podcast industry
                </h5>
            </div>
        </div>
    );
}
