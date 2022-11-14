import Router from "next/router";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

const truncateString = (fullStr, strLen) => {
    if (fullStr.length > strLen) {
        return fullStr.substring(0, strLen) + "...";
    }
};

function PodcastCard({ podcast }) {
    // const { isWeb3Enabled, account } = useMoralis();
    const [image, setimage] = useState("");
    const [podcastName, setpodcastName] = useState("");
    const [creator, setcreator] = useState("");
    const [animationUrl, setanimationUrl] = useState("");
    const { isWeb3Enabled, account } = useMoralis();

    const foward = (podcast) => {
        console.log({ podcast });
        Router.push({
            pathname: "/singlePodcast",
            query: {
                podcast: podcast.metadataURI,
                tokenId: podcast.id.toString(),
                creator: podcast.ownerAddress.id,
                created: podcast.created,
                isOnSale: podcast.isOnSale,
            },
        });
    };

    useEffect(() => {
        updateUI();
    }, []);

    async function updateUI() {
        const requestUrl = podcast.metadataURI?.replace("ipfs://", "https://ipfs.io/ipfs/");
        if (requestUrl) {
            const tokenUriResponse = await (await fetch(requestUrl)).json();
            if (tokenUriResponse) {
                setcreator(
                    podcast.ownerAddress.id === account
                        ? "Owned by you"
                        : "Owner: " + truncateString(podcast.ownerAddress.id, 15)
                );
                setimage(tokenUriResponse.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
                setanimationUrl(
                    tokenUriResponse.animation_url?.replace("ipfs://", "https://ipfs.io/ipfs/")
                );
                setpodcastName(tokenUriResponse.name);
            }
        }
        //  setImageURI(tokenURI);
    }

    return (
        <div style={{ cursor: "pointer" }}>
            <Card onClick={() => foward(podcast)} style={{ background: "#000000" }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt="Profile"
                    style={{ height: "350px", borderRadius: "22px" }}
                />
                <CardContent>
                    <Typography
                        fontSize="20px"
                        style={{
                            fontWeight: "600",
                            lineHeight: "30px",
                        }}
                        color="#ffffff"
                    >
                        {podcastName}
                    </Typography>
                    <Typography
                        fontSize="15px"
                        color="#ffffff"
                        style={{
                            fontWeight: "300",
                            lineHeight: "30px",
                        }}
                    >
                        {creator}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PodcastCard;
