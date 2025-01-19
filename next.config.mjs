/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "images.clerk.com"],
  },
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
  },
};

export default nextConfig;
