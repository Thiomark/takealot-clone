/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://images.pexels.com",
      "https://firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
