/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/project',
        permanent: true,
      },
      {
        source: '/project/:id',
        destination: '/project/:id/testimonials',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
