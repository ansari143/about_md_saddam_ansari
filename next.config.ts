import type { NextConfig } from "next";

/**
 * Static export: `next build` writes a plain HTML/CSS/JS site to `out/`,
 * which Firebase Hosting (or any static host) serves directly.
 * Security headers live in firebase.json, because static exports can't set headers.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
