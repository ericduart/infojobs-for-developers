/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/offers',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
