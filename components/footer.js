export default function Footer() {
    return (
        <div className="pl-10 pr-10 pb-10">
            <div className="grid grid-flow-col auto-cols-auto items-start pb-10">
                <div className="col-span-1">
                    <img src="logo.svg"></img>
                </div>
                <div className="col-span-1">
                    <h1 className="pb-5">
                        <strong>Resources</strong>
                    </h1>
                    <ul>
                        <li>
                            <a href="#">Create</a>
                        </li>
                        <li>
                            <a href="/explore">Explore</a>
                        </li>
                        <li>Connect Wallet </li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <h1 className="pb-5">
                        <strong>Links</strong>
                    </h1>
                    <ul>
                        <li>
                            <a href="https://www.linkedin.com/" target={"_blank"}>
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/PodShipNFT" target={"_blank"}>
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" target={"_blank"}>
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/" target={"_blank"}>
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <h1 className="pb-5">
                        <strong>Contact</strong>
                    </h1>
                    <ul>
                        <li>
                            <a href="mailto:Info@Podship.io" target={"_blank"}>
                                Info@Podship.io
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="footer-hr" />
            <div className="grid grid-flow-col auto-cols-1 items-center pt-10 pb-10">
                <div className="col-span-10">Copyright © 2022 podship. All rights reserved.</div>
                <div className="col-span-1">
                    <a href="#" className="items-end">
                        <p align="right">Terms and conditions</p>
                    </a>
                </div>
                <div className="col-span-1">
                    <a href="#" className="items-end">
                        <p align="right">Privacy Policy</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
