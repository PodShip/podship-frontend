import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../components/header";
import Waveform from "../components/Waveform";

export default function SinglePodcast() {
    useEffect(() => {}, []);
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
                                src="https://avatars.githubusercontent.com/u/29051615?v=4"
                                alt="podcast"
                                className="rounded-full mr-6"
                                style={{
                                    width: "193px",
                                }}
                            />
                            <div className="mt-10">
                                <p className="text-3xl leading-10 font-semibold">
                                    Woman lit in red
                                </p>
                                <p className="pt-2.5 text-lg font-light leading-6">Ron Lach</p>
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
                            <Waveform />
                        </Grid>
                    </Grid>
                </section>
            </div>
            <section id="second" className="p-36 pt-16">
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item md={5}>
                        <p className="pt-3.5font-semibold text-3xl leading-20">Record Details</p>
                        <p className="pt-3.5 font-light text-2xl leading-8">Note</p>
                        <p className="pt-3.5 text-xl font-light leading-6 pr-24">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s.
                        </p>
                        <div className="pt-6 grid gap-4 grid-cols-3 ">
                            <p className="pt-2.5 text-xl font-light leading-6">Date Pressed</p>
                            <p className="pt-2.5 text-xl font-light leading-6">Format</p>
                            <p className="pt-2.5 text-xl font-light leading-6">Token ID</p>
                        </div>
                        <div className="grid gap-4 grid-cols-3 grid-rows-3 ">
                            <p className="pt-2.5 text-xl font-semibold leading-6">
                                October 24, 2022
                            </p>
                            <p className="pt-2.5 text-xl font-semibold leading-6">.mp4</p>
                            <p className="pt-2.5 text-xl font-semibold leading-6">324 →</p>
                        </div>
                    </Grid>

                    <Grid item md={7}>
                        <div className="flex">
                            <div className="basis-1/2 pr-2">
                                <p className="font-semibold text-2xl leading-7">Auction Info</p>
                                <div
                                    className="border-white border-2 p-5 rounded-lg"
                                    style={{ height: "417px", width: "389px" }}
                                >
                                    <p className="pt-2.5 text-xl font-light leading-6">
                                        Reserve price
                                    </p>
                                    <p className="pt-2.5 text-xl font-semibold leading-6">1 ETH</p>
                                    <div className="grid grid-cols-1 divide-y">
                                        <div className="flex  justify-between	">
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                Creator share
                                            </p>
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                5%
                                            </p>
                                        </div>

                                        <div className="pt-3.5 flex justify-between">
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                Creator owner
                                            </p>
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                @ronlach
                                            </p>
                                        </div>

                                        <div className="pt-3.5  flex justify-between">
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                Split
                                            </p>
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                50%
                                            </p>
                                        </div>
                                        <div className="pt-3.5 flex justify-between">
                                            <p className="pt-3.5 text-xl font-light leading-6">
                                                Split recipent
                                            </p>
                                            <p className="pt-2.5 text-xl font-light leading-6">
                                                @gjentix
                                            </p>
                                        </div>
                                        <div className="pt-3.5  border-white grid grid-cols-1 divide-2 pb-4"></div>

                                        <button className="rounded-lg bg-white text-black h-14">
                                            Place bid
                                        </button>
                                    </div>
                                </div>
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
                </Grid>
            </section>

            <div style={{ minHeight: "40vh", padding: "6rem" }}></div>
        </div>
    );
}
