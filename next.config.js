/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WINDY_API_KEY: process.env.WINDY_API_KEY,
    }
}

module.exports = nextConfig
