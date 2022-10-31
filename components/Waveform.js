import { useEffect, useRef, useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
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

export default function Waveform() {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlaying] = useState(false);
    const url =
        "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";

    useEffect(() => {
        create();
    }, []);

    const create = async () => {
        const WaveSurfer = (await import("wavesurfer.js")).default;
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(url);
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
        wavesurfer.current.playPause();
    };

    return (
        <div>
            <p>1:15</p>
            <div id="waveform" className="waveDiv" ref={waveformRef} />
            <p className="float-right ">2:30</p>
            <div className="controls">
                <PlayCircleOutlineIcon onClick={handlePlayPause} />
                <div onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</div>
            </div>
        </div>
    );
}
