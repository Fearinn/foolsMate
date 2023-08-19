/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

const CSP = `default-src 'self'; font-src 'self' https://fonts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' cdn.wolvesville.com cdn-avatars.wolvesville.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; connect-src 'self' ${
  prod
    ? "https://foolsmate.cyclic.app/ https://vitals.vercel-insights.com"
    : "http://localhost:3000"
};script-src 'self' 'sha256-e7MRMmTzLsLQvIy1iizO1lXf7VWYoQ6ysj5fuUzvRwE=' ${!prod ? "'unsafe-eval'" : ""}`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        locale: false,
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosiff" },
          { key: "Content-Security-Policy", value: CSP },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
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
