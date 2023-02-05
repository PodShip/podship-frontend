import { useState, useEffect } from "react";
import { CircularProgress, Box, Grid } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
// import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
const PushAPI = require("@pushprotocol/restapi");

export default function Notifications() {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [subscriberStatus, setSubscriberStatus] = useState(false);
    const { account } = useMoralis();

    const channelAddr = "0x80744e7DAaDb9E175B76f1651f564244b2F806D7";

    async function updateUI() {
        const rawResponse = await fetch("/api/getNotifications");
        const rawJSON = await rawResponse.json();
        console.log({ rawJSON });

        setNotifications(rawJSON);
        setLoading(false);
    }

    useEffect(() => {
        updateUI();
        updateSubscriberStatus();
    }, []);

    async function optin() {
        await optFunctionality();

        setLoading(false);
    }

    const optFunctionality = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = provider.getSigner();
        try {
            if (subscriberStatus) {
                await PushAPI.channels.unsubscribe({
                    signer: _signer,
                    channelAddress: channelAddr,
                    userAddress: account,
                    env: "staging",
                    onSuccess: () => {
                        console.log("opt out success");
                        setSubscriberStatus(false);
                    },
                    onError: (e) => {
                        console.error("opt out error", e);
                    },
                });
            } else {
                console.log({ account });
                await PushAPI.channels.subscribe({
                    signer: _signer,
                    channelAddress: channelAddr,
                    userAddress: account,
                    env: "staging",
                    onSuccess: () => {
                        console.log("opt in success");
                        setSubscriberStatus(true);
                    },
                    onError: (e) => {
                        console.error("opt in error", e);
                    },
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const updateSubscriberStatus = async () => {
        try {
            setLoading(true);
            let subscriptions = await PushAPI.user.getSubscriptions({
                user: "eip155:41:" + account,
                env: "staging",
            });

            subscriptions = subscriptions.map((sub) => sub.channel.toLowerCase());

            const status = subscriptions.includes(channelAddr.toLowerCase());

            console.log({ status, subscriptions });

            setSubscriberStatus(status);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
                <button
                    className="bg-white "
                    style={{ color: "black", borderRadius: "10px", padding: "15px" }}
                    onClick={() => optin()}
                >
                    Click Here To <strong>{subscriberStatus ? "Opt-Out" : "Opt-In"}</strong> From
                    our Notification Channel !
                </button>
            </div>
            <div style={{ minHeight: "60vh", padding: "6rem" }}>
                {loading ? (
                    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                        <CircularProgress style={{ width: "6rem", height: "6rem" }} />
                    </div>
                ) : (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 8 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {notifications ? (
                                notifications.map((not, index) => (
                                    <Grid item md={5} key={index}>
                                        <a href={not.cta}>
                                            <div
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    borderRadius: "15px",
                                                    padding: "10px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <img
                                                    src={not.icon}
                                                    style={{ margin: "10px", borderRadius: "15px" }}
                                                ></img>
                                                <div style={{ margin: "10px" }}>
                                                    <strong style={{ color: "#cf166b" }}>
                                                        {not.notification.title}
                                                    </strong>{" "}
                                                    <p style={{ marginTop: "10px" }}>
                                                        {not.notification.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </Grid>
                                ))
                            ) : (
                                <h2>No podcasts Yet...</h2>
                            )}
                        </Grid>
                    </Box>
                )}
            </div>
            <Footer />
        </div>
    );
}
