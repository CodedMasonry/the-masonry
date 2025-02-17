/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "dxgc3f8f0p.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "hz2lv8281m.ufs.sh",
        port: "",
        pathname: "/f/**",
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
