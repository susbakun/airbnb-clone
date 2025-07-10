import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "rtbafujqqcveexzbfspn.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
