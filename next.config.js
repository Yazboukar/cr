/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Type errors must fail the production build. Flip to `true` only as a
  // temporary local escape hatch — never commit it enabled.
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
