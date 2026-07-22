import type { NextConfig } from "next";

const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: pagesBasePath,
  devIndicators: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/github-pages-image-loader.ts",
  },
};

export default nextConfig;
