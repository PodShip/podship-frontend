/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
        NEXT_PUBLIC_DAPP_URL: process.env.NEXT_PUBLIC_DAPP_URL,
        NEXT_PUBLIC_MASTER_KEY: process.env.NEXT_PUBLIC_MASTER_KEY,
    },
};

module.exports = nextConfig;
