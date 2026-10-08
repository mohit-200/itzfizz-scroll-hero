/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isGithubPages
    ? {
        basePath: "/itzfizz-scroll-hero",
        assetPrefix: "/itzfizz-scroll-hero/"
      }
    : {})
};

export default nextConfig;
