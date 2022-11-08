import { ConnectButton } from "@web3uikit/web3";
import Link from "next/link";
export default function Header() {
    return (
        <>
            <nav className="p-5 flex flex-row justify-between items-center ">
                <Link href="/">
                    <a className="w-auto h-auto">
                        <img src="logo.svg"></img>
                    </a>
                </Link>
                <div className="flex flex-row items-center">
                    <Link href="/">
                        <a className="ml-6 p-4 primary-btn items-center">
                            <p className="ml-6">Home</p>
                        </a>
                    </Link>
                    <Link href="/create">
                        <a className="ml-6 p-4 secondary-btn items-center">
                            <p className="ml-3">+ Create</p>
                        </a>
                    </Link>
                    <Link href="/explore">
                        <a className="ml-4 p-3 secondary-btn ">
                            <div className="flex flex-row items-center">
                                <img src="search.svg" />
                                <p className="ml-2">Explore</p>
                            </div>
                        </a>
                    </Link>
                    <ConnectButton moralisAuth={false} />
                </div>
            </nav>
        </>
    );
}
