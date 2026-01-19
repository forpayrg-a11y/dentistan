import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NETLIFY ? undefined : "standalone",
  /* config options here */
};

export default nextConfig;
