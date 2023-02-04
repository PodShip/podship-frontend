/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: false,
    env: {
        NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
        NEXT_PUBLIC_DAPP_URL: process.env.NEXT_PUBLIC_DAPP_URL,
        NEXT_PUBLIC_MASTER_KEY: process.env.NEXT_PUBLIC_MASTER_KEY,
        NFT_STORAGE: process.env.NFT_STORAGE,
        NEXT_PUBLIC_T: process.env.NEXT_PUBLIC_T,
    },
};

module.exports = nextConfig;
