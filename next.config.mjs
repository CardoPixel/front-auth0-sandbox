// /next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        AUTH0_ISSUER: process.env.AUTH0_ISSUER,
        AUTH_DYNAMODB_ID: process.env.AUTH_DYNAMODB_ID,
        AUTH_DYNAMODB_SECRET: process.env.AUTH_DYNAMODB_SECRET,
        AUTH_DYNAMODB_REGION: process.env.AUTH_DYNAMODB_REGION,
        AUTH_DYNAMODB_TABLE_NAME: process.env.AUTH_DYNAMODB_TABLE_NAME,
    },
    images: {
        domains: ['lh3.googleusercontent.com'], // Add google avatar domain
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
};

export default nextConfig;
