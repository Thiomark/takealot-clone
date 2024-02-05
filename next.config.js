/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "https://firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
