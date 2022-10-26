import { Modal, Input, useNotification } from "@web3uikit/core";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import nftMarketPlaceAbi from "../constants/NftMarketPlace.json";
import { ethers } from "ethers";
export default function UpdateListingModal({
    nftAddress,
    markeplaceAddress,
    tokenId,
    isVisible,
    onClose,
}) {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState("0");
    const dispatch = useNotification();

    console.log({ nftAddress, tokenId, markeplaceAddress });
    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketPlaceAbi,
        contractAddress: markeplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
        },
    });

    const handleUpdateListingSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "Listing updated successfully",
            title: "Listing update - please refresh and move blocks",
            position: "topR",
        });
        onClose();
    };
    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={() => {
                console.log("asdasd");
                updateListing({
                    onError: (error) => {
                        console.log(error);
                    },
                    onSuccess: handleUpdateListingSuccess,
                });
            }}
        >
            <Input
                label="Price"
                placeholder="Price"
                type="number"
                onChange={(event) => {
                    setPriceToUpdateListingWith(event.target.value);
                }}
            />
        </Modal>
    );
}
