/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "/image/:path*",
      },
      {
        source: "/videos/:path*",
        destination: "/video/:path*",
      },
    ];
  },
};

export default nextConfig;
