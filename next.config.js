/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.wolvesville.com",
      },
    ],
  },
};

module.exports = nextConfig;
