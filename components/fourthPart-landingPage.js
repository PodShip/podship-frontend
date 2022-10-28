export default function FourthPart() {
    return (
        <div
            className="bg-no-repeat bg-center h-screen w-screen p-14 items-center"
            style={{ backgroundImage: "url(fourthPartImage.svg)" }}
        >
            <div className="grid grid-flow-col auto-cols-3 items-center">
                <div></div>
                <div>
                    <h1 className="fourthPart-Primary items-center pt-52 pl-64">
                        Never miss a podcast
                    </h1>
                </div>
                <div></div>
            </div>
            <div className="grid grid-flow-col auto-cols-3 items-center">
                <div></div>
                <div>
                    <p className="pl-64">
                        Subscribe to our newsletter to get the news podcast drops
                    </p>
                </div>
                <div></div>
            </div>
            <div className="grid grid-flow-col auto-cols-3 items-center">
                <div></div>
                <div>
                    <div className="pl-64 pt-14">
                        <input
                            type={"email"}
                            className="fourthPart-input m-1 p-2 bg-transparent items-center"
                            placeholder="Name.Surname@mail.com"
                            size={50}
                        ></input>
                        <a className="primary-btn pl-10 pr-10 pt-5 pb-5 ml-10">Submit</a>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}
