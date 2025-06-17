/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // Allow images from your local backend
        pathname: "/uploads/**", // Adjust the path if needed
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
