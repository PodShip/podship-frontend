/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false,
            };
        }

        return config;
    },
    reactStrictMode: false,
    swcMinify: true,
    env: {
        NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
        NEXT_PUBLIC_DAPP_URL: process.env.NEXT_PUBLIC_DAPP_URL,
        NEXT_PUBLIC_MASTER_KEY: process.env.NEXT_PUBLIC_MASTER_KEY,
        NFT_STORAGE: process.env.NFT_STORAGE,
    },
};

module.exports = nextConfig;
