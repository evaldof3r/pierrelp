import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Configure Turbopack (empty config to use default behavior)
  // TypeScript paths in tsconfig.json are automatically used by Next.js 16
  turbopack: {},
  // Configure path aliases for webpack (fallback when not using Turbopack)
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
