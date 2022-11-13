import { useEffect, useRef, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#fff",
    progressColor: "#A248ED",
    cursorColor: "OrangeRed",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    normalize: true,
    partialRender: true,
});

export default function Waveform({ waveUrl }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [duration, setduration] = useState(0);

    useEffect(() => {
        create();
    }, []);

    const create = async () => {
        const WaveSurfer = (await import("wavesurfer.js")).default;
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(waveUrl);
        console.log(wavesurfer.current);
        wavesurfer.current.on("ready", function () {
            setduration(wavesurfer.current.getDuration());
        });
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
        wavesurfer.current.playPause();
    };

    const secs2Time = (secs) => {
        const hours = Math.floor(secs / 60 / 60)
            .toString()
            .padStart(2, 0);
        return hours + ":" + new Date(secs * 1000).toISOString().substr(14, 5);
    };

    return (
        <div>
            <p>{secs2Time(duration)}</p>
            <div id="waveform" className="waveDiv" ref={waveformRef} />
            <p className="float-right ">{secs2Time(duration)} </p>
            <div className="controls" style={{ cursor: "pointer" }}>
                {!playing ? (
                    <PlayCircleOutlineIcon onClick={handlePlayPause} />
                ) : (
                    <PauseCircleOutlineIcon onClick={handlePlayPause} />
                )}

                <div onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</div>
            </div>
        </div>
    );
}
