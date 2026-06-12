import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      // Admin permite imágenes hasta 5 MB vía FormData
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
