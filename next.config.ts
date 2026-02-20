import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  deploymentId: `deploy-${Date.now().toString()}`,
};

export default nextConfig;
