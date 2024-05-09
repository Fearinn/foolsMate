/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  mode: "production"
});

const cspDefault = "default-src 'self'; ";
const cspFont = "font-src 'self' https://fonts.google.com; ";
const cspStyle =
  "style-src 'self' 'unsafe-inline'; img-src 'self' cdn.wolvesville.com cdn-avatars.wolvesville.com; ";
const cspConnnect = `connect-src 'self' https://foolsmateapi.onrender.com/ https://vitals.vercel-insights.com cdn.wolvesville.com cdn-avatars.wolvesville.com ${
  !prod ? "http://localhost:3000" : ""
};`;
const cspOthers =
  "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; ";

const cspScript = `script-src 'self' 'sha256-e7MRMmTzLsLQvIy1iizO1lXf7VWYoQ6ysj5fuUzvRwE=' https://va.vercel-scripts.com/v1/script.debug.js ${
  !prod ? "'unsafe-eval'" : ""
}; `;

const CSP =
  cspDefault + cspFont + cspStyle + cspConnnect + cspOthers + cspScript;

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

module.exports = withPWA(nextConfig);
