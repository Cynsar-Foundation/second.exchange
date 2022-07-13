/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: "imgix",
    path: "",
  },
  swcMinify: true,
};

module.exports = nextConfig;
