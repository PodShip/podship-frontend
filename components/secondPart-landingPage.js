import PodcastCard from "../components/podcastCard";
import { Grid } from "@mui/material";

import { useState, useEffect } from "react";

export default function SecondPart() {
    const [loading, setLoading] = useState(false);
    const [podcasts, setPodcast] = useState([]);

    const data = [
        {
            podcastName: "The things we do",
            creator: "mrbeast",
            image: "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
        },
        {
            podcastName: "Woman lit in red",
            creator: "Ron Lach",
            image: "https://avatars.githubusercontent.com/u/29051615?v=4",
        },
        {
            podcastName: "The greates Podcast",
            creator: "Jhon Smith",
            image: "https://avatars.githubusercontent.com/u/16567195?v=4",
        },
        {
            podcastName: "7Seven Minutes",
            creator: "Logan Paul",
            image: "https://media.vanityfair.com/photos/5a4bda912d48cc419d39410d/2:3/w_686,h_1029,c_limit/Logan-Paul-Worrisome.jpg",
        },
    ];

    useEffect(() => {
        setLoading(true);
        setPodcast(data);
        setLoading(false);
    }, [loading]);

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
                {podcasts.length ? (
                    podcasts.map((podcast, index) => (
                        <Grid item md={3} key={index}>
                            <PodcastCard podcast={podcast} />
                        </Grid>
                    ))
                ) : (
                    <h2>No podcasts Yet...</h2>
                )}
            </Grid>
        </>
    );
}
