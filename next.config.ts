import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly configure path aliases for Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        "@": path.resolve(process.cwd(), "."),
      },
    },
  },
  // Also configure for webpack (fallback)
  webpack: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(process.cwd(), "."),
      };
    }
    return config;
  },
};

export default nextConfig;
