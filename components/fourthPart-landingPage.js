export default function FourthPart() {
    return (
        <div
            className="bg-no-repeat bg-center bg-cover h-screen w-screen  items-center"
            style={{ backgroundImage: "url(fourthPartImage.png)" }}
        >
            <div className="grid grid-flow-col grid-cols-3 items-center  w-screen pt-64">
                <div></div>
                <div className="col-span-2 items-center">
                    <h1 className="powerdBy items-center ml-24">Powered By</h1>
                </div>
                <div></div>
            </div>
            <div className="grid grid-flow-col grid-cols-5 items-center w-screen m-24">
                <div className="items-center">
                    <img src="powerdByLogos/QuickNode.svg" />
                </div>
                <div className="items-center">
                    <img src="powerdByLogos/polygon.svg" />
                </div>
                <div className="items-center">
                    <img src="powerdByLogos/Chainlink.svg" />
                </div>
                <div className="items-center">
                    <img src="powerdByLogos/IPFS.svg" />
                </div>
                <div className="items-center">
                    <img src="powerdByLogos/filecoin.svg" />
                </div>
            </div>
        </div>
    );
}
