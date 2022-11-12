import PodcastCard from "../components/podcastCard";
import { Grid } from "@mui/material";
import GET_ACTIVE_ITEM from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

export default function SecondPart() {
    // const [loading, setLoading] = useState(false);
    const { loading, error, data: pods } = useQuery(GET_ACTIVE_ITEM);

    return (
        <>
            <div className="grid grid-flow-col auto-cols-2 items-center">
                <div>
                    <h1 className="secondPart-Primary pl-16 pt-14">Dont Miss Out!</h1>
                    <h2 className="secondPart-Secondary pl-16">Join us in the new journey.</h2>
                </div>
                <div>
                    <a className="secondPart-primary-btn ml-6 p-4 items-center" href="/explore">
                        <p style={{ fontFamily: "Roc Grotesk" }}>Go Check it Out</p>
                    </a>
                </div>
            </div>
            <Grid
                className="p-16"
                container
                spacing={{ xs: 2, md: 8 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {pods ? (
                    pods.podcasts.map((podcast, index) =>
                        podcast.metadataURI ? (
                            <Grid item md={3} key={index}>
                                <PodcastCard podcast={podcast} />
                            </Grid>
                        ) : (
                            ""
                        )
                    )
                ) : (
                    <h2>loading...</h2>
                )}
            </Grid>
        </>
    );
}
