import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { FormControl, Input, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FileUploader } from "react-drag-drop-files";
import upload from "../components/upload";
import { useWeb3Contract } from "react-moralis";
import { contractAbi, contractAddress } from "../constants/constants";
import { useNotification } from "@web3uikit/core";

const fileTypes = ["mp3"];
const fileTypesCover = ["jpg"];

export default function Create() {
    const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const [fileCover, setFileCover] = useState(null);
    const dispatch = useNotification();
    const { runContractFunction: mintNft } = useWeb3Contract();
    const [loading, setloading] = useState(false);

    const handleChange = (file) => {
        setFile(file);
        console.log({ file });
    };

    const handleChangeCover = (file) => {
        setFileCover(file);
        console.log({ file });
    };

    const onSubmit = async () => {
        setloading(true);
        if (!file || !fileCover || !data.podcastName || !data.desc || !data.price) {
            handleError();
            setloading(false);
            return;
        }
        const token = await upload(file, fileCover, data.podcastName, data.desc);
        console.log({ token });

        const response = await mintNft({
            params: {
                abi: contractAbi,
                contractAddress: contractAddress,
                functionName: "mintNFT",
                params: {
                    ipfsURI: token.url,
                },
            },
            onError: (error) => {
                console.log(error);
                setloading(false);
            },
            onSuccess: () => handleSuccess(),
        });

        console.log(response);
    };

    const handleSuccess = async () => {
        setloading(false);
        dispatch({
            type: "success",
            message: "It might take a few minutes to mint your NFT, stay tuned !",
            title: "Successfully Added your Podcast!",
            position: "topR",
        });
    };

    const handleError = async () => {
        setloading(false);
        dispatch({
            type: "error",
            message: "Please fill all required fileds",
            title: "Error !",
            position: "topR",
        });
    };
    return (
        <>
            <Header />
            <div className="flex w-screen">
                <div className="leftPanel m-16">
                    <h1 className="primaryTxt mt-10 ml-16">Upload Form</h1>
                    <p className="ml-16 mr-16 mt-5">
                        Things you need to complete in order to upload Podcast
                    </p>
                    <ul className="ml-16 mt-5">
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                {data.podcastName ? (
                                    <img src="selected.svg"></img>
                                ) : (
                                    <img src="unselected.svg"></img>
                                )}
                                <p className="ml-5">Podcast Name</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                {data.desc ? (
                                    <img src="selected.svg"></img>
                                ) : (
                                    <img src="unselected.svg"></img>
                                )}
                                <p className="ml-5">Description</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                {data.price ? (
                                    <img src="selected.svg"></img>
                                ) : (
                                    <img src="unselected.svg"></img>
                                )}
                                <p className="ml-5">Price</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                {file ? (
                                    <img src="selected.svg"></img>
                                ) : (
                                    <img src="unselected.svg"></img>
                                )}
                                <p className="ml-5">Upload Podcast</p>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="flex flex-row items-center">
                                {fileCover ? (
                                    <img src="selected.svg"></img>
                                ) : (
                                    <img src="unselected.svg"></img>
                                )}
                                <p className="ml-5">Upload Cover Photo</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="rightPanel w-8/12">
                    <FormControl className="fileUploader" style={{ color: "white" }}>
                        <label htmlFor="my-input">Podcast Name *</label>
                        <Input
                            style={{ color: "white" }}
                            className="inputTxt p-3 mt-3"
                            id="my-input"
                            placeholder="Cool podcast name"
                            required
                            onChange={(val) => {
                                setData({ ...data, podcastName: val.target.value });
                            }}
                        />
                    </FormControl>
                    <FormControl className="fileUploader" style={{ color: "white" }}>
                        <label htmlFor="my-input">Description *</label>
                        <TextField
                            style={{ color: "white" }}
                            className="inputTxt p-3 mt-3"
                            placeholder="Write a short description for your podcast...."
                            required
                            multiline
                            inputProps={{
                                style: { height: "125px", color: "white" },
                                onChange: (val) => {
                                    console.log(val.target.value);
                                    setData({ ...data, desc: val.target.value });
                                },
                            }}
                            size="medium"
                            maxRows={12}
                        />
                    </FormControl>
                    <FormControl className="fileUploader" style={{ color: "white" }}>
                        <label htmlFor="my-input">Price (in ETH) *</label>
                        <Input
                            type="number"
                            style={{ color: "white" }}
                            className="inputTxt p-3 mt-3"
                            id="my-input"
                            required
                            placeholder="0.01"
                            onChange={(val) => {
                                setData({ ...data, price: val.target.value });
                            }}
                        />
                    </FormControl>
                    <FormControl className="fileUploader" style={{ color: "white" }}>
                        <label htmlFor="my-input" className="mb-3">
                            Upload podcast *
                        </label>
                        <FileUploader
                            classes="uploader"
                            handleChange={handleChange}
                            name="file"
                            required
                            types={fileTypes}
                        >
                            <div className="grid grid-flow-col auto-cols-3 items-center h-full w-full">
                                <div></div>
                                <div className="items-center">
                                    <div className="ml-48 p-10">
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
                    <FormControl className="fileUploader" style={{ color: "white" }}>
                        <label htmlFor="my-input" className="mb-3">
                            Upload cover Photo *
                        </label>
                        <FileUploader
                            classes="uploader"
                            handleChange={handleChangeCover}
                            required
                            name="fileCover"
                            types={fileTypesCover}
                        >
                            <div className="grid grid-flow-col auto-cols-3 items-center h-full w-full">
                                <div></div>
                                <div className="items-center">
                                    <div className="ml-52 p-5">
                                        {fileCover ? (
                                            <p>{fileCover.name}</p>
                                        ) : (
                                            <h1>Upload Cover Photo</h1>
                                        )}
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </FileUploader>
                    </FormControl>
                    <FormControl className="fileUploader" style={{ color: "white" }}>
                        <LoadingButton className="submit-btn" onClick={onSubmit} loading={loading}>
                            Create your podcast
                        </LoadingButton>
                    </FormControl>
                </div>
            </div>
            <br />
            <Footer />
        </>
    );
}
