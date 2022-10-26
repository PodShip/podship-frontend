import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Form, useNotification } from "@web3uikit/core";
import { ethers } from "ethers";
import nftAbi from "../constants/BasicNft.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import nftMarketPlaceAbi from "../constants/NftMarketPlace.json";
const networkMapping = require("../constants/networkMapping.json");

export default function Home() {
    const { chainId } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : 31337;
    const markeplaceAddress = networkMapping[chainString].NftMarketPlace;
    const { runContractFunction } = useWeb3Contract();
    const dispatch = useNotification();

    async function approveAndList(data) {
        console.log("approving...");
        const nftAddress = data.data[0].inputResult;
        const tokenId = data.data[1].inputResult;
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString();

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: markeplaceAddress,
                tokenId: tokenId,
            },
        };

        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
            onError: (error) => console.log(error),
        });
    }

    async function handleApproveSuccess(nftAddress, tokenId, price) {
        console.log("Let's list it!");
        const listOptions = {
            abi: nftMarketPlaceAbi,
            contractAddress: markeplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        };

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        });
    }

    const handleListSuccess = async () => {
        dispatch({
            type: "success",
            message: "Successfully listed your item!",
            title: "Item Listed",
            position: "topR",
        });
    };
    return (
        <div className={styles.container}>
            <Form
                onSubmit={approveAndList}
                data={[
                    {
                        name: "NFT Address",
                        type: "text",
                        inputWidth: "50%",
                        value: "",
                        key: "nftAddress",
                    },
                    {
                        name: "Token ID",
                        type: "number",
                        inputWidth: "50%",
                        value: "",
                        key: "tokenId",
                    },
                    {
                        name: "Price (in Eth)",
                        type: "number",
                        inputWidth: "50%",
                        value: "",
                        key: "price",
                    },
                ]}
                title="Sell your NFT!"
                id="sell-nft"
            />
        </div>
    );
}
