import { useState, useEffect } from "react";
import { CircularProgress, Box, Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import Header from "../components/header";
import { GET_EXPLORE_PAGE_ITEMS } from "../constants/subgraphQueries";
import PodcastCard from "../components/podcastCard";
import Footer from "../components/footer";
export default function Explore() {
    // const [loading, setLoading] = useState(false);
    const [podcasts, setPodcast] = useState([]);
    const { loading, error, data: pods } = useQuery(GET_EXPLORE_PAGE_ITEMS);

    return (
        <div>
            <Header />

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
                            {pods ? (
                                pods.podcasts.map((podcast, index) => (
                                    <Grid item md={3} key={index}>
                                        <PodcastCard podcast={podcast} />
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
