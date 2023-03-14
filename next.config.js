/** @type {import('next').NextConfig} */
const nextConfig = {
  // It looks like render twice, but it doesn't. This mode can help you find out problems, and it only work at development mode.
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
