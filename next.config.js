/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/strapi/:slug*',
        destination: 'http://localhost:5500/:slug*'
      }
    ]

  }
}

module.exports = nextConfig
