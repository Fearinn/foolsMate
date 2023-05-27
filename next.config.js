/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.wolvesville.com" },
      { protocol: "https", hostname: "cdn-avatars.wolvesville.com" },
    ],
  },
};

module.exports = nextConfig;
