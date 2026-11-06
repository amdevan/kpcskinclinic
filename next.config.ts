import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  /* Type errors must fail the build so they can't ship silently. */
  reactStrictMode: false,
};

export default nextConfig;
