import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcrypt"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
