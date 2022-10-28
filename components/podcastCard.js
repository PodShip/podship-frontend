import { Typography, Card, CardMedia, CardContent } from "@mui/material";
function PodcastCard({ podcast }) {
    return (
        <div>
            <Card onClick={() => details(podcast)} style={{ background: "#000000" }}>
                <CardMedia
                    component="img"
                    image={podcast.image}
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
                        {podcast.podcastName}
                    </Typography>
                    <Typography
                        fontSize="15px"
                        color="#ffffff"
                        style={{
                            fontWeight: "300",
                            lineHeight: "30px",
                        }}
                    >
                        {podcast.creator}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PodcastCard;
