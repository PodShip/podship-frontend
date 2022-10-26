import { useState, useEffect } from "react";
import { Card, useNotification } from "@web3uikit/core";
import { useWeb3Contract, useMoralis } from "react-moralis";
import nftMarketPlaceAbi from "../constants/NftMarketPlace.json";
import nftAbi from "../constants/BasicNft.json";
import Image from "next/image";
import { ethers } from "ethers";
import UpdateListingModal from "./UpdateListingModal";

const truncateString = (fullStr, strLen) => {
    if (fullStr.length > strLen) {
        return fullStr.substring(0, strLen) + "...";
    }
};

export default function NFTBox({ price, nftAddress, tokenId, markeplaceAddress, seller }) {
    const [imageURI, setImageURI] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const { isWeb3Enabled, account } = useMoralis();
    const dispatch = useNotification();
    const hidemodal = () => setModalVisibility(false);
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    });

    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftMarketPlaceAbi,
        contractAddress: markeplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    });

    useEffect(() => {
        if (isWeb3Enabled) updateUI();
    }, [isWeb3Enabled]);

    async function updateUI() {
        const tokenURI = await getTokenURI();
        console.log({ tokenURI });
        if (tokenURI) {
            const requestUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            const tokenUriResponse = await (await fetch(requestUrl)).json();
            const imagURI = tokenUriResponse.image;
            const imageURL = imagURI.replace("ipfs://", "https://ipfs.io/ipfs/");

            setImageURI(imageURL);
            setTokenName(tokenUriResponse.name);
            setTokenDescription(tokenUriResponse.description);
        }
        //  setImageURI(tokenURI);
    }
    const isOwnedByUser = seller === account || seller === undefined;
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateString(seller, 4);
    const handleCardClicked = () => {
        isOwnedByUser
            ? setModalVisibility(true)
            : buyItem({
                  onError: (error) => {
                      console.log(error);
                  },
                  onSuccess: handleBuyItemSuccess,
              });
    };

    const handleBuyItemSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "Item purchased successfully",
            title: "Item purchase - please refresh and move blocks",
            position: "topR",
        });
    };

    return (
        <div>
            <div>
                {imageURI ? (
                    <div>
                        <UpdateListingModal
                            isVisible={modalVisibility}
                            tokenId={tokenId}
                            markeplaceAddress={markeplaceAddress}
                            nftAddress={nftAddress}
                            onClose={hidemodal}
                        ></UpdateListingModal>
                        <Card
                            title={tokenName}
                            description={tokenDescription}
                            onClick={handleCardClicked}
                        >
                            <div className="p-2">
                                <div className="flex flex-col items-end gap-2">
                                    <div>#{tokenId}</div>
                                    <div className="italic text-sm">
                                        Owned By {formattedSellerAddress}
                                    </div>
                                    <Image
                                        loader={() => imageURI}
                                        src={imageURI}
                                        height="200"
                                        width="200"
                                    />
                                    <div className="font-bold">
                                        {ethers.utils.formatUnits(price, "ether")} ETH
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}
