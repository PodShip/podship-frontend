import { useState, useEffect } from "react";
import { Grid, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import Header from "../components/header";
import Waveform from "../components/Waveform";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Footer from "../components/footer";
import moment from "moment";
import { Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { contractAbi, contractAddress } from "../constants/constants";
import { useNotification } from "@web3uikit/core";

export default function SinglePodcast() {
    // let { podcast, tokenId } = useQuery();
    const router = useRouter();
    const { isWeb3Enabled, account } = useMoralis();
    const [startAuctionData, setstartAuctionData] = useState({});
    const [loading, setloading] = useState(false);
    const [image, setimage] = useState("");
    const [podcastName, setpodcastName] = useState("");
    const [description, setdescription] = useState("");
    const [creatorAddress, setcreatorAddress] = useState("");
    const [animationUrl, setanimationUrl] = useState("");
    const { podcast, tokenId, creator, created, isOnSale } = router.query;
    const { runContractFunction: startEndAuction } = useWeb3Contract();
    const dispatch = useNotification();

    useEffect(() => {
        updateUI();
    }, []);

    async function updateUI() {
        const requestUrl = podcast.replace("ipfs://", "https://ipfs.io/ipfs/");
        if (requestUrl) {
            const tokenUriResponse = await (await fetch(requestUrl)).json();
            console.log({ tokenUriResponse });
            if (tokenUriResponse) {
                setcreatorAddress(creator === account ? "Owned by you" : creator);
                setimage(tokenUriResponse.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
                setdescription(tokenUriResponse.description);
                setanimationUrl(
                    tokenUriResponse.animation_url?.replace("ipfs://", "https://ipfs.io/ipfs/")
                );
                setpodcastName(tokenUriResponse.name);
            }
        }
        //  setImageURI(tokenURI);
    }

    async function onStartAuction() {
        setloading(true);

        const response = await startAuction({
            params: {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "startAuction",
                params: {
                    _podcastId: tokenId,
                    _reservePrice: startAuctionData.reservePrice,
                    _duration: startAuctionData.duration,
                    _royaltyPercent: startAuctionData.percent,
                },
            },
            onError: () => handleError(),
            onSuccess: () => handleSuccess(),
        });
    }

    async function onEndAuction() {
        const response = await startEndAuction({
            params: {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "endAuction",
                params: {
                    _auctionId: tokenId,
                },
            },
            onError: () => handleError(),
            onSuccess: () => handleSuccess(),
        });
    }

    const handleSuccess = async () => {
        setloading(false);
        dispatch({
            type: "success",
            message: "It might take a few minutes to mint your NFT, stay tuned !",
            title: "Successfully Added your Podcast!",
            position: "topR",
        });
    };

    const handleError = async () => {
        setloading(false);
        dispatch({
            type: "error",
            message: "Please fill all required fileds",
            title: "Error !",
            position: "topR",
        });
    };
    return (
        <div>
            <div
                className="bg-center pb-24"
                style={{
                    backgroundImage: "url(singlepodcast.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    height: "687px",
                    width: "100%",
                    padding: "0",
                    margin: "0",
                    backgroundSize: "cover",
                    overflow: "hidden",
                    zIndex: "100",
                }}
            >
                <Header />
                <section id="first" className="p-36 pt-44">
                    <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item md={6} className="flex p-24">
                            <img
                                src={image}
                                alt="podcast"
                                className="rounded-full mr-6"
                                style={{
                                    width: "193px",
                                }}
                            />
                            <div className="mt-10">
                                <p className="text-3xl leading-10 font-semibold">{podcastName}</p>
                                <p className="pt-2.5 text-lg font-light leading-6">
                                    {creatorAddress}
                                </p>
                                <div className="flex ">
                                    <p className="pt-2.5 text-lg font-light leading-6 pr-14">
                                        Catalog Certified
                                    </p>
                                    <p className="pt-2.5 text-lg font-light leading-6">
                                        Unmodified
                                    </p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item md={6}>
                            {animationUrl ? (
                                <Waveform waveUrl={animationUrl} />
                            ) : (
                                <div>loading...</div>
                            )}
                        </Grid>
                    </Grid>
                </section>
            </div>
            <section id="second" className="p-36 pt-16">
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item md={5}>
                        <p className="pt-3.5font-semibold text-3xl leading-20">Record Details</p>
                        <p className="pt-3.5 font-light text-2xl leading-8">Note</p>
                        <p className="pt-3.5 text-xl font-light leading-6 pr-24">{description}</p>
                        <div className="pt-6 grid gap-4 grid-cols-3 ">
                            <p className="pt-2.5 text-xl font-light leading-6">Date Pressed</p>
                            <p className="pt-2.5 text-xl font-light leading-6">Format</p>
                            <p className="pt-2.5 text-xl font-light leading-6">Token ID</p>
                        </div>
                        <div className="grid gap-4 grid-cols-3 grid-rows-3 ">
                            <p className="pt-2.5 text-xl font-semibold leading-6">
                                {moment(parseInt(created)).format("YYYY-MM-DD")}
                            </p>
                            <p className="pt-2.5 text-xl font-semibold leading-6">.mp4</p>
                            <p className="pt-2.5 text-xl font-semibold leading-6">{tokenId}</p>
                        </div>
                    </Grid>

                    {creator === account ? (
                        <Grid item md={7}>
                            <div className="flex">
                                <div className="basis-1/2 pr-2">
                                    <p className="font-semibold text-2xl leading-7">Auction Info</p>
                                    {isOnSale === false ? (
                                        <div
                                            className="border-white border-2 p-5 rounded-lg"
                                            style={{ height: "417px", width: "389px" }}
                                        >
                                            <div className="flex  justify-between	">
                                                <p className="pt-2.5 text-xl font-light leading-6">
                                                    Reserve price
                                                </p>
                                                <Input
                                                    className="auctionInputs"
                                                    inputProps={{
                                                        min: 0,
                                                        style: { textAlign: "center" },
                                                    }}
                                                    onChange={(e) => {
                                                        setstartAuctionData({
                                                            ...startAuctionData,
                                                            reservePrice: e.target.value,
                                                        });
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="start">
                                                            <img src="info.svg"></img>
                                                        </InputAdornment>
                                                    }
                                                    placeholder="Type amount"
                                                />
                                            </div>

                                            <hr className="mt-5 mb-5" />

                                            <div className="flex  justify-between	">
                                                <p className="pt-2.5 text-xl font-light leading-6">
                                                    Duration
                                                </p>
                                                <Input
                                                    className="auctionInputs"
                                                    inputProps={{
                                                        min: 0,
                                                        style: { textAlign: "center" },
                                                    }}
                                                    onChange={(e) => {
                                                        setstartAuctionData({
                                                            ...startAuctionData,
                                                            duration: e.target.value,
                                                        });
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="start">
                                                            <img src="info.svg"></img>
                                                        </InputAdornment>
                                                    }
                                                    placeholder="Type The Days"
                                                />
                                            </div>

                                            <hr className="mt-5 mb-5" />
                                            <div className="flex  justify-between	">
                                                <p className="pt-2.5 text-xl font-light leading-6">
                                                    Royalty %
                                                </p>
                                                <Input
                                                    className="auctionInputs"
                                                    inputProps={{
                                                        min: 0,
                                                        style: { textAlign: "center" },
                                                    }}
                                                    onChange={(e) => {
                                                        setstartAuctionData({
                                                            ...startAuctionData,
                                                            percent: e.target.value,
                                                        });
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="start">
                                                            <img src="info.svg"></img>
                                                        </InputAdornment>
                                                    }
                                                    placeholder="Type percent"
                                                />
                                            </div>

                                            <hr className="mt-5 mb-5" />
                                            <div className="ml-10 w-auto">
                                                <LoadingButton
                                                    className="startAuc-btn w-10/12"
                                                    onClick={onStartAuction}
                                                    loading={loading}
                                                >
                                                    Start Auction
                                                </LoadingButton>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="border-white border-2 p-5 rounded-lg"
                                            style={{ height: "417px", width: "389px" }}
                                        >
                                            <div className="flex  justify-between	">
                                                <p className="pt-3.5 text-xl font-light leading-6">
                                                    Last bid price
                                                </p>
                                                <p className="pt-3.5 text-xl font-light leading-6">
                                                    1 Matic
                                                </p>
                                            </div>
                                            <br />
                                            <div className="flex  justify-between	">
                                                <p className="pt-3.5 text-xl font-light leading-6">
                                                    Auction in progress...
                                                </p>
                                            </div>
                                            <hr className="mt-5 mb-5" />
                                            <div className="ml-10 w-auto">
                                                <LoadingButton
                                                    className="startAuc-btn w-10/12"
                                                    onClick={onEndAuction}
                                                    loading={loading}
                                                >
                                                    End Auction
                                                </LoadingButton>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="basis-1/2 pl-2 ">
                                    <p className="font-semibold text-2xl leading-7">Bids History</p>
                                    <div
                                        className="border-white border-2 p-5 rounded-lg h-ful"
                                        style={{ height: "417px", width: "389px" }}
                                    >
                                        <p className="mt-36 text-center text-xl font-light leading-6">
                                            Drop some eth to kick off this auction
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                </Grid>
            </section>

            <Footer />
        </div>
    );
}
