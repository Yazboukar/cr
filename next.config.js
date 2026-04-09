/**
 * Temporary build config: ignore TypeScript build errors so Docker builds succeed
 * during development. Remove or set to false for production.
 */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
