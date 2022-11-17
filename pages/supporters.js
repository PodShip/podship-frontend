import { useQuery } from "@apollo/client";
import React from "react";
import Header from "../components/header";
import { GET_SUPPORTERS, GET_SUPPORTERS_WINNERS } from "../constants/subgraphQueries";

function supporters(props) {
    const { loading, error, data: supporters } = useQuery(GET_SUPPORTERS);
    const { loadingWinners, error: winnerError, data: winners } = useQuery(GET_SUPPORTERS_WINNERS);

    console.log({ supporters });
    console.log({ winners, winnerError, loadingWinners });
    return (
        <div className="">
            <Header />
            <center className="mt-24 mx-auto mb-40">
                <div className="w-1/2 ">
                    <p className="text-4xl leading-10 font-semibold">Supporters</p>
                    <p className="mb-7 text-base leading-10 font-normal">
                        Tip your fav creator and get a chance to win a free NFT
                    </p>

                    <div
                        className="bg-gray-900 p-10	mb-10"
                        style={{ width: "600px", borderRadius: "22px" }}
                    >
                        <div className="flex mb-8">
                            <img src="Vector.png" alt="" />
                            <p className="ml-2 ">Recent Winners</p>
                        </div>

                        {!loadingWinners && winners && winners.supporterNFTs.length > 0 ? (
                            winners.supporterNFTs.map((x) => (
                                <div className="flex mb-5 justify-between">
                                    <p
                                        style={{ background: "#434242", borderRadius: "8px" }}
                                        className="px-5 py-3"
                                    >
                                        {x.id}
                                    </p>
                                    <p
                                        style={{ background: "#434242", borderRadius: "8px" }}
                                        className="px-10 py-3"
                                    >
                                        {x.ownerAddress.id}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>No Winners yet stay tuned !</p>
                            </div>
                        )}
                    </div>

                    <div
                        className="bg-gray-900 p-10	mb-7"
                        style={{ width: "600px", borderRadius: "22px" }}
                    >
                        <div className="flex mb-8">
                            <p className="ml-2 ">Recent Supporters</p>
                        </div>

                        {!loading && supporters ? (
                            supporters.supporterNFTs.map((x) => (
                                <div className="flex mb-5 justify-between">
                                    <p
                                        style={{ background: "#434242", borderRadius: "8px" }}
                                        className="px-5 py-3"
                                    >
                                        {x.id}
                                    </p>
                                    <p
                                        style={{ background: "#434242", borderRadius: "8px" }}
                                        className="px-8 py-3"
                                    >
                                        {x.ownerAddress.id}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>No Supporters yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </center>
        </div>
    );
}

export default supporters;
