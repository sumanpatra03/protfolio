import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  }
  // Your existing Next.js configuration
};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, {
  org: "https://sumanprotfolio.vercel.app/",
  project: "Suman's Portfolio",

  silent: !process.env.CI,
  webpack: { treeshake: { removeDebugLogging: true } },
});
