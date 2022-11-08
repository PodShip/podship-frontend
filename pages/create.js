import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["mp4", "mp3"];

export default function Explore() {
    const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <>
            <Header />
            <div>
                <div className="leftPanel">
                    <h1 className="primaryTxt mt-10 ml-16">Upload Form</h1>
                    <p className="ml-16 mr-16 mt-5">
                        Things you need to complte in order to upload Podcast
                    </p>
                    <ul className="ml-16 mt-5">
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                <img src="selected.svg"></img>
                                <p className="ml-5">Podcast Name</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                <img src="unselected.svg"></img>
                                <p className="ml-5">Description</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                <img src="unselected.svg"></img>
                                <p className="ml-5">Price</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                <img src="unselected.svg"></img>
                                <p className="ml-5">Upload Podcast</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="rightPanel">
                    <FormControl className="flex m-10" style={{ color: "white" }}>
                        <labela htmlFor="my-input">Podcast Name</labela>
                        <Input
                            style={{ color: "white" }}
                            className="inputTxt p-3 mt-3"
                            id="my-input"
                            placeholder="Cool podcast name"
                        />
                    </FormControl>
                    <FormControl className="flex m-10" style={{ color: "white" }}>
                        <label htmlFor="my-input">Description</label>
                        <TextField
                            style={{ color: "white" }}
                            className="inputTxt p-3 mt-3"
                            placeholder="Write a short description for your podcast...."
                            multiline
                            inputProps={{ color: "white", style: { height: "125px" } }}
                            size="medium"
                            maxRows={12}
                        />
                    </FormControl>
                    <FormControl className="flex m-10" style={{ color: "white" }}>
                        <label htmlFor="my-input">Price (in ETH)</label>
                        <Input
                            style={{ color: "white" }}
                            className="inputTxt p-3 mt-3"
                            id="my-input"
                            placeholder="0.01"
                        />
                    </FormControl>
                    <FormControl className="flex m-10" style={{ color: "white" }}>
                        <label htmlFor="my-input" className="mb-3">
                            Upload podcast{" "}
                        </label>
                        <FileUploader
                            classes="uploader"
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        >
                            <div className="grid grid-flow-col auto-cols-3 items-center h-full w-full">
                                <div></div>
                                <div className="items-center">
                                    <div className="ml-52">
                                        <img className="ml-1 mb-3" src="upload.svg"></img>
                                        {file ? (
                                            <p>{file.name}</p>
                                        ) : (
                                            <div>
                                                <p>Length of sound max 5min</p>
                                                <p>Max size 50mb</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </FileUploader>
                    </FormControl>
                    <FormControl className="flex m-10" style={{ color: "white" }}>
                        <Button className="submit-btn">Create your podcast</Button>
                    </FormControl>
                </div>
            </div>
        </>
    );
}
