import styles from "../styles/Home.module.css";
import { useMoralisQuery } from "react-moralis";
import { useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import GET_ACTIVE_ITEM from "../constants/subgraphQueries";
const networkMapping = require("../constants/networkMapping.json");
import { useQuery } from "@apollo/client";

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : 1337;
    console.log({ chainId, chainString });
    const markeplaceAddress = networkMapping[chainString].NftMarketPlace;
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEM);

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    loading || !listedNfts ? (
                        <p>Loading...</p>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            console.log(nft);
                            const { price, nftAddress, tokenId, seller } = nft;
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    seller={seller}
                                    markeplaceAddress={markeplaceAddress}
                                />
                            );
                        })
                    )
                ) : (
                    <div>web 3 currently not enabled</div>
                )}
            </div>
        </div>
    );
}
