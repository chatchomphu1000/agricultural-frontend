/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8082',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
