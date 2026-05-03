import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
