/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://eplq-backend.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;